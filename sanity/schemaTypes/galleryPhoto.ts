import { defineField, defineType } from "sanity";

/*
  Foto yang tampil di galeri halaman Gallery dengan susunan masonry.
  Sumber awal: lib/events-data.ts (GALLERY_PHOTOS).
*/
export const galleryPhoto = defineType({
  name: "galleryPhoto",
  title: "Foto Galeri",
  type: "document",
  fields: [
    defineField({
      name: "caption",
      title: "Judul Foto",
      type: "string",
      description:
        "Tulisan yang muncul di bawah foto. Contoh: Suasana Ruangan",
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
          description:
            "Penjelasan isi foto untuk pembaca layar dan mesin pencari.",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "orientation",
      title: "Bentuk Foto",
      type: "string",
      description:
        "Menentukan tinggi kartu di galeri. Pilih sesuai bentuk asli fotonya supaya susunan galeri tetap enak dilihat.",
      options: {
        list: [
          { title: "Berdiri (potrait)", value: "portrait" },
          { title: "Mendatar (landscape)", value: "landscape" },
        ],
        layout: "radio",
      },
      initialValue: "landscape",
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
    select: { title: "caption", subtitle: "orientation", media: "image" },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle === "portrait" ? "Berdiri" : "Mendatar",
        media,
      };
    },
  },
});
