# WJS Joko Sambang Café - Company Profile Website

Website company profile untuk WJS Joko Sambang Café, cafe bertema "Jawa Modern"
di Junrejo, Kota Batu, Jawa Timur. Dikerjakan bertahap (step-by-step) mengikuti
PRD, satu modul disetujui dulu sebelum lanjut ke modul berikutnya.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** (CSS-first config, lihat `app/globals.css`)
- **Framer Motion** untuk animasi
- **lucide-react** untuk icon UI (icon brand seperti Instagram/TikTok dibuat
  custom di `components/layout/Footer.tsx` karena versi terbaru lucide-react
  sudah tidak menyediakan icon brand)

## Menjalankan di Lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Perintah lain yang tersedia:

```bash
npm run build   # production build
npm run lint    # ESLint check
```

## Struktur Folder

```
app/                   Halaman (App Router). Satu folder = satu route.
components/layout/      Navbar, Footer - dipakai di semua halaman lewat app/layout.tsx
components/ui/          Komponen kecil yang dipakai berulang (Logo, ComingSoonSection, dst)
lib/constants.ts        Satu-satunya sumber data brand, kontak, dan navigasi
lib/utils.ts            Helper cn() untuk gabung className Tailwind
public/images/          Aset foto, dikelompokkan per kategori halaman
scripts/                Tooling generator placeholder gambar & checklist aset
```

## Alur Kerja Aset Foto

Foto asli belum tersedia saat frontend mulai dikerjakan, jadi dipakai sistem
placeholder supaya development tidak terhambat:

1. `scripts/asset-manifest.json` - daftar semua foto yang dibutuhkan (nama file,
   dimensi, dipakai di halaman mana).
2. `scripts/generate-placeholders.py` - generate placeholder JPG/PNG sesuai
   manifest ke `public/images/`.
3. `ASSET_CHECKLIST.md` - versi dokumentasi (markdown table) dari manifest yang sama.

**Kalau foto asli sudah ada:** timpa file di `public/images/<kategori>/` dengan
nama file yang sama persis seperti di `ASSET_CHECKLIST.md`. Tidak perlu ubah
kode komponen React sama sekali.

Kalau ada kebutuhan foto baru yang belum ada di manifest, tambahkan entry baru
di `scripts/asset-manifest.json`, lalu jalankan ulang:

```bash
python3 scripts/generate-placeholders.py
python3 scripts/generate-checklist.py
```

## Favicon & App Icon

`app/favicon.ico`, `app/icon.png`, dan `app/apple-icon.png` di-generate dari
`public/images/logo/wjs-logo.png` lewat `scripts/generate-favicons.py`.
Begitu logo asli sudah dipasang, jalankan ulang untuk update favicon:

```bash
python3 scripts/generate-favicons.py
```

Catatan: ukuran ikon di tab browser (favicon) dikontrol penuh oleh browser,
bukan oleh website manapun (berlaku sama untuk semua situs). Yang bisa
dikontrol lewat kode cuma ketajaman & warnanya, bukan besar-kecilnya di tab.

## Progress (Step-by-Step sesuai PRD)

- [x] Step 1: Layout Core & Navigation (Navbar, Footer)
- [x] Step 2: Home Page
- [x] Step 3: About Us Page
- [x] Step 4: Menu & Culinary Page
- [x] Step 5: Facilities & Spaces Page
- [x] Step 6: Events & Gallery Page
- [x] Step 7: Contact & Reservation Page

## Deployment

Repo ini didesain untuk deploy langsung ke [Vercel](https://vercel.com) tanpa
konfigurasi tambahan (Next.js App Router didukung penuh secara native).
