import type { Metadata } from "next";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { EventShowcase } from "@/components/gallery/EventShowcase";
import { PhotoGalleryMasonry } from "@/components/gallery/PhotoGalleryMasonry";
import { TestimonialWall } from "@/components/gallery/TestimonialWall";
import {
  ambilEvents,
  ambilGalleryPhotos,
  ambilTestimonials,
} from "@/sanity/lib/konten";

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

// Isi halaman diambil dari Sanity, ketiganya berbarengan supaya tidak
// saling menunggu.
export default async function GalleryPage() {
  const [events, foto, testimoni] = await Promise.all([
    ambilEvents(),
    ambilGalleryPhotos(),
    ambilTestimonials(),
  ]);

  return (
    <>
      <GalleryHero />
      <EventShowcase events={events} />
      <PhotoGalleryMasonry foto={foto} />
      <TestimonialWall testimoni={testimoni} />
    </>
  );
}
