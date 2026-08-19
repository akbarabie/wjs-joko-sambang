import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/*
  Penerima sinyal dari Sanity.

  Alurnya begini. Admin cafe mengubah harga di panel /studio lalu menekan
  Publish. Sanity langsung mengirim pesan ke alamat ini. Begitu pesannya
  terbukti asli, penanda cache "konten-sanity" dihapus, sehingga pengunjung
  berikutnya menerima halaman dengan data terbaru. Tidak perlu deploy ulang
  dan tidak perlu menunggu.

  Keaslian pesan diperiksa lewat tanda tangan digital yang ikut dikirim
  Sanity di header. Tanpa pemeriksaan ini, siapa pun yang tahu alamat
  webhook bisa memaksa website menyegarkan cache berkali-kali.
*/

// Wajib berjalan di Node.js, bukan Edge, karena pemeriksaan tanda tangan
// memakai modul kriptografi bawaan Node.
export const runtime = "nodejs";

type IsiPesanSanity = {
  _id?: string;
  _type?: string;
};

export async function POST(req: NextRequest) {
  const rahasia = process.env.SANITY_REVALIDATE_SECRET;

  /*
    Kalau rahasianya belum diisi, lebih baik berhenti di sini daripada
    menerima pesan tanpa pemeriksaan. Balasannya 500 karena ini kesalahan
    konfigurasi di sisi kita, bukan kesalahan pengirim.
  */
  if (!rahasia) {
    console.error(
      "SANITY_REVALIDATE_SECRET belum diisi. Isi dulu di .env.local " +
        "untuk lokal, atau di Environment Variables dashboard Vercel.",
    );
    return NextResponse.json(
      { pesan: "Webhook belum dikonfigurasi di sisi server." },
      { status: 500 },
    );
  }

  try {
    /*
      Argumen ketiga diisi true dengan sengaja. Sanity butuh jeda beberapa
      detik sampai perubahan benar-benar merata di seluruh servernya. Tanpa
      jeda ini, ada kemungkinan cache terhapus lalu langsung terisi ulang
      dengan data lama, dan hasilnya perubahan admin seolah tidak muncul.
    */
    const { isValidSignature, body } = await parseBody<IsiPesanSanity>(
      req,
      rahasia,
      true,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { pesan: "Tanda tangan tidak cocok, permintaan ditolak." },
        { status: 401 },
      );
    }

    if (!body?._type) {
      return NextResponse.json(
        { pesan: "Isi pesan tidak dikenali, tidak ada jenis dokumen." },
        { status: 400 },
      );
    }

    /*
      Satu penanda untuk semua konten. Sengaja tidak dipecah per jenis
      dokumen karena jumlah halamannya sedikit dan biaya menyegarkan
      semuanya sekaligus praktis tidak terasa.

      Argumen kedua wajib ada sejak Next.js 16. Nilai expire 0 berarti data
      lama langsung dianggap kedaluwarsa, bukan masih boleh disajikan sekian
      detik lagi. Ini yang kita mau: begitu admin menekan Publish, pengunjung
      berikutnya harus menerima data baru.
    */
    revalidateTag("konten-sanity", { expire: 0 });

    const waktu = new Date().toISOString();
    console.log(
      `Konten disegarkan. Jenis dokumen: ${body._type}, waktu: ${waktu}`,
    );

    return NextResponse.json({
      disegarkan: true,
      jenisDokumen: body._type,
      waktu,
    });
  } catch (error) {
    const pesanError =
      error instanceof Error ? error.message : "Penyebab tidak diketahui";

    console.error(`Gagal memproses webhook Sanity: ${pesanError}`);

    return NextResponse.json(
      { pesan: "Terjadi kesalahan saat memproses webhook." },
      { status: 500 },
    );
  }
}

/*
  Alamat ini hanya melayani POST dari Sanity. Kalau dibuka lewat browser
  biasa, balas dengan penolakan yang sopan supaya tidak terlihat seperti
  halaman yang rusak.
*/
export function GET() {
  return NextResponse.json(
    { pesan: "Alamat ini hanya menerima webhook dari Sanity." },
    { status: 405 },
  );
}
