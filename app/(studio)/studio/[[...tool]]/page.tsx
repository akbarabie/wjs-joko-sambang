/*
  Route yang menampilkan panel admin Sanity Studio di alamat /studio.

  Pola [[...tool]] dipakai supaya seluruh alamat di bawah /studio ikut
  ditangani halaman ini, misalnya /studio/structure atau /studio/vision.
  Tanpa ini, berpindah menu di dalam panel akan berujung halaman 404.
*/

import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

// Panel admin bersifat dinamis penuh, tidak boleh ikut di-render jadi
// halaman statis saat build.
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
