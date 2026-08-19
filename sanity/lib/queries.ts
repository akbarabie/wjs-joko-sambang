/*
  Kumpulan query untuk mengambil konten dari Sanity.

  Prinsip utama: bentuk hasil query dibuat sama persis dengan tipe data yang
  selama ini dipakai di folder lib/. Jadi komponen tampilan tidak perlu
  diubah logikanya, cukup menerima datanya lewat props.

  Perhatikan pola pada field gambar. Di Sanity foto tersimpan sebagai
  referensi, sedangkan komponen mengharapkan sebuah alamat berbentuk teks.
  Karena itu di setiap query dituliskan "image": image.asset->url supaya yang
  kembali langsung berupa alamat siap pakai, sama seperti dulu waktu masih
  membaca dari folder public.
*/

// ---------------------------------------------------------------------------
// Menu
// ---------------------------------------------------------------------------

export const queryMenuBestSeller = `
  *[_type == "menuItem"] | order(order asc) {
    "id": slug.current,
    name,
    description,
    "image": image.asset->url,
    category,
    isBestSeller
  }
`;

export const queryKategoriMenu = `
  *[_type == "menuCategory"] | order(order asc) {
    "id": slug.current,
    name,
    kelompok,
    description,
    "image": image.asset->url,
    "alt": coalesce(image.alt, name),
    "contoh": coalesce(contoh, [])
  }
`;

export const queryPaketMenu = `
  *[_type == "menuPackage"] | order(order asc) {
    "id": slug.current,
    name,
    priceRange,
    unit,
    description,
    "image": image.asset->url,
    "alt": coalesce(image.alt, name),
    "features": coalesce(features, []),
    isHighlighted
  }
`;

// ---------------------------------------------------------------------------
// Promo
// ---------------------------------------------------------------------------

export const queryPromoPopup = `
  *[_type == "promoPopup"][0] {
    aktif,
    "id": kodePromo,
    badge,
    title,
    subtitle,
    "image": image.asset->url,
    "alt": coalesce(image.alt, title),
    "poin": coalesce(poin, []),
    ctaLabel,
    ctaHref,
    catatan,
    delayMs,
    jedaTampilJam
  }
`;

// ---------------------------------------------------------------------------
// Event dan galeri
// ---------------------------------------------------------------------------

export const queryEvents = `
  *[_type == "event"] | order(order asc) {
    "id": slug.current,
    kategori,
    title,
    partner,
    description,
    "highlights": coalesce(highlights, []),
    "images": images[]{
      "src": asset->url,
      "alt": coalesce(alt, "")
    }
  }
`;

export const queryGalleryPhotos = `
  *[_type == "galleryPhoto"] | order(order asc) {
    "id": _id,
    "src": image.asset->url,
    "alt": coalesce(image.alt, caption),
    caption,
    orientation
  }
`;

// ---------------------------------------------------------------------------
// Testimoni
// ---------------------------------------------------------------------------

export const queryTestimonials = `
  *[_type == "testimonial"] | order(order asc) {
    "id": slug.current,
    name,
    meta,
    quote,
    rating
  }
`;

// ---------------------------------------------------------------------------
// Fasilitas
// ---------------------------------------------------------------------------

// Dipakai bersama untuk area umum dan area privat, dibedakan lewat parameter
// $tipe supaya tidak perlu menulis dua query yang isinya sama.
export const querySpaces = `
  *[_type == "space" && tipe == $tipe] | order(order asc) {
    "id": slug.current,
    name,
    tagline,
    description,
    "images": images[]{
      "src": asset->url,
      "alt": coalesce(alt, "")
    },
    "features": features[]{ icon, label },
    capacity,
    "bestFor": coalesce(bestFor, [])
  }
`;

export const queryHighlightServices = `
  *[_type == "highlightService"] | order(order asc) {
    "id": slug.current,
    name,
    description,
    "image": image.asset->url,
    "alt": coalesce(image.alt, name)
  }
`;

export const querySupportFacilities = `
  *[_type == "supportFacility"] | order(order asc) {
    icon,
    label,
    note
  }
`;

export const queryVenuePhotos = `
  *[_type == "venuePhoto"] | order(order asc) {
    "id": _id,
    "src": image.asset->url,
    "alt": coalesce(image.alt, caption),
    caption
  }
`;
