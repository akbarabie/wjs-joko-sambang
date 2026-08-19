"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FotoVenue } from "@/sanity/lib/konten";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// Jarak geser minimal (px) sebelum swipe dianggap sebagai perpindahan slide.
const SWIPE_THRESHOLD = 60;

// Daftar foto venue dikirim dari halaman, yang mengambilnya dari Sanity.
export function VenueCoverflow({ foto }: { foto: FotoVenue[] }) {
  const [activeIndex, setActiveIndex] = useState(
    Math.floor(foto.length / 2),
  );
  const prefersReducedMotion = useReducedMotion();

  const activePhoto = foto[activeIndex];

  function goTo(nextIndex: number) {
    // Modulo dengan penambahan panjang array supaya indeks negatif tetap valid
    // dan carousel bisa berputar terus tanpa mentok di ujung.
    const total = foto.length;
    setActiveIndex(((nextIndex % total) + total) % total);
  }

  return (
    <section className="overflow-hidden bg-cream-DEFAULT px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="divider-accent justify-center text-xs font-semibold uppercase tracking-[0.4em] text-gold-600">
            Venue Highlight
          </p>
          <h2 className="font-heading mt-5 text-3xl font-semibold text-wood-800 sm:text-4xl">
            Sudut Favorit di Joko Sambang
          </h2>
          <p className="mt-5 text-wood-500">
            Geser ke samping atau klik foto di sisi kanan dan kiri untuk melihat
            sudut yang lain.
          </p>
        </motion.div>
      </div>

      {/* Panggung 3D. Perspective ditaruh di pembungkus luar supaya semua kartu
          berbagi titik pandang yang sama, jadi kemiringannya terasa menyatu. */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        custom={0.1}
        style={{ perspective: 1500 }}
        className="relative mx-auto mt-14 h-[260px] w-full max-w-5xl sm:h-[360px] lg:h-[420px]"
      >
        <motion.div
          drag={prefersReducedMotion ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, info) => {
            if (info.offset.x < -SWIPE_THRESHOLD) goTo(activeIndex + 1);
            if (info.offset.x > SWIPE_THRESHOLD) goTo(activeIndex - 1);
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-full w-full cursor-grab active:cursor-grabbing"
        >
          {foto.map((photo, index) => {
            const offset = index - activeIndex;
            const distance = Math.abs(offset);
            const isActive = offset === 0;

            return (
              <motion.button
                key={photo.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Lihat ${photo.caption}`}
                aria-current={isActive}
                animate={{
                  x: `${offset * 58}%`,
                  rotateY: prefersReducedMotion ? 0 : offset * -34,
                  z: prefersReducedMotion ? 0 : -distance * 200,
                  scale: 1 - distance * 0.1,
                  opacity: distance > 2 ? 0 : 1 - distance * 0.22,
                }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  zIndex: foto.length - distance,
                  transformStyle: "preserve-3d",
                  pointerEvents: distance > 2 ? "none" : "auto",
                }}
                className="absolute left-1/2 top-0 h-full w-[76%] -translate-x-1/2 overflow-hidden rounded-[1.75rem] shadow-2xl shadow-wood-900/30 sm:w-[58%] lg:w-[50%]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 76vw, 50vw"
                  className="object-cover"
                  draggable={false}
                />
                {/* Kartu yang bukan fokus digelapkan supaya mata langsung
                    tertuju ke foto yang sedang aktif di tengah. */}
                <div
                  className={cn(
                    "absolute inset-0 transition-colors duration-500",
                    isActive ? "bg-wood-950/0" : "bg-wood-950/45",
                  )}
                />
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>

      <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center gap-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={activePhoto.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="font-heading text-xl font-semibold text-wood-800"
          >
            {activePhoto.caption}
          </motion.p>
        </AnimatePresence>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Foto sebelumnya"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-wood-200 text-wood-600 transition-colors hover:border-forest-500 hover:bg-forest-500 hover:text-cream-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {foto.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Ke foto ${index + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-7 bg-gold-500"
                    : "w-2 bg-wood-200 hover:bg-wood-300",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Foto berikutnya"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-wood-200 text-wood-600 transition-colors hover:border-forest-500 hover:bg-forest-500 hover:text-cream-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
