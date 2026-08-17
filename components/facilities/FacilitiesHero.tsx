"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Mountain, Trees, Users } from "lucide-react";

const HEADLINE = "Satu Tempat, Banyak Pilihan Ruang";

// Ringkasan cepat supaya pengunjung langsung tahu ruang apa saja yang ada,
// tanpa harus scroll dulu ke bawah.
const QUICK_STATS = [
  { icon: Trees, label: "Indoor & Outdoor", detail: "Area umum" },
  { icon: Users, label: "VIP & Event", detail: "Ruang privat" },
  { icon: Mountain, label: "View Pegunungan", detail: "Khas Kota Batu" },
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

export function FacilitiesHero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: foto latar bergerak lebih lambat dari konten teks saat di-scroll,
  // memberi kesan latar berada jauh di belakang (PRD 5.1 poin 3).
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
      className="relative flex h-[88vh] min-h-[600px] items-center justify-center overflow-hidden bg-wood-900"
    >
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0"
      >
        <Image
          src="/images/facilities/facility-hero.JPG"
          alt="Suasana ruang dan taman WJS Joko Sambang Café"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Overlay gelap supaya teks tetap terbaca di atas foto seterang apa pun */}
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
          Facilities &amp; Spaces
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
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-6 max-w-2xl text-base text-cream-200/85 sm:text-lg"
        >
          Mau nongkrong santai sambil lihat kebun, rapat kerja di ruang tertutup,
          atau bikin acara bareng puluhan orang. Semua ruangnya ada di satu
          lokasi yang sama.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {QUICK_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4, rotateX: 8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              style={{ transformStyle: "preserve-3d" }}
              className="flex items-center gap-3 rounded-2xl border border-cream-100/15 bg-cream-100/10 px-5 py-3 backdrop-blur-md"
            >
              <stat.icon className="h-5 w-5 text-gold-400" aria-hidden="true" />
              <span className="text-left">
                <span className="block text-sm font-semibold text-cream-100">
                  {stat.label}
                </span>
                <span className="block text-xs text-cream-200/70">
                  {stat.detail}
                </span>
              </span>
            </motion.div>
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
