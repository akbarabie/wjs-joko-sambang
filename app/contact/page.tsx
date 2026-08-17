import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ReservationForm } from "@/components/contact/ReservationForm";
import { ContactInfoCards } from "@/components/contact/ContactInfoCards";
import { LocationMap } from "@/components/contact/LocationMap";

export const metadata: Metadata = {
  title: "Contact & Location",
  description:
    "Alamat, peta lokasi, jam operasional, dan form reservasi WhatsApp WJS Joko Sambang Café di Junrejo, Kota Batu.",
  openGraph: {
    title: "Contact & Location | WJS Joko Sambang Café",
    description:
      "Reservasi meja, ruang VIP, atau event space lewat WhatsApp. Lokasi di Junrejo, Kota Batu.",
    locale: "id_ID",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ReservationForm />
      <ContactInfoCards />
      <LocationMap />
    </>
  );
}
