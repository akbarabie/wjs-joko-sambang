"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Star } from "lucide-react";
import type { MenuPackage } from "@/lib/menu-data";
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

// Daftar paket dikirim dari halaman, yang mengambilnya dari Sanity.
export function PackageSection({
  daftarPaket,
}: {
  daftarPaket: MenuPackage[];
}) {
  return (
    <section id="paket" className="scroll-mt-24 bg-cream-200/60 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="divider-accent justify-center text-xs font-semibold uppercase tracking-[0.4em] text-gold-600">
            Paket Event &amp; Grup
          </p>
          <h2 className="font-heading mt-5 text-3xl font-semibold text-wood-800 sm:text-4xl">
            Pilihan Paket Menu
          </h2>
          <p className="mt-5 text-wood-500">
            Untuk acara berkelompok, rapat kantor, atau sekadar makan siang
            biasa. Harganya menyesuaikan pilihan menu dan jumlah tamu.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-3">
          {daftarPaket.map((paket, index) => {
            const pesan = `Halo WJS Joko Sambang Café, saya ingin menanyakan detail ${paket.name} beserta pilihan menunya.`;

            return (
              <motion.div
                key={paket.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                custom={index * 0.12}
              >
                <TiltCard maxTilt={7} className="h-full">
                  <div
                    className={cn(
                      "flex h-full flex-col overflow-hidden rounded-[1.75rem] shadow-xl",
                      paket.isHighlighted
                        ? "border-2 border-gold-500 bg-cream-100 shadow-gold-900/10"
                        : "border border-wood-100 bg-cream-100 shadow-wood-900/5",
                    )}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={paket.image}
                        alt={paket.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-wood-950/70 to-transparent" />

                      {paket.isHighlighted ? (
                        <div
                          style={{ transform: "translateZ(55px)" }}
                          className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3.5 py-1.5"
                        >
                          <Star
                            className="h-3 w-3 fill-wood-900 text-wood-900"
                            aria-hidden="true"
                          />
                          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-wood-900">
                            Paling Diminati
                          </span>
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <h3 className="font-heading text-2xl font-semibold text-wood-800">
                        {paket.name}
                      </h3>

                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-wood-400">
                          Mulai dari
                        </p>
                        <p className="font-heading mt-1 text-2xl font-semibold text-forest-500">
                          {paket.priceRange}
                        </p>
                        <p className="text-xs text-wood-400">{paket.unit}</p>
                      </div>

                      <p className="mt-5 text-sm leading-relaxed text-wood-500">
                        {paket.description}
                      </p>

                      <ul className="mt-6 flex-1 space-y-2.5">
                        {paket.features.map((fitur) => (
                          <li key={fitur} className="flex items-start gap-2.5">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-500/10">
                              <Check
                                className="h-3 w-3 text-forest-500"
                                aria-hidden="true"
                              />
                            </span>
                            <span className="text-sm text-wood-600">{fitur}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={buildWhatsAppLink(pesan)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "group mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors",
                          paket.isHighlighted
                            ? "bg-gold-500 text-wood-900 hover:bg-gold-400"
                            : "border border-wood-200 text-wood-700 hover:border-forest-500 hover:bg-forest-500 hover:text-cream-100",
                        )}
                      >
                        Tanya Paket Ini
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-wood-400"
        >
          Kisaran harga dapat berubah sewaktu-waktu. Untuk penawaran pasti sesuai jumlah tamu dan susunan
          menu, silakan hubungi admin kami.
        </motion.p>
      </div>
    </section>
  );
}
