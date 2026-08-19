"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import type { EventItem } from "@/lib/events-data";
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

/**
 * Satu blok dokumentasi acara. Dipisah jadi komponen sendiri karena
 * masing-masing blok punya state foto aktifnya sendiri, dan hook tidak boleh
 * dipanggil di dalam perulangan.
 */
function EventBlock({
  event,
  index,
}: {
  event: EventItem;
  index: number;
}) {
  const [activePhoto, setActivePhoto] = useState(0);
  const isReversed = index % 2 === 1;
  const photo = event.images[activePhoto];

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      {/* Kolom foto. Urutannya dibalik pada blok bernomor genap supaya
          susunan halaman tidak monoton dari atas ke bawah. */}
      <div className={cn(isReversed && "lg:order-2")}>
        <TiltCard maxTilt={7}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-wood-800 shadow-2xl shadow-wood-900/25">
            <AnimatePresence mode="wait">
              <motion.div
                key={photo.src}
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
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wood-950/60 via-transparent to-transparent" />

            {/* Label kategori diangkat ke depan supaya terasa melayang
                di atas foto saat kartunya dimiringkan. */}
            <div
              style={{ transform: "translateZ(55px)" }}
              className="absolute left-5 top-5 rounded-full border border-cream-100/20 bg-wood-950/60 px-4 py-2 backdrop-blur-md"
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold-400">
                {event.kategori}
              </span>
            </div>
          </div>
        </TiltCard>

        {/* Thumbnail hanya muncul kalau acaranya punya lebih dari satu foto */}
        {event.images.length > 1 ? (
          <div className="mt-4 flex gap-3">
            {event.images.map((image, photoIndex) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActivePhoto(photoIndex)}
                aria-label={`Lihat foto ${photoIndex + 1} ${event.title}`}
                className={cn(
                  "relative h-16 w-24 overflow-hidden rounded-xl transition-all duration-300",
                  photoIndex === activePhoto
                    ? "ring-2 ring-gold-500 ring-offset-2 ring-offset-cream-DEFAULT"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                <Image src={image.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Kolom teks */}
      <div className={cn(isReversed && "lg:order-1")}>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">
          {event.partner}
        </p>
        <h3 className="font-heading mt-4 text-3xl font-semibold text-wood-800 sm:text-4xl">
          {event.title}
        </h3>
        <p className="mt-5 leading-relaxed text-wood-500">{event.description}</p>

        <ul className="mt-7 space-y-3">
          {event.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-500/10">
                <Check className="h-3 w-3 text-forest-500" aria-hidden="true" />
              </span>
              <span className="text-sm text-wood-600">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

// Daftar event dikirim dari halaman, yang mengambilnya dari Sanity.
export function EventShowcase({ events }: { events: EventItem[] }) {
  return (
    <section id="event" className="scroll-mt-24 bg-cream-DEFAULT px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="divider-accent justify-center text-xs font-semibold uppercase tracking-[0.4em] text-gold-600">
            Dokumentasi Event
          </p>
          <h2 className="font-heading mt-5 text-3xl font-semibold text-wood-800 sm:text-4xl">
            Acara yang Pernah Digelar
          </h2>
          <p className="mt-5 text-wood-500">
            Beberapa kolaborasi dan kegiatan yang sudah berlangsung di WJS Joko
            Sambang Café.
          </p>
        </motion.div>

        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-24">
          {events.map((event, index) => (
            <EventBlock key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
