// Data terpusat halaman Events & Gallery (PRD Step 6).
// Sumber konten: PDF Company Profile halaman "Event", "Meeting & Gathering",
// "Visit From Bapak Walikota Batu", dan "Testimonial".
//
// Kalau ada dokumentasi event baru, cukup tambah satu objek di array EVENTS
// dan daftarkan foto barunya di scripts/asset-manifest.json. Komponen React
// tidak perlu disentuh sama sekali.

export type EventItem = {
  id: string;
  /** Label kecil di atas judul, dipakai untuk mengelompokkan jenis acara. */
  kategori: string;
  title: string;
  partner: string;
  description: string;
  highlights: string[];
  images: { src: string; alt: string }[];
};

export const EVENTS: EventItem[] = [
  {
    id: "beauty-class-wardah",
    kategori: "Kolaborasi Brand",
    title: "Beauty Class Wardah",
    partner: "Wardah Cosmetics x WJS Joko Sambang Café",
    description:
      "Kolaborasi bersama Wardah Cosmetics yang menggabungkan edukasi kecantikan dengan momen kebersamaan. Acaranya jadi wadah inspiratif bagi para peserta untuk belajar, bersantai, dan menikmati suasana hangat khas Joko Sambang Café.",
    highlights: [
      "Kelas edukasi kecantikan",
      "Ruang ber-AC dengan cahaya alami",
      "Paket konsumsi menyesuaikan acara",
    ],
    images: [
      {
        src: "/images/events/event-beauty-class-1.jpeg",
        alt: "Sesi make up bersama pada Beauty Class Wardah di WJS Joko Sambang Café",
      },
      {
        src: "/images/events/event-beauty-class-2.jpeg",
        alt: "Suasana peserta Beauty Class Wardah di meja panjang",
      },
    ],
  },
  {
    id: "gathering-pemuda-pemudi",
    kategori: "Meeting & Gathering",
    title: "Gathering Pemuda Pemudi",
    partner: "Pemuda Pemudi x WJS Joko Sambang Café",
    description:
      "Ajang silaturahmi dan diskusi positif bagi generasi muda. Lewat kolaborasi ini kami ikut mendukung ruang interaksi yang produktif, penuh semangat kebersamaan, dan menginspirasi. Acara seperti ini yang membuat kami bukan sekadar tempat makan, tapi juga ruang tumbuhnya nilai sosial di tengah masyarakat.",
    highlights: [
      "Meja kayu panjang untuk diskusi",
      "Suasana santai tapi tetap fokus",
      "Cocok untuk komunitas dan organisasi",
    ],
    images: [
      {
        src: "/images/events/event-pemuda-pemudi-1.jpeg",
        alt: "Diskusi santai Pemuda Pemudi di meja kayu WJS Joko Sambang Café",
      },
    ],
  },
  {
    id: "kunjungan-walikota",
    kategori: "Kunjungan Kehormatan",
    title: "Kunjungan Bapak Wali Kota Batu",
    partner: "Momen Grand Opening",
    description:
      "WJS Joko Sambang Café mendapat kehormatan atas kunjungan Bapak Wali Kota Batu saat Grand Opening. Kunjungan ini menjadi bentuk apresiasi dan dukungan terhadap upaya kami menghadirkan tempat kuliner sekaligus ruang kreatif yang berkontribusi bagi masyarakat Batu dan sekitarnya.",
    highlights: [
      "Momen Grand Opening",
      "Dukungan bagi ruang kreatif lokal",
    ],
    images: [
      {
        src: "/images/events/gbr 4.jpeg",
        alt: "Kunjungan Bapak Wali Kota Batu saat Grand Opening",
      },
    ],
  },
];

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  /**
   * Orientasi dipakai untuk menentukan tinggi kartu di layout masonry,
   * supaya susunannya tidak seragam dan lebih enak dilihat.
   */
  orientation: "portrait" | "landscape";
};

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "gallery-01",
    src: "/images/gallery/gallery-01.jpg",
    alt: "Suasana ruangan dan kegiatan pengunjung",
    caption: "Suasana Ruangan",
    orientation: "portrait",
  },
  {
    id: "gallery-02",
    src: "/images/gallery/gallery-02.jpg",
    alt: "Kegiatan pengunjung di area cafe",
    caption: "Kegiatan Pengunjung",
    orientation: "landscape",
  },
  {
    id: "gallery-03",
    src: "/images/gallery/gallery-03.jpg",
    alt: "Keasrian taman WJS Joko Sambang Café",
    caption: "Keasrian Taman",
    orientation: "portrait",
  },
  {
    id: "gallery-04",
    src: "/images/gallery/gallery-04.jpg",
    alt: "Detail menu di atas meja saji",
    caption: "Detail Meja Saji",
    orientation: "landscape",
  },
  {
    id: "gallery-05",
    src: "/images/gallery/gallery-05.jpg",
    alt: "Kegiatan pengunjung di area indoor",
    caption: "Momen Kebersamaan",
    orientation: "portrait",
  },
  {
    id: "gallery-06",
    src: "/images/gallery/gallery-06.jpg",
    alt: "Suasana area outdoor menjelang sore",
    caption: "Outdoor Sore Hari",
    orientation: "landscape",
  },
  {
    id: "gallery-07",
    src: "/images/gallery/gallery-07.jpg",
    alt: "Detail ornamen dan arsitektur khas cafe",
    caption: "Detail Ornamen",
    orientation: "landscape",
  },
  {
    id: "gallery-08",
    src: "/images/gallery/gallery-08.jpg",
    alt: "Sudut taman dan jalan setapak",
    caption: "Sudut Taman",
    orientation: "portrait",
  },
  {
    id: "gallery-09",
    src: "/images/gallery/gallery-09.jpg",
    alt: "Suasana area indoor dari sudut lain",
    caption: "Sudut Lain Indoor",
    orientation: "landscape",
  },
];
