import { defineField, defineType } from "sanity";

/*
  Popup promo yang muncul di halaman depan.
  Sumber awal: lib/promo-data.ts (PROMO_POPUP).

  Dokumen ini dipakai tunggal, artinya cukup ada satu saja. Pengaturannya
  di sanity/structure.ts sudah membuat menu ini langsung membuka satu
  dokumen, jadi admin tidak bisa membuat promo ganda tanpa sengaja.
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
        "Matikan kalau promo sedang tidak berjalan. Popup langsung berhenti muncul tanpa perlu menghapus isinya.",
      initialValue: true,
    }),
    defineField({
      name: "kodePromo",
      title: "Kode Promo",
      type: "string",
      description:
        "PENTING: ganti kode ini setiap kali ganti promo, contoh dari wedding-package-2026 jadi promo-natal-2026. Pengunjung yang sudah pernah menutup popup lama akan melihat popup baru. Kalau kodenya tidak diganti, popup baru tidak akan muncul untuk mereka.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "badge",
      title: "Label Kecil",
      type: "string",
      description: "Tulisan kecil di pojok popup. Contoh: Promo Baru",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Judul Promo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Penjelasan Singkat",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Gambar Promo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Keterangan Gambar",
          type: "string",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "poin",
      title: "Poin Isi Promo",
      type: "array",
      of: [{ type: "string" }],
      description: "Daftar singkat isi promo. Cukup dua sampai empat poin.",
    }),
    defineField({
      name: "ctaLabel",
      title: "Tulisan Tombol",
      type: "string",
      description: "Contoh: Lihat Paket Selengkapnya",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaHref",
      title: "Tujuan Tombol",
      type: "string",
      description:
        "Alamat tujuan saat tombol diklik. Untuk halaman di website ini tulis dengan garis miring di depan, contoh: /menu#wedding",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "catatan",
      title: "Catatan Kecil",
      type: "string",
      description:
        "Tulisan kecil di bagian bawah popup. Contoh: Minimum pemesanan 200 pax.",
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
      name: "jedaTampilJam",
      title: "Jeda Muncul Lagi (jam)",
      type: "number",
      description:
        "Setelah pengunjung menutup popup, berapa jam sebelum popup boleh muncul lagi untuk orang yang sama. Isi 24 berarti sehari sekali.",
      initialValue: 24,
      validation: (rule) => rule.required().min(0),
    }),
  ],
  preview: {
    select: { title: "title", aktif: "aktif", media: "image" },
    prepare({ title, aktif, media }) {
      return {
        title: title || "Popup Promo",
        subtitle: aktif ? "Sedang tampil di website" : "Sedang dimatikan",
        media,
      };
    },
  },
});
