/*
  Skrip pengisian konten awal ke Sanity.

  Skrip ini membaca seluruh data yang selama ini tersimpan di folder lib/,
  mengunggah fotonya dari folder public/images/, lalu membuat dokumen di
  Sanity lengkap dengan sambungan ke foto yang sudah terunggah.

  Cara menjalankan:
    node --experimental-strip-types scripts/seed-sanity.mts

  Ada mode uji coba yang tidak mengirim apa pun ke Sanity dan tidak
  mengunggah foto. Berguna untuk memastikan semua data dan foto terbaca
  sebelum benar-benar dikirim:
    node --experimental-strip-types scripts/seed-sanity.mts --uji

  Sifatnya aman dijalankan berulang kali. Setiap dokumen diberi id tetap,
  jadi menjalankan ulang akan menimpa dokumen yang sama, bukan membuat
  salinan baru. Foto yang sudah pernah diunggah juga tidak diunggah ulang.

  Butuh SANITY_API_WRITE_TOKEN di file .env.local (kecuali pada mode uji).
*/

import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { EVENTS, GALLERY_PHOTOS } from "../lib/events-data.ts";
import {
  HIGHLIGHT_SERVICES,
  PRIVATE_SPACES,
  PUBLIC_SPACES,
  SUPPORT_FACILITIES,
  VENUE_PHOTOS,
} from "../lib/facilities-data.ts";
import {
  BEST_SELLER_MENU,
  MENU_CATEGORIES,
  MENU_PACKAGES,
} from "../lib/menu-data.ts";
import { PROMO_POPUP } from "../lib/promo-data.ts";
import { TESTIMONIALS } from "../lib/testimonials-data.ts";

const AKAR_PROJECT = path.resolve(import.meta.dirname, "..");

// Mode uji coba: semua data dan foto tetap dibaca dan diperiksa, tapi tidak
// ada satu pun yang dikirim ke Sanity.
const MODE_UJI = process.argv.includes("--uji");

// ---------------------------------------------------------------------------
// Persiapan koneksi
// ---------------------------------------------------------------------------

async function bacaEnvLocal(): Promise<Record<string, string>> {
  const berkas = path.join(AKAR_PROJECT, ".env.local");
  if (!existsSync(berkas)) {
    throw new Error(
      "File .env.local tidak ditemukan di root project. Buat dulu file itu sebelum menjalankan skrip.",
    );
  }
  const isi = await readFile(berkas, "utf8");
  const hasil: Record<string, string> = {};
  for (const baris of isi.split("\n")) {
    const bersih = baris.trim();
    if (!bersih || bersih.startsWith("#")) continue;
    const pemisah = bersih.indexOf("=");
    if (pemisah === -1) continue;
    hasil[bersih.slice(0, pemisah).trim()] = bersih.slice(pemisah + 1).trim();
  }
  return hasil;
}

const env = await bacaEnvLocal();

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;
const token = env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  throw new Error(
    "NEXT_PUBLIC_SANITY_PROJECT_ID atau NEXT_PUBLIC_SANITY_DATASET belum diisi di .env.local",
  );
}

if (!token && !MODE_UJI) {
  throw new Error(
    "SANITY_API_WRITE_TOKEN belum diisi di .env.local. Ambil tokennya di sanity.io bagian API > Tokens, izin Editor.",
  );
}

if (MODE_UJI) {
  console.log(
    "\nMODE UJI COBA. Tidak ada foto yang diunggah dan tidak ada dokumen yang dikirim ke Sanity.",
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-18",
  token,
  useCdn: false,
});

// ---------------------------------------------------------------------------
// Pengunggahan foto
// ---------------------------------------------------------------------------

// Menyimpan hasil unggah supaya satu file foto tidak diunggah dua kali,
// misalnya foto VIP Room yang dipakai di dua tempat berbeda.
const arsipFoto = new Map<string, string>();
const fotoHilang: string[] = [];
let jumlahUnggah = 0;
let jumlahLewat = 0;

async function unggahFoto(pathPublik: string): Promise<string | null> {
  if (arsipFoto.has(pathPublik)) {
    jumlahLewat += 1;
    return arsipFoto.get(pathPublik)!;
  }

  const berkas = path.join(AKAR_PROJECT, "public", pathPublik);
  if (!existsSync(berkas)) {
    console.warn(`  ! Foto tidak ditemukan, dilewati: ${pathPublik}`);
    fotoHilang.push(pathPublik);
    return null;
  }

  if (MODE_UJI) {
    // Foto terbukti ada, tapi tidak diunggah. Dipakai penanda semu supaya
    // penyusunan dokumen tetap bisa diperiksa sampai tuntas.
    arsipFoto.set(pathPublik, "uji-coba");
    jumlahUnggah += 1;
    console.log(`  . Foto terbaca: ${pathPublik}`);
    return "uji-coba";
  }

  const aset = await client.assets.upload("image", createReadStream(berkas), {
    filename: path.basename(berkas),
  });

  arsipFoto.set(pathPublik, aset._id);
  jumlahUnggah += 1;
  console.log(`  + Foto terunggah: ${pathPublik}`);
  return aset._id;
}

/** Membentuk field gambar Sanity lengkap dengan keterangannya. */
async function bentukGambar(pathPublik: string, alt?: string) {
  const idAset = await unggahFoto(pathPublik);
  if (!idAset) return null;
  return {
    _type: "image",
    asset: { _type: "reference", _ref: idAset },
    ...(alt ? { alt } : {}),
  };
}

/** Membentuk daftar gambar untuk field bertipe array. */
async function bentukDaftarGambar(
  daftar: { src: string; alt: string }[],
): Promise<Record<string, unknown>[]> {
  const hasil: Record<string, unknown>[] = [];
  for (const [urutan, foto] of daftar.entries()) {
    const idAset = await unggahFoto(foto.src);
    if (!idAset) continue;
    hasil.push({
      _type: "image",
      _key: `foto-${urutan}`,
      asset: { _type: "reference", _ref: idAset },
      alt: foto.alt,
    });
  }
  return hasil;
}

/** Membungkus daftar objek biasa dengan _key, syarat wajib array di Sanity. */
function beriKunci<T extends Record<string, unknown>>(
  daftar: T[],
  awalan: string,
) {
  return daftar.map((butir, urutan) => ({
    ...butir,
    _key: `${awalan}-${urutan}`,
  }));
}

function jadikanSlug(nilai: string) {
  return { _type: "slug", current: nilai };
}

// ---------------------------------------------------------------------------
// Penyusunan dokumen
// ---------------------------------------------------------------------------

const dokumen: Record<string, unknown>[] = [];

console.log("\nMenyiapkan menu best seller...");
for (const [urutan, menu] of BEST_SELLER_MENU.entries()) {
  const gambar = await bentukGambar(menu.image, menu.name);
  dokumen.push({
    _id: `menuItem-${menu.id}`,
    _type: "menuItem",
    name: menu.name,
    slug: jadikanSlug(menu.id),
    description: menu.description,
    ...(gambar ? { image: gambar } : {}),
    category: menu.category,
    isBestSeller: menu.isBestSeller,
    order: urutan + 1,
  });
}

console.log("Menyiapkan kategori menu...");
for (const [urutan, kategori] of MENU_CATEGORIES.entries()) {
  const gambar = await bentukGambar(kategori.image, kategori.alt);
  dokumen.push({
    _id: `menuCategory-${kategori.id}`,
    _type: "menuCategory",
    name: kategori.name,
    slug: jadikanSlug(kategori.id),
    kelompok: kategori.kelompok,
    description: kategori.description,
    ...(gambar ? { image: gambar } : {}),
    contoh: kategori.contoh,
    order: urutan + 1,
  });
}

console.log("Menyiapkan paket menu...");
for (const [urutan, paket] of MENU_PACKAGES.entries()) {
  const gambar = await bentukGambar(paket.image, paket.alt);
  dokumen.push({
    _id: `menuPackage-${paket.id}`,
    _type: "menuPackage",
    name: paket.name,
    slug: jadikanSlug(paket.id),
    priceRange: paket.priceRange,
    unit: paket.unit,
    description: paket.description,
    ...(gambar ? { image: gambar } : {}),
    features: paket.features,
    isHighlighted: paket.isHighlighted ?? false,
    order: urutan + 1,
  });
}

console.log("Menyiapkan popup promo...");
{
  const gambar = await bentukGambar(PROMO_POPUP.image, PROMO_POPUP.alt);
  dokumen.push({
    // Id tetap, harus sama dengan ID_DOKUMEN_PROMO di sanity/structure.ts
    // supaya menu Popup Promo di panel admin membuka dokumen yang ini.
    _id: "promoPopupUtama",
    _type: "promoPopup",
    aktif: PROMO_POPUP.aktif,
    kodePromo: PROMO_POPUP.id,
    badge: PROMO_POPUP.badge,
    title: PROMO_POPUP.title,
    subtitle: PROMO_POPUP.subtitle,
    ...(gambar ? { image: gambar } : {}),
    poin: PROMO_POPUP.poin,
    ctaLabel: PROMO_POPUP.ctaLabel,
    ctaHref: PROMO_POPUP.ctaHref,
    catatan: PROMO_POPUP.catatan,
    delayMs: PROMO_POPUP.delayMs,
    jedaTampilJam: PROMO_POPUP.jedaTampilJam,
  });
}

console.log("Menyiapkan dokumentasi event...");
for (const [urutan, acara] of EVENTS.entries()) {
  const daftarGambar = await bentukDaftarGambar(acara.images);
  dokumen.push({
    _id: `event-${acara.id}`,
    _type: "event",
    title: acara.title,
    slug: jadikanSlug(acara.id),
    kategori: acara.kategori,
    partner: acara.partner,
    description: acara.description,
    highlights: acara.highlights,
    images: daftarGambar,
    order: urutan + 1,
  });
}

console.log("Menyiapkan foto galeri...");
for (const [urutan, foto] of GALLERY_PHOTOS.entries()) {
  const gambar = await bentukGambar(foto.src, foto.alt);
  dokumen.push({
    _id: `galleryPhoto-${foto.id}`,
    _type: "galleryPhoto",
    caption: foto.caption,
    ...(gambar ? { image: gambar } : {}),
    orientation: foto.orientation,
    order: urutan + 1,
  });
}

console.log("Menyiapkan testimoni...");
for (const [urutan, ulasan] of TESTIMONIALS.entries()) {
  dokumen.push({
    _id: `testimonial-${ulasan.id}`,
    _type: "testimonial",
    name: ulasan.name,
    slug: jadikanSlug(ulasan.id),
    meta: ulasan.meta,
    quote: ulasan.quote,
    rating: ulasan.rating,
    order: urutan + 1,
  });
}

console.log("Menyiapkan ruang dan area...");
const semuaRuang = [
  ...PUBLIC_SPACES.map((ruang) => ({ ruang, tipe: "public" as const })),
  ...PRIVATE_SPACES.map((ruang) => ({ ruang, tipe: "private" as const })),
];
for (const [urutan, { ruang, tipe }] of semuaRuang.entries()) {
  const daftarGambar = await bentukDaftarGambar(ruang.images);
  dokumen.push({
    _id: `space-${ruang.id}`,
    _type: "space",
    name: ruang.name,
    slug: jadikanSlug(ruang.id),
    tipe,
    tagline: ruang.tagline,
    description: ruang.description,
    images: daftarGambar,
    features: beriKunci(ruang.features, "fasilitas"),
    capacity: ruang.capacity,
    bestFor: ruang.bestFor,
    order: urutan + 1,
  });
}

console.log("Menyiapkan layanan unggulan...");
for (const [urutan, layanan] of HIGHLIGHT_SERVICES.entries()) {
  const gambar = await bentukGambar(layanan.image, layanan.alt);
  dokumen.push({
    _id: `highlightService-${layanan.id}`,
    _type: "highlightService",
    name: layanan.name,
    slug: jadikanSlug(layanan.id),
    description: layanan.description,
    ...(gambar ? { image: gambar } : {}),
    order: urutan + 1,
  });
}

console.log("Menyiapkan fasilitas penunjang...");
for (const [urutan, fasilitas] of SUPPORT_FACILITIES.entries()) {
  const kode = fasilitas.label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  dokumen.push({
    _id: `supportFacility-${kode}`,
    _type: "supportFacility",
    label: fasilitas.label,
    slug: jadikanSlug(kode),
    icon: fasilitas.icon,
    note: fasilitas.note,
    order: urutan + 1,
  });
}

console.log("Menyiapkan foto venue...");
for (const [urutan, foto] of VENUE_PHOTOS.entries()) {
  const gambar = await bentukGambar(foto.src, foto.alt);
  dokumen.push({
    _id: `venuePhoto-${foto.id}`,
    _type: "venuePhoto",
    caption: foto.caption,
    ...(gambar ? { image: gambar } : {}),
    order: urutan + 1,
  });
}

// ---------------------------------------------------------------------------
// Pengiriman ke Sanity
// ---------------------------------------------------------------------------

const ringkasan = dokumen.reduce<Record<string, number>>((kumpulan, butir) => {
  const jenis = butir._type as string;
  kumpulan[jenis] = (kumpulan[jenis] || 0) + 1;
  return kumpulan;
}, {});

if (MODE_UJI) {
  console.log(`\nMODE UJI. ${dokumen.length} dokumen berhasil disusun.`);
} else {
  console.log(`\nMengirim ${dokumen.length} dokumen ke Sanity...`);

  // Dikirim bertahap supaya tidak menabrak batas ukuran satu transaksi.
  const UKURAN_KELOMPOK = 20;
  for (let mulai = 0; mulai < dokumen.length; mulai += UKURAN_KELOMPOK) {
    const kelompok = dokumen.slice(mulai, mulai + UKURAN_KELOMPOK);
    const transaksi = client.transaction();
    for (const butir of kelompok) {
      transaksi.createOrReplace(butir as never);
    }
    await transaksi.commit();
    console.log(
      `  terkirim ${Math.min(mulai + UKURAN_KELOMPOK, dokumen.length)} dari ${dokumen.length}`,
    );
  }
}

console.log("\nSelesai. Rincian dokumen:");
for (const [jenis, jumlah] of Object.entries(ringkasan)) {
  console.log(`  ${jenis}: ${jumlah}`);
}
console.log(
  `\nFoto: ${jumlahUnggah} diproses, ${jumlahLewat} dipakai ulang tanpa unggah ulang.`,
);

if (fotoHilang.length > 0) {
  console.warn(
    `\nPERHATIAN: ${fotoHilang.length} foto tidak ditemukan di folder public.`,
  );
  for (const berkas of fotoHilang) {
    console.warn(`  - ${berkas}`);
  }
  console.warn(
    "Dokumennya tetap dibuat tanpa foto. Fotonya bisa diunggah manual lewat panel Studio.",
  );
}

if (!MODE_UJI) {
  console.log("\nSilakan buka /studio untuk mengecek hasilnya.\n");
}
