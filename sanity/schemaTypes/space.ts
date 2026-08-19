import { defineArrayMember, defineField, defineType } from "sanity";

/*
  Ruang dan area di cafe: Indoor, Outdoor, VIP Room, dan Event Space.
  Sumber awal: lib/facilities-data.ts (PUBLIC_SPACES dan PRIVATE_SPACES).

  Area umum dan area privat digabung jadi satu jenis konten karena bentuk
  isiannya sama persis. Pembedanya cukup satu pilihan di field Jenis Area,
  jadi admin tidak perlu menghafal dua bentuk isian yang mirip.
*/

// Pilihan ikon kecil yang mendampingi tiap fasilitas. Nilainya harus sama
// dengan daftar di lib/facilities-data.ts supaya ikonnya ketemu saat tampil.
const PILIHAN_IKON = [
  { title: "Kursi / sofa", value: "armchair" },
  { title: "AC / sejuk", value: "snowflake" },
  { title: "WiFi", value: "wifi" },
  { title: "Matahari / terbuka", value: "sun" },
  { title: "Pepohonan", value: "trees" },
  { title: "Pegunungan", value: "mountain" },
  { title: "Angin / udara segar", value: "wind" },
  { title: "Rombongan / kapasitas", value: "users" },
  { title: "Proyektor", value: "projector" },
  { title: "Sound system", value: "volume" },
  { title: "Papan presentasi", value: "presentation" },
  { title: "Musik", value: "music" },
  { title: "Musholla", value: "landmark" },
  { title: "Parkir", value: "car" },
  { title: "Spot foto", value: "camera" },
  { title: "Acara / dekorasi", value: "party" },
  { title: "Kopi / kuliner", value: "coffee" },
];

export const space = defineType({
  name: "space",
  title: "Ruang & Area",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama Ruang",
      type: "string",
      description: "Contoh: Indoor Space, VIP / Meeting Room",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Kode Ruang",
      type: "slug",
      options: { source: "name", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tipe",
      title: "Jenis Area",
      type: "string",
      description:
        "Area Umum tampil di bagian atas halaman Fasilitas, Area Privat di bagian VIP dan Event.",
      options: {
        list: [
          { title: "Area Umum (Indoor / Outdoor)", value: "public" },
          { title: "Area Privat (VIP / Event Space)", value: "private" },
        ],
        layout: "radio",
      },
      initialValue: "public",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Kalimat Singkat",
      type: "string",
      description:
        "Satu kalimat pendek di bawah nama ruang. Contoh: Sejuk, tenang, dan tetap terang alami.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Penjelasan Ruang",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Foto Ruang",
      type: "array",
      description:
        "Foto pertama dipakai sebagai tampilan utama, sisanya jadi thumbnail kecil. Urutannya bisa digeser.",
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
      name: "features",
      title: "Fasilitas di Ruang Ini",
      type: "array",
      description: "Daftar fasilitas berikut ikonnya.",
      of: [
        defineArrayMember({
          type: "object",
          name: "feature",
          title: "Fasilitas",
          fields: [
            defineField({
              name: "icon",
              title: "Ikon",
              type: "string",
              options: { list: PILIHAN_IKON },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Tulisan",
              type: "string",
              description: "Contoh: Ruangan ber-AC",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "icon" },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "capacity",
      title: "Kapasitas Tamu",
      type: "string",
      description:
        "Ditulis lengkap apa adanya, contoh: ± 60 tamu. PENTING: angka yang terpasang sekarang masih perkiraan, mohon dicocokkan dengan kapasitas sebenarnya.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bestFor",
      title: "Cocok Untuk",
      type: "array",
      of: [{ type: "string" }],
      description: "Contoh: Nongkrong santai, Rapat kerja, Makan keluarga.",
      validation: (rule) => rule.min(1),
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
    select: { title: "name", tipe: "tipe", media: "images.0" },
    prepare({ title, tipe, media }) {
      return {
        title,
        subtitle: tipe === "public" ? "Area Umum" : "Area Privat",
        media,
      };
    },
  },
});
