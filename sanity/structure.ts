import type { StructureResolver } from "sanity/structure";

/*
  Susunan menu di sisi kiri panel admin.

  Tanpa pengaturan ini, Sanity menampilkan sebelas jenis konten berjajar
  tanpa pengelompokan. Dikelompokkan begini supaya admin cafe langsung
  paham mana yang berhubungan dengan menu, mana fasilitas, mana galeri.

  Popup Promo dibuat dokumen tunggal, artinya langsung membuka satu halaman
  isian, bukan daftar. Ini mencegah admin tidak sengaja membuat dua promo
  yang saling bertabrakan.
*/

const ID_DOKUMEN_PROMO = "promoPopupUtama";
const ID_DOKUMEN_WEDDING = "weddingPackageUtama";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Konten Website")
    .items([
      S.listItem()
        .title("Menu & Harga")
        .child(
          S.list()
            .title("Menu & Harga")
            .items([
              S.documentTypeListItem("menuItem").title("Menu Best Seller"),
              S.documentTypeListItem("menuCategory").title("Kategori Menu"),
              S.documentTypeListItem("menuPackage").title("Paket Menu"),
              S.listItem()
                .title("Wedding Package")
                .child(
                  S.document()
                    .schemaType("weddingPackage")
                    .documentId(ID_DOKUMEN_WEDDING)
                    .title("Wedding Package"),
                ),
            ]),
        ),

      S.listItem()
        .title("Fasilitas & Ruang")
        .child(
          S.list()
            .title("Fasilitas & Ruang")
            .items([
              S.documentTypeListItem("space").title("Ruang & Area"),
              S.documentTypeListItem("highlightService").title(
                "Layanan Unggulan",
              ),
              S.documentTypeListItem("supportFacility").title(
                "Fasilitas Penunjang",
              ),
              S.documentTypeListItem("venuePhoto").title("Foto Venue"),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title("Popup Promo")
        .child(
          S.document()
            .schemaType("promoPopup")
            .documentId(ID_DOKUMEN_PROMO)
            .title("Popup Promo"),
        ),

      S.divider(),

      S.listItem()
        .title("Event & Galeri")
        .child(
          S.list()
            .title("Event & Galeri")
            .items([
              S.documentTypeListItem("event").title("Dokumentasi Event"),
              S.documentTypeListItem("galleryPhoto").title("Foto Galeri"),
            ]),
        ),

      S.documentTypeListItem("testimonial").title("Testimoni Pengunjung"),
    ]);
