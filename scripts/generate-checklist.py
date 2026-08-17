"""
Generator ASSET_CHECKLIST.md dari scripts/asset-manifest.json.

Dijalankan ulang setiap kali asset-manifest.json berubah (nambah/ubah
kebutuhan foto), supaya dokumentasi checklist selalu sinkron dengan
generate-placeholders.py tanpa harus tulis daftar yang sama dua kali.

Cara pakai:
    python3 scripts/generate-checklist.py
"""

import json
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANIFEST_PATH = ROOT / "scripts" / "asset-manifest.json"
OUTPUT_PATH = ROOT / "ASSET_CHECKLIST.md"

CATEGORY_TITLES = {
    "hero": "Hero (Home Page)",
    "about": "About Us",
    "menu": "Menu & Culinary",
    "facilities": "Facilities & Spaces",
    "events": "Events (Gallery Page)",
    "gallery": "Photo Gallery (Gallery Page)",
    "logo": "Brand Logo",
}


def main() -> None:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    assets = manifest["assets"]

    by_category: dict[str, list[dict]] = defaultdict(list)
    for asset in assets:
        by_category[asset["category"]].append(asset)

    lines = [
        "# Asset Checklist - WJS Joko Sambang Cafe",
        "",
        "Daftar seluruh foto asli yang dibutuhkan website ini, dibuat otomatis dari",
        "`scripts/asset-manifest.json`. Placeholder sudah tersedia di `public/images/`",
        "dengan nama file dan aspect ratio yang sama seperti tabel di bawah, jadi cara",
        "pakainya: **timpa file placeholder dengan foto asli, nama file HARUS sama persis**,",
        "tidak perlu ubah kode React sama sekali.",
        "",
        "Cara regenerate placeholder & checklist ini kalau manifest berubah:",
        "```bash",
        "python3 scripts/generate-placeholders.py",
        "python3 scripts/generate-checklist.py",
        "```",
        "",
        f"Total kebutuhan foto: **{len(assets)} file**",
        "",
    ]

    for category, items in by_category.items():
        title = CATEGORY_TITLES.get(category, category.title())
        lines.append(f"## {title}")
        lines.append("")
        lines.append("| File | Dimensi | Kebutuhan Foto | Dipakai di |")
        lines.append("|---|---|---|---|")
        for item in items:
            path = f"public/images/{category}/{item['filename']}"
            lines.append(
                f"| `{path}` | {item['width']}x{item['height']} | "
                f"{item['label']} | {item['usedIn']} |"
            )
        lines.append("")

    lines.extend(
        [
            "## Catatan Khusus",
            "",
            "- Logo resmi (`public/images/logo/wjs-logo.png`) **belum tersedia** sebagai file",
            "  bersih berlatar transparan. Di dalam PDF, logo hanya menyatu dengan foto cover",
            "  (background gedung + langit malam), bukan file logo terpisah. Kode sudah",
            "  disiapkan (`components/ui/Logo.tsx`) untuk membaca file ini secara otomatis di",
            "  Navbar & Footer, jadi tinggal timpa file placeholder dengan logo asli (PNG",
            "  transparan, disarankan minimal 512x512px), tidak perlu ubah kode apa pun.",
            "- Semua foto sebaiknya format JPG/WebP, hasil kompresi wajar (di bawah 500KB per",
            "  file) supaya skor performa (Lighthouse) tetap tinggi saat deploy ke Vercel.",
            "- Rasio (aspect ratio) di tabel wajib diikuti agar layout tidak geser. Kalau foto",
            "  asli rasionya beda, boleh di-crop dulu, atau kabari supaya komponennya kita",
            "  sesuaikan.",
            "",
        ]
    )

    OUTPUT_PATH.write_text("\n".join(lines), encoding="utf-8")
    print(f"ASSET_CHECKLIST.md digenerate, {len(assets)} aset total")


if __name__ == "__main__":
    main()
