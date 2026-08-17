"""
Generator placeholder image untuk WJS Joko Sambang Cafe.

Tujuan:
Development frontend tidak perlu menunggu dokumentasi foto asli selesai
dikumpulkan (lihat PRD Next Immediate Action Steps, poin 5). Script ini
membaca scripts/asset-manifest.json lalu membuat file JPG placeholder
dengan dimensi (aspect ratio) yang sudah sesuai kebutuhan layout asli,
plus label teks supaya jelas foto apa yang seharusnya ada di situ.

Cara pakai ulang (misal manifest diubah / ada foto baru):
    python3 scripts/generate-placeholders.py

Saat foto asli sudah siap, tinggal timpa file di public/images/<category>/
dengan nama file yang SAMA seperti di manifest. Tidak perlu ubah kode
komponen React sama sekali.
"""

import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
MANIFEST_PATH = ROOT / "scripts" / "asset-manifest.json"
OUTPUT_DIR = ROOT / "public" / "images"

# Warna diambil dari design token PRD section 5.2, dirotasi per kategori
# supaya folder gambar mudah dibedakan sekilas saat development.
PALETTE = {
    "hero": ("#3F2D1F", "#D4AF37"),
    "about": ("#17392A", "#F0E4BB"),
    "menu": ("#4A3525", "#EAD79B"),
    "facilities": ("#122E22", "#E1C773"),
    "events": ("#3F2D1F", "#F7F1DB"),
    "gallery": ("#1B4332", "#FCF9EF"),
    "logo": ("#261C13", "#D4AF37"),
}


def get_font(size: int) -> ImageFont.FreeTypeFont:
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def wrap_by_pixel_width(
    draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_width: float
) -> list[str]:
    """Bungkus teks per kata berdasarkan lebar render sesungguhnya (px),
    bukan estimasi jumlah karakter, supaya tidak overflow di gambar sempit."""
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textlength(candidate, font=font) <= max_width or not current:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def make_logo_placeholder(item: dict) -> None:
    """Logo diperlakukan beda dari foto konten: dibuat badge lingkaran
    berlatar transparan (bukan kotak label bertuliskan deskripsi panjang),
    supaya waktu dipasang di Navbar/Footer bentuknya tetap masuk akal
    sebelum file logo asli ditaruh oleh pemilik cafe."""
    width, height = item["width"], item["height"]
    bg_hex, text_hex = PALETTE.get(item["category"], ("#4A3525", "#FAF8F5"))

    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    margin = int(width * 0.04)
    draw.ellipse(
        [margin, margin, width - margin, height - margin],
        fill=bg_hex,
        outline=text_hex,
        width=max(3, width // 90),
    )

    initials_font = get_font(int(width * 0.32))
    label_font = get_font(int(width * 0.055))

    draw.text(
        (width / 2, height * 0.44),
        "WJS",
        font=initials_font,
        fill=text_hex,
        anchor="mm",
    )
    draw.text(
        (width / 2, height * 0.66),
        "JOKO SAMBANG",
        font=label_font,
        fill=text_hex,
        anchor="mm",
    )

    out_path = OUTPUT_DIR / item["category"] / item["filename"]
    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path, "PNG")


def make_placeholder(item: dict) -> None:
    if item["category"] == "logo":
        make_logo_placeholder(item)
        return

    width, height = item["width"], item["height"]
    bg_hex, text_hex = PALETTE.get(item["category"], ("#4A3525", "#FAF8F5"))

    img = Image.new("RGB", (width, height), bg_hex)
    draw = ImageDraw.Draw(img)

    # Border tipis dekoratif, meniru garis emas khas company profile PDF.
    border = max(2, width // 300)
    draw.rectangle(
        [border * 3, border * 3, width - border * 3, height - border * 3],
        outline=text_hex,
        width=border,
    )

    max_text_width = width * 0.82
    label_font_size = max(14, width // 28)
    meta_font_size = max(11, width // 45)

    # Kecilkan font label bertahap sampai tiap baris muat dalam batas lebar,
    # supaya placeholder tetap terbaca di gambar sempit (misal ikon 1:1 kecil).
    while label_font_size > 10:
        label_font = get_font(label_font_size)
        lines = wrap_by_pixel_width(draw, item["label"], label_font, max_text_width)
        longest_line = max(draw.textlength(line, font=label_font) for line in lines)
        if longest_line <= max_text_width and len(lines) <= 5:
            break
        label_font_size -= 2
    else:
        label_font = get_font(label_font_size)
        lines = wrap_by_pixel_width(draw, item["label"], label_font, max_text_width)

    meta_font = get_font(meta_font_size)

    category_tag = item["category"].upper()
    filename_tag = item["filename"]
    dimension_tag = f"{width} x {height} px"

    # Hitung posisi vertikal supaya blok teks berada di tengah kanvas.
    line_height = int(label_font_size * 1.35)
    text_block_height = line_height * len(lines) + meta_font_size * 4
    y = (height - text_block_height) / 2

    draw.text((width / 2, y), category_tag, font=meta_font, fill=text_hex, anchor="ma")
    y += meta_font_size * 2

    for line in lines:
        draw.text((width / 2, y), line, font=label_font, fill=text_hex, anchor="ma")
        y += line_height

    y += meta_font_size * 0.5
    draw.text(
        (width / 2, y),
        f"{filename_tag}  |  {dimension_tag}",
        font=meta_font,
        fill=text_hex,
        anchor="ma",
    )

    out_path = OUTPUT_DIR / item["category"] / item["filename"]
    out_path.parent.mkdir(parents=True, exist_ok=True)

    if out_path.suffix.lower() == ".png":
        img.save(out_path, "PNG")
    else:
        img.save(out_path, "JPEG", quality=82)


def main() -> None:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    assets = manifest["assets"]

    for item in assets:
        make_placeholder(item)

    print(f"Selesai. {len(assets)} placeholder dibuat di {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
