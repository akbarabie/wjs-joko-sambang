// Data promo yang tampil sebagai popup di halaman Home.
//
// Struktur file ini sengaja dibuat menyerupai satu baris record di database,
// supaya nanti saat integrasi Headless CMS (Sanity, Strapi, atau Supabase)
// bagian ini tinggal diganti pemanggilan API tanpa mengubah komponen
// tampilannya. Selama masih frontend, admin cukup mengubah nilai di sini.
//
// Cara menonaktifkan promo: ubah "aktif" jadi false. Popup langsung berhenti
// muncul tanpa perlu menghapus kode apa pun.

export type PromoPopupData = {
  /** Saklar utama. Kalau false, popup tidak akan pernah muncul. */
  aktif: boolean;
  /** Dipakai sebagai kunci penyimpanan di browser. Ganti nilainya kalau
   *  promonya berganti, supaya popup baru muncul lagi untuk semua pengunjung
   *  yang sudah pernah menutup promo sebelumnya. */
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  /** Poin singkat yang ditampilkan di bawah judul. */
  poin: string[];
  ctaLabel: string;
  ctaHref: string;
  /** Catatan kecil di bagian bawah popup. */
  catatan: string;
  /** Jeda sebelum popup muncul, dalam milidetik. Diberi jeda supaya animasi
   *  hero di halaman depan sempat berjalan lebih dulu. */
  delayMs: number;
  /** Berapa lama popup tidak muncul lagi setelah ditutup, dalam jam. */
  jedaTampilJam: number;
};

export const PROMO_POPUP: PromoPopupData = {
  aktif: true,
  id: "wedding-package-2026",
  badge: "Promo Baru",
  title: "Wedding Package",
  subtitle:
    "Rayakan hari bahagia di tengah kebun dan udara sejuk Kota Batu. Tiga pilihan paket dengan venue indoor dan outdoor.",
  image: "/images/promo/promo-wedding.jpg",
  alt: "Flyer Wedding Package WJS Joko Sambang Café",
  poin: [
    "Akses 3 jam area indoor & outdoor",
    "2 VIP Room, area makeup & ganti gaun",
    "Free WiFi, parkir luas, dan mic wireless",
  ],
  ctaLabel: "Lihat Paket Selengkapnya",
  ctaHref: "/menu#wedding",
  catatan: "Minimum pemesanan 200 pax. Harga belum termasuk PPN.",
  delayMs: 1400,
  jedaTampilJam: 24,
};
