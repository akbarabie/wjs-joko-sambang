import { HeroSection } from "@/components/home/HeroSection";
import { BrandHighlights } from "@/components/home/BrandHighlights";
import { BestSellerPreview } from "@/components/home/BestSellerPreview";
import { FacilitiesQuickLook } from "@/components/home/FacilitiesQuickLook";
import { TestimonialSlider } from "@/components/home/TestimonialSlider";
import { PromoPopup } from "@/components/home/PromoPopup";

export default function HomePage() {
  return (
    <>
      <PromoPopup />
      <HeroSection />
      <BrandHighlights />
      <BestSellerPreview />
      <FacilitiesQuickLook />
      <TestimonialSlider />
    </>
  );
}
