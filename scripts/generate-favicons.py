"""
Generator favicon & app icon dari logo utama.

Next.js otomatis mendeteksi file bernama favicon.ico, icon.png, dan
apple-icon.png di dalam folder app/ lalu inject <link> tag yang sesuai
ke <head> - tidak perlu setting manual di metadata.

Kenapa perlu 3 file, bukan 1:
- favicon.ico  -> ikon tab browser (butuh multi-resolusi dalam 1 file .ico)
- icon.png     -> versi modern resolusi tinggi (dipakai browser yang support,
                   juga fallback untuk PWA/Android)
- apple-icon.png -> khusus "Add to Home Screen" di iOS. HARUS background
                   solid (bukan transparan), karena iOS render kotak putih/
                   hitam polos kalau sumbernya transparan.

Cara pakai ulang (setelah logo asli dipasang di public/images/logo/wjs-logo.png):
    python3 scripts/generate-favicons.py
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE_LOGO = ROOT / "public" / "images" / "logo" / "wjs-logo.png"
APP_DIR = ROOT / "app"

# Warna wood-500 dari design token (app/globals.css), dipakai sebagai
# background solid khusus apple-icon.
APPLE_ICON_BG = "#4A3525"


def load_source() -> Image.Image:
    img = Image.open(SOURCE_LOGO).convert("RGBA")
    # Crop ke bounding box konten asli (buang margin transparan berlebih)
    # supaya pas di-resize kecil, logo tetap terasa penuh mengisi kanvas.
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    return img


def make_favicon_ico(source: Image.Image) -> None:
    sizes = [(16, 16), (32, 32), (48, 48)]
    out_path = APP_DIR / "favicon.ico"
    resized = [source.resize(size, Image.LANCZOS) for size in sizes]
    resized[0].save(out_path, format="ICO", sizes=sizes, append_images=resized[1:])


def make_icon_png(source: Image.Image) -> None:
    out_path = APP_DIR / "icon.png"
    resized = source.resize((512, 512), Image.LANCZOS)
    resized.save(out_path, format="PNG")


def make_apple_icon(source: Image.Image) -> None:
    out_path = APP_DIR / "apple-icon.png"
    canvas = Image.new("RGBA", (180, 180), APPLE_ICON_BG)

    # Logo diperkecil sedikit (85% dari kanvas) supaya ada padding alami,
    # meniru cara app icon iOS pada umumnya (isi tidak mepet ke tepi).
    target = int(180 * 0.82)
    resized_logo = source.resize((target, target), Image.LANCZOS)
    offset = ((180 - target) // 2, (180 - target) // 2)
    canvas.paste(resized_logo, offset, resized_logo)

    canvas.convert("RGB").save(out_path, format="PNG")


def main() -> None:
    if not SOURCE_LOGO.exists():
        raise SystemExit(f"Logo sumber tidak ditemukan: {SOURCE_LOGO}")

    source = load_source()
    make_favicon_ico(source)
    make_icon_png(source)
    make_apple_icon(source)
    print("Favicon & app icon berhasil dibuat: favicon.ico, icon.png, apple-icon.png")


if __name__ == "__main__":
    main()
