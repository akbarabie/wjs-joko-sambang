import type { Metadata } from "next";
import { FacilitiesHero } from "@/components/facilities/FacilitiesHero";
import { PublicSpaceExplorer } from "@/components/facilities/PublicSpaceExplorer";
import { VipEventSpace } from "@/components/facilities/VipEventSpace";
import { VenueCoverflow } from "@/components/facilities/VenueCoverflow";
import { AdditionalServices } from "@/components/facilities/AdditionalServices";
import { FacilitiesCta } from "@/components/facilities/FacilitiesCta";

export const metadata: Metadata = {
  title: "Facilities & Spaces",
  description:
    "Area indoor, outdoor, VIP/meeting room, event space, live music, dan musholla di WJS Joko Sambang Café Junrejo, Kota Batu.",
  openGraph: {
    title: "Facilities & Spaces | WJS Joko Sambang Café",
    description:
      "Ruang indoor sejuk, outdoor dengan view kebun pegunungan, VIP room untuk rapat, sampai event space untuk acara puluhan tamu.",
    locale: "id_ID",
    type: "website",
  },
};

export default function FacilitiesPage() {
  return (
    <>
      <FacilitiesHero />
      <PublicSpaceExplorer />
      <VipEventSpace />
      <VenueCoverflow />
      <AdditionalServices />
      <FacilitiesCta />
    </>
  );
}
