import { defineField, defineType } from "sanity";

/*
  Popup promo yang muncul di halaman depan.

  Dokumen ini dipakai tunggal, artinya cukup ada satu saja. Pengaturannya
  di sanity/structure.ts sudah membuat menu ini langsung membuka satu
  dokumen, jadi admin tidak bisa membuat popup ganda tanpa sengaja.

  Sejak popup bisa menampilkan lebih dari satu promo sekaligus (misal
  promo Wedding dan promo Kemerdekaan tampil bergantian), field-field
  yang dulu ada langsung di sini (badge, title, gambar, dan seterusnya)
  dipindah ke dalam array "daftarPromo". Tiap butir di array itu adalah
  satu kartu promo utuh lewat object type promoSlide, jadi gambar,
  judul, keterangan, dan tombolnya selalu satu paket dan tidak bisa
  tertukar antar promo.

  Field yang tersisa di level dokumen ini ("aktif", "delayMs",
  "modeMunculUlang", "jedaTampilJam", "jedaTampilMenit", "jedaGeserDetik")
  memang berlaku untuk popup secara keseluruhan, bukan untuk satu promo
  saja.

  Soal "modeMunculUlang": admin bisa pilih popup mengikuti jeda waktu
  (kombinasi jam dan menit sejak terakhir ditutup), atau selalu tampil
  lagi setiap pengunjung kembali ke halaman Home tanpa peduli jeda waktu
  sama sekali.
*/
export const promoPopup = defineType({
  name: "promoPopup",
  title: "Popup Promo",
  type: "document",
  fields: [
    defineField({
      name: "aktif",
      title: "Tampilkan Popup",
      type: "boolean",
      description:
        "Saklar utama seluruh popup. Matikan kalau semua promo sedang tidak berjalan. Untuk mematikan satu promo saja tanpa mematikan yang lain, pakai saklar 'Tampilkan Kartu Ini' di masing-masing kartu promo di bawah.",
      initialValue: true,
    }),
    defineField({
      name: "daftarPromo",
      title: "Daftar Promo",
      type: "array",
      description:
        "Isi satu atau lebih kartu promo. Kalau lebih dari satu, kartu-kartu ini akan tampil bergantian di dalam popup yang sama. Urutan tampil mengikuti urutan kartu di sini, seret kartu untuk mengubah urutan.",
      of: [{ type: "promoSlide" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "jedaGeserDetik",
      title: "Jeda Ganti Promo (detik)",
      type: "number",
      description:
        "Kalau daftar promo berisi lebih dari satu kartu, ini jeda waktu sebelum otomatis pindah ke kartu berikutnya. Tidak berpengaruh kalau hanya ada satu kartu promo.",
      initialValue: 5,
      validation: (rule) => rule.required().min(3).max(30),
    }),
    defineField({
      name: "delayMs",
      title: "Jeda Sebelum Muncul (milidetik)",
      type: "number",
      description:
        "1000 sama dengan 1 detik. Diberi jeda supaya animasi halaman depan sempat berjalan lebih dulu. Nilai wajar 1000 sampai 2000.",
      initialValue: 1400,
      validation: (rule) => rule.required().min(0).max(10000),
    }),
    defineField({
      name: "modeMunculUlang",
      title: "Aturan Muncul Ulang",
      type: "string",
      description:
        "Tentukan kapan popup boleh muncul lagi untuk pengunjung yang sama setelah mereka menutupnya.",
      options: {
        list: [
          { title: "Jeda waktu tertentu (jam & menit)", value: "jeda" },
          { title: "Setiap kunjungan ke Home", value: "setiapKunjungan" },
        ],
        layout: "radio",
      },
      initialValue: "jeda",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jedaTampilJam",
      title: "Jeda Muncul Lagi - Jam",
      type: "number",
      description:
        "Bagian jam dari jeda muncul ulang. Contoh isi 1 untuk 1 jam. Cuma dipakai kalau Aturan Muncul Ulang di atas dipilih 'Jeda waktu tertentu'.",
      initialValue: 24,
      hidden: ({ parent }) =>
        (parent as { modeMunculUlang?: string } | undefined)
          ?.modeMunculUlang !== "jeda",
      validation: (rule) => rule.min(0).max(999),
    }),
    defineField({
      name: "jedaTampilMenit",
      title: "Jeda Muncul Lagi - Menit",
      type: "number",
      description:
        "Bagian menit dari jeda muncul ulang, isi 0 sampai 59. Contoh: Jam diisi 0 dan Menit diisi 30 berarti popup boleh muncul lagi setelah setengah jam.",
      initialValue: 0,
      hidden: ({ parent }) =>
        (parent as { modeMunculUlang?: string } | undefined)
          ?.modeMunculUlang !== "jeda",
      validation: (rule) => rule.min(0).max(59),
    }),
  ],
  preview: {
    select: { aktif: "aktif", daftarPromo: "daftarPromo" },
    prepare({ aktif, daftarPromo }) {
      const jumlah = Array.isArray(daftarPromo) ? daftarPromo.length : 0;
      return {
        title: "Popup Promo",
        subtitle: aktif
          ? `Sedang tampil, ${jumlah} kartu promo`
          : "Sedang dimatikan",
      };
    },
  },
});
