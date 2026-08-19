"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Sparkles, X } from "lucide-react";
import type { PromoPopupData } from "@/lib/promo-data";
import { WEDDING_PACKAGES } from "@/lib/wedding-data";

const STORAGE_PREFIX = "wjs-promo-";

// Isi promo dikirim dari halaman, yang mengambilnya dari Sanity.
//
// Dipecah jadi dua bagian dengan sengaja. Pembungkus di bawah ini yang
// memeriksa apakah promonya ada. Kalau dokumen promo belum dibuat atau
// dihapus dari Studio, popup langsung tidak dirender sama sekali. Isi
// komponennya baru dijalankan setelah datanya dipastikan ada, supaya
// pemeriksaan riwayat tutup popup di dalamnya tidak perlu ikut memikirkan
// kemungkinan data kosong.
export function PromoPopup({ promo }: { promo: PromoPopupData | null }) {
  if (!promo) return null;
  return <PromoPopupIsi promo={promo} />;
}

function PromoPopupIsi({ promo }: { promo: PromoPopupData }) {
  const PROMO_POPUP = promo;
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const storageKey = `${STORAGE_PREFIX}${PROMO_POPUP.id}`;

  const tutup = useCallback(() => {
    setIsOpen(false);
    try {
      window.localStorage.setItem(storageKey, String(Date.now()));
    } catch {
      // Ignore localStorage error in private mode
    }
  }, [storageKey]);

  useEffect(() => {
    if (!PROMO_POPUP.aktif) return;

    let bolehTampil = true;
    try {
      const terakhirDitutup = window.localStorage.getItem(storageKey);
      if (terakhirDitutup) {
        const selisihJam =
          (Date.now() - Number(terakhirDitutup)) / (1000 * 60 * 60);
        bolehTampil = selisihJam >= PROMO_POPUP.jedaTampilJam;
      }
    } catch {
      bolehTampil = true;
    }

    if (!bolehTampil) return;

    const timer = window.setTimeout(() => setIsOpen(true), PROMO_POPUP.delayMs);
    return () => window.clearTimeout(timer);
    // Nilai promo ikut didaftarkan karena sekarang datangnya dari Sanity dan
    // bisa berubah, tidak lagi berupa nilai tetap seperti waktu masih di file.
  }, [
    storageKey,
    PROMO_POPUP.aktif,
    PROMO_POPUP.delayMs,
    PROMO_POPUP.jedaTampilJam,
  ]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") tutup();
    }

    window.addEventListener("keydown", handleKeyDown);
    const overflowSebelumnya = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflowSebelumnya;
    };
  }, [isOpen, tutup]);

  if (!PROMO_POPUP.aktif) return null;

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="judul-promo"
          onClick={tutup}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-wood-950/85 p-4 backdrop-blur-sm sm:p-8"
        >
          {/* Tombol Tutup */}
          <button
            type="button"
            onClick={tutup}
            aria-label="Tutup promo"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-cream-100/25 bg-wood-950/60 text-cream-100 backdrop-blur-md transition-colors hover:bg-cream-100/15 sm:right-8 sm:top-8"
          >
            <X className="h-5 w-5" />
          </button>

          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.9, rotateX: 14, y: 40 }
            }
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.94, rotateX: 8 }
            }
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            style={{ transformStyle: "preserve-3d", perspective: 1200 }}
            className="relative max-h-[86dvh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-[1.75rem] bg-wood-900 shadow-2xl shadow-wood-950/60 sm:rounded-[2rem]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.1fr]">
              {/* Kolom Gambar Promo (Background Transparan & Ukuran Pas) */}
              <div className="relative flex min-h-[380px] w-full items-center justify-center p-3 sm:min-h-[500px] sm:p-6">
                <div className="relative h-full w-full">
                  <Image
                    src={PROMO_POPUP.image}
                    alt={PROMO_POPUP.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 45vw"
                    className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)]"
                    priority
                  />
                </div>
              </div>

              {/* Kolom Teks Informasi */}
              <div className="flex flex-col justify-center p-6 sm:p-9">
                <span
                  style={{ transform: "translateZ(40px)" }}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-gold-500 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-wood-900"
                >
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  {PROMO_POPUP.badge}
                </span>

                <h2
                  id="judul-promo"
                  className="font-heading mt-5 text-3xl font-semibold text-cream-100 sm:text-4xl"
                >
                  {PROMO_POPUP.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-cream-200/75">
                  {PROMO_POPUP.subtitle}
                </p>

                {/* Ringkasan Harga Paket */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {WEDDING_PACKAGES.map((paket) => (
                    <div
                      key={paket.id}
                      className="rounded-xl border border-cream-100/15 bg-cream-100/5 px-3.5 py-2"
                    >
                      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-gold-400">
                        Paket {paket.kode}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-cream-100">
                        {paket.price}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Poin Benefit */}
                <ul className="mt-6 space-y-2">
                  {PROMO_POPUP.poin.map((poin) => (
                    <li key={poin} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold-500/20">
                        <Check className="h-2.5 w-2.5 text-gold-400" aria-hidden="true" />
                      </span>
                      <span className="text-xs text-cream-200/70">{poin}</span>
                    </li>
                  ))}
                </ul>

                {/* Tombol Aksi Sticky */}
                <div className="sticky bottom-0 mt-7 bg-wood-900 pb-1 pt-3">
                  <Link
                    href={PROMO_POPUP.ctaHref}
                    onClick={tutup}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-wood-900 transition-colors hover:bg-gold-400"
                  >
                    {PROMO_POPUP.ctaLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <p className="mt-3 text-center text-[0.65rem] leading-relaxed text-cream-200/45">
                    {PROMO_POPUP.catatan}
                  </p>
                  <p className="mt-1 text-center text-[0.65rem] text-cream-200/35">
                    Ketuk di luar kotak ini untuk menutup
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}