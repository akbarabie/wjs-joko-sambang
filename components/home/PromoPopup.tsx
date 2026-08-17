"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Sparkles, X } from "lucide-react";
import { PROMO_POPUP } from "@/lib/promo-data";
import { WEDDING_PACKAGES } from "@/lib/wedding-data";

// Awalan kunci penyimpanan di browser. Digabung dengan id promo, jadi begitu
// promonya berganti id, popup otomatis muncul lagi untuk semua pengunjung.
const STORAGE_PREFIX = "wjs-promo-";

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const storageKey = `${STORAGE_PREFIX}${PROMO_POPUP.id}`;

  const tutup = useCallback(() => {
    setIsOpen(false);
    try {
      // Simpan waktu penutupan, bukan sekadar penanda "sudah dilihat", supaya
      // popup bisa muncul lagi setelah jeda yang ditentukan di promo-data.
      window.localStorage.setItem(storageKey, String(Date.now()));
    } catch {
      // Sebagian browser memblokir localStorage pada mode privat. Kalau gagal,
      // biarkan saja: popup tetap tertutup untuk kunjungan ini.
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
      // Kalau localStorage tidak bisa dibaca, tetap tampilkan promonya.
      bolehTampil = true;
    }

    if (!bolehTampil) return;

    const timer = window.setTimeout(() => setIsOpen(true), PROMO_POPUP.delayMs);
    return () => window.clearTimeout(timer);
  }, [storageKey]);

  // Tombol Esc untuk menutup, dan scroll halaman dikunci selama popup terbuka
  // supaya latar belakangnya tidak ikut bergeser.
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
          // Klik di area gelap mana saja akan menutup popup.
          onClick={tutup}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-wood-950/85 p-4 backdrop-blur-sm sm:p-8"
        >
          {/* Tombol tutup ditaruh di lapisan overlay, bukan di dalam kartu,
              supaya tetap terlihat walau isi kartunya perlu di-scroll pada
              layar HP yang pendek. */}
          <button
            type="button"
            onClick={tutup}
            aria-label="Tutup promo"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-cream-100/25 bg-wood-950/60 text-cream-100 backdrop-blur-md transition-colors hover:bg-cream-100/15 sm:right-8 sm:top-8"
          >
            <X className="h-5 w-5" />
          </button>

          <motion.div
            // Masuk dengan sedikit putaran pada sumbu X sehingga terasa
            // "berdiri" dari kejauhan, bukan sekadar membesar di tempat.
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
            // Klik di dalam kartu tidak ikut menutup popup.
            onClick={(event) => event.stopPropagation()}
            style={{ transformStyle: "preserve-3d", perspective: 1200 }}
            className="relative max-h-[86dvh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-[1.75rem] bg-wood-900 shadow-2xl shadow-wood-950/60 sm:rounded-[2rem]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-[0.9fr_1.1fr]">
              {/* Kolom gambar promo */}
              <div className="relative aspect-[2/1] w-full sm:aspect-auto sm:h-full sm:min-h-[420px]">
                <Image
                  src={PROMO_POPUP.image}
                  alt={PROMO_POPUP.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wood-950/70 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-wood-900/80" />
              </div>

              {/* Kolom teks */}
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

                {/* Ringkasan harga diambil langsung dari data paket wedding,
                    jadi kalau harganya berubah di satu tempat, popup ikut
                    menyesuaikan tanpa perlu diedit lagi. */}
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

                {/* Tombol aksi dibuat menempel di dasar kartu. Pada HP dengan
                    layar pendek isi kartu perlu di-scroll, dan cara ini
                    memastikan tombolnya tetap terlihat tanpa harus scroll
                    dulu. Di layar besar tidak ada efeknya karena isinya
                    memang sudah muat. */}
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
