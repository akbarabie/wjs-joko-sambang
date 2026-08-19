import { defineField, defineType } from "sanity";

/*
  Tujuh kategori menu yang tampil sebagai panel melebar di halaman Menu.
  Sumber awal: lib/menu-data.ts (MENU_CATEGORIES).
*/
export const menuCategory = defineType({
  name: "menuCategory",
  title: "Kategori Menu",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama Kategori",
      type: "string",
      description: "Contoh: Main Course, Soup, Coffee",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Kode Kategori",
      type: "slug",
      description: "Dibuat otomatis dari nama kategori.",
      options: { source: "name", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kelompok",
      title: "Kelompok",
      type: "string",
      description: "Label kecil di atas nama kategori.",
      options: {
        list: [
          { title: "Makanan", value: "Makanan" },
          { title: "Minuman", value: "Minuman" },
        ],
        layout: "radio",
      },
      initialValue: "Makanan",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Deskripsi",
      type: "text",
      rows: 4,
      description: "Penjelasan singkat tentang kategori ini.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Foto Kategori",
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
      name: "contoh",
      title: "Contoh Hidangan",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Daftar nama hidangan pada kategori ini. Boleh dikosongkan kalau daftarnya belum siap. Klik Add item untuk menambah satu per satu.",
    }),
    defineField({
      name: "order",
      title: "Urutan Tampil",
      type: "number",
      description: "Angka kecil tampil lebih dulu.",
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
    select: { title: "name", subtitle: "kelompok", media: "image" },
  },
});
