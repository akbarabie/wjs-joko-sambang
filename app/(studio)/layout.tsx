import type { Metadata, Viewport } from "next";

/*
  Layout khusus panel admin Sanity Studio.

  Sengaja dipisah dari layout website lewat route group "(studio)" supaya:
  1. Navbar dan Footer cafe tidak ikut muncul di dalam panel admin.
  2. globals.css website tidak diikutkan. Tailwind punya reset bawaan yang
     bisa merusak tampilan Studio, jadi Studio dibiarkan pakai style-nya
     sendiri.
*/

export const metadata: Metadata = {
  title: "Panel Admin WJS Joko Sambang",
  // Panel admin tidak perlu diindeks mesin pencari.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Studio butuh kontrol zoom sendiri saat dibuka lewat layar kecil.
  viewportFit: "cover",
};

export default function StudioRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
