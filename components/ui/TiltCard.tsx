"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Kartu dengan efek 3D yang mengikuti posisi kursor.
 *
 * Kenapa pakai CSS 3D transform (perspective + rotateX/rotateY) dan bukan
 * library 3D seperti three.js: halaman ini isinya foto dan teks, bukan model
 * 3D. Pakai CSS transform hasilnya sama-sama terasa berdimensi tapi ukuran
 * bundle tetap ringan dan lancar dibuka dari HP, yang penting karena mayoritas
 * pengunjung website cafe datang dari perangkat mobile.
 *
 * Anak komponen bisa ditaruh di kedalaman berbeda dengan menambahkan
 * style translateZ, karena wrapper di dalam sudah memakai preserve-3d.
 */

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Sudut kemiringan maksimum dalam derajat. */
  maxTilt?: number;
  /** Kilau cahaya yang ikut bergerak mengikuti kursor. */
  glare?: boolean;
};

export function TiltCard({
  children,
  className,
  maxTilt = 8,
  glare = true,
}: TiltCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Nilai mentah posisi kursor, dinormalisasi ke rentang -0.5 sampai 0.5
  // supaya perhitungan sudut tidak bergantung pada ukuran kartu.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // Spring dipakai supaya kartu tidak "patah-patah" mengikuti kursor,
  // melainkan menyusul dengan gerakan yang halus.
  const springConfig = { stiffness: 150, damping: 18, mass: 0.4 };
  const smoothX = useSpring(pointerX, springConfig);
  const smoothY = useSpring(pointerY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Posisi titik kilau dalam persen, dipakai sebagai pusat radial gradient.
  const glareX = useTransform(smoothX, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ["20%", "80%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.22), transparent 55%)`;

  // Hormati setting "kurangi gerakan" di sistem operasi pengguna.
  const prefersReducedMotion = useReducedMotion();

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ perspective: 1200 }}
      className={cn("relative", className)}
    >
      <motion.div
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full"
      >
        {children}

        {glare && !prefersReducedMotion ? (
          <motion.div
            style={{ background: glareBackground }}
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] mix-blend-soft-light"
            aria-hidden="true"
          />
        ) : null}
      </motion.div>
    </div>
  );
}
