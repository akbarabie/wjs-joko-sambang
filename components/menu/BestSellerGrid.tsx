"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Flame } from "lucide-react";
import type { MenuCategory, MenuItem } from "@/lib/menu-data";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

type FilterValue = "all" | MenuCategory;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "food", label: "Food" },
  { value: "drink", label: "Drink" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// Daftar menu dikirim dari halaman, yang mengambilnya dari Sanity.
export function BestSellerGrid({ menu }: { menu: MenuItem[] }) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const items =
    filter === "all"
      ? menu
      : menu.filter((item) => item.category === filter);

  return (
    <section
      id="best-seller"
      className="scroll-mt-24 bg-cream-DEFAULT px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="divider-accent justify-center text-xs font-semibold uppercase tracking-[0.4em] text-gold-600">
            Best Seller
          </p>
          <h2 className="font-heading mt-5 text-3xl font-semibold text-wood-800 sm:text-4xl">
            Yang Paling Sering Dipesan
          </h2>
          <p className="mt-5 text-wood-500">
            Kalau bingung mau pesan apa, mulai dari yang ini saja.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          custom={0.1}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex rounded-full border border-wood-100 bg-cream-100 p-1.5 shadow-sm">
            {FILTERS.map((option) => {
              const isActive = option.value === filter;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFilter(option.value)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative rounded-full px-6 py-2.5 text-sm font-semibold transition-colors sm:px-8",
                    isActive ? "text-cream-100" : "text-wood-500 hover:text-wood-700",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="best-seller-pill"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-forest-500"
                    />
                  ) : null}
                  <span className="relative z-10">{option.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* layout pada motion.div membuat kartu bergeser halus ke posisi baru
            saat filter berubah, bukan langsung melompat. */}
        <motion.div
          layout
          className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <TiltCard maxTilt={8} className="h-full">
                  <div className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-wood-100 bg-cream-100 shadow-lg shadow-wood-900/5">
                    <div className="relative aspect-square w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Label best seller diangkat ke depan supaya terasa
                          melayang di atas foto saat kartu dimiringkan. */}
                      <div
                        style={{ transform: "translateZ(55px)" }}
                        className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3.5 py-1.5"
                      >
                        <Flame className="h-3 w-3 text-wood-900" aria-hidden="true" />
                        <span className="text-[0.65rem] font-bold uppercase tracking-wider text-wood-900">
                          Best Seller
                        </span>
                      </div>

                      <div className="absolute right-4 top-4 rounded-full bg-wood-950/60 px-3 py-1.5 backdrop-blur-md">
                        <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-cream-100">
                          {item.category === "food" ? "Food" : "Drink"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-heading text-xl font-semibold text-wood-800">
                        {item.name}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-wood-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
