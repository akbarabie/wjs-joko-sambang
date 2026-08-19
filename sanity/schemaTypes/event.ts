import { defineArrayMember, defineField, defineType } from "sanity";

/*
  Dokumentasi acara yang pernah berlangsung di cafe.
  Sumber awal: lib/events-data.ts (EVENTS).
*/
export const event = defineType({
  name: "event",
  title: "Dokumentasi Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nama Acara",
      type: "string",
      description: "Contoh: Beauty Class Wardah",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Kode Acara",
      type: "slug",
      options: { source: "title", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kategori",
      title: "Jenis Acara",
      type: "string",
      description:
        "Label kecil di atas judul. Contoh: Kolaborasi Brand, Meeting & Gathering, Kunjungan Kehormatan.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "partner",
      title: "Pihak Terlibat",
      type: "string",
      description:
        "Contoh: Wardah Cosmetics x WJS Joko Sambang Café. Kalau tidak ada mitra, isi keterangan singkat seperti Momen Grand Opening.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Cerita Acara",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "highlights",
      title: "Poin Penting",
      type: "array",
      of: [{ type: "string" }],
      description: "Poin singkat tentang acara ini. Dua sampai empat poin.",
    }),
    defineField({
      name: "images",
      title: "Foto Dokumentasi",
      type: "array",
      description: "Boleh lebih dari satu foto. Urutannya bisa digeser.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Keterangan Foto",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (rule) => rule.min(1).error("Isi minimal satu foto"),
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
    select: { title: "title", subtitle: "kategori", media: "images.0" },
  },
});
