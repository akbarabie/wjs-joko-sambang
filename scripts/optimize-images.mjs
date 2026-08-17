/**
 * Skrip kompresi foto - WJS Joko Sambang Cafe
 *
 * Tugasnya menurunkan ukuran folder public/images supaya repo aman di-push ke
 * GitHub dan website tetap ringan dibuka pengunjung dari HP.
 *
 * Yang dilakukan skrip ini:
 * 1. Menelusuri seluruh isi public/images termasuk subfoldernya.
 * 2. Menyusutkan lebar foto yang kelewat besar, lalu meng-encode ulang.
 * 3. Nama file dan ekstensi TIDAK diubah sama sekali, jadi tidak ada satu baris
 *    kode pun di project yang perlu disesuaikan.
 * 4. File mentah kamera (ARW, CR2, NEF, DNG) dilewati dan dilaporkan, karena
 *    browser tidak bisa membacanya dan hanya membebani repo.
 *
 * Cara pakai (jalankan dari folder root project):
 *   node scripts/optimize-images.mjs
 *     Hasil ditulis ke public/images-optimized. Folder asli tidak disentuh,
 *     jadi aman untuk dibandingkan dulu.
 *
 *   node scripts/optimize-images.mjs --replace
 *     Langsung menimpa public/images. Versi aslinya dipindahkan ke
 *     foto-original-backup/ di root project supaya tetap bisa dikembalikan.
 *
 * Butuh sharp. Kalau belum ada, jalankan dulu: npm install --save-dev sharp
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Batas lebar foto per folder. Layar terbesar yang realistis dipakai pengunjung
// sekitar 1920px, jadi menyimpan foto lebih besar dari ini cuma buang-buang
// ukuran tanpa ada bedanya di mata.
const LEBAR_MAKSIMAL = {
  hero: 2000, // foto latar besar, dikasih ruang lebih
  venue: 2000,
  gallery: 1600,
  default: 1600,
};

// Kualitas encode. 78 sampai 82 itu titik aman: mata biasa tidak bisa
// membedakan dengan aslinya, tapi ukurannya turun jauh.
const KUALITAS_JPEG = 80;
const KUALITAS_PNG = 80;

// File di bawah ukuran ini dianggap sudah ramping, langsung disalin apa adanya
// supaya tidak turun kualitas gara-gara di-encode ulang berkali-kali.
const BATAS_LEWATI_BYTE = 250 * 1024;

const EKSTENSI_GAMBAR = [".jpg", ".jpeg", ".png", ".webp"];
const EKSTENSI_MENTAH = [".arw", ".cr2", ".cr3", ".nef", ".dng", ".raf", ".orf"];

const argumen = process.argv.slice(2);
const modeTimpa = argumen.includes("--replace");

const AKAR = process.cwd();
const FOLDER_SUMBER = path.join(AKAR, "public", "images");
const FOLDER_HASIL = modeTimpa
  ? path.join(AKAR, ".tmp-images-optimized")
  : path.join(AKAR, "public", "images-optimized");
const FOLDER_CADANGAN = path.join(AKAR, "foto-original-backup");

const laporan = {
  diproses: 0,
  disalin: 0,
  dilewati: 0,
  byteAwal: 0,
  byteAkhir: 0,
  fileMentah: [],
  gagal: [],
};

function formatUkuran(byte) {
  if (byte < 1024) return `${byte} B`;
  if (byte < 1024 * 1024) return `${(byte / 1024).toFixed(0)} KB`;
  return `${(byte / (1024 * 1024)).toFixed(2)} MB`;
}

function ambilLebarMaksimal(pathRelatif) {
  const folderPertama = pathRelatif.split(path.sep)[0]?.toLowerCase() ?? "";
  return LEBAR_MAKSIMAL[folderPertama] ?? LEBAR_MAKSIMAL.default;
}

async function kumpulkanFile(folder, prefiks = "") {
  const isi = await fs.readdir(folder, { withFileTypes: true });
  const hasil = [];

  for (const item of isi) {
    const pathRelatif = path.join(prefiks, item.name);

    if (item.isDirectory()) {
      // Folder hasil kompresi jangan ikut dibaca, nanti kerja dua kali.
      if (item.name === "images-optimized") continue;
      hasil.push(...(await kumpulkanFile(path.join(folder, item.name), pathRelatif)));
      continue;
    }

    if (item.isFile()) hasil.push(pathRelatif);
  }

  return hasil;
}

async function prosesSatuFile(pathRelatif) {
  const sumber = path.join(FOLDER_SUMBER, pathRelatif);
  const tujuan = path.join(FOLDER_HASIL, pathRelatif);
  const ekstensi = path.extname(pathRelatif).toLowerCase();

  await fs.mkdir(path.dirname(tujuan), { recursive: true });

  const statAwal = await fs.stat(sumber);
  laporan.byteAwal += statAwal.size;

  // File mentah kamera tidak akan pernah tampil di browser. Sengaja tidak ikut
  // disalin ke hasil, tapi tetap dicatat supaya kelihatan di laporan akhir.
  if (EKSTENSI_MENTAH.includes(ekstensi)) {
    laporan.fileMentah.push({ nama: pathRelatif, ukuran: statAwal.size });
    laporan.dilewati += 1;
    return;
  }

  // Bukan file gambar, misalnya .svg atau .txt. Salin apa adanya.
  if (!EKSTENSI_GAMBAR.includes(ekstensi)) {
    await fs.copyFile(sumber, tujuan);
    laporan.byteAkhir += statAwal.size;
    laporan.disalin += 1;
    return;
  }

  // Sudah kecil, tidak usah diutak-atik lagi.
  if (statAwal.size <= BATAS_LEWATI_BYTE) {
    await fs.copyFile(sumber, tujuan);
    laporan.byteAkhir += statAwal.size;
    laporan.disalin += 1;
    return;
  }

  try {
    const lebarMaksimal = ambilLebarMaksimal(pathRelatif);
    let pipeline = sharp(sumber).rotate(); // rotate() tanpa argumen membaca EXIF, biar foto dari HP tidak miring

    const meta = await sharp(sumber).metadata();
    if (meta.width && meta.width > lebarMaksimal) {
      pipeline = pipeline.resize({ width: lebarMaksimal, withoutEnlargement: true });
    }

    if (ekstensi === ".png") {
      pipeline = pipeline.png({ quality: KUALITAS_PNG, compressionLevel: 9, palette: true });
    } else if (ekstensi === ".webp") {
      pipeline = pipeline.webp({ quality: KUALITAS_JPEG });
    } else {
      pipeline = pipeline.jpeg({ quality: KUALITAS_JPEG, mozjpeg: true, progressive: true });
    }

    await pipeline.toFile(tujuan);

    const statAkhir = await fs.stat(tujuan);

    // Kalau hasil kompresi malah lebih besar dari aslinya, pakai yang asli.
    if (statAkhir.size >= statAwal.size) {
      await fs.copyFile(sumber, tujuan);
      laporan.byteAkhir += statAwal.size;
      laporan.disalin += 1;
      return;
    }

    laporan.byteAkhir += statAkhir.size;
    laporan.diproses += 1;

    const persen = (100 - (statAkhir.size / statAwal.size) * 100).toFixed(0);
    console.log(
      `  ${pathRelatif}  ${formatUkuran(statAwal.size)} -> ${formatUkuran(statAkhir.size)}  (turun ${persen}%)`
    );
  } catch (error) {
    laporan.gagal.push({ nama: pathRelatif, pesan: error.message });
    await fs.copyFile(sumber, tujuan).catch(() => {});
    laporan.byteAkhir += statAwal.size;
  }
}

async function pindahkanHasil() {
  // Foto asli diamankan dulu, baru folder public/images diganti hasil kompresi.
  await fs.rm(FOLDER_CADANGAN, { recursive: true, force: true });
  await fs.rename(FOLDER_SUMBER, FOLDER_CADANGAN);
  await fs.rename(FOLDER_HASIL, FOLDER_SUMBER);

  // Sisa percobaan mode aman ikut dibersihkan, supaya tidak ada folder nyasar
  // yang ikut terunggah ke Vercel.
  await fs.rm(path.join(AKAR, "public", "images-optimized"), { recursive: true, force: true });
}

async function jalankan() {
  console.log("");
  console.log("Kompresi foto WJS Joko Sambang Cafe");
  console.log("-----------------------------------");

  try {
    await fs.access(FOLDER_SUMBER);
  } catch {
    console.error("Folder public/images tidak ketemu.");
    console.error("Jalankan skrip ini dari folder root project ya, bukan dari dalam scripts/.");
    process.exit(1);
  }

  await fs.rm(FOLDER_HASIL, { recursive: true, force: true });
  await fs.mkdir(FOLDER_HASIL, { recursive: true });

  const daftarFile = await kumpulkanFile(FOLDER_SUMBER);
  console.log(`Ketemu ${daftarFile.length} file. Mulai proses.`);
  console.log("");

  for (const berkas of daftarFile) {
    await prosesSatuFile(berkas);
  }

  if (modeTimpa) await pindahkanHasil();

  const hemat = laporan.byteAwal - laporan.byteAkhir;
  const persenHemat = laporan.byteAwal > 0 ? ((hemat / laporan.byteAwal) * 100).toFixed(1) : "0";

  console.log("");
  console.log("Ringkasan");
  console.log("---------");
  console.log(`Dikompres        : ${laporan.diproses} file`);
  console.log(`Disalin apa adanya: ${laporan.disalin} file`);
  console.log(`Dilewati         : ${laporan.dilewati} file`);
  console.log(`Ukuran awal      : ${formatUkuran(laporan.byteAwal)}`);
  console.log(`Ukuran akhir     : ${formatUkuran(laporan.byteAkhir)}`);
  console.log(`Hemat            : ${formatUkuran(hemat)} (${persenHemat}%)`);

  if (laporan.fileMentah.length > 0) {
    console.log("");
    console.log("File mentah kamera yang dibuang dari hasil (browser tidak bisa membacanya):");
    for (const berkas of laporan.fileMentah) {
      console.log(`  ${berkas.nama}  ${formatUkuran(berkas.ukuran)}`);
    }
    console.log("Kalau foto ini memang mau dipakai, ekspor dulu ke JPG lalu taruh manual.");
  }

  if (laporan.gagal.length > 0) {
    console.log("");
    console.log("Gagal diproses, dipakai versi aslinya:");
    for (const berkas of laporan.gagal) {
      console.log(`  ${berkas.nama}  ${berkas.pesan}`);
    }
  }

  console.log("");
  if (modeTimpa) {
    console.log("public/images sudah diganti versi hasil kompresi.");
    console.log("Foto aslinya ada di foto-original-backup/ (folder ini jangan ikut di-commit).");
  } else {
    console.log("Hasilnya ada di public/images-optimized.");
    console.log("Cek dulu beberapa foto. Kalau sudah oke, jalankan ulang pakai --replace.");
  }
  console.log("");
}

jalankan().catch((error) => {
  console.error("Skrip berhenti karena error:", error);
  process.exit(1);
});
