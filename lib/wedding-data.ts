// Data Wedding Package (tambahan di luar PRD awal, atas permintaan pemilik
// project). Sumber konten: dua flyer resmi WJS Joko Sambang Café, yaitu
// "Wedding Package - Venue Facilities" dan "Wedding Foodies Packages".
//
// Seluruh harga, komposisi, dan daftar hidangan di bawah disalin apa adanya
// dari flyer tersebut. Kalau ada perubahan harga atau susunan menu, cukup ubah
// di file ini dan tampilan halaman menyesuaikan otomatis.

import type { FacilityIconName } from "@/lib/facilities-data";

export type WeddingPackage = {
  id: string;
  /** Huruf paket seperti tertera di flyer: A, B, atau C. */
  kode: string;
  name: string;
  price: string;
  unit: string;
  /** Ringkasan komposisi, ditampilkan di sisi depan kartu. */
  komposisi: { jumlah: string; label: string }[];
  /** Rincian hidangan, ditampilkan setelah kartu dibalik. */
  hidangan: string[];
  image: string;
  alt: string;
  /** Paket yang ingin ditonjolkan tampil dengan aksen berbeda. */
  isHighlighted?: boolean;
};

export const WEDDING_PACKAGES: WeddingPackage[] = [
  {
    id: "intimate",
    kode: "A",
    name: "Intimate Wedding",
    price: "Rp 150.000",
    unit: "per pax",
    komposisi: [
      { jumlah: "4", label: "Main Course" },
      { jumlah: "1", label: "Soup" },
      { jumlah: "1", label: "Appetizer" },
      { jumlah: "3", label: "Add On" },
      { jumlah: "2", label: "Beverages" },
    ],
    hidangan: [
      "Nasi putih",
      "Nasgor teri medan",
      "Ayam goreng lengkuas",
      "Ayam cabe garam",
      "Pokcoy garlic",
      "Soto lamongan",
      "Piscok keju",
      "Sambal",
      "Kerupuk",
      "Mineral water",
      "Tea",
    ],
    image: "/images/menu/menu-wedding-a.jpeg",
    alt: "Area outdoor dengan gapura kayu ukir untuk Intimate Wedding Package",
  },
  {
    id: "elegant",
    kode: "B",
    name: "Elegant Wedding",
    price: "Rp 175.000",
    unit: "per pax",
    komposisi: [
      { jumlah: "5", label: "Main Course" },
      { jumlah: "1", label: "Soup" },
      { jumlah: "1", label: "Appetizer" },
      { jumlah: "3", label: "Add On" },
      { jumlah: "2", label: "Beverages" },
    ],
    hidangan: [
      "Nasi putih",
      "Nasgor sambal terasi",
      "Ayam bakar taliwang",
      "Dori asam manis",
      "Mie goreng jawa",
      "Capjay",
      "Rawon",
      "Mini springroll",
      "Sambal",
      "Kerupuk",
      "Infused water / mineral",
      "Tea",
    ],
    image: "/images/menu/menu-wedding-b.jpeg",
    alt: "Saung dan taman hijau untuk Elegant Wedding Package",
    isHighlighted: true,
  },
  {
    id: "royal",
    kode: "C",
    name: "Royal Wedding",
    price: "Rp 200.000",
    unit: "per pax",
    komposisi: [
      { jumlah: "5", label: "Main Course" },
      { jumlah: "1", label: "Soup" },
      { jumlah: "2", label: "Appetizer" },
      { jumlah: "3", label: "Add On" },
      { jumlah: "3", label: "Beverages" },
    ],
    hidangan: [
      "Nasi putih",
      "Nasgor hongkong",
      "Ayam woku",
      "Beef krengseng",
      "Mie goreng jawa",
      "Sapo tahu",
      "Garang asem",
      "Mini springroll",
      "Piscok keju",
      "Sambal",
      "Kerupuk",
      "Ice manado",
      "Mineral water",
      "Tea",
    ],
    image: "/images/menu/menu-wedding-c.jpeg",
    alt: "Jalan setapak taman bertingkat untuk Royal Wedding Package",
  },
];

export type WeddingFacility = {
  icon: FacilityIconName;
  label: string;
  detail: string;
};

export const WEDDING_FACILITIES: WeddingFacility[] = [
  {
    icon: "users",
    label: "Akses 3 Jam Indoor & Outdoor",
    detail:
      "Indoor: 2 VIP Room dan 1 room area makeup, ganti gaun, atau keluarga inti. Outdoor: saung, area yoga, dan area kolam.",
  },
  {
    icon: "wifi",
    label: "Free WiFi & Colokan Listrik",
    detail: "Tersedia di area indoor maupun outdoor.",
  },
  {
    icon: "car",
    label: "Area Parkir Luas & Gratis",
    detail: "Muat rombongan tamu, tanpa biaya tambahan.",
  },
  {
    icon: "sun",
    label: "Waktu Fleksibel",
    detail: "Bisa dijadwalkan pagi atau sore, menyesuaikan konsep acara.",
  },
  {
    icon: "volume",
    label: "Mic Wireless 2 pcs",
    detail: "Untuk MC, sambutan, dan prosesi acara.",
  },
  {
    icon: "coffee",
    label: "Main Course & Beverage",
    detail: "Sudah termasuk dalam paket, sesuai pilihan tier.",
  },
  {
    icon: "landmark",
    label: "Mushola & Toilet Bersih",
    detail: "Fasilitas ibadah dan toilet terawat untuk tamu.",
  },
  {
    icon: "party",
    label: "Keamanan Area Luar",
    detail: "Petugas berjaga selama acara berlangsung.",
  },
];

/** Syarat yang tertera di flyer, wajib ditampilkan supaya tidak menyesatkan. */
export const WEDDING_TERMS = [
  "Minimum pemesanan 200 pax",
  "Harga belum termasuk PPN",
  "Konsultasi awal gratis, tanpa biaya",
];
