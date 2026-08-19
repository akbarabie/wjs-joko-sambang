import { HeroSection } from "@/components/home/HeroSection";
import { BrandHighlights } from "@/components/home/BrandHighlights";
import { BestSellerPreview } from "@/components/home/BestSellerPreview";
import { FacilitiesQuickLook } from "@/components/home/FacilitiesQuickLook";
import { TestimonialSlider } from "@/components/home/TestimonialSlider";
import { PromoPopup } from "@/components/home/PromoPopup";
import {
  ambilMenuBestSeller,
  ambilPromoPopup,
  ambilRuangPrivat,
  ambilRuangUmum,
  ambilTestimonials,
} from "@/sanity/lib/konten";

// Isi halaman diambil dari Sanity. Ruang umum dan ruang privat sama-sama
// diambil karena bagian "Ruang & Fasilitas" di halaman ini menampilkan
// Indoor, Outdoor, dan VIP Room sekaligus.
export default async function HomePage() {
  const [promo, menu, ruangUmum, ruangPrivat, testimoni] = await Promise.all([
    ambilPromoPopup(),
    ambilMenuBestSeller(),
    ambilRuangUmum(),
    ambilRuangPrivat(),
    ambilTestimonials(),
  ]);

  const semuaRuang = [...ruangUmum, ...ruangPrivat];

  return (
    <>
      <PromoPopup promo={promo} />
      <HeroSection />
      <BrandHighlights />
      <BestSellerPreview menu={menu} />
      <FacilitiesQuickLook ruang={semuaRuang} />
      <TestimonialSlider testimoni={testimoni} />
    </>
  );
}
