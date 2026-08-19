import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";

/*
  Daftar halaman untuk mesin pencari.

  Berkas ini otomatis tersedia di alamat /sitemap.xml. Isinya memberi tahu
  Google halaman apa saja yang ada di website, jadi tidak perlu menunggu
  Google menemukannya sendiri lewat penelusuran tautan.

  Nilai priority bukan janji peringkat, cuma penanda halaman mana yang
  paling penting menurut kita. Halaman depan dan menu diberi nilai tertinggi
  karena itu yang paling sering dicari orang saat mencari tempat makan.

  Kalau nanti ada halaman baru, tambahkan di daftar DAFTAR_HALAMAN di bawah.
*/

type Halaman = {
  jalur: string;
  prioritas: number;
  frekuensi: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const DAFTAR_HALAMAN: Halaman[] = [
  { jalur: "", prioritas: 1, frekuensi: "weekly" },
  { jalur: "/menu", prioritas: 0.9, frekuensi: "weekly" },
  { jalur: "/facilities", prioritas: 0.8, frekuensi: "monthly" },
  { jalur: "/gallery", prioritas: 0.7, frekuensi: "weekly" },
  { jalur: "/about", prioritas: 0.6, frekuensi: "yearly" },
  { jalur: "/contact", prioritas: 0.8, frekuensi: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const waktuSekarang = new Date();

  return DAFTAR_HALAMAN.map((halaman) => ({
    url: `${SITE_URL}${halaman.jalur}`,
    lastModified: waktuSekarang,
    changeFrequency: halaman.frekuensi,
    priority: halaman.prioritas,
  }));
}
