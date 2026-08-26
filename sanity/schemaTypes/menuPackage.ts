import { defineField, defineType } from "sanity";

/*
  Paket harga yang tampil di halaman Menu.
  Sumber awal: lib/menu-data.ts (MENU_PACKAGES).

  Field detailHref sengaja dibuat wajib diisi karena tiap paket memang
  punya brosur/katalog sendiri-sendiri, bukan link yang sama untuk semua
  paket seperti sebelumnya.
*/
export const menuPackage = defineType({
  name: "menuPackage",
  title: "Paket Menu",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama Paket",
      type: "string",
      description: "Contoh: Package Buffet",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Kode Paket",
      type: "slug",
      options: { source: "name", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "priceRange",
      title: "Kisaran Harga",
      type: "string",
      description:
        "Ditulis lengkap apa adanya, contoh: Rp 50.000 - Rp 120.000",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "unit",
      title: "Satuan Harga",
      type: "string",
      description: "Contoh: per pax, per box, per porsi",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Deskripsi",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Foto Paket",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Keterangan Foto",
          type: "string",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "features",
      title: "Poin Keunggulan",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Poin singkat yang ditampilkan sebagai daftar. Contoh: Cocok untuk acara besar.",
      validation: (rule) => rule.min(1).error("Isi minimal satu poin"),
    }),
    defineField({
      name: "isHighlighted",
      title: "Tonjolkan Paket Ini",
      type: "boolean",
      description:
        "Kalau dinyalakan, paket ini tampil dengan aksen berbeda supaya lebih menarik perhatian. Sebaiknya cukup satu paket saja yang dinyalakan.",
      initialValue: false,
    }),
    defineField({
      name: "detailHref",
      title: "Link Brosur / Detail Paket",
      type: "url",
      description:
        "Alamat lengkap halaman brosur atau katalog khusus paket ini, beda-beda untuk tiap paket. Tulis lengkap dengan https:// di depan.",
      validation: (rule) =>
        rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "order",
      title: "Urutan Tampil",
      type: "number",
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: "Urutan Tampil",
      name: "urutanAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "priceRange", media: "image" },
  },
});
