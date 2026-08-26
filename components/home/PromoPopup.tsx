"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Sparkles, X } from "lucide-react";
import type { PromoPopupData } from "@/lib/promo-data";

const STORAGE_PREFIX = "wjs-promo-";
const JEDA_GESER_BAWAAN_MS = 5000;

// Isi promo dikirim dari halaman, yang mengambilnya dari Sanity.
//
// Dipecah jadi dua bagian dengan sengaja. Pembungkus di bawah ini yang
// memeriksa apakah popup dan setidaknya satu kartu promo memang ada.
// Kalau dokumen promo belum dibuat, dimatikan, atau daftar promonya
// kosong, popup langsung tidak dirender sama sekali. Isi komponennya
// baru dijalankan setelah datanya dipastikan ada, supaya pemeriksaan
// riwayat tutup popup di dalamnya tidak perlu ikut memikirkan
// kemungkinan data kosong.
export function PromoPopup({ promo }: { promo: PromoPopupData | null }) {
  if (!promo || !promo.aktif) return null;
  if (!promo.daftarPromo || promo.daftarPromo.length === 0) return null;
  return <PromoPopupIsi promo={promo} />;
}

function PromoPopupIsi({ promo }: { promo: PromoPopupData }) {
  const daftarPromo = promo.daftarPromo;
  const adaLebihDariSatu = daftarPromo.length > 1;

  const [isOpen, setIsOpen] = useState(false);
  const [slideAktif, setSlideAktif] = useState(0);
  const [dijedaHover, setDijedaHover] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Kunci penyimpanan digabung dari semua kode promo yang sedang aktif.
  // Jadi kalau admin mengganti salah satu promo, menambah, atau
  // menghapus kartu, gabungan kodenya ikut berubah dan popup akan
  // muncul lagi untuk pengunjung yang sudah pernah menutup versi lama.
  const storageKey = `${STORAGE_PREFIX}${daftarPromo.map((slide) => slide.id).join("-")}`;

  const tutup = useCallback(() => {
    setIsOpen(false);
    try {
      window.localStorage.setItem(storageKey, String(Date.now()));
    } catch {
      // Ignore localStorage error in private mode
    }
  }, [storageKey]);

  useEffect(() => {
    let bolehTampil = true;

    // Mode "setiap kunjungan" sengaja melewati pengecekan riwayat tutup
    // di localStorage sama sekali, jadi popup selalu muncul lagi setiap
    // kali pengunjung membuka halaman Home, tidak peduli kapan terakhir
    // ditutup.
    if (promo.modeMunculUlang !== "setiapKunjungan") {
      try {
        const terakhirDitutup = window.localStorage.getItem(storageKey);
        if (terakhirDitutup) {
          const selisihMs = Date.now() - Number(terakhirDitutup);
          bolehTampil = selisihMs >= promo.jedaTampilMs;
        }
      } catch {
        bolehTampil = true;
      }
    }

    if (!bolehTampil) return;

    const timer = window.setTimeout(() => setIsOpen(true), promo.delayMs);
    return () => window.clearTimeout(timer);
    // Nilai promo ikut didaftarkan karena datangnya dari Sanity dan bisa
    // berubah kapan saja lewat Studio, tidak lagi berupa nilai tetap.
  }, [storageKey, promo.delayMs, promo.jedaTampilMs, promo.modeMunculUlang]);

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

  // Geser otomatis ke kartu promo berikutnya setiap beberapa detik.
  // Berhenti sejenak saat kursor sedang di atas popup, supaya pengunjung
  // yang lagi baca tidak keburu terlempar ke kartu lain.
  useEffect(() => {
    if (!isOpen || !adaLebihDariSatu || dijedaHover) return;

    const jeda =
      promo.jedaGeserMs && promo.jedaGeserMs >= 1000
        ? promo.jedaGeserMs
        : JEDA_GESER_BAWAAN_MS;

    const timer = window.setInterval(() => {
      setSlideAktif((sebelumnya) => (sebelumnya + 1) % daftarPromo.length);
    }, jeda);

    return () => window.clearInterval(timer);
  }, [isOpen, adaLebihDariSatu, dijedaHover, daftarPromo.length, promo.jedaGeserMs]);

  const slide = daftarPromo[slideAktif] ?? daftarPromo[0];

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
          onMouseEnter={() => setDijedaHover(true)}
          onMouseLeave={() => setDijedaHover(false)}
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
            className="scrollbar-hide relative max-h-[86dvh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-[1.75rem] bg-wood-900 shadow-2xl shadow-wood-950/60 sm:rounded-[2rem]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.1fr]">
              {/* Kolom Gambar Promo (Background Transparan & Ukuran Pas) */}
              <div className="relative flex min-h-[380px] w-full items-center justify-center overflow-hidden p-3 sm:min-h-[500px] sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 45vw"
                      className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)]"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Kolom Teks Informasi */}
              <div className="flex flex-col justify-center overflow-hidden p-6 sm:p-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <span
                      style={{ transform: "translateZ(40px)" }}
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-gold-500 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-wood-900"
                    >
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      {slide.badge}
                    </span>

                    <h2
                      id="judul-promo"
                      className="font-heading mt-5 text-3xl font-semibold text-cream-100 sm:text-4xl"
                    >
                      {slide.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-cream-200/75">
                      {slide.subtitle}
                    </p>

                    {/* Ringkasan Harga, tampil hanya kalau promonya memang punya rincian harga */}
                    {slide.chipHarga.length > 0 ? (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {slide.chipHarga.map((chip) => (
                          <div
                            key={chip.kode}
                            className="rounded-xl border border-cream-100/15 bg-cream-100/5 px-3.5 py-2"
                          >
                            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-gold-400">
                              {chip.kode}
                            </p>
                            <p className="mt-0.5 text-sm font-semibold text-cream-100">
                              {chip.harga}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {/* Poin Benefit */}
                    {slide.poin.length > 0 ? (
                      <ul className="mt-6 space-y-2">
                        {slide.poin.map((poin) => (
                          <li key={poin} className="flex items-start gap-2.5">
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold-500/20">
                              <Check className="h-2.5 w-2.5 text-gold-400" aria-hidden="true" />
                            </span>
                            <span className="text-xs text-cream-200/70">{poin}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {/* Tombol Aksi Sticky */}
                    <div className="sticky bottom-0 mt-7 bg-wood-900 pb-1 pt-3">
                      <Link
                        href={slide.ctaHref}
                        onClick={tutup}
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-wood-900 transition-colors hover:bg-gold-400"
                      >
                        {slide.ctaLabel}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>

                      {slide.catatan ? (
                        <p className="mt-3 text-center text-[0.65rem] leading-relaxed text-cream-200/45">
                          {slide.catatan}
                        </p>
                      ) : null}
                      <p className="mt-1 text-center text-[0.65rem] text-cream-200/35">
                        Ketuk di luar kotak ini untuk menutup
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Indikator Titik, tampil hanya kalau promonya lebih dari satu */}
            {adaLebihDariSatu ? (
              <div className="flex items-center justify-center gap-2 pb-5 pt-1 sm:pb-6">
                {daftarPromo.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSlideAktif(index)}
                    aria-label={`Lihat promo ${item.title}`}
                    aria-current={index === slideAktif}
                    className={`h-1.5 rounded-full transition-all ${
                      index === slideAktif
                        ? "w-6 bg-gold-500"
                        : "w-1.5 bg-cream-100/25 hover:bg-cream-100/40"
                    }`}
                  />
                ))}
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
