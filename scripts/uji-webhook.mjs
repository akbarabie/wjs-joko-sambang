import { createHmac } from "node:crypto";

/*
  Alat uji untuk memastikan route webhook bekerja sebelum di-deploy.

  Skrip ini menirukan cara Sanity mengirim pesan, lengkap dengan tanda
  tangan digitalnya, lalu memeriksa apakah website menolak pesan palsu dan
  menerima pesan asli.

  Cara pakai, buka dua terminal:

    Terminal 1:  npm run dev
    Terminal 2:  node scripts/uji-webhook.mjs

  Kalau website sudah hidup di alamat lain, sebutkan alamatnya:

    node scripts/uji-webhook.mjs https://wjs-joko-sambang.vercel.app

  Rahasia dibaca dari SANITY_REVALIDATE_SECRET. Kalau menguji server lokal,
  isi dulu nilainya di .env.local, lalu jalankan skrip ini dengan menyertakan
  rahasianya:

    SANITY_REVALIDATE_SECRET=isi-rahasia-anda node scripts/uji-webhook.mjs
*/

const NAMA_HEADER_TANDA_TANGAN = "sanity-webhook-signature";

const alamatDasar = process.argv[2] || "http://localhost:3000";
const alamatWebhook = `${alamatDasar.replace(/\/$/, "")}/api/revalidate`;
const rahasia = process.env.SANITY_REVALIDATE_SECRET;

if (!rahasia) {
  console.error(
    "Rahasia belum diisi. Jalankan seperti ini:\n" +
      "  SANITY_REVALIDATE_SECRET=isi-rahasia-anda node scripts/uji-webhook.mjs",
  );
  process.exit(1);
}

// Isi pesan tiruan, bentuknya sama dengan yang dikirim Sanity sungguhan.
const isiPesan = JSON.stringify({
  _id: "dokumenUjiCoba",
  _type: "menuItem",
  _rev: "uji-coba",
});

/*
  Tanda tangan Sanity berbentuk "t=<waktu>,v1=<sidik>", di mana sidiknya
  adalah HMAC SHA-256 dari gabungan waktu, titik, lalu isi pesan.
*/
function buatTandaTangan(isi, kunci, waktu = Date.now()) {
  const sidik = createHmac("sha256", kunci)
    .update(`${waktu}.${isi}`)
    .digest("base64url");
  return `t=${waktu},v1=${sidik}`;
}

async function kirim(judul, header, kodeDiharapkan) {
  let jawaban;
  try {
    jawaban = await fetch(alamatWebhook, {
      method: "POST",
      headers: { "content-type": "application/json", ...header },
      body: isiPesan,
    });
  } catch (error) {
    console.log(`GAGAL  ${judul}: tidak bisa menghubungi ${alamatWebhook}`);
    console.log(`       penyebab: ${error.message}`);
    return false;
  }

  const isiJawaban = await jawaban.text();
  const lolos = jawaban.status === kodeDiharapkan;
  const tanda = lolos ? "OK    " : "GAGAL ";

  console.log(
    `${tanda}${judul}: status ${jawaban.status} ` +
      `(diharapkan ${kodeDiharapkan})`,
  );
  console.log(`       jawaban: ${isiJawaban}`);
  return lolos;
}

async function jalankan() {
  console.log(`Menguji ${alamatWebhook}\n`);

  const hasil = [];

  hasil.push(await kirim("Pesan tanpa tanda tangan harus ditolak", {}, 401));

  hasil.push(
    await kirim(
      "Pesan dengan tanda tangan ngawur harus ditolak",
      { [NAMA_HEADER_TANDA_TANGAN]: "t=1,v1=ngawur" },
      401,
    ),
  );

  hasil.push(
    await kirim(
      "Pesan dengan rahasia yang salah harus ditolak",
      {
        [NAMA_HEADER_TANDA_TANGAN]: buatTandaTangan(isiPesan, "rahasia-keliru"),
      },
      401,
    ),
  );

  hasil.push(
    await kirim(
      "Pesan asli harus diterima dan menyegarkan konten",
      { [NAMA_HEADER_TANDA_TANGAN]: buatTandaTangan(isiPesan, rahasia) },
      200,
    ),
  );

  const jumlahLolos = hasil.filter(Boolean).length;
  console.log(`\nHasil: ${jumlahLolos} dari ${hasil.length} pengujian lolos.`);

  if (jumlahLolos !== hasil.length) {
    console.log("Ada pengujian yang gagal, periksa lagi sebelum di-deploy.");
    process.exit(1);
  }

  console.log("Semua aman, webhook siap dipakai.");
}

jalankan();
