"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { SpaceItem } from "@/lib/facilities-data";
import { FacilityIcon } from "@/components/facilities/FacilityIcon";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// Daftar ruang dikirim dari halaman, yang mengambilnya dari Sanity.
export function PublicSpaceExplorer({ ruang }: { ruang: SpaceItem[] }) {
  const [activeSpaceId, setActiveSpaceId] = useState(ruang[0].id);
  const [activePhoto, setActivePhoto] = useState(0);

  const activeSpace =
    ruang.find((space) => space.id === activeSpaceId) ?? ruang[0];
  const photo = activeSpace.images[activePhoto] ?? activeSpace.images[0];

  // Saat pindah tab, foto dikembalikan ke urutan pertama supaya tidak
  // menampilkan indeks yang tidak ada di ruangan tujuan.
  function handleSpaceChange(spaceId: string) {
    setActiveSpaceId(spaceId);
    setActivePhoto(0);
  }

  return (
    <section
      id="public-area"
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
            Public Area
          </p>
          <h2 className="font-heading mt-5 text-3xl font-semibold text-wood-800 sm:text-4xl">
            Pilih Suasana yang Kamu Mau
          </h2>
          <p className="mt-5 text-wood-500">
            Dua area umum dengan karakter yang berbeda. Geser tabnya untuk
            melihat masing-masing sudut ruangan.
          </p>
        </motion.div>

        {/* Segmented control untuk berpindah antara Indoor dan Outdoor */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          custom={0.1}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex rounded-full border border-wood-100 bg-cream-100 p-1.5 shadow-sm">
            {ruang.map((space) => {
              const isActive = space.id === activeSpaceId;
              return (
                <button
                  key={space.id}
                  type="button"
                  onClick={() => handleSpaceChange(space.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative rounded-full px-6 py-2.5 text-sm font-semibold transition-colors sm:px-8",
                    isActive ? "text-cream-100" : "text-wood-500 hover:text-wood-700",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="public-space-pill"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-forest-500"
                    />
                  ) : null}
                  <span className="relative z-10">{space.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Panggung foto dengan efek 3D mengikuti kursor */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
          >
            <TiltCard className="w-full" maxTilt={7}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-wood-800 shadow-2xl shadow-wood-900/25">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeSpace.id}-${activePhoto}`}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wood-950/70 via-transparent to-transparent" />

                {/* Badge kapasitas sengaja diangkat ke depan (translateZ) supaya
                    terasa melayang di atas foto saat kartu dimiringkan. */}
                <div
                  style={{ transform: "translateZ(60px)" }}
                  className="absolute bottom-5 left-5 rounded-2xl border border-cream-100/20 bg-wood-950/60 px-5 py-3 backdrop-blur-md"
                >
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold-400">
                    Kapasitas
                  </p>
                  <p className="mt-1 font-heading text-lg font-semibold text-cream-100">
                    {activeSpace.capacity}
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* Thumbnail untuk berpindah sudut foto */}
            <div className="mt-5 flex gap-3">
              {activeSpace.images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActivePhoto(index)}
                  aria-label={`Lihat foto ${index + 1} ${activeSpace.name}`}
                  className={cn(
                    "relative h-20 flex-1 overflow-hidden rounded-xl transition-all duration-300",
                    index === activePhoto
                      ? "ring-2 ring-gold-500 ring-offset-2 ring-offset-cream-DEFAULT"
                      : "opacity-60 hover:opacity-100",
                  )}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Penjelasan ruangan, ikut berganti mengikuti tab yang aktif */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSpace.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="inline-flex items-center gap-2 rounded-full bg-gold-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {activeSpace.tagline}
              </p>

              <h3 className="font-heading mt-5 text-3xl font-semibold text-wood-800 sm:text-4xl">
                {activeSpace.name}
              </h3>

              <p className="mt-5 leading-relaxed text-wood-500">
                {activeSpace.description}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {activeSpace.features.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center gap-3 rounded-2xl border border-wood-100 bg-cream-100 px-4 py-3"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-forest-500/10">
                      <FacilityIcon
                        name={feature.icon}
                        className="h-4 w-4 text-forest-500"
                      />
                    </span>
                    <span className="text-sm font-medium text-wood-700">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-wood-400">
                  Paling cocok untuk
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeSpace.bestFor.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-wood-200 px-4 py-1.5 text-sm text-wood-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
