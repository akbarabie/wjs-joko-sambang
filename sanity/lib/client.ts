import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/*
  Client untuk mengambil konten dari Sanity.

  useCdn sengaja false. CDN Sanity memang lebih cepat, tapi isinya bisa
  tertinggal sesaat dari yang baru dipublish. Kalau itu terjadi tepat saat
  webhook menyegarkan halaman, data lama malah ikut tersimpan lagi ke cache
  dan bertahan sampai Publish berikutnya.

  Beban tambahannya kecil karena halaman sudah di-cache di sisi Next.js,
  jadi Sanity cuma dihubungi sesekali setelah ada perubahan konten.
*/
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});