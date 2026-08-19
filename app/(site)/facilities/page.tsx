import type { Metadata } from "next";
import { FacilitiesHero } from "@/components/facilities/FacilitiesHero";
import { PublicSpaceExplorer } from "@/components/facilities/PublicSpaceExplorer";
import { VipEventSpace } from "@/components/facilities/VipEventSpace";
import { VenueCoverflow } from "@/components/facilities/VenueCoverflow";
import { AdditionalServices } from "@/components/facilities/AdditionalServices";
import { FacilitiesCta } from "@/components/facilities/FacilitiesCta";
import {
  ambilFasilitasPenunjang,
  ambilFotoVenue,
  ambilLayananUnggulan,
  ambilRuangPrivat,
  ambilRuangUmum,
} from "@/sanity/lib/konten";

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

// Isi halaman diambil dari Sanity, semuanya berbarengan supaya tidak
// saling menunggu.
export default async function FacilitiesPage() {
  const [ruangUmum, ruangPrivat, fotoVenue, layanan, penunjang] =
    await Promise.all([
      ambilRuangUmum(),
      ambilRuangPrivat(),
      ambilFotoVenue(),
      ambilLayananUnggulan(),
      ambilFasilitasPenunjang(),
    ]);

  return (
    <>
      <FacilitiesHero />
      <PublicSpaceExplorer ruang={ruangUmum} />
      <VipEventSpace ruang={ruangPrivat} />
      <VenueCoverflow foto={fotoVenue} />
      <AdditionalServices layanan={layanan} penunjang={penunjang} />
      <FacilitiesCta />
    </>
  );
}
