"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const MISI_ITEMS = [
  "Membentuk tim yang solid dan dapat memberikan pelayanan ramah, profesional, dan personal kepada setiap pelanggan.",
  "Menyajikan makanan dan minuman khas nusantara dengan sentuhan tradisional modern.",
  "Menjaga standar kualitas tinggi dalam setiap penyajian makanan dan minuman.",
  "Menjaga inovasi menu yang terus berkembang untuk memenuhi preferensi dan kebutuhan pelanggan.",
  "Memberikan atmosfir alam yang natural dan relaxing dengan fasilitas penunjang demi kenyamanan pelanggan.",
  "Meyakini bahwa kepuasan pelanggan adalah kunci keberhasilan sebuah pelayanan di dunia kuliner.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function VisiMisi() {
  return (
    <section id="visi-misi" className="scroll-mt-24 rounded-[2.5rem] bg-wood-900 py-24 sm:rounded-[3.5rem] sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="text-center"
        >
          <p className="divider-accent justify-center text-xs font-semibold uppercase tracking-[0.4em] text-gold-400">
            Visi
          </p>
          <p className="font-heading mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-cream-100 sm:text-2xl">
            Menjadikan WJS Joko Sambang Café sebagai tempat bersinggah utama
            bagi pelanggan untuk melepas penat dari keramaian kota, dengan
            nuansa alam hijau pegunungan dan produk tradisional modern
            berkualitas, sehingga menjadi pilihan utama destinasi saat
            berkunjung ke Kota Batu.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0.15}
          className="mt-16 text-center"
        >
          <p className="divider-accent justify-center text-xs font-semibold uppercase tracking-[0.4em] text-gold-400">
            Misi
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {MISI_ITEMS.map((item, index) => (
              <motion.div
                key={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={(index % 2) * 0.1}
                className="flex gap-3 rounded-2xl border border-cream-100/10 bg-cream-100/5 p-5"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-400" />
                <p className="text-sm leading-relaxed text-cream-200/85">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
