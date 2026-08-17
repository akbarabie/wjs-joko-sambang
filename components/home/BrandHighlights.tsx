"use client";

import { motion } from "framer-motion";

// 1. Icon Custom: Mangkok Tradisional & Rempah Nusantara (Authentic Taste)
function AuthenticTasteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12c0 5 4 8 9 8s9-3 9-8H3Z" fill="currentColor" fillOpacity={0.12} />
      <path d="M2 12h20" />
      <path d="M7 8c.5-1.5 1.5-2 1.5-3.5" />
      <path d="M12 8c.5-2 1.5-2.5 1.5-4.5" />
      <path d="M17 8c.5-1.5 1.5-2 1.5-3.5" />
      <path d="M8 20l-1 2h10l-1-2" />
    </svg>
  );
}

// 2. Icon Custom: Lanskap Pegunungan Kota Batu & Hawa Sejuk (Relaxing Nature)
function RelaxingNatureIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="18" cy="7" r="3" fill="currentColor" fillOpacity={0.15} />
      <path d="m2 19 6.5-9.5a1 1 0 0 1 1.6 0L14 15l2.5-3.5a1 1 0 0 1 1.6 0L22 19H2Z" fill="currentColor" fillOpacity={0.08} />
      <path d="M3 21h18" />
      <path d="M17 11c1 .5 2 0 3-1" />
      <path d="M1 14c1.5.5 3 0 4-1" />
    </svg>
  );
}

// 3. Icon Custom: Gestur Tangan Sembah / Menyambut Tamu Khas Jawa (Warm Hospitality)
function WarmHospitalityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21c-4.5 0-8-3-8-7.5C4 9.5 8 5 12 3c4 2 8 6.5 8 10.5 0 4.5-3.5 7.5-8 7.5Z" fill="currentColor" fillOpacity={0.08} />
      <path d="M12 7.5v8.5" />
      <path d="M9.5 10.5 12 13l2.5-2.5" />
      <path d="M8 17c2 1.5 6 1.5 8 0" />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}

const PILLARS = [
  {
    icon: AuthenticTasteIcon,
    title: "Authentic Taste",
    subtitle: "Racikan Rempah Otentik",
    description:
      "Cita rasa autentik Jawa yang diracik dengan sentuhan modern, dari nasi goreng rawon hingga jamu tradisional racikan sendiri.",
    badgeColor: "from-amber-500/20 to-orange-500/10 text-amber-700",
  },
  {
    icon: RelaxingNatureIcon,
    title: "Relaxing Nature Atmosphere",
    subtitle: "Nuansa Asri Kota Batu",
    description:
      "Suasana asri pegunungan Kota Batu yang sejuk, dikelilingi taman hijau dan udara segar khas dataran tinggi.",
    badgeColor: "from-forest-500/20 to-emerald-500/10 text-forest-700",
  },
  {
    icon: WarmHospitalityIcon,
    title: "Warm Hospitality",
    subtitle: "Sugeng Rawuh & Sambang",
    description:
      'Keramahan khas Jawa yang menyambut setiap tamu seperti sedang "sambang" atau berkunjung ke rumah sendiri.',
    badgeColor: "from-gold-500/20 to-amber-600/10 text-wood-800",
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

export function BrandHighlights() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
      {/* Heading Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="divider-accent justify-center text-xs font-semibold uppercase tracking-[0.4em] text-gold-600">
          Tentang Kami
        </p>
        <h2 className="font-heading mt-5 text-3xl font-semibold text-wood-800 sm:text-4xl">
          Kehangatan Jawa dalam Balutan Modern
        </h2>
        <p className="mt-5 text-wood-500">
          &ldquo;Joko Sambang&rdquo; terinspirasi dari kebersamaan dan
          keramahan khas Jawa. Sambang berarti berkunjung, melambangkan
          tempat hangat bagi siapa saja untuk datang, bersantai, berdiskusi,
          dan melepas penat dari keramaian kota.
        </p>
      </motion.div>

      {/* 3D Pillars Grid */}
      <div className="mt-16 grid grid-cols-1 gap-8 [perspective:1200px] sm:grid-cols-3">
        {PILLARS.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={index * 0.15}
              whileHover={{
                y: -10,
                rotateX: 4,
                rotateY: index === 0 ? 4 : index === 2 ? -4 : 0,
                scale: 1.02,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="group relative flex flex-col rounded-[2.2rem] border border-gold-200/50 bg-gradient-to-b from-cream-100 to-white p-8 text-center shadow-[0_15px_35px_-10px_rgba(113,63,18,0.08)] transition-all duration-300 hover:border-gold-400/80 hover:shadow-[0_25px_50px_-12px_rgba(113,63,18,0.18)] [transform-style:preserve-3d]"
            >
              {/* Subtle 3D Ambient Backlight Glow on Hover */}
              <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-[2.3rem] bg-gradient-to-b from-gold-400/20 via-transparent to-transparent opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />

              {/* 3D Floating Icon Container */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr shadow-inner [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:translateZ(24px)]">
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.badgeColor} shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}>
                  <Icon className="h-8 w-8 transition-transform duration-500 group-hover:rotate-3" />
                </div>
              </div>

              {/* Teks & Deskripsi dengan Layering 3D */}
              <div className="mt-6 flex flex-1 flex-col justify-between [transform-style:preserve-3d] group-hover:[transform:translateZ(12px)]">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-600">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-heading mt-2 text-xl font-semibold text-wood-800">
                    {pillar.title}
                  </h3>
                  <p className="mt-3.5 text-sm leading-relaxed text-wood-500">
                    {pillar.description}
                  </p>
                </div>

                {/* Garis Aksen Bawah Minimalis */}
                <div className="mx-auto mt-6 h-1 w-8 rounded-full bg-gold-300/40 transition-all duration-300 group-hover:w-16 group-hover:bg-gold-500" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}