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
import { BookOpen } from "lucide-react";

const ABOUT_IMAGES = [
  {
    src: "/images/about/gbr 3.png",
    alt: "WJS Joko Sambang Café",
  },
  {
    src: "/images/about/gbr 2.jpeg",
    alt: "Keramahan staf WJS Joko Sambang Café",
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

export function StoryPhilosophy() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Timer transisi otomatis ganti gambar setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % ABOUT_IMAGES.length);
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
      id="profil"
      className="relative z-10 -mt-14 scroll-mt-24 rounded-t-[2.5rem] bg-white py-24 sm:-mt-16 sm:rounded-t-[3.5rem] sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          
          {/* Kolom Kiri: 3D Frame & Transisi Gambar */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="ml-6 sm:ml-10"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-forest-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-forest-600">
                <BookOpen className="h-3.5 w-3.5" />
                Tentang Kami
              </span>
            </motion.div>

            {/* Container 3D Perspective */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={0.1}
              className="relative [perspective:1200px]"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Pendaran Cahaya Halus di Belakang (Ambient Shadow) */}
              <div className="absolute -inset-2 -z-10 rounded-[2.5rem] bg-amber-600/25 blur-2xl" />

              {/* 3D Tilted Card + Outer Running LED Frame */}
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
                className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.2rem] p-[4.5px] shadow-[0_20px_50px_rgba(113,63,18,0.2)]"
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
                        src={ABOUT_IMAGES[currentImageIndex].src}
                        alt={ABOUT_IMAGES[currentImageIndex].alt}
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
                    {ABOUT_IMAGES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        aria-label={`Lihat gambar ${idx + 1}`}
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

          {/* Kolom Kanan: Teks Cerita & Filosofi */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <p className="divider-accent text-xs font-semibold uppercase tracking-[0.4em] text-gold-600">
              Profil & Filosofi
            </p>
            <h2 className="font-heading mt-5 text-3xl font-semibold text-wood-800 sm:text-4xl">
              Cerita di Balik WJS Joko Sambang
            </h2>
            <p className="mt-5 text-wood-500">
              WJS Joko Sambang Café hadir sebagai perpaduan antara tradisi dan
              modernitas. Kami percaya bahwa atmosfir alam yang tenang dengan
              hidangan lezat memiliki kekuatan untuk menghubungkan orang dan
              menciptakan kenangan yang tak terlupakan. Kami menyajikan cita
              rasa terbaik dalam suasana hangat dan berkelas, menciptakan
              tempat ideal untuk bersantai, berdiskusi, dan menikmati waktu
              berharga bersama, dengan komitmen penuh pada kualitas dan
              pelayanan.
            </p>

            <div className="mt-8 rounded-2xl border border-gold-200 bg-gold-50 p-6 shadow-sm">
              <h3 className="font-heading text-lg font-semibold text-wood-800">
                Kenapa &ldquo;Joko Sambang&rdquo;?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-wood-600">
                Nama <span className="italic">Joko Sambang</span> terinspirasi
                dari semangat kebersamaan dan keramahan khas Jawa, melambangkan
                tempat di mana setiap orang dapat <span className="italic">sambang</span>,
                berkunjung, dan merasakan kehangatan dalam suasana santai. Kami
                bukan sekadar café, tetapi ruang yang menghadirkan pengalaman
                otentik: cita rasa khas, pelayanan hangat, dan atmosfer yang
                membuat setiap kunjungan terasa istimewa.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}