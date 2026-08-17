"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HEADLINE = "Cerita yang Tercipta di Sini";

// Tautan cepat ke tiga section di bawah, sekaligus jadi peta isi halaman
// supaya pengunjung tahu apa saja yang bisa dilihat tanpa scroll dulu.
const SECTION_LINKS = [
  { href: "#event", label: "Dokumentasi Event" },
  { href: "#galeri", label: "Galeri Foto" },
  { href: "#testimoni", label: "Testimoni" },
];

const wordContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function GalleryHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[80vh] min-h-[560px] items-center justify-center overflow-hidden bg-wood-900"
    >
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0"
      >
        <Image
          src="/images/gallery/gallery-hero.JPG"
          alt="Kolase suasana acara dan kegiatan di WJS Joko Sambang Café"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-wood-950/80 via-wood-950/60 to-wood-950/90" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity, perspective: 1000 }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="divider-accent text-xs font-semibold uppercase tracking-[0.4em] text-gold-400"
        >
          Events &amp; Gallery
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
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-6 max-w-2xl text-base text-cream-200/85 sm:text-lg"
        >
          Beauty class, gathering komunitas, kunjungan tokoh, sampai sore-sore
          santai pengunjung. Semuanya kami dokumentasikan di sini.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {SECTION_LINKS.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ y: -4, rotateX: 8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              style={{ transformStyle: "preserve-3d" }}
              className="rounded-2xl border border-cream-100/15 bg-cream-100/10 px-5 py-3 text-sm font-semibold text-cream-100 backdrop-blur-md"
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

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
