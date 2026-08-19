import { defineField, defineType } from "sanity";

/*
  Fasilitas penunjang yang tampil ringkas berbentuk ikon dan keterangan
  pendek, misalnya Free WiFi, Area Parkir, Musholla, dan Spot Foto.
  Sumber awal: lib/facilities-data.ts (SUPPORT_FACILITIES).

  CATATAN: klaim Free WiFi dan Area Parkir masih perlu dicocokkan dengan
  kondisi sebenarnya di cafe. Kalau tidak sesuai, cukup diubah atau dihapus
  langsung dari sini.
*/
export const supportFacility = defineType({
  name: "supportFacility",
  title: "Fasilitas Penunjang",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Nama Fasilitas",
      type: "string",
      description: "Contoh: Free WiFi, Area Parkir",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Kode Fasilitas",
      type: "slug",
      options: { source: "label", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Ikon",
      type: "string",
      options: {
        list: [
          { title: "WiFi", value: "wifi" },
          { title: "Parkir", value: "car" },
          { title: "Musholla", value: "landmark" },
          { title: "Spot foto", value: "camera" },
          { title: "AC / sejuk", value: "snowflake" },
          { title: "Kursi / sofa", value: "armchair" },
          { title: "Rombongan", value: "users" },
          { title: "Kopi / kuliner", value: "coffee" },
          { title: "Musik", value: "music" },
          { title: "Pepohonan", value: "trees" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "note",
      title: "Keterangan Singkat",
      type: "string",
      description:
        "Satu baris pendek. Contoh: Stabil untuk kerja & meeting online.",
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
    select: { title: "label", subtitle: "note" },
  },
});
