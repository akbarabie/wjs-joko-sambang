import { defineField, defineType } from "sanity";

/*
  Satu kartu promo di dalam Popup Promo.

  Dipisah jadi object type sendiri (bukan ditulis langsung di dalam
  promoPopup.ts) supaya field-nya bisa dipakai berulang untuk tiap promo
  yang didaftarkan admin di array "daftarPromo". Gambar, judul, keterangan,
  dan tombol dalam satu kartu selalu berhubungan karena memang satu paket
  data yang sama, jadi urutan menampilkannya juga otomatis ikut urutan
  kartu ini di dalam array (tinggal drag di Studio kalau mau diubah).
*/
export const promoSlide = defineType({
  name: "promoSlide",
  title: "Kartu Promo",
  type: "object",
  fields: [
    defineField({
      name: "aktif",
      title: "Tampilkan Kartu Ini",
      type: "boolean",
      description:
        "Matikan untuk menyembunyikan promo ini tanpa perlu menghapusnya. Berguna kalau promo sedang jeda tapi mau dipakai lagi nanti.",
      initialValue: true,
    }),
    defineField({
      name: "kodePromo",
      title: "Kode Promo",
      type: "string",
      description:
        "PENTING: ganti kode ini setiap kali isi promo diganti total, contoh dari wedding-package-2026 jadi promo-kemerdekaan-2026. Pengunjung yang sudah pernah menutup popup akan melihat popup lagi begitu ada kode baru di daftar promo.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "badge",
      title: "Label Kecil",
      type: "string",
      description: "Tulisan kecil di pojok kartu. Contoh: Promo Baru",
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
      description:
        "Pastikan gambar ini memang gambar untuk promo yang sama dengan judul dan keterangan di kartu ini.",
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
      name: "chipHarga",
      title: "Rincian Harga (opsional)",
      type: "array",
      description:
        "Kotak kecil harga yang tampil di bawah poin, contoh Paket A Rp 150.000. Kosongkan saja kalau promonya tidak punya beberapa pilihan harga.",
      of: [
        {
          type: "object",
          name: "chipHargaItem",
          fields: [
            defineField({
              name: "kode",
              title: "Nama Kotak",
              type: "string",
              description: "Contoh: Paket A, atau Diskon 17%",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "harga",
              title: "Harga",
              type: "string",
              description: "Contoh: Rp 150.000",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "kode", subtitle: "harga" },
          },
        },
      ],
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
        "Tulisan kecil di bagian bawah kartu. Contoh: Minimum pemesanan 200 pax.",
    }),
  ],
  preview: {
    select: { title: "title", badge: "badge", aktif: "aktif", media: "image" },
    prepare({ title, badge, aktif, media }) {
      return {
        title: title || "Kartu Promo",
        subtitle: `${badge ? `${badge} - ` : ""}${aktif ? "Tampil" : "Disembunyikan"}`,
        media,
      };
    },
  },
});
