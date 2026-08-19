"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import type { MenuItem } from "@/lib/menu-data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// Daftar menu dikirim dari halaman, yang mengambilnya dari Sanity.
export function BestSellerPreview({ menu }: { menu: MenuItem[] }) {
  return (
    <section className="bg-cream-200/70 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="divider-accent justify-center text-xs font-semibold uppercase tracking-[0.4em] text-gold-600">
            Food & Drink Favorit
          </p>
          <h2 className="font-heading mt-5 text-3xl font-semibold text-wood-800 sm:text-4xl">
            Best Seller Menu
          </h2>

          {/* 5 Bintang 3D Animasi Kecil & Proporsional */}
          <div className="mt-3.5 flex items-center justify-center gap-1.5 [perspective:600px]">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, rotateY: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative [transform-style:preserve-3d]"
              >
                <motion.div
                  animate={{
                    y: [0, -3.5, 0],
                    rotateY: [0, 20, -20, 0],
                    scale: [1, 1.06, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.18,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.3, rotateY: 180 }}
                  className="flex items-center justify-center [transform-style:preserve-3d]"
                >
                  <Star className="h-4 w-4 fill-gold-500 text-gold-500 drop-shadow-[0_2px_8px_rgba(217,119,6,0.45)] sm:h-4.5 sm:w-4.5" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          <p className="mt-4 text-wood-500">
            Menu andalan yang paling sering dipesan tamu, perpaduan resep
            tradisional Jawa dengan penyajian modern.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {menu.map((item, index) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={(index % 3) * 0.1}
              className="group overflow-hidden rounded-2xl bg-cream-100 shadow-sm shadow-wood-900/5 transition-shadow hover:shadow-lg hover:shadow-wood-900/10"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {item.isBestSeller && (
                  <span className="absolute left-3 top-3 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-wood-900 shadow-sm">
                    Best Seller
                  </span>
                )}
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-heading text-sm font-semibold text-wood-800 sm:text-base">
                  {item.name}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs text-wood-500 sm:text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-wood-200 px-6 py-3 text-sm font-semibold text-wood-700 transition-colors hover:border-forest-500 hover:bg-forest-500 hover:text-cream-100"
          >
            Lihat Menu Lengkap
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}