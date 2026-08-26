// Data menu terpusat. Dipakai oleh Best Seller preview di Home Page (Step 2)
// dan nanti akan diperluas untuk halaman Menu & Culinary lengkap (Step 4),
// supaya nama, deskripsi, dan path gambar menu hanya ditulis satu kali.
// Sumber konten: PDF Company Profile halaman "Best Seller Menu".

export type MenuCategory = "food" | "drink";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: MenuCategory;
  isBestSeller: boolean;
};

export const BEST_SELLER_MENU: MenuItem[] = [
  {
    id: "nasi-goreng-rawon",
    name: "Nasi Goreng Rawon",
    description: "Nasi goreng bumbu rawon dengan beef saikoro, acar, dan kerupuk.",
    image: "/images/menu/menu-nasi-goreng-rawon.jpeg",
    category: "food",
    isBestSeller: true,
  },
  {
    id: "beef-krengseng-daun-jeruk",
    name: "Beef Krengseng Daun Jeruk",
    description:
      "Beef saikoro krengseng dengan nasi daun jeruk, krispi kentang, dan kangkung krispi.",
    image: "/images/menu/menu-beef-krengseng.jpeg",
    category: "food",
    isBestSeller: true,
  },
  {
    id: "ayam-bakar-taliwang",
    name: "Ayam Bakar Taliwang",
    description: "Nasi ayam bakar taliwang dengan sambal plencing dan lalapan.",
    image: "/images/menu/menu-ayam-bakar-taliwang.jpeg",
    category: "food",
    isBestSeller: true,
  },
  {
    id: "vit-joko-sambang",
    name: "Vit Joko Sambang",
    description: "Carrot, orange juice, ginger, disajikan dingin dengan ice cube.",
    image: "/images/menu/menu-vit-joko-sambang.jpeg",
    category: "drink",
    isBestSeller: true,
  },
  {
    id: "antioxidant",
    name: "Antioxidant",
    description: "Klorofil kangkung, coconut water, dan pineapple juice.",
    image: "/images/menu/menu-antioxidant.jpeg",
    category: "drink",
    isBestSeller: true,
  },
  {
    id: "jamu-gula-asem",
    name: "Jamu Gula Asem",
    description: "Racikan beras kencur, temulawak, dan kunir asem.",
    image: "/images/menu/menu-jamu-gula-asem.jpeg",
    category: "drink",
    isBestSeller: true,
  },
];

// ---------------------------------------------------------------------------
// Kategori Menu (PRD Step 4)
// Sumber: PDF Company Profile halaman "Our Menu" yang menampilkan tujuh
// kategori. PDF tidak memuat daftar item per kategori beserta harganya, jadi
// deskripsi di bawah ditulis dari kategori yang tertera saja.
//
// CATATAN: nama hidangan yang disebut pada properti "contoh" hanya diambil
// dari sumber yang bisa diverifikasi, yaitu halaman Best Seller di PDF dan
// ulasan asli pengunjung di Google Maps (soup iga dan dori bakar). Kalau
// pemilik cafe sudah mengirim daftar menu lengkap beserta harganya, tambahkan
// di sini dan tampilan halaman akan otomatis menyesuaikan.
// ---------------------------------------------------------------------------

export type MenuCategoryItem = {
  id: string;
  name: string;
  /** Dipakai sebagai label singkat di atas nama kategori. */
  kelompok: "Makanan" | "Minuman";
  description: string;
  image: string;
  alt: string;
  contoh: string[];
};

export const MENU_CATEGORIES: MenuCategoryItem[] = [
  {
    id: "main-course",
    name: "Main Course",
    kelompok: "Makanan",
    description:
      "Hidangan utama bercita rasa nusantara dengan penyajian modern. Bagian menu yang paling banyak dipesan tamu saat makan siang maupun makan malam.",
    image: "/images/menu/menu-cat-main-course.jpeg",
    alt: "Hidangan main course di WJS Joko Sambang Café",
    contoh: ["Nasi Goreng Rawon", "Beef Krengseng Daun Jeruk", "Ayam Bakar Taliwang"],
  },
  {
    id: "soup",
    name: "Soup",
    kelompok: "Makanan",
    description:
      "Kuah hangat yang pas dinikmati saat udara Kota Batu sedang dingin atau mendung. Salah satu yang sering disebut pengunjung di ulasan mereka.",
    image: "/images/menu/menu-cat-soup.jpeg",
    alt: "Semangkuk sup hangat dengan potongan daging dan sayuran",
    contoh: ["Soup Iga"],
  },
  {
    id: "appetizer",
    name: "Appetizer",
    kelompok: "Makanan",
    description:
      "Camilan pembuka untuk menemani obrolan sambil menunggu hidangan utama. Cocok dipesan beramai-ramai untuk dibagi satu meja.",
    image: "/images/menu/menu-cat-appetizer.jpeg",
    alt: "Sajian appetizer dengan kentang goreng dan saus",
    contoh: [],
  },
  {
    id: "flavour-latte",
    name: "Flavour Latte",
    kelompok: "Minuman",
    description:
      "Latte dengan beragam pilihan rasa, disajikan berlapis sehingga menarik dilihat sebelum diaduk. Pilihan aman untuk yang kurang suka kopi pekat.",
    image: "/images/menu/menu-cat-flavour-latte.jpeg",
    alt: "Segelas flavour latte berlapis dengan es",
    contoh: [],
  },
  {
    id: "coffee",
    name: "Coffee",
    kelompok: "Minuman",
    description:
      "Racikan kopi untuk yang ingin menikmati rasa aslinya. Enak diminum sambil duduk di area outdoor menghadap kebun.",
    image: "/images/menu/menu-cat-coffee.jpeg",
    alt: "Segelas kopi susu dengan taburan bubuk di atasnya",
    contoh: [],
  },
  {
    id: "mocktail",
    name: "Mocktail",
    kelompok: "Minuman",
    description:
      "Minuman segar tanpa alkohol dengan gradasi warna yang menarik. Banyak dipesan untuk difoto sebelum diminum.",
    image: "/images/menu/menu-cat-mocktail.jpeg",
    alt: "Mocktail berlapis warna biru dan ungu",
    contoh: [],
  },
  {
    id: "signature",
    name: "Signature",
    kelompok: "Minuman",
    description:
      "Racikan khas yang hanya ada di WJS Joko Sambang Café, termasuk pilihan jamu tradisional yang dikemas ulang dengan cara modern.",
    image: "/images/menu/menu-cat-signature.jpeg",
    alt: "Minuman signature berlapis dengan es batu",
    contoh: ["Vit Joko Sambang", "Antioxidant", "Jamu Gula Asem"],
  },
];

// ---------------------------------------------------------------------------
// Paket Menu (PRD Step 4)
// Kisaran harga diambil apa adanya dari PDF Company Profile halaman
// "Menu Package". Kalau harganya berubah, cukup ubah di sini.
// ---------------------------------------------------------------------------

export type MenuPackage = {
  id: string;
  name: string;
  priceRange: string;
  unit: string;
  description: string;
  image: string;
  alt: string;
  features: string[];
  /** Paket yang ingin ditonjolkan tampil dengan aksen berbeda. */
  isHighlighted?: boolean;
  /** Link brosur/detail khusus paket ini, beda-beda tiap paket. */
  detailHref: string;
};

export const MENU_PACKAGES: MenuPackage[] = [
  {
    id: "buffet",
    name: "Package Buffet",
    priceRange: "Rp 50.000 - Rp 120.000",
    unit: "per pax",
    description:
      "Sajian prasmanan untuk acara berkelompok. Susunan menunya bisa disesuaikan dengan jumlah tamu dan jenis acaranya.",
    image: "/images/menu/menu-package-buffet.jpeg",
    alt: "Meja prasmanan dengan beberapa wadah pemanas makanan",
    features: ["Cocok untuk acara besar", "Susunan menu fleksibel", "Bisa digabung sewa event space"],
    isHighlighted: true,
    detailHref: "/contact",
  },
  {
    id: "meal-box",
    name: "Meal Box / Lunch Box",
    priceRange: "Rp 25.000 - Rp 65.000",
    unit: "per box",
    description:
      "Nasi kotak untuk rapat, pelatihan, atau acara yang butuh porsi terbagi rapi. Praktis dibawa dan mudah dihitung jumlahnya.",
    image: "/images/menu/menu-package-mealbox.jpeg",
    alt: "Meal box berisi nasi, lauk, dan sayuran",
    features: ["Praktis untuk rapat", "Porsi per orang", "Bisa diantar sesuai kesepakatan"],
    detailHref: "/contact",
  },
  {
    id: "ala-carte",
    name: "Menu Regular / Ala Carte",
    priceRange: "Rp 23.000 - Rp 65.000",
    unit: "per porsi",
    description:
      "Pesan satuan sesuai selera masing-masing. Pilihan biasa untuk kunjungan harian, baik sendiri, berdua, maupun bersama keluarga.",
    image: "/images/menu/menu-package-alacarte.jpeg",
    alt: "Beberapa piring hidangan tersaji di atas meja",
    features: ["Pesan satuan", "Tanpa minimum jumlah", "Tersedia setiap hari"],
    detailHref: "/contact",
  },
];
