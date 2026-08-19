import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { StoryPhilosophy } from "@/components/about/StoryPhilosophy";
import { VisiMisi } from "@/components/about/VisiMisi";
import { MilestoneWalikota } from "@/components/about/MilestoneWalikota";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Kenali filosofi 'Joko Sambang', visi misi, dan cerita di balik WJS Joko Sambang Café, cafe Jawa Modern di Kota Batu.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StoryPhilosophy />
      <VisiMisi />
      <MilestoneWalikota />
    </>
  );
}
