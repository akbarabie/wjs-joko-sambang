"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Award } from "lucide-react";

// Daftarkan 2 gambar dokumentasi kunjungan di sini
const MILESTONE_IMAGES = [
  {
    src: "/images/about/gbr 4.jpeg",
    alt: "Kunjungan Bapak Wali Kota Batu saat Grand Opening WJS Joko Sambang Café",
  },
  {
    src: "/images/about/gbr 5.jpeg",
    alt: "Dokumentasi kunjungan tokoh WJS Joko Sambang Café",
  },
  {
    src: "/images/about/gbr 6.jpeg",
    alt: "Dokumentasi Owner di WJS Joko Sambang Café",
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

export function MilestoneWalikota() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Timer transisi otomatis ganti gambar setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % MILESTONE_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Logika 3D Tilt interaktif mengikuti kursor mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 15 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="kunjungan-tokoh"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-28"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        
        {/* Kolom Kiri: Teks Milestone */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="order-2 lg:order-1"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-forest-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-forest-600">
            <Award className="h-3.5 w-3.5" />
            Milestone
          </span>
          <h2 className="font-heading mt-5 text-3xl font-semibold text-wood-800 sm:text-4xl">
            Kunjungan Bapak Wali Kota Batu
          </h2>
          <p className="mt-5 text-wood-500">
            Saat Grand Opening, WJS Joko Sambang Café mendapat kehormatan
            atas kunjungan Bapak Wali Kota Batu, sebuah momen penting yang
            menambah semangat kami untuk terus berkembang.
          </p>
          <p className="mt-4 text-wood-500">
            Kunjungan ini menjadi bentuk apresiasi dan dukungan terhadap
            upaya kami dalam menghadirkan tempat kuliner dan ruang kreatif
            yang berkontribusi bagi masyarakat Batu dan sekitarnya.
          </p>
        </motion.div>

        {/* Kolom Kanan: 3D Frame Aspect [4/3] & Running LED */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0.15}
          className="order-1 relative [perspective:1200px] lg:order-2"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Pendaran Cahaya Ambient Amber Glow */}
          <div className="absolute -inset-2 -z-10 rounded-[2.5rem] bg-amber-600/25 blur-2xl" />

          {/* 3D Tilted Card + Outer Running LED Frame (Aspect 4/3 tetap dipertahankan) */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.2rem] p-[3.5px] shadow-[0_20px_50px_rgba(113,63,18,0.2)]"
          >
            {/* Garis Running LED (Conic Gradient Berputar 360°) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "linear",
              }}
              className="absolute -inset-[150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,#78350f_310deg,#d97706_340deg,#fde68a_360deg)]"
            />

            {/* Inner Card (Layer Frame Gambar) */}
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-wood-950">
              {/* Crossfade Image Slideshow */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 1.2, ease: "easeInOut" },
                    scale: { duration: 5, ease: "easeOut" },
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={MILESTONE_IMAGES[currentImageIndex].src}
                    alt={MILESTONE_IMAGES[currentImageIndex].alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Subtle Glass Highlight Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10" />

              {/* Indikator Slider Minimalis */}
              <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {MILESTONE_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    aria-label={`Lihat gambar dokumentasi ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentImageIndex === idx
                        ? "w-6 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                        : "w-2 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}