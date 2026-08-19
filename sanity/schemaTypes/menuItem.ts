import { defineField, defineType } from "sanity";

/*
  Menu unggulan yang tampil di halaman depan dan di bagian atas halaman Menu.
  Sumber awal: lib/menu-data.ts (BEST_SELLER_MENU).
*/
export const menuItem = defineType({
  name: "menuItem",
  title: "Menu Best Seller",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama Menu",
      type: "string",
      description: "Contoh: Nasi Goreng Rawon",
      validation: (rule) => rule.required().error("Nama menu wajib diisi"),
    }),
    defineField({
      name: "slug",
      title: "Kode Menu",
      type: "slug",
      description:
        "Dibuat otomatis dari nama menu. Dipakai sistem sebagai penanda, tidak tampil di website.",
      options: { source: "name", maxLength: 60 },
      validation: (rule) => rule.required().error("Klik Generate untuk membuat kode"),
    }),
    defineField({
      name: "description",
      title: "Deskripsi",
      type: "text",
      rows: 3,
      description: "Penjelasan singkat isi hidangan. Cukup satu sampai dua kalimat.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "image",
      title: "Foto Menu",
      type: "image",
      options: { hotspot: true },
      description:
        "Foto mendatar lebih bagus hasilnya. Setelah unggah, geser titik fokus supaya bagian penting tidak terpotong.",
      fields: [
        defineField({
          name: "alt",
          title: "Keterangan Foto",
          type: "string",
          description:
            "Penjelasan isi foto untuk pembaca layar dan mesin pencari. Contoh: Sepiring nasi goreng rawon dengan kerupuk.",
        }),
      ],
      validation: (rule) => rule.required().error("Foto menu wajib diisi"),
    }),
    defineField({
      name: "category",
      title: "Jenis",
      type: "string",
      options: {
        list: [
          { title: "Makanan", value: "food" },
          { title: "Minuman", value: "drink" },
        ],
        layout: "radio",
      },
      initialValue: "food",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isBestSeller",
      title: "Tandai sebagai Best Seller",
      type: "boolean",
      description:
        "Kalau dinyalakan, menu ini dapat label Best Seller di website.",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Urutan Tampil",
      type: "number",
      description:
        "Angka kecil tampil lebih dulu. Isi 1, 2, 3, dan seterusnya.",
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
    select: { title: "name", subtitle: "category", media: "image" },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle === "food" ? "Makanan" : "Minuman",
        media,
      };
    },
  },
});
