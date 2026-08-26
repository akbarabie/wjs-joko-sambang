"use client";

/*
  Konfigurasi Sanity Studio, yaitu panel admin yang dipakai pihak cafe
  untuk mengubah isi website. Panel ini menempel di website yang sama,
  bisa dibuka lewat alamat /studio, jadi tidak perlu hosting terpisah.
*/

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  title: "WJS Joko Sambang Cafe",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  document: {
    // Popup Promo dan Wedding Package sengaja tidak muncul di tombol buat
    // dokumen baru, karena dokumennya memang tunggal dan sudah punya menu
    // sendiri di sisi kiri.
    newDocumentOptions: (templates) =>
      templates.filter(
        (template) =>
          template.templateId !== "promoPopup" &&
          template.templateId !== "weddingPackage",
      ),
  },
  plugins: [
    // Panel utama tempat admin menambah dan mengubah konten.
    structureTool({ structure }),
    // Alat bantu untuk menguji query. Hanya dinyalakan saat pengembangan
    // supaya panel admin tetap sederhana bagi orang cafe.
    ...(process.env.NODE_ENV === "development"
      ? [visionTool({ defaultApiVersion: apiVersion })]
      : []),
  ],
});
