import createImageUrlBuilder, {
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/*
  Mengubah data gambar dari Sanity menjadi URL yang bisa dipakai next/image.

  Contoh pemakaian nanti di komponen:
    urlGambar(menu.foto).width(800).height(600).url()

  Ukuran, potongan, dan konversi format dikerjakan di sisi CDN Sanity, jadi
  foto besar yang diunggah admin cafe tidak dikirim mentah ke pengunjung.
*/
export function urlGambar(sumber: SanityImageSource) {
  return builder.image(sumber).auto("format").fit("max");
}
