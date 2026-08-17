import type { Metadata } from "next";
import { MenuHero } from "@/components/menu/MenuHero";
import { BestSellerGrid } from "@/components/menu/BestSellerGrid";
import { CategoryAccordion } from "@/components/menu/CategoryAccordion";
import { PackageSection } from "@/components/menu/PackageSection";
import { WeddingPackageSection } from "@/components/menu/WeddingPackageSection";
import { MenuCta } from "@/components/menu/MenuCta";

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

export default function MenuPage() {
  return (
    <>
      <MenuHero />
      <BestSellerGrid />
      <CategoryAccordion />
      <PackageSection />
      <WeddingPackageSection />
      <MenuCta />
    </>
  );
}
