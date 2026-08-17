"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Heart, MessageCircle, RotateCcw, Utensils } from "lucide-react";
import {
  WEDDING_FACILITIES,
  WEDDING_PACKAGES,
  WEDDING_TERMS,
} from "@/lib/wedding-data";
import { FacilityIcon } from "@/components/facilities/FacilityIcon";
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

const PESAN_KONSULTASI =
  "Halo WJS Joko Sambang Café, saya ingin konsultasi gratis untuk Wedding Package. Boleh dibantu info ketersediaan tanggal dan detail paketnya?";

/**
 * Satu kartu paket wedding yang bisa dibalik.
 *
 * Sisi depan menampilkan harga dan ringkasan komposisi, sisi belakang berisi
 * rincian hidangan. Dipisah jadi komponen sendiri karena tiap kartu menyimpan
 * status terbalik atau tidaknya masing-masing, dan hook tidak boleh dipanggil
 * di dalam perulangan.
 */
function WeddingCard({
  paket,
  index,
}: {
  paket: (typeof WEDDING_PACKAGES)[number];
  index: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const pesan = `Halo WJS Joko Sambang Café, saya tertarik dengan ${paket.name} Package ${paket.kode} (${paket.price} per pax). Boleh minta info lengkapnya?`;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      custom={index * 0.12}
      style={{ perspective: 1600 }}
      className="h-[620px]"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {/* ---------- Sisi depan ---------- */}
        <div
          style={{
            backfaceVisibility: "hidden",
            // Sisi yang sedang membelakangi pengguna dimatikan klik-nya secara
            // eksplisit. backfaceVisibility hanya menyembunyikan tampilannya,
            // tapi tombol di baliknya masih bisa tertekan tanpa disadari.
            pointerEvents: isFlipped ? "none" : "auto",
          }}
          aria-hidden={isFlipped}
          className={cn(
            "absolute inset-0 flex flex-col overflow-hidden rounded-[1.75rem] bg-cream-100 shadow-xl",
            paket.isHighlighted
              ? "border-2 border-gold-500 shadow-gold-900/15"
              : "border border-wood-100 shadow-wood-900/10",
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
            <div className="absolute inset-0 bg-gradient-to-t from-wood-950/85 via-wood-950/25 to-transparent" />

            <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream-100/30 bg-wood-950/50 backdrop-blur-md">
              <span className="font-heading text-lg font-semibold text-gold-400">
                {paket.kode}
              </span>
            </div>

            {paket.isHighlighted ? (
              <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3.5 py-1.5">
                <Heart
                  className="h-3 w-3 fill-wood-900 text-wood-900"
                  aria-hidden="true"
                />
                <span className="text-[0.65rem] font-bold uppercase tracking-wider text-wood-900">
                  Paling Dipilih
                </span>
              </div>
            ) : null}

            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-heading text-2xl font-semibold text-cream-100">
                {paket.name}
              </h3>
              <p className="text-xs uppercase tracking-[0.25em] text-cream-200/70">
                Package {paket.kode}
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <div>
              <p className="font-heading text-3xl font-semibold text-forest-500">
                {paket.price}
              </p>
              <p className="text-xs text-wood-400">{paket.unit}</p>
            </div>

            <ul className="mt-6 flex-1 space-y-2.5">
              {paket.komposisi.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-forest-500/10 text-sm font-bold text-forest-500">
                    {item.jumlah}
                  </span>
                  <span className="text-sm text-wood-600">{item.label}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setIsFlipped(true)}
              className={cn(
                "mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors",
                paket.isHighlighted
                  ? "bg-gold-500 text-wood-900 hover:bg-gold-400"
                  : "border border-wood-200 text-wood-700 hover:border-forest-500 hover:bg-forest-500 hover:text-cream-100",
              )}
            >
              <Utensils className="h-4 w-4" />
              Lihat Rincian Menu
            </button>
          </div>
        </div>

        {/* ---------- Sisi belakang ---------- */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            pointerEvents: isFlipped ? "auto" : "none",
          }}
          aria-hidden={!isFlipped}
          className={cn(
            "absolute inset-0 flex flex-col overflow-hidden rounded-[1.75rem] bg-wood-900 p-6 shadow-xl shadow-wood-950/40",
            paket.isHighlighted
              ? "border-2 border-gold-500"
              : "border border-cream-100/10",
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold-400">
                Package {paket.kode}
              </p>
              <h3 className="font-heading mt-1 text-xl font-semibold text-cream-100">
                {paket.name}
              </h3>
            </div>
            <span className="shrink-0 rounded-full bg-forest-500/25 px-3 py-1.5 text-xs font-semibold text-cream-100">
              {paket.price}
            </span>
          </div>

          <p className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-cream-200/45">
            Rincian Hidangan
          </p>

          {/* Dua kolom supaya daftar yang panjang tetap muat tanpa perlu
              di-scroll di dalam kartu. */}
          <ul className="mt-3 flex-1 columns-2 gap-4 content-start">
            {paket.hidangan.map((item) => (
              <li
                key={item}
                className="mb-2 flex break-inside-avoid items-start gap-2"
              >
                <Check
                  className="mt-0.5 h-3 w-3 shrink-0 text-gold-400"
                  aria-hidden="true"
                />
                <span className="text-[0.8rem] leading-snug text-cream-200/85">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-1.5 border-t border-cream-100/10 pt-4">
            {paket.komposisi.map((item) => (
              <span
                key={item.label}
                className="rounded-full bg-cream-100/5 px-2.5 py-1 text-[0.7rem] text-cream-200/70"
              >
                {item.jumlah} {item.label}
              </span>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-100/25 px-4 py-2.5 text-xs font-semibold text-cream-100 transition-colors hover:bg-cream-100/10"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Kembali
            </button>
            <Link
              href={buildWhatsAppLink(pesan)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-500 px-4 py-2.5 text-xs font-semibold text-wood-900 transition-colors hover:bg-gold-400"
            >
              Tanya Paket Ini
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function WeddingPackageSection() {
  return (
    <section
      id="wedding"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-cream-100 via-cream-200/50 to-cream-100 px-6 py-24 sm:py-28"
    >
      {/* Aksen cahaya samar supaya section ini terasa berbeda dari paket
          reguler di atasnya, tanpa perlu menambah foto latar baru. */}
      <div
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-24 h-80 w-80 rounded-full bg-forest-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-100/60 px-4 py-1.5">
            <Heart className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-700">
              Wedding Package
            </span>
          </span>

          <h2 className="font-heading mt-6 text-3xl font-semibold text-wood-800 sm:text-4xl">
            Rayakan Hari Bahagia di Tengah Kebun
          </h2>
          <p className="mt-5 text-wood-500">
            Tiga pilihan paket dengan venue indoor dan outdoor, latar kebun dan
            pegunungan Kota Batu. Balik kartunya untuk melihat rincian menunya.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-3">
          {WEDDING_PACKAGES.map((paket, index) => (
            <WeddingCard key={paket.id} paket={paket} index={index} />
          ))}
        </div>

        {/* ---------- Fasilitas venue ---------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="mt-16 rounded-[2rem] bg-wood-900 p-8 sm:p-11"
        >
          <div className="text-center">
            <p className="divider-accent justify-center text-xs font-semibold uppercase tracking-[0.4em] text-gold-400">
              Venue Facilities
            </p>
            <h3 className="font-heading mt-5 text-2xl font-semibold text-cream-100 sm:text-3xl">
              Sudah Termasuk di Semua Paket
            </h3>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WEDDING_FACILITIES.map((fasilitas, index) => (
              <motion.div
                key={fasilitas.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={(index % 4) * 0.07}
                whileHover={{ y: -6, rotateX: 7 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                style={{ transformStyle: "preserve-3d", perspective: 800 }}
                className="rounded-2xl border border-cream-100/10 bg-cream-100/5 p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/15">
                  <FacilityIcon
                    name={fasilitas.icon}
                    className="h-4 w-4 text-gold-400"
                  />
                </span>
                <p className="mt-4 text-sm font-semibold leading-snug text-cream-100">
                  {fasilitas.label}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-cream-200/60">
                  {fasilitas.detail}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-6 border-t border-cream-100/10 pt-8 sm:flex-row sm:justify-between">
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {WEDDING_TERMS.map((syarat) => (
                <li
                  key={syarat}
                  className="flex items-center gap-2 text-xs text-cream-200/60"
                >
                  <span
                    className="h-1 w-1 rounded-full bg-gold-500"
                    aria-hidden="true"
                  />
                  {syarat}
                </li>
              ))}
            </ul>

            <Link
              href={buildWhatsAppLink(PESAN_KONSULTASI)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-wood-900 transition-transform hover:scale-[1.03] hover:bg-gold-400"
            >
              <MessageCircle className="h-4 w-4" />
              Konsultasi Gratis
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
