import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Fraunces: serif modern dengan karakter hangat, cocok untuk kesan
// "Jawa Modern" yang elegan tapi tidak kaku seperti serif klasik biasa.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

// Plus Jakarta Sans dipakai sesuai rekomendasi PRD section 5.2 untuk body text.
const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

// Metadata dasar mengacu pada PRD section 6 (SEO seputar cafe Batu,
// tempat meeting Batu, kuliner Batu). Detail per halaman akan dilengkapi
// lagi saat halaman terkait dikerjakan (generateMetadata per route).
export const metadata: Metadata = {
  title: {
    default: "WJS Joko Sambang Café | Cafe Jawa Modern di Kota Batu",
    template: "%s | WJS Joko Sambang Café",
  },
  description:
    "WJS Joko Sambang Café, destinasi kuliner Jawa Modern di Junrejo, Kota Batu. Cocok untuk nongkrong, meeting, work from cafe, hingga acara keluarga dengan suasana asri pegunungan.",
  keywords: [
    "cafe Batu",
    "cafe Kota Batu",
    "tempat meeting Batu",
    "kuliner Batu",
    "WJS Joko Sambang",
    "cafe Junrejo",
  ],
  openGraph: {
    title: "WJS Joko Sambang Café | Cafe Jawa Modern di Kota Batu",
    description:
      "Perpaduan tradisi Jawa & modernitas di sejuknya Kota Batu. Nongkrong, meeting, hingga acara keluarga dalam satu tempat.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${fraunces.variable} ${jakartaSans.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream-DEFAULT font-sans text-wood-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
