import { defineField, defineType } from "sanity";
import { PILIHAN_IKON } from "./space";

/*
  Wedding Package di halaman Menu (section paling bawah, kartu yang bisa
  dibalik). Sumber awal isinya: lib/wedding-data.ts, disalin dari dua flyer
  resmi "Wedding Package - Venue Facilities" dan "Wedding Foodies Packages".

  Sama seperti Popup Promo, dokumen ini dipakai tunggal, cukup satu saja.
  Isinya dipecah jadi tiga bagian:
  - daftarPaket: kartu paket A/B/C, tiap paket punya harga, komposisi
    ringkas, dan rincian hidangan sendiri-sendiri.
  - daftarFasilitas: fasilitas venue yang sudah termasuk di semua paket,
    tampil di kotak gelap di bawah kartu-kartu paket.
  - syarat: baris syarat kecil di bagian paling bawah, contoh "Minimum
    pemesanan 200 pax".
*/

export const weddingPackage = defineType({
  name: "weddingPackage",
  title: "Wedding Package",
  type: "document",
  fields: [
    defineField({
      name: "daftarPaket",
      title: "Daftar Paket (A, B, C, dst)",
      type: "array",
      of: [
        {
          type: "object",
          name: "weddingPaketItem",
          fields: [
            defineField({
              name: "kode",
              title: "Kode Paket",
              type: "string",
              description:
                "Satu huruf, sesuai urutan di flyer. Contoh: A, B, C.",
              validation: (rule) => rule.required().max(2),
            }),
            defineField({
              name: "name",
              title: "Nama Paket",
              type: "string",
              description:
                "Contoh: Intimate Wedding, Elegant Wedding, Royal Wedding.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "price",
              title: "Harga",
              type: "string",
              description: "Ditulis lengkap, contoh: Rp 150.000",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "unit",
              title: "Satuan",
              type: "string",
              description: "Contoh: per pax",
              initialValue: "per pax",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "komposisi",
              title: "Ringkasan Komposisi",
              type: "array",
              description:
                "Tampil di sisi depan kartu, sebelum dibalik. Urutan sesuai flyer: Main Course, Soup, Appetizer, Add On, Beverages.",
              of: [
                {
                  type: "object",
                  name: "komposisiItem",
                  fields: [
                    defineField({
                      name: "jumlah",
                      title: "Jumlah",
                      type: "string",
                      description: "Ditulis sebagai teks, contoh: 4, atau 2.",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "label",
                      title: "Nama Bagian",
                      type: "string",
                      description:
                        "Contoh: Main Course, Soup, Appetizer, Add On, Beverages.",
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  preview: {
                    select: { title: "label", subtitle: "jumlah" },
                  },
                },
              ],
              validation: (rule) => rule.min(1),
            }),
            defineField({
              name: "hidangan",
              title: "Rincian Hidangan",
              type: "array",
              description:
                "Tampil di sisi belakang kartu setelah dibalik. Satu baris satu hidangan, urutan bebas mengikuti flyer.",
              of: [{ type: "string" }],
              validation: (rule) => rule.min(1),
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
              name: "isHighlighted",
              title: "Tonjolkan Paket Ini",
              type: "boolean",
              description:
                "Kalau dinyalakan, kartu ini tampil dengan aksen emas dan label 'Paling Dipilih'. Sebaiknya cukup satu paket saja yang dinyalakan.",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: "name",
              kode: "kode",
              price: "price",
              media: "image",
            },
            prepare(selection) {
              const { title, kode, price, media } = selection;
              return {
                title: `${kode ? `Paket ${kode} - ` : ""}${title || "Paket Wedding"}`,
                subtitle: price,
                media,
              };
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "daftarFasilitas",
      title: "Fasilitas Venue",
      type: "array",
      description: "Fasilitas yang sudah termasuk di semua paket.",
      of: [
        {
          type: "object",
          name: "weddingFasilitasItem",
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
              title: "Judul Singkat",
              type: "string",
              description: "Contoh: Akses 3 Jam Indoor & Outdoor",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "detail",
              title: "Penjelasan",
              type: "text",
              rows: 2,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "detail" },
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "syarat",
      title: "Syarat & Ketentuan Singkat",
      type: "array",
      description:
        "Baris kecil di bagian paling bawah. Contoh: Minimum pemesanan 200 pax.",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { daftarPaket: "daftarPaket" },
    prepare(selection) {
      const daftarPaket = selection.daftarPaket as unknown[] | undefined;
      const jumlah = Array.isArray(daftarPaket) ? daftarPaket.length : 0;
      return {
        title: "Wedding Package",
        subtitle: `${jumlah} paket`,
      };
    },
  },
});
