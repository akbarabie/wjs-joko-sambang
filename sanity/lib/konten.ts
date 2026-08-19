import "server-only";

import type { EventItem, GalleryPhoto } from "@/lib/events-data";
import type {
  HighlightService,
  SpaceItem,
  SupportFacility,
} from "@/lib/facilities-data";
import type { MenuCategoryItem, MenuItem, MenuPackage } from "@/lib/menu-data";
import type { PromoPopupData } from "@/lib/promo-data";
import type { Testimonial } from "@/lib/testimonials-data";

import { client } from "./client";
import {
  queryEvents,
  queryGalleryPhotos,
  queryHighlightServices,
  queryKategoriMenu,
  queryMenuBestSeller,
  queryPaketMenu,
  queryPromoPopup,
  querySpaces,
  querySupportFacilities,
  queryTestimonials,
  queryVenuePhotos,
} from "./queries";

/*
  Pintu pengambilan konten untuk halaman.

  Ditandai server-only supaya tidak sengaja terpakai di komponen sisi
  browser. Pengambilan data memang harus terjadi di server, lalu hasilnya
  diteruskan ke komponen tampilan lewat props.

  Semua fungsi di bawah mengembalikan bentuk data yang sama persis dengan
  tipe di folder lib/, jadi komponen tampilan tidak perlu tahu datanya
  berasal dari Sanity atau dari file.

  Hasilnya ditandai label "konten-sanity" supaya nanti bisa disegarkan lewat
  webhook begitu admin menekan Publish, tanpa perlu deploy ulang.
*/

const OPSI_AMBIL = { next: { tags: ["konten-sanity"] } };

export type FotoVenue = {
  id: string;
  src: string;
  alt: string;
  caption: string;
};

export function ambilMenuBestSeller() {
  return client.fetch<MenuItem[]>(queryMenuBestSeller, {}, OPSI_AMBIL);
}

export function ambilKategoriMenu() {
  return client.fetch<MenuCategoryItem[]>(queryKategoriMenu, {}, OPSI_AMBIL);
}

export function ambilPaketMenu() {
  return client.fetch<MenuPackage[]>(queryPaketMenu, {}, OPSI_AMBIL);
}

export function ambilPromoPopup() {
  return client.fetch<PromoPopupData | null>(queryPromoPopup, {}, OPSI_AMBIL);
}

export function ambilEvents() {
  return client.fetch<EventItem[]>(queryEvents, {}, OPSI_AMBIL);
}

export function ambilGalleryPhotos() {
  return client.fetch<GalleryPhoto[]>(queryGalleryPhotos, {}, OPSI_AMBIL);
}

export function ambilTestimonials() {
  return client.fetch<Testimonial[]>(queryTestimonials, {}, OPSI_AMBIL);
}

export function ambilRuangUmum() {
  return client.fetch<SpaceItem[]>(querySpaces, { tipe: "public" }, OPSI_AMBIL);
}

export function ambilRuangPrivat() {
  return client.fetch<SpaceItem[]>(
    querySpaces,
    { tipe: "private" },
    OPSI_AMBIL,
  );
}

export function ambilLayananUnggulan() {
  return client.fetch<HighlightService[]>(
    queryHighlightServices,
    {},
    OPSI_AMBIL,
  );
}

export function ambilFasilitasPenunjang() {
  return client.fetch<SupportFacility[]>(
    querySupportFacilities,
    {},
    OPSI_AMBIL,
  );
}

export function ambilFotoVenue() {
  return client.fetch<FotoVenue[]>(queryVenuePhotos, {}, OPSI_AMBIL);
}
