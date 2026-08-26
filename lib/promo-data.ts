// Tipe data untuk popup promo di halaman Home.
//
// Sejak popup ini dikelola penuh lewat Sanity (lihat sanity/schemaTypes
// /promoPopup.ts dan promoSlide.ts), file ini tinggal menyimpan bentuk
// datanya saja. Isi sebenarnya selalu datang dari Studio, jadi tidak ada
// lagi data contoh yang tertinggal dan bisa membingungkan mana yang
// dipakai beneran.
//
// Satu popup sekarang bisa berisi lebih dari satu kartu promo (PromoSlide)
// yang tampil bergantian. Gambar, judul, keterangan, poin, dan tombol
// dalam satu PromoSlide selalu berasal dari kartu yang sama di Studio,
// jadi tidak mungkin tertukar antara promo satu dengan yang lain.

export type PromoChipHarga = {
  kode: string;
  harga: string;
};

export type PromoSlide = {
  /** Dipakai sebagai bagian dari kunci penyimpanan di browser. */
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  /** Poin singkat yang ditampilkan di bawah judul. */
  poin: string[];
  /** Kotak rincian harga, opsional. Kosong kalau promonya tidak
   *  menampilkan beberapa pilihan harga. */
  chipHarga: PromoChipHarga[];
  ctaLabel: string;
  ctaHref: string;
  /** Catatan kecil di bagian bawah kartu. */
  catatan: string;
};

/** Pilihan aturan kapan popup boleh muncul lagi untuk pengunjung yang sama. */
export type ModeMunculUlang = "jeda" | "setiapKunjungan";

export type PromoPopupData = {
  /** Saklar utama seluruh popup. Kalau false, popup tidak akan pernah
   *  muncul, walaupun daftarPromo masih terisi. */
  aktif: boolean;
  /** Kartu promo yang sudah difilter, hanya yang aktif dari Sanity. */
  daftarPromo: PromoSlide[];
  /** Jeda sebelum popup muncul, dalam milidetik. Diberi jeda supaya
   *  animasi hero di halaman depan sempat berjalan lebih dulu. */
  delayMs: number;
  /** "jeda" berarti popup ikut aturan jedaTampilMs di bawah.
   *  "setiapKunjungan" berarti popup selalu muncul lagi tiap kali
   *  pengunjung membuka halaman Home, jedaTampilMs diabaikan. */
  modeMunculUlang: ModeMunculUlang;
  /** Gabungan jam dan menit dari Sanity, sudah dikonversi jadi
   *  milidetik. Cuma dipakai kalau modeMunculUlang bernilai "jeda". */
  jedaTampilMs: number;
  /** Jeda pindah otomatis antar kartu promo, dalam milidetik. Cuma
   *  berpengaruh kalau daftarPromo isinya lebih dari satu. */
  jedaGeserMs: number;
};
