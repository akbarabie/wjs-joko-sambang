import type { Metadata } from "next";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { EventShowcase } from "@/components/gallery/EventShowcase";
import { PhotoGalleryMasonry } from "@/components/gallery/PhotoGalleryMasonry";
import { TestimonialWall } from "@/components/gallery/TestimonialWall";

export const metadata: Metadata = {
  title: "Events & Gallery",
  description:
    "Dokumentasi Beauty Class Wardah, gathering komunitas, kunjungan Wali Kota Batu, galeri foto, dan testimoni pengunjung WJS Joko Sambang Café.",
  openGraph: {
    title: "Events & Gallery | WJS Joko Sambang Café",
    description:
      "Kolaborasi brand, gathering komunitas, dan momen pengunjung di cafe Jawa Modern Kota Batu.",
    locale: "id_ID",
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <EventShowcase />
      <PhotoGalleryMasonry />
      <TestimonialWall />
    </>
  );
}
