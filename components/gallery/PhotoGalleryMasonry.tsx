"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { GalleryPhoto } from "@/lib/events-data";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// Daftar foto dikirim dari halaman, yang mengambilnya dari Sanity.
export function PhotoGalleryMasonry({ foto }: { foto: GalleryPhoto[] }) {
  // null berarti lightbox sedang tertutup.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const goTo = useCallback(
    (step: number) => {
      setActiveIndex((current) => {
        if (current === null) return current;
        const total = foto.length;
        return (((current + step) % total) + total) % total;
      });
    },
    // Jumlah foto ikut didaftarkan karena admin bisa menambah atau menghapus
    // foto galeri lewat Studio.
    [foto.length],
  );

  // Navigasi lewat keyboard: panah kiri/kanan untuk pindah foto, Esc untuk
  // menutup. Penting supaya lightbox tetap bisa dipakai tanpa mouse.
  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") goTo(1);
      if (event.key === "ArrowLeft") goTo(-1);
    }

    window.addEventListener("keydown", handleKeyDown);

    // Kunci scroll halaman selama lightbox terbuka supaya latar belakangnya
    // tidak ikut bergeser saat pengguna men-scroll di dalam modal.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, closeLightbox, goTo]);

  const activePhoto = activeIndex === null ? null : foto[activeIndex];

  return (
    <section
      id="galeri"
      className="scroll-mt-24 bg-cream-200/60 px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="divider-accent justify-center text-xs font-semibold uppercase tracking-[0.4em] text-gold-600">
            Galeri Foto
          </p>
          <h2 className="font-heading mt-5 text-3xl font-semibold text-wood-800 sm:text-4xl">
            Lihat Lebih Dekat
          </h2>
          <p className="mt-5 text-wood-500">
            Klik salah satu foto untuk melihat versi besarnya.
          </p>
        </motion.div>

        {/* Layout masonry pakai CSS columns. Dipilih karena tinggi tiap foto
            berbeda-beda, dan cara ini tidak butuh perhitungan JavaScript
            sehingga tetap ringan saat halaman pertama kali dibuka. */}
        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {foto.map((photo, index) => (
            <motion.button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              custom={(index % 3) * 0.1}
              whileHover={{ y: -6, rotateX: 5, rotateY: -3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              style={{ transformStyle: "preserve-3d", perspective: 900 }}
              className={cn(
                "group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-wood-800 shadow-md shadow-wood-900/10",
                photo.orientation === "portrait"
                  ? "aspect-[4/5]"
                  : "aspect-[4/3]",
              )}
              aria-label={`Perbesar foto ${photo.caption}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-wood-950/80 via-wood-950/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                <span className="text-sm font-semibold text-cream-100">
                  {photo.caption}
                </span>
                <Maximize2 className="h-4 w-4 text-gold-400" aria-hidden="true" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activePhoto ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Foto ${activePhoto.caption}`}
            onClick={closeLightbox}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-wood-950/92 p-4 backdrop-blur-sm sm:p-8"
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Tutup foto"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-cream-100/20 text-cream-100 transition-colors hover:bg-cream-100/10 sm:right-8 sm:top-8"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                // Hentikan penjalaran klik supaya tidak ikut menutup lightbox.
                event.stopPropagation();
                goTo(-1);
              }}
              aria-label="Foto sebelumnya"
              className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream-100/20 text-cream-100 transition-colors hover:bg-cream-100/10 sm:left-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goTo(1);
              }}
              aria-label="Foto berikutnya"
              className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream-100/20 text-cream-100 transition-colors hover:bg-cream-100/10 sm:right-8"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.figure
              key={activePhoto.id}
              initial={{ opacity: 0, scale: 0.94, rotateX: 8 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              style={{ perspective: 1200 }}
              className="relative flex max-h-full w-full max-w-4xl flex-col items-center"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 900px"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-5 text-center">
                <p className="font-heading text-lg font-semibold text-cream-100">
                  {activePhoto.caption}
                </p>
                <p className="mt-1 text-xs text-cream-200/60">
                  {(activeIndex ?? 0) + 1} dari {foto.length}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
