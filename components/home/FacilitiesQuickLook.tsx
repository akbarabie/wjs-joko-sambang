"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { SpaceItem } from "@/lib/facilities-data";

// Teks ringkas khusus halaman depan, sengaja lebih pendek daripada teks di
// halaman Facilities. Fotonya tidak ditulis di sini, melainkan diambil dari
// data ruang yang sama dengan halaman Facilities, supaya sekali ganti foto
// di Studio kedua halaman ikut berubah.
const FACILITIES_PREVIEW = [
  {
    id: "indoor",
    label: "Indoor Space",
    description: "Nyaman & sejuk dengan sentuhan kayu Jawa modern",
  },
  {
    id: "outdoor",
    label: "Outdoor Space",
    description: "Asri, hijau, dan sejuk khas pegunungan Batu",
  },
  {
    id: "vip-room",
    label: "VIP / Meeting Room",
    description: "Lengkap dengan proyektor dan sound system",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// Daftar ruang dikirim dari halaman, dipakai hanya untuk mengambil fotonya.
export function FacilitiesQuickLook({ ruang }: { ruang: SpaceItem[] }) {
  // Cocokkan tiap kartu pratinjau dengan ruang yang sesuai, lalu pakai foto
  // pertamanya. Kalau ruangnya belum ada di Sanity, kartunya dilewati supaya
  // tidak muncul kotak kosong.
  const facilities = FACILITIES_PREVIEW.map((pratinjau) => {
    const cocok = ruang.find((item) => item.id === pratinjau.id);
    return { ...pratinjau, image: cocok?.images?.[0]?.src };
  }).filter(
    // Penyaring ini sekaligus memberi tahu TypeScript bahwa setelah tahap
    // ini foto dipastikan ada, jadi tidak perlu diperiksa ulang di bawah.
    (item): item is (typeof item) & { image: string } => Boolean(item.image),
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="divider-accent justify-center text-xs font-semibold uppercase tracking-[0.4em] text-gold-600">
          Ruang & Fasilitas
        </p>
        <h2 className="font-heading mt-5 text-3xl font-semibold text-wood-800 sm:text-4xl">
          Ada Ruang untuk Setiap Momen
        </h2>
        <p className="mt-5 text-wood-500">
          Dari nongkrong santai, meeting kerja, hingga acara keluarga besar.
        </p>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {facilities.map((facility, index) => (
          <motion.div
            key={facility.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={index * 0.15}
          >
            <Link
              href="/facilities"
              className="group relative block aspect-[4/5] overflow-hidden rounded-3xl"
            >
              <Image
                src={facility.image}
                alt={facility.label}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wood-950/85 via-wood-950/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-heading text-xl font-semibold text-cream-100">
                  {facility.label}
                </h3>
                <p className="mt-1 text-sm text-cream-200/80">
                  {facility.description}
                </p>
              </div>
            </Link>
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
          href="/facilities"
          className="inline-flex items-center gap-2 rounded-full border border-wood-200 px-6 py-3 text-sm font-semibold text-wood-700 transition-colors hover:border-forest-500 hover:bg-forest-500 hover:text-cream-100"
        >
          Lihat Semua Fasilitas
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </section>
  );
}
