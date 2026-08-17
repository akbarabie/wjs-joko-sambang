"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";

const HEADLINE = "Mampir dan Sambang ke Tempat Kami";

const wordContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const quickInfo = [
    { icon: MapPin, label: CONTACT.address.short },
    { icon: Phone, label: CONTACT.whatsapp.display },
    {
      icon: Clock,
      label: `${CONTACT.operationalHours[0].day}, ${CONTACT.operationalHours[0].hours}`,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[70vh] min-h-[480px] items-center justify-center overflow-hidden bg-wood-900"
    >
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero/gbr 5.JPG"
          alt="Tampak depan WJS Joko Sambang Café"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-wood-950/80 via-wood-950/60 to-wood-950/90" />

      <motion.div
        style={{ opacity: contentOpacity, perspective: 1000 }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="divider-accent text-xs font-semibold uppercase tracking-[0.4em] text-gold-400"
        >
          Contact &amp; Location
        </motion.p>

        <motion.h1
          variants={wordContainerVariants}
          initial="hidden"
          animate="visible"
          className="font-heading mt-6 flex flex-wrap justify-center gap-x-3 text-4xl font-semibold text-cream-100 sm:text-5xl"
        >
          {HEADLINE.split(" ").map((word, index) => (
            <motion.span key={`${word}-${index}`} variants={wordVariants}>
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="mt-9 flex flex-wrap justify-center gap-3"
        >
          {quickInfo.map((info) => (
            <motion.div
              key={info.label}
              whileHover={{ y: -4, rotateX: 8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              style={{ transformStyle: "preserve-3d" }}
              className="flex items-center gap-2.5 rounded-2xl border border-cream-100/15 bg-cream-100/10 px-5 py-3 backdrop-blur-md"
            >
              <info.icon className="h-4 w-4 text-gold-400" aria-hidden="true" />
              <span className="text-sm font-medium text-cream-100">
                {info.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
