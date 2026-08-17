"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/testimonials-data";

export function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setActiveIndex((index + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const active = TESTIMONIALS[activeIndex];

  return (
    <section className="bg-wood-900 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="divider-accent justify-center text-xs font-semibold uppercase tracking-[0.4em] text-gold-400">
          Kata Mereka
        </p>
        <h2 className="font-heading mt-5 text-3xl font-semibold text-cream-100 sm:text-4xl">
          Testimoni Pengunjung
        </h2>

        <div className="relative mt-14">
          <Quote className="mx-auto h-8 w-8 text-gold-500/40" />

          <div className="relative mt-6 min-h-[220px] sm:min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute inset-x-0"
              >
                <div className="mb-4 flex justify-center gap-1">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-gold-500 text-gold-500"
                    />
                  ))}
                </div>
                <p className="font-heading text-lg leading-relaxed text-cream-100 sm:text-xl">
                  &ldquo;{active.quote}&rdquo;
                </p>
                <p className="mt-5 text-sm font-semibold text-gold-400">
                  {active.name}
                </p>
                <p className="text-xs text-cream-300/60">{active.meta}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Testimoni sebelumnya"
              className="rounded-full border border-cream-100/20 p-2 text-cream-100 transition-colors hover:border-gold-500 hover:text-gold-500"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Lihat testimoni ${testimonial.name}`}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-6 bg-gold-500"
                      : "w-2 bg-cream-100/25 hover:bg-cream-100/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Testimoni berikutnya"
              className="rounded-full border border-cream-100/20 p-2 text-cream-100 transition-colors hover:border-gold-500 hover:text-gold-500"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
