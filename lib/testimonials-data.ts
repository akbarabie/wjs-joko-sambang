// Sumber: review Google Maps asli yang didokumentasikan di halaman
// "Testimonial" pada PDF Company Profile (screenshot 4 review, dua di
// antaranya kurang terbaca jelas karena sudut foto miring). Teks di bawah
// diparafrase dari isi review asli (ejaan disingkat/typo dirapikan) supaya
// enak dibaca di website, bukan hasil karangan baru.
//
// CATATAN: nama reviewer ketiga ("Reviewer Batu") hasil baca OCR dari
// screenshot yang agak buram, belum bisa dipastikan 100% ejaannya.
// Tolong konfirmasi nama aslinya lewat Google Maps listing cafe sebelum
// halaman Gallery & Testimoni (Step 6) difinalisasi.

export type Testimonial = {
  id: string;
  name: string;
  meta: string;
  quote: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "bambang-sri",
    name: "Bambang Sri",
    meta: "Google Maps Review",
    quote:
      "Sempat khawatir cafenya penuh karena dipakai acara rapat kerja, ternyata pelayanannya tetap oke untuk acara formal maupun santai. Suasananya asri dan sejuk, berasa di Ubud Bali. Pasti kembali lagi.",
    rating: 5,
  },
  {
    id: "na-rofa",
    name: "Na Rofa",
    meta: "Local Guide - Google Maps",
    quote:
      "Hidden gem baru di Batu. Suasananya adem dan asri, bikin betah berlama-lama sambil foto-foto. Soup iga aromatiknya pas banget di cuaca mendung, dori bakarnya juga favorit saya. Mushollanya bersih, wangi, dan langsung menghadap taman. Cocok juga untuk acara keluarga.",
    rating: 5,
  },
  {
    id: "reviewer-batu",
    name: "Reviewer Batu",
    meta: "Google Maps Review",
    quote:
      "Tempat nongkrong paling asik di Kota Batu, viewnya cantik banget. Makanan dan minumannya enak, pelayanannya juga sangat memuaskan.",
    rating: 5,
  },
];
