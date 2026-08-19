import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";

/*
  Aturan untuk robot mesin pencari.

  Berkas ini otomatis tersedia di alamat /robots.txt. Isinya mengizinkan
  seluruh halaman website dijelajahi, kecuali dua bagian:

  - /studio, panel admin. Tidak ada gunanya muncul di hasil pencarian, dan
    lebih baik tidak dipamerkan ke umum.
  - /api, alamat webhook. Bukan halaman yang bisa dibaca orang.

  Perlu diingat, robots.txt cuma permintaan sopan, bukan pengaman. Yang
  benar-benar menjaga /studio adalah login Sanity, bukan berkas ini.
*/

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
