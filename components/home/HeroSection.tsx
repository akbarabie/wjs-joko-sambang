"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MapPin, UtensilsCrossed } from "lucide-react";
import { CONTACT } from "@/lib/constants";

const HERO_SLIDES = [
  {
    src: "/images/hero/gbr 1.jpeg",
    alt: "Pemandangan pegunungan Kota Batu dari WJS Joko Sambang Café",
  },
  {
    src: "/images/hero/gbr 2.JPG",
    alt: "Suasana interior WJS Joko Sambang Café di malam hari",
  },
  {
    src: "/images/hero/gbr 4.jpg",
    alt: "Suasana interior Bartender WJS Joko Sambang Café",
  },
  {
    src: "/images/hero/gbr 5.JPG",
    alt: "Suasana eksterior WJS Joko Sambang Café",
  },
  {
    src: "/images/hero/gbr 10.JPG",
    alt: "Suasana Joglp WJS Joko Sambang Café",
  },
  {
    src: "/images/hero/gbr 9.jpeg",
    alt: "Suasana kolom ikan WJS Joko Sambang Café",
  },
  {
    src: "/images/hero/gbr 6.jpg",
    alt: "Suasana interior VIP WJS Joko Sambang Café",
  },
];

const HEADLINE = "Perpaduan Tradisi Jawa & Modernitas di Sejuknya Kota Batu";

// Varian animasi staggered text reveal: tiap kata muncul satu-satu
// (kinetic typography) sesuai PRD 5.1 - Motion Text.
const wordContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-rotate background setiap 6 detik, meniru efek "background
  // slider/video" yang diminta PRD tanpa perlu file video asli.
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden bg-wood-900">
      <AnimatePresence mode="sync">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_SLIDES[activeSlide].src}
            alt={HERO_SLIDES[activeSlide].alt}
            fill
            priority={activeSlide === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay gradasi supaya teks tetap terbaca di atas foto apa pun */}
      <div className="absolute inset-0 bg-gradient-to-b from-wood-950/75 via-wood-950/65 to-wood-950/80" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="divider-accent text-xs font-semibold uppercase tracking-[0.4em] text-gold-400"
        >
          Jawa Modern Concept
        </motion.p>

        <motion.h1
          variants={wordContainerVariants}
          initial="hidden"
          animate="visible"
          className="font-heading mt-6 flex flex-wrap justify-center gap-x-3 text-4xl font-semibold text-cream-100 sm:text-5xl lg:text-6xl"
        >
          {HEADLINE.split(" ").map((word, index) => (
            <motion.span key={`${word}-${index}`} variants={wordVariants}>
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-6 max-w-xl text-base text-cream-200/90 sm:text-lg"
        >
          Nongkrong, meeting, work from cafe, hingga acara keluarga. Satu
          tempat dengan suasana pegunungan Batu yang sejuk dan pelayanan yang
          hangat.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/menu"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-wood-900 shadow-lg shadow-gold-900/20 transition-transform hover:scale-[1.03] hover:bg-gold-400"
          >
            <UtensilsCrossed className="h-4 w-4" />
            Our Menu
          </Link>
          <Link
            href={CONTACT.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-100/30 bg-cream-100/10 px-7 py-3.5 text-sm font-semibold text-cream-100 backdrop-blur-sm transition-transform hover:scale-[1.03] hover:bg-cream-100/20"
          >
            <MapPin className="h-4 w-4" />
            Our Location
          </Link>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream-100/70"
        aria-hidden="true"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
