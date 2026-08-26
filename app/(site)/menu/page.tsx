import type { Metadata } from "next";
import { MenuHero } from "@/components/menu/MenuHero";
import { BestSellerGrid } from "@/components/menu/BestSellerGrid";
import { CategoryAccordion } from "@/components/menu/CategoryAccordion";
import { PackageSection } from "@/components/menu/PackageSection";
import { WeddingPackageSection } from "@/components/menu/WeddingPackageSection";
import { MenuCta } from "@/components/menu/MenuCta";
import {
  ambilKategoriMenu,
  ambilMenuBestSeller,
  ambilPaketMenu,
  ambilWeddingPackage,
} from "@/sanity/lib/konten";

export const metadata: Metadata = {
  title: "Menu & Culinary",
  description:
    "Best seller, tujuh kategori menu, paket buffet dan meal box, serta wedding package WJS Joko Sambang Café di Junrejo, Kota Batu.",
  openGraph: {
    title: "Menu & Culinary | WJS Joko Sambang Café",
    description:
      "Nasi Goreng Rawon, Beef Krengseng Daun Jeruk, paket buffet mulai Rp 50.000 per pax, dan wedding package mulai Rp 150.000 per pax.",
    locale: "id_ID",
    type: "website",
  },
};

// Halaman ini mengambil isinya dari Sanity saat dibangun, lalu meneruskan
// ke tiap komponen lewat props. Ketiga permintaan dijalankan bersamaan
// supaya tidak saling menunggu.
export default async function MenuPage() {
  const [menu, kategori, daftarPaket, weddingPackage] = await Promise.all([
    ambilMenuBestSeller(),
    ambilKategoriMenu(),
    ambilPaketMenu(),
    ambilWeddingPackage(),
  ]);

  return (
    <>
      <MenuHero />
      <BestSellerGrid menu={menu} />
      <CategoryAccordion kategori={kategori} />
      <PackageSection daftarPaket={daftarPaket} />
      <WeddingPackageSection data={weddingPackage} />
      <MenuCta />
    </>
  );
}
