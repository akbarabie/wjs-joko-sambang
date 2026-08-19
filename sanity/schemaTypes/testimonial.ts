import { defineField, defineType } from "sanity";

/*
  Ulasan pengunjung yang tampil di halaman depan dan halaman Gallery.
  Sumber awal: lib/testimonials-data.ts (TESTIMONIALS).
*/
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimoni Pengunjung",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama Pengulas",
      type: "string",
      description: "Tulis sesuai nama yang tertera pada ulasan aslinya.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Kode Testimoni",
      type: "slug",
      options: { source: "name", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "meta",
      title: "Sumber Ulasan",
      type: "string",
      description:
        "Keterangan asal ulasan. Contoh: Google Maps Review, atau Local Guide - Google Maps",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Isi Ulasan",
      type: "text",
      rows: 5,
      description:
        "Boleh dirapikan ejaannya supaya enak dibaca, tapi jangan diubah maksudnya.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Jumlah Bintang",
      type: "number",
      description: "Isi angka 1 sampai 5.",
      initialValue: 5,
      validation: (rule) => rule.required().integer().min(1).max(5),
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
    select: { title: "name", subtitle: "meta" },
  },
});
