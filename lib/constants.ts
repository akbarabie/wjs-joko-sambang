// File ini adalah satu-satunya sumber data brand & kontak untuk seluruh website.
// Tujuannya supaya nomor WA, alamat, dan link sosial media tidak tertulis
// berulang kali di banyak komponen (hardcode). Kalau ada perubahan data,
// cukup ubah di sini saja, seluruh halaman ikut ter-update otomatis.

export const BRAND = {
  name: "WJS Joko Sambang Café",
  shortName: "Joko Sambang",
  tagline: "Perpaduan Tradisi Jawa & Modernitas di Sejuknya Kota Batu",
  philosophy:
    'Nama "Joko Sambang" terinspirasi dari kebersamaan & keramahan khas Jawa. "Sambang" dalam bahasa Jawa berarti berkunjung, melambangkan tempat hangat bagi siapa saja untuk datang, bersantai, berdiskusi, dan melepas penat.',
} as const;

export const CONTACT = {
  address: {
    full: "Jl. Trunojoyo Dsn. Rejoso, RT.03/RW.10, Junrejo, Kec. Junrejo, Kota Batu, Jawa Timur 65321",
    short: "Junrejo, Kota Batu, Jawa Timur",
  },
  // Nomor WA disimpan dalam format internasional (tanpa tanda + atau spasi)
  // supaya siap dipakai langsung sebagai link wa.me
  whatsapp: {
    display: "0853-8527-5390",
    international: "6285385275390",
  },
  socials: {
    tiktok: { handle: "@jokosambang", url: "https://www.tiktok.com/@jokosambang" },
    instagram: { handle: "@wjs_jokosambang", url: "https://www.instagram.com/wjs_jokosambang" },
  },
  operationalHours: [{ day: "Setiap Hari", hours: "08.00 - 22.00" }],
  // Ganti PLACE_ID di bawah dengan Place ID asli dari Google Maps setelah lokasi terverifikasi pemilik.
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=WJS+Joko+Sambang+Cafe+Junrejo+Kota+Batu",
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=Jl.+Trunojoyo+Dsn.+Rejoso+Junrejo+Kota+Batu&output=embed",
} as const;

// Generator link WhatsApp dengan pesan yang sudah diformat.
// Dipakai oleh CTA di Navbar, Footer, dan form reservasi di halaman Contact.
export function buildWhatsAppLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${CONTACT.whatsapp.international}?text=${encodedMessage}`;
}

export const DEFAULT_RESERVATION_MESSAGE =
  "Halo WJS Joko Sambang Café, saya ingin melakukan reservasi tempat.";

// Struktur navigasi utama mengikuti site map di PRD section 3.
// Sub-item diarahkan sebagai anchor link (#id) di dalam halaman terkait,
// bukan route terpisah, supaya navigasi tetap ringkas dan tidak berlebihan.
export type NavSubItem = { label: string; href: string };
export type NavItem = { label: string; href: string; subItems?: NavSubItem[] };

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    subItems: [
      { label: "Profil & Filosofi", href: "/about#profil" },
      { label: "Visi & Misi", href: "/about#visi-misi" },
    ],
  },
  {
    label: "Menu & Culinary",
    href: "/menu",
    subItems: [
      { label: "Best Seller", href: "/menu#best-seller" },
      { label: "Kategori Menu", href: "/menu#kategori" },
      { label: "Paket Event & Grup", href: "/menu#paket" },
      { label: "Wedding Package", href: "/menu#wedding" },
    ],
  },
  {
    label: "Facilities & Spaces",
    href: "/facilities",
    subItems: [
      { label: "Public Area", href: "/facilities#public-area" },
      { label: "VIP & Event Space", href: "/facilities#vip-event" },
    ],
  },
  {
    label: "Events & Gallery",
    href: "/gallery",
    subItems: [
      { label: "Dokumentasi Event", href: "/gallery#event" },
      { label: "Galeri Foto", href: "/gallery#galeri" },
      { label: "Testimoni", href: "/gallery#testimoni" },
    ],
  },
  { label: "Contact & Location", href: "/contact" },
];
