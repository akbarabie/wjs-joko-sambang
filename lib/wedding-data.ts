// Tipe data Wedding Package di halaman Menu (kartu yang bisa dibalik, tiga
// paket A/B/C, ditutup kotak fasilitas venue).
//
// Sejak dikelola lewat Sanity (lihat sanity/schemaTypes/weddingPackage.ts),
// file ini tinggal menyimpan bentuk datanya saja, isinya selalu datang dari
// Studio. Sumber konten aslinya tetap dua flyer resmi "Wedding Package -
// Venue Facilities" dan "Wedding Foodies Packages", cuma sekarang diketik
// admin langsung di Studio, bukan di file ini.

import type { FacilityIconName } from "@/lib/facilities-data";

export type WeddingKomposisi = {
  jumlah: string;
  label: string;
};

export type WeddingPaket = {
  /** Dipakai sebagai React key, diambil dari kode paket (A/B/C). */
  id: string;
  kode: string;
  name: string;
  price: string;
  unit: string;
  /** Ringkasan komposisi, ditampilkan di sisi depan kartu. */
  komposisi: WeddingKomposisi[];
  /** Rincian hidangan, ditampilkan setelah kartu dibalik. */
  hidangan: string[];
  image: string;
  alt: string;
  isHighlighted?: boolean;
};

export type WeddingFasilitas = {
  icon: FacilityIconName;
  label: string;
  detail: string;
};

export type WeddingPackageData = {
  daftarPaket: WeddingPaket[];
  daftarFasilitas: WeddingFasilitas[];
  /** Baris syarat kecil di bagian paling bawah, contoh "Minimum pemesanan
   *  200 pax". */
  syarat: string[];
};
