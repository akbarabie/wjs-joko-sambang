import Link from "next/link";
import { Clock, Mail, MapPin, ExternalLink } from "lucide-react";
import { BRAND, CONTACT, DEFAULT_RESERVATION_MESSAGE, buildWhatsAppLink } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

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

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 4c0 2.5 2 4.5 4.5 4.5" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wood-900 text-cream-200">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Kolom 1: Brand & Filosofi Singkat */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 text-sm leading-relaxed text-cream-300/80">
              {BRAND.philosophy}
            </p>
          </div>

          {/* Kolom 2: Media Sosial Card (Pengganti Navigasi) */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-gold-500">
              Media Sosial
            </h3>
            <div className="mt-5 flex flex-col gap-3">
              {/* Instagram Card */}
              <Link
                href="https://www.instagram.com/wjs_jokosambang"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded-2xl border border-cream-100/10 bg-cream-100/5 p-3.5 transition-all duration-300 hover:border-gold-500/40 hover:bg-gold-500/10"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream-100/10 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-wood-950">
                  <InstagramIcon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-cream-300/60">
                    Instagram
                  </p>
                  <p className="truncate text-sm font-semibold text-cream-100 transition-colors group-hover:text-gold-400">
                    @wjs_jokosambang
                  </p>
                </div>
              </Link>

              {/* TikTok Card */}
              <Link
                href="https://www.tiktok.com/@jokosambang"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded-2xl border border-cream-100/10 bg-cream-100/5 p-3.5 transition-all duration-300 hover:border-gold-500/40 hover:bg-gold-500/10"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream-100/10 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-wood-950">
                  <TikTokIcon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-cream-300/60">
                    TikTok
                  </p>
                  <p className="truncate text-sm font-semibold text-cream-100 transition-colors group-hover:text-gold-400">
                    @jokosambang
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Kolom 3: Kontak & Lokasi */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-gold-500">
              Kontak & Lokasi
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-cream-300/80">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-gold-500" />
                <span>{CONTACT.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <WhatsAppIcon className="h-5 w-5 shrink-0 text-gold-500" />
                <Link
                  href={buildWhatsAppLink(DEFAULT_RESERVATION_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cream-100"
                >
                  {CONTACT.whatsapp.display}
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-gold-500" />
                <span>{CONTACT.socials.instagram.handle}</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Jam Operasional & Map Card */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-gold-500">
              Jam Operasional
            </h3>
            <ul className="mt-5 space-y-2 text-sm text-cream-300/80">
              {CONTACT.operationalHours.map((item) => (
                <li key={item.day} className="flex items-start gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-gold-500" />
                  <span>
                    {item.day}: {item.hours} WIB
                  </span>
                </li>
              ))}
            </ul>

            {/* Google Maps Preview Card */}
            <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-xl border border-cream-100/15 shadow-sm">
              <iframe
                title="Peta Lokasi WJS Joko Sambang Café"
                src="https://maps.google.com/maps?q=WJS%20Joko%20Sambang%20Caf%C3%A9%20Junrejo%20Batu&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="h-full w-full border-0 opacity-80 transition-opacity hover:opacity-100"
                loading="lazy"
              />
              
              {/* Tombol Melayang "Open in Maps" */}
              <Link
                href={CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-2.5 top-2.5 z-10 inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1 text-xs font-medium text-wood-950 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-105"
              >
                <span>Open in Maps</span>
                <ExternalLink className="h-3 w-3 text-blue-600" />
              </Link>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-cream-100/10 pt-6 text-xs text-cream-300/60 sm:flex-row">
          <p>
            © {currentYear} {BRAND.name}. Seluruh hak cipta dilindungi.
          </p>
          <p>Kota Batu, Jawa Timur</p>
        </div>
      </div>
    </footer>
  );
}