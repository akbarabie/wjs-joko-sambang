"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { MENU_CATEGORIES } from "@/lib/menu-data";
import { TiltCard } from "@/components/ui/TiltCard";
import { buildWhatsAppLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function pesanKategori(nama: string) {
  return `Halo WJS Joko Sambang Café, boleh minta daftar menu lengkap untuk kategori ${nama} beserta harganya?`;
}

export function CategoryAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="kategori"
      className="scroll-mt-24 rounded-[2.5rem] bg-wood-900 px-6 py-24 sm:rounded-[3.5rem] sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="divider-accent justify-center text-xs font-semibold uppercase tracking-[0.4em] text-gold-400">
            Kategori Menu
          </p>
          <h2 className="font-heading mt-5 text-3xl font-semibold text-cream-100 sm:text-4xl">
            Tujuh Kategori, Satu Dapur
          </h2>
          <p className="mt-5 text-cream-200/70">
            Arahkan kursor atau klik salah satu panel untuk melihat isinya lebih
            lengkap.
          </p>
        </motion.div>

        {/* Tampilan desktop: panel yang melebar saat dipilih. Perspective
            ditaruh di pembungkus supaya seluruh panel berbagi titik pandang
            yang sama, jadi panel yang tidak aktif terlihat menjauh. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0.1}
          style={{ perspective: 1600 }}
          className="mt-14 hidden h-[500px] gap-3 lg:flex"
        >
          {MENU_CATEGORIES.map((category, index) => {
            const isActive = index === activeIndex;
            const arahMiring = index < activeIndex ? 5 : -5;

            return (
              <motion.button
                key={category.id}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                aria-expanded={isActive}
                animate={{
                  flexGrow: isActive ? 4.5 : 1,
                  rotateY: prefersReducedMotion || isActive ? 0 : arahMiring,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: "preserve-3d", flexBasis: 0 }}
                className="relative h-full min-w-0 overflow-hidden rounded-[1.5rem] text-left shadow-xl shadow-wood-950/40"
              >
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />

                <div
                  className={cn(
                    "absolute inset-0 transition-colors duration-500",
                    isActive
                      ? "bg-gradient-to-t from-wood-950/92 via-wood-950/35 to-transparent"
                      : "bg-wood-950/70",
                  )}
                />

                {/* Nama kategori pada panel yang menyempit ditulis vertikal
                    supaya tetap terbaca tanpa terpotong. */}
                {!isActive ? (
                  <span
                    style={{ writingMode: "vertical-rl", transform: "translateZ(30px)" }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 rotate-180 whitespace-nowrap font-heading text-lg font-semibold text-cream-100"
                  >
                    {category.name}
                  </span>
                ) : null}

                {!isActive ? (
                  <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-cream-100/25 text-cream-100">
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </span>
                ) : null}

                {isActive ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.15 }}
                    style={{ transform: "translateZ(45px)" }}
                    className="absolute inset-x-0 bottom-0 p-7"
                  >
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold-400">
                      {category.kelompok}
                    </p>
                    <h3 className="font-heading mt-2 text-3xl font-semibold text-cream-100">
                      {category.name}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-cream-200/80">
                      {category.description}
                    </p>

                    {category.contoh.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {category.contoh.map((nama) => (
                          <span
                            key={nama}
                            className="rounded-full border border-cream-100/20 bg-cream-100/5 px-3 py-1 text-xs text-cream-200/85"
                          >
                            {nama}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                ) : null}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Tampilan mobile dan tablet: kartu bertumpuk, tanpa panel melebar
            karena layarnya tidak cukup lebar untuk itu. */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
          {MENU_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={(index % 2) * 0.1}
            >
              <TiltCard maxTilt={6} className="h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-cream-100/10 bg-wood-800/70 shadow-xl shadow-wood-950/30">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={category.image}
                      alt={category.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wood-950/90 via-wood-950/25 to-transparent" />
                    <div
                      style={{ transform: "translateZ(40px)" }}
                      className="absolute inset-x-0 bottom-0 p-5"
                    >
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold-400">
                        {category.kelompok}
                      </p>
                      <h3 className="font-heading mt-1 text-2xl font-semibold text-cream-100">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-sm leading-relaxed text-cream-200/75">
                      {category.description}
                    </p>
                    {category.contoh.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {category.contoh.map((nama) => (
                          <span
                            key={nama}
                            className="rounded-full border border-cream-100/20 bg-cream-100/5 px-3 py-1 text-xs text-cream-200/85"
                          >
                            {nama}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mt-12 text-center"
        >
          <p className="text-sm text-cream-200/60">
            Ingin daftar menu lengkap beserta harganya?
          </p>
          <Link
            href={buildWhatsAppLink(
              pesanKategori(MENU_CATEGORIES[activeIndex].name),
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 inline-flex items-center gap-2 rounded-full border border-cream-100/25 px-6 py-3 text-sm font-semibold text-cream-100 transition-colors hover:border-gold-500 hover:bg-gold-500 hover:text-wood-900"
          >
            Minta Daftar Menu via WhatsApp
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
