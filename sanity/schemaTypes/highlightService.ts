import { defineField, defineType } from "sanity";

/*
  Layanan unggulan yang tampil dengan foto besar di halaman Fasilitas,
  misalnya Live Music dan Musholla.
  Sumber awal: lib/facilities-data.ts (HIGHLIGHT_SERVICES).
*/
export const highlightService = defineType({
  name: "highlightService",
  title: "Layanan Unggulan",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama Layanan",
      type: "string",
      description: "Contoh: Live Music, Musholla",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Kode Layanan",
      type: "slug",
      options: { source: "name", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Penjelasan",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Foto",
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
    select: { title: "name", media: "image" },
  },
});
