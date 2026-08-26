"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Users } from "lucide-react";
import type { SpaceItem } from "@/lib/facilities-data";
import { FacilityIcon } from "@/components/facilities/FacilityIcon";
import { TiltCard } from "@/components/ui/TiltCard";
import { buildWhatsAppLink } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// Toleransi (px) supaya tombol panah tidak berkedip nyala-mati persis di
// ujung akibat pembulatan angka scroll browser.
const TOLERANSI_UJUNG = 8;

// Daftar ruang privat dikirim dari halaman, yang mengambilnya dari Sanity.
//
// Dulu section ini pakai grid 2 kolom tetap, cukup untuk dua ruang. Sekarang
// jumlah ruang VIP dan Event Space bisa terus bertambah dari Studio, jadi
// tampilannya diubah jadi baris yang bisa digeser ke samping. Ukuran tiap
// kartu tetap proporsional berapa pun jumlah ruangnya, kelebihannya tinggal
// digeser, bukan bikin kartu menyusut atau section jadi sangat panjang ke
// bawah.
export function VipEventSpace({ ruang }: { ruang: SpaceItem[] }) {
  const trekRef = useRef<HTMLDivElement>(null);
  const [bisaKeKiri, setBisaKeKiri] = useState(false);
  const [bisaKeKanan, setBisaKeKanan] = useState(false);

  const perbaruiStatusPanah = useCallback(() => {
    const trek = trekRef.current;
    if (!trek) return;
    setBisaKeKiri(trek.scrollLeft > TOLERANSI_UJUNG);
    setBisaKeKanan(
      trek.scrollLeft + trek.clientWidth < trek.scrollWidth - TOLERANSI_UJUNG,
    );
  }, []);

  useEffect(() => {
    perbaruiStatusPanah();
    window.addEventListener("resize", perbaruiStatusPanah);
    return () => window.removeEventListener("resize", perbaruiStatusPanah);
    // ruang.length ikut didaftarkan supaya status panah dihitung ulang
    // begitu admin menambah atau mengurangi ruang dari Studio.
  }, [perbaruiStatusPanah, ruang.length]);

  function geser(arah: "kiri" | "kanan") {
    const trek = trekRef.current;
    if (!trek) return;

    const kartuPertama = trek.querySelector<HTMLElement>("[data-kartu-ruang]");
    const celah = parseFloat(window.getComputedStyle(trek).columnGap || "0");
    const lebarGeser = kartuPertama
      ? kartuPertama.offsetWidth + celah
      : trek.clientWidth * 0.85;

    trek.scrollBy({
      left: arah === "kanan" ? lebarGeser : -lebarGeser,
      behavior: "smooth",
    });
  }

  return (
    <section
      id="vip-event"
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
            VIP &amp; Event Space
          </p>
          <h2 className="font-heading mt-5 text-3xl font-semibold text-cream-100 sm:text-4xl">
            Ruang Privat untuk Agenda Penting
          </h2>
          <p className="mt-5 text-cream-200/70">
            Rapat kerja, presentasi klien, sampai acara puluhan tamu. Ruangnya
            bisa dipesan terpisah dari area umum.
          </p>
        </motion.div>

        <div
          ref={trekRef}
          onScroll={perbaruiStatusPanah}
          className="scrollbar-hide mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 sm:gap-8"
        >
          {ruang.map((space, index) => {
            const waMessage = `Halo WJS Joko Sambang Café, saya ingin menanyakan ketersediaan ${space.name} beserta paket harganya.`;

            return (
              <motion.div
                key={space.id}
                data-kartu-ruang
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                custom={index * 0.12}
                className="w-[82vw] shrink-0 snap-start sm:w-[400px] lg:w-[460px]"
              >
                <TiltCard maxTilt={6} className="h-full">
                  <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-cream-100/10 bg-wood-800/80 shadow-2xl shadow-wood-950/40">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={space.images[0].src}
                        alt={space.images[0].alt}
                        fill
                        sizes="(max-width: 640px) 82vw, (max-width: 1024px) 400px, 460px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-wood-950/85 via-wood-950/20 to-transparent" />

                      {/* Label kapasitas diangkat ke depan supaya terlihat
                          melayang di atas foto saat kartu dimiringkan. */}
                      <div
                        style={{ transform: "translateZ(50px)" }}
                        className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-cream-100/20 bg-wood-950/60 px-4 py-2 backdrop-blur-md"
                      >
                        <Users className="h-4 w-4 text-gold-400" aria-hidden="true" />
                        <span className="text-sm font-semibold text-cream-100">
                          {space.capacity}
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
                          {space.tagline}
                        </p>
                        <h3 className="font-heading mt-2 text-2xl font-semibold text-cream-100">
                          {space.name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      <p className="leading-relaxed text-cream-200/75">
                        {space.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {space.features.map((feature) => (
                          <span
                            key={feature.label}
                            className="inline-flex items-center gap-2 rounded-full border border-cream-100/15 bg-cream-100/5 px-3.5 py-1.5 text-xs font-medium text-cream-200/85"
                          >
                            <FacilityIcon
                              name={feature.icon}
                              className="h-3.5 w-3.5 text-gold-400"
                            />
                            {feature.label}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 border-t border-cream-100/10 pt-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cream-200/45">
                          Paling cocok untuk
                        </p>
                        <p className="mt-2 text-sm text-cream-200/75">
                          {space.bestFor.join(" · ")}
                        </p>
                      </div>

                      <Link
                        href={buildWhatsAppLink(waMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-wood-900 transition-colors hover:bg-gold-400"
                      >
                        Tanya Ketersediaan
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Tombol navigasi cukup ikon panah, muncul kalau ruangnya lebih
            dari satu. Nonaktif otomatis (jadi transparan) begitu sudah
            mentok di ujung kiri atau kanan, jadi tidak perlu titik
            indikator tambahan yang bikin ramai. */}
        {ruang.length > 1 ? (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => geser("kiri")}
              disabled={!bisaKeKiri}
              aria-label="Lihat ruang sebelumnya"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-100/20 text-cream-100 transition-colors hover:border-gold-500 hover:bg-gold-500 hover:text-wood-900 disabled:pointer-events-none disabled:opacity-25"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => geser("kanan")}
              disabled={!bisaKeKanan}
              aria-label="Lihat ruang berikutnya"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-100/20 text-cream-100 transition-colors hover:border-gold-500 hover:bg-gold-500 hover:text-wood-900 disabled:pointer-events-none disabled:opacity-25"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
