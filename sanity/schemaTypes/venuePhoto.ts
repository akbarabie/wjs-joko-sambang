import { defineField, defineType } from "sanity";

/*
  Foto venue yang tampil sebagai galeri coverflow 3D di halaman Fasilitas.
  Sumber awal: lib/facilities-data.ts (VENUE_PHOTOS).
*/
export const venuePhoto = defineType({
  name: "venuePhoto",
  title: "Foto Venue",
  type: "document",
  fields: [
    defineField({
      name: "caption",
      title: "Judul Foto",
      type: "string",
      description: "Contoh: Lounge Joglo, Gapura Ukir Jawa",
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
    select: { title: "caption", media: "image" },
  },
});
