/*
  Satu pintu untuk membaca konfigurasi Sanity dari environment variable.

  Sengaja dipisah supaya kalau ada nilai yang belum diisi, errornya muncul
  dengan pesan yang jelas saat build, bukan berupa error aneh di tengah
  jalan yang susah dilacak asalnya.
*/

// Tanggal versi API. Dikunci ke tanggal tetap, bukan tanggal hari ini,
// supaya perilaku API tidak tiba-tiba berubah saat Sanity merilis versi
// baru. Diubah manual hanya kalau memang mau ikut fitur terbaru.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-18";

export const dataset = wajibAda(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = wajibAda(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
);

function wajibAda<T>(nilai: T | undefined, namaVariabel: string): T {
  if (nilai === undefined) {
    throw new Error(
      `Konfigurasi Sanity belum lengkap: ${namaVariabel} belum diisi. ` +
        "Cek file .env.local di lokal, atau Environment Variables di dashboard Vercel.",
    );
  }
  return nilai;
}
