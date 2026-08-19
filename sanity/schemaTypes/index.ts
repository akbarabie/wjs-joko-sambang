import type { SchemaTypeDefinition } from "sanity";

import { event } from "./event";
import { galleryPhoto } from "./galleryPhoto";
import { highlightService } from "./highlightService";
import { menuCategory } from "./menuCategory";
import { menuItem } from "./menuItem";
import { menuPackage } from "./menuPackage";
import { promoPopup } from "./promoPopup";
import { space } from "./space";
import { supportFacility } from "./supportFacility";
import { testimonial } from "./testimonial";
import { venuePhoto } from "./venuePhoto";

/*
  Daftar jenis konten yang bisa dikelola admin cafe lewat panel Studio.
  Semuanya mengikuti bentuk data yang sudah ada di folder lib/, jadi
  penyambungan ke halaman nanti tidak perlu mengubah komponen tampilan.
*/
export const schemaTypes: SchemaTypeDefinition[] = [
  menuItem,
  menuCategory,
  menuPackage,
  promoPopup,
  event,
  galleryPhoto,
  testimonial,
  space,
  highlightService,
  supportFacility,
  venuePhoto,
];
