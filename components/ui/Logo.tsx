import Image from "next/image";
import { cn } from "@/lib/utils";

// Komponen ini satu-satunya tempat yang tahu path file logo. Begitu file
// public/images/logo/wjs-logo.png ditimpa dengan logo asli (ukuran berapa pun,
// selama rasio mendekati 1:1), logo baru otomatis tampil di Navbar & Footer
// tanpa perlu ubah kode di file lain.

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function Logo({ variant = "dark", className }: LogoProps) {
  const isLight = variant === "light";

  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Image
        src="/images/logo/wjs-logo.png"
        alt="WJS Joko Sambang Café"
        width={160}
        height={160}
        priority
        className="h-16 w-16 shrink-0 rounded-full object-cover sm:h-20 sm:w-20"
      />
      <span className="flex flex-col justify-center gap-1 leading-none">
        <span
          className={cn(
            "font-heading whitespace-nowrap text-lg font-bold leading-none tracking-wide transition-colors sm:text-xl",
            isLight ? "text-cream-100" : "text-wood-800"
          )}
        >
          WJS
        </span>
        {/* Font disamakan dengan referensi logo asli: tegak (bukan italic),
            bold, serif senada dengan "WJS". leading-none ditaruh di span ini
            sendiri (bukan cuma di pembungkus luar) karena text-base/lg bawa
            line-height bawaan yang lebih tinggi dari tinggi hurufnya - kalau
            cuma parent yang di-leading-none, baris ini tetap "memakan" ruang
            ekstra di atas-bawah meski gap-nya sudah kecil. */}
        <span className="font-heading whitespace-nowrap text-base font-bold leading-none text-gold-500 transition-colors sm:text-lg">
          Joko Sambang
        </span>
        <span
          className={cn(
            "text-[9px] font-medium uppercase leading-none tracking-[0.35em] transition-colors sm:text-[10px]",
            isLight ? "text-cream-200" : "text-forest-600"
          )}
        >
          Café
        </span>
      </span>
    </span>
  );
}