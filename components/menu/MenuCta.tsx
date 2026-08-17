"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { CONTACT, buildWhatsAppLink } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const PESAN_MENU =
  "Halo WJS Joko Sambang Café, saya ingin memesan menu. Boleh dibantu info menu lengkap dan ketersediaannya?";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function MenuCta() {
  return (
    <section className="px-6 py-24 sm:py-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={fadeUp}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-forest-500 px-8 py-16 text-center sm:px-14"
      >
        {/* Aksen lingkaran samar sebagai pengganti foto, supaya blok penutup
            tetap punya kedalaman tanpa menambah beban gambar baru. */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-500/15 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-gold-400/10 blur-3xl"
          aria-hidden="true"
        />

        <p className="divider-accent justify-center text-xs font-semibold uppercase tracking-[0.4em] text-gold-300">
          Siap Memesan
        </p>
        <h2 className="font-heading mx-auto mt-6 max-w-2xl text-3xl font-semibold text-cream-100 sm:text-4xl">
          Lapar Duluan Lihat Menunya?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-cream-200/80">
          Hubungi admin kami untuk memesan menu, menanyakan ketersediaan, atau
          menyusun paket untuk acaramu.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={buildWhatsAppLink(PESAN_MENU)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-wood-900 transition-transform hover:scale-[1.03] hover:bg-gold-400"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pesan via WhatsApp
          </Link>
          <Link
            href={CONTACT.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-100/30 bg-cream-100/10 px-7 py-3.5 text-sm font-semibold text-cream-100 backdrop-blur-sm transition-transform hover:scale-[1.03] hover:bg-cream-100/20"
          >
            <MapPin className="h-4 w-4" />
            Datang Langsung
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
