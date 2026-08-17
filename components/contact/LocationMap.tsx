"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Car, Navigation } from "lucide-react";
import { CONTACT } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const PATOKAN = [
  "Berada di Jl. Trunojoyo, kawasan Junrejo, Kota Batu",
  "Sekitar 10 menit berkendara dari pusat Kota Batu",
  "Halaman parkir luas tersedia di area depan cafe",
];

// URL embed Google Maps dengan titik pin merah spesifik & zoom terfokus (z=16)
const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=WJS+Joko+Sambang+Caf%C3%A9,+Jl.+Trunojoyo,+Junrejo,+Kota+Batu&t=&z=16&ie=UTF8&iwloc=B&output=embed";

export function LocationMap() {
  return (
    <section
      id="lokasi"
      className="scroll-mt-24 bg-cream-DEFAULT px-6 pb-24 sm:pb-28"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14"
        >
          {/* Kolom Informasi Lokasi & Petunjuk Rute */}
          <div>
            <p className="divider-accent text-xs font-semibold uppercase tracking-[0.4em] text-gold-600">
              Lokasi
            </p>
            <h2 className="font-heading mt-5 text-3xl font-semibold text-wood-800 sm:text-4xl">
              Gampang Ditemukan
            </h2>
            <p className="mt-5 leading-relaxed text-wood-500">
              {CONTACT.address.full}
            </p>

            <ul className="mt-7 space-y-3">
              {PATOKAN.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-500/10">
                    <Car className="h-3 w-3 text-forest-500" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-wood-600">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href={CONTACT.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest-500 px-6 py-3.5 text-sm font-semibold text-cream-100 shadow-md transition-all hover:scale-[1.03] hover:bg-forest-600"
            >
              <Navigation className="h-4 w-4" />
              Buka Rute di Google Maps
            </Link>
          </div>

          {/* Kartu Peta dengan Efek 3D Card & Pin Spesifik */}
          <motion.div
            whileHover={{ rotateY: -3, rotateX: 2, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            style={{ transformStyle: "preserve-3d", perspective: 1200 }}
            className="relative overflow-hidden rounded-[2rem] border border-wood-200/80 shadow-2xl shadow-wood-900/15"
          >

            {/* Iframe Google Maps terfokus pada titik Cafe */}
            <iframe
              src={MAPS_EMBED_URL}
              title="Peta lokasi WJS Joko Sambang Café"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-[340px] w-full border-0 sm:h-[420px]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}