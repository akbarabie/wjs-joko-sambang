"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  DEFAULT_RESERVATION_MESSAGE,
  NAV_LINKS,
  buildWhatsAppLink,
} from "@/lib/constants";

// Navbar dipisah jadi Client Component karena butuh state (scroll position,
// buka/tutup menu mobile) dan animasi Framer Motion. Sisanya di project ini
// tetap Server Component secara default supaya bundle JS ke browser kecil.

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Tutup menu mobile otomatis setiap kali pindah halaman. Ditulis sebagai
  // penyesuaian state saat render (bukan di dalam useEffect) mengikuti pola
  // resmi React untuk "reset state ketika sebuah value berubah", supaya
  // tidak memicu render effect berantai yang tidak perlu.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  // Ganti tampilan navbar (glassmorphism lebih pekat) setelah user scroll
  // sedikit, supaya di hero section awal navbar tetap terasa menyatu dengan
  // gambar background, tapi tetap terbaca saat halaman sudah discroll.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 500);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Kunci scroll body selagi drawer mobile terbuka, biar tidak ada scroll ganda.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-cream-100/50 shadow-sm shadow-wood-900/5 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      {/* Tinggi bar SENGAJA tidak pakai angka tetap (h-20/h-24/dst). Logo
          (di Logo.tsx: h-16 sm:h-20) yang menentukan tinggi natural, py-4/
          py-5 di sini cuma kasih "napas" di atas-bawahnya. Kalau nanti
          ukuran logo diubah lagi, tinggi bar ini otomatis ikut menyesuaikan
          tanpa perlu diutak-atik manual di sini. */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 sm:py-5 lg:px-10">
        <Link href="/" className="shrink-0">
          <Logo variant={isScrolled || isMobileMenuOpen ? "dark" : "light"} />
        </Link>

        {/* Menu & CTA dikelompokkan jadi satu unit di kanan. Dengan begitu
            justify-between di parent cuma membagi 2 blok (logo vs unit ini),
            bukan 3 blok terpisah, sehingga jarak logo-ke-menu otomatis jadi
            lega mengikuti sisa ruang, bukan dibagi rata ke 2 sisi.

            Grup ini sengaja disembunyikan (opacity 0 + pointer-events-none)
            selama belum discroll, supaya begitu pengunjung pertama kali
            landing di hero, fokusnya cuma ke logo & visual hero tanpa
            "diganggu" deretan menu. Begitu discroll dikit, muncul fade-in
            halus. className "hidden xl:flex" tetap dipertahankan untuk
            urusan breakpoint (nav lengkap cuma ada di layar >=1280px) -
            animasi opacity ini urusan terpisah, cuma aktif saat elemennya
            memang sedang ditampilkan oleh breakpoint tsb. */}
        <motion.div
          initial={false}
          animate={{ opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : -6 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={cn(
            "hidden items-center gap-6 xl:flex",
            !isScrolled && "pointer-events-none"
          )}
        >
          <nav className="flex items-center gap-0.5">
            {NAV_LINKS.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium transition-colors",
                    isScrolled
                      ? "text-wood-700 hover:bg-wood-50 hover:text-wood-900"
                      : "text-cream-100 hover:bg-cream-100/10"
                  )}
                >
                  {item.label}
                  {item.subItems && (
                    <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {item.subItems && (
                  <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="overflow-hidden rounded-2xl border border-wood-100 bg-cream-100 py-2 shadow-xl shadow-wood-900/10">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-5 py-2.5 text-sm text-wood-700 transition-colors hover:bg-gold-50 hover:text-wood-900"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <Link
            href= "/contact"
            // href={buildWhatsAppLink(DEFAULT_RESERVATION_MESSAGE)}
            // target="_blank"
            // rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-forest-500 px-5 py-2.5 text-sm font-semibold text-cream-100 shadow-md shadow-forest-900/20 transition-colors hover:bg-forest-600"
          >
            <WhatsAppIcon className="h-5 w-5" />
            BOOK NOW
          </Link>
        </motion.div>

        {/* Tombol hamburger, khusus mobile & tablet. Sama seperti grup menu
            desktop di atas, ini juga di-hide sebelum scroll. Dikecualikan
            kalau drawer-nya lagi kebuka (isMobileMenuOpen) supaya user yang
            terlanjur buka menu lalu scroll balik ke atas masih bisa
            menutupnya - tombolnya tidak tiba-tiba hilang di tengah interaksi. */}
        <motion.button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isMobileMenuOpen}
          initial={false}
          animate={{ opacity: isScrolled || isMobileMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={cn(
            "rounded-full p-2 transition-colors xl:hidden",
            isScrolled || isMobileMenuOpen ? "text-wood-800" : "text-cream-100",
            !(isScrolled || isMobileMenuOpen) && "pointer-events-none"
          )}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </div>
    </header>

    {/* Drawer mobile. SENGAJA jadi sibling dari <header>, bukan nested di
        dalamnya. Alasan: elemen ber-position (fixed/absolute) dengan
        z-index selalu digambar di atas elemen normal tanpa position dalam
        stacking context yang sama - kalau drawer ini nested di dalam
        header, drawer (fixed + z-40) akan menutupi tombol hamburger di
        dalam header meski header sendiri z-50, karena div pembungkus
        tombol tidak punya position sendiri. Dengan drawer jadi sibling,
        perbandingan z-index terjadi di level header (z-50) vs drawer
        (z-40) secara langsung, header pasti menang. */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 top-24 z-40 bg-wood-950/40 xl:hidden"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 z-40 flex w-full max-w-sm flex-col overflow-y-auto bg-cream-100 pt-28 pb-8 shadow-2xl xl:hidden"
          >
            <nav className="flex flex-1 flex-col gap-1 px-6">
              {NAV_LINKS.map((item) => (
                <div key={item.href} className="border-b border-wood-100 py-3">
                  <Link
                    href={item.href}
                    className="font-heading text-lg text-wood-800"
                  >
                    {item.label}
                  </Link>
                  {item.subItems && (
                    <div className="mt-2 flex flex-col gap-2 pl-3">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="text-sm text-wood-500"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="px-6 pt-4">
              <Link
                href={buildWhatsAppLink(DEFAULT_RESERVATION_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-forest-500 px-5 py-3 text-sm font-semibold text-cream-100"
              >
                <WhatsAppIcon className="h-5 w-5" />
                BOOK NOW
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}