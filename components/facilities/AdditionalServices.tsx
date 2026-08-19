"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type {
  HighlightService,
  SupportFacility,
} from "@/lib/facilities-data";
import { FacilityIcon } from "@/components/facilities/FacilityIcon";
import { TiltCard } from "@/components/ui/TiltCard";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// Layanan dan fasilitas dikirim dari halaman, yang mengambilnya dari Sanity.
export function AdditionalServices({
  layanan,
  penunjang,
}: {
  layanan: HighlightService[];
  penunjang: SupportFacility[];
}) {
  return (
    <section className="bg-cream-200/60 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="divider-accent justify-center text-xs font-semibold uppercase tracking-[0.4em] text-gold-600">
            Additional Services
          </p>
          <h2 className="font-heading mt-5 text-3xl font-semibold text-wood-800 sm:text-4xl">
            Hal Kecil yang Bikin Betah
          </h2>
          <p className="mt-5 text-wood-500">
            Bukan cuma soal tempat duduk. Fasilitas penunjangnya juga disiapkan
            supaya kunjungan terasa lengkap.
          </p>
        </motion.div>

        {/* Dua layanan utama ditampilkan besar dengan foto */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {layanan.map((service, index) => (
            <motion.div
              key={service.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              custom={index * 0.15}
            >
              <TiltCard maxTilt={6} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-[2rem] bg-wood-900 shadow-xl shadow-wood-900/20">
                  <div className="relative aspect-[16/11] w-full">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wood-950/95 via-wood-950/45 to-transparent" />
                  </div>

                  <div
                    style={{ transform: "translateZ(40px)" }}
                    className="absolute inset-x-0 bottom-0 p-7"
                  >
                    <h3 className="font-heading text-2xl font-semibold text-cream-100">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream-200/80">
                      {service.description}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Fasilitas penunjang lain, cukup ditampilkan ringkas dengan icon */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {penunjang.map((facility, index) => (
            <motion.div
              key={facility.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={index * 0.08}
              whileHover={{ y: -6, rotateX: 6 }}
              style={{ transformStyle: "preserve-3d", perspective: 800 }}
              className="rounded-2xl border border-wood-100 bg-cream-100 p-6 text-center shadow-sm transition-shadow hover:shadow-lg hover:shadow-wood-900/10"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-500/10">
                <FacilityIcon
                  name={facility.icon}
                  className="h-5 w-5 text-forest-500"
                />
              </span>
              <p className="mt-4 font-semibold text-wood-700">{facility.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-wood-400">
                {facility.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
