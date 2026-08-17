"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { CONTACT, buildWhatsAppLink, DEFAULT_RESERVATION_MESSAGE } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.4" cy="6.6" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ContactInfoCards() {
  const cards = [
    {
      icon: WhatsAppIcon,
      title: "WhatsApp",
      lines: [CONTACT.whatsapp.display],
      actionLabel: "Chat Sekarang",
      href: buildWhatsAppLink(DEFAULT_RESERVATION_MESSAGE),
      external: true,
    },
    {
      icon: MapPin,
      title: "Alamat",
      lines: [CONTACT.address.full],
      actionLabel: "Buka di Google Maps",
      href: CONTACT.googleMapsUrl,
      external: true,
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      lines: CONTACT.operationalHours.map(
        (jam) => `${jam.day}: ${jam.hours} WIB`,
      ),
    },
    {
      icon: InstagramIcon,
      title: "Media Sosial",
      lines: [
        `Instagram ${CONTACT.socials.instagram.handle}`,
        `TikTok ${CONTACT.socials.tiktok.handle}`,
      ],
      actionLabel: "Lihat Instagram",
      href: CONTACT.socials.instagram.url,
      external: true,
    },
  ];

  return (
    <section className="bg-cream-200/60 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="divider-accent justify-center text-xs font-semibold uppercase tracking-[0.4em] text-gold-600">
            Hubungi Kami
          </p>
          <h2 className="font-heading mt-5 text-3xl font-semibold text-wood-800 sm:text-4xl">
            Cara Menghubungi Kami
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              custom={index * 0.1}
              whileHover={{ y: -6, rotateX: 6 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              style={{ transformStyle: "preserve-3d", perspective: 800 }}
              className="flex flex-col rounded-2xl border border-wood-100 bg-cream-100 p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-wood-900/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-500/10">
                <card.icon className="h-5 w-5 text-forest-500" aria-hidden="true" />
              </span>

              <h3 className="font-heading mt-5 text-lg font-semibold text-wood-800">
                {card.title}
              </h3>

              <div className="mt-3 flex-1 space-y-1">
                {card.lines.map((line) => (
                  <p key={line} className="text-sm leading-relaxed text-wood-500">
                    {line}
                  </p>
                ))}
              </div>

              {card.href ? (
                <Link
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="mt-5 text-sm font-semibold text-forest-500 transition-colors hover:text-gold-600"
                >
                  {card.actionLabel}
                </Link>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
