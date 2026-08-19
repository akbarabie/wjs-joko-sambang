import type { Metadata } from "next";
// Font di-host sendiri lewat paket fontsource, tidak lagi diunduh dari
// Google tiap build. Ini menghindari kegagalan build saat koneksi ke
// fonts.gstatic.com bermasalah (font tersimpan lokal di node_modules).
// Fraunces: dipakai untuk heading, sertakan italic sesuai desain awal.
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
// Plus Jakarta Sans: dipakai untuk body text sesuai PRD section 5.2.
import "@fontsource-variable/plus-jakarta-sans/wght.css";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
    <html lang="id">
      <body className="flex min-h-screen flex-col bg-cream-DEFAULT font-sans text-wood-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}