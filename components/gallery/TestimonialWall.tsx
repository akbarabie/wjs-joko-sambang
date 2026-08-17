"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/testimonials-data";
import { TiltCard } from "@/components/ui/TiltCard";
import { CONTACT } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function TestimonialWall() {
  return (
    <section
      id="testimoni"
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
            Testimoni
          </p>
          <h2 className="font-heading mt-5 text-3xl font-semibold text-cream-100 sm:text-4xl">
            Kata Pengunjung Kami
          </h2>
          <p className="mt-5 text-cream-200/70">
            Ulasan asli yang ditinggalkan pengunjung di Google Maps.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={index * 0.12}
            >
              <TiltCard maxTilt={6} className="h-full">
                <div className="flex h-full flex-col rounded-[1.75rem] border border-cream-100/10 bg-wood-800/70 p-7 shadow-xl shadow-wood-950/30">
                  {/* Tanda kutip diangkat sedikit ke depan supaya kartunya
                      terasa punya kedalaman waktu dimiringkan. */}
                  <Quote
                    style={{ transform: "translateZ(35px)" }}
                    className="h-7 w-7 text-gold-500/50"
                    aria-hidden="true"
                  />

                  <div className="mt-5 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-4 w-4 fill-gold-500 text-gold-500"
                        aria-hidden="true"
                      />
                    ))}
                    <span className="sr-only">
                      Rating {testimonial.rating} dari 5
                    </span>
                  </div>

                  <p className="mt-5 flex-1 leading-relaxed text-cream-200/85">
                    {testimonial.quote}
                  </p>

                  <div className="mt-7 border-t border-cream-100/10 pt-5">
                    <p className="text-sm font-semibold text-gold-400">
                      {testimonial.name}
                    </p>
                    <p className="mt-0.5 text-xs text-cream-200/50">
                      {testimonial.meta}
                    </p>
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
          className="mt-14 flex justify-center"
        >
          <Link
            href={CONTACT.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cream-100/25 px-6 py-3 text-sm font-semibold text-cream-100 transition-colors hover:border-gold-500 hover:bg-gold-500 hover:text-wood-900"
          >
            <MapPin className="h-4 w-4" />
            Baca Ulasan Lain di Google Maps
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
