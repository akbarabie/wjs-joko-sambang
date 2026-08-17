"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, MessageCircle, Send } from "lucide-react";
import { CONTACT, buildWhatsAppLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Pilihan area mengikuti ruang yang tersedia di halaman Facilities & Spaces,
// supaya istilah yang dipakai pengunjung sama dengan yang dikenal tim cafe.
const AREA_OPTIONS = [
  "Indoor",
  "Outdoor",
  "VIP / Meeting Room",
  "Event Space",
  "Belum tahu, mohon disarankan",
] as const;

type FormState = {
  nama: string;
  telepon: string;
  tanggal: string;
  jam: string;
  jumlahTamu: string;
  area: string;
  catatan: string;
};

const INITIAL_FORM: FormState = {
  nama: "",
  telepon: "",
  tanggal: "",
  jam: "",
  jumlahTamu: "",
  area: AREA_OPTIONS[0],
  catatan: "",
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/** Ubah "2026-08-20" jadi "20 Agustus 2026" supaya pesan WA enak dibaca. */
function formatTanggal(nilai: string): string {
  if (!nilai) return "";
  const [tahun, bulan, hari] = nilai.split("-");
  const namaBulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  const indexBulan = Number(bulan) - 1;
  if (!namaBulan[indexBulan]) return nilai;
  return `${Number(hari)} ${namaBulan[indexBulan]} ${tahun}`;
}

export function ReservationForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const tanggalRef = useRef<HTMLInputElement>(null);

  // Batas tanggal minimal diisi langsung ke elemen DOM setelah komponen tampil
  // di browser, bukan lewat state. Alasannya dua: jam server bisa berbeda
  // dengan jam perangkat pengunjung (memicu hydration mismatch), dan mengubah
  // atribut elemen memang tugas yang pas untuk useEffect.
  useEffect(() => {
    if (!tanggalRef.current) return;
    const hariIni = new Date();
    const offsetMenit = hariIni.getTimezoneOffset();
    const lokal = new Date(hariIni.getTime() - offsetMenit * 60 * 1000);
    tanggalRef.current.min = lokal.toISOString().slice(0, 10);
  }, []);

  function updateField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Hapus pesan error begitu pengguna mulai memperbaiki isiannya.
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): FormErrors {
    const hasil: FormErrors = {};

    if (!form.nama.trim()) {
      hasil.nama = "Nama masih kosong";
    }

    const teleponBersih = form.telepon.replace(/[\s-]/g, "");
    if (!teleponBersih) {
      hasil.telepon = "Nomor telepon masih kosong";
    } else if (!/^(\+62|62|0)8\d{7,12}$/.test(teleponBersih)) {
      hasil.telepon = "Format nomor belum benar, contoh: 0812xxxxxxx";
    }

    if (!form.tanggal) {
      hasil.tanggal = "Tanggal kunjungan belum dipilih";
    } else {
      // Bandingkan hanya bagian tanggalnya saja, supaya reservasi untuk hari
      // ini tetap dianggap sah walau jamnya sudah lewat siang.
      const batasHariIni = new Date();
      batasHariIni.setHours(0, 0, 0, 0);
      const [tahun, bulan, hari] = form.tanggal.split("-").map(Number);
      const tanggalDipilih = new Date(tahun, bulan - 1, hari);
      if (tanggalDipilih < batasHariIni) {
        hasil.tanggal = "Tanggal kunjungan sudah lewat";
      }
    }

    if (!form.jam) {
      hasil.jam = "Jam kunjungan belum dipilih";
    }

    const jumlah = Number(form.jumlahTamu);
    if (!form.jumlahTamu) {
      hasil.jumlahTamu = "Jumlah tamu belum diisi";
    } else if (!Number.isInteger(jumlah) || jumlah < 1) {
      hasil.jumlahTamu = "Jumlah tamu minimal 1 orang";
    }

    return hasil;
  }

  // Pesan WhatsApp disusun ulang setiap kali isian berubah, sekaligus dipakai
  // untuk pratinjau di bawah form supaya pengunjung tahu persis apa yang akan
  // terkirim sebelum menekan tombol.
  const pesanWhatsApp = useMemo(() => {
    const baris = [
      "Halo WJS Joko Sambang Café, saya ingin melakukan reservasi.",
      "",
      `Nama: ${form.nama || "-"}`,
      `Nomor telepon: ${form.telepon || "-"}`,
      `Tanggal kunjungan: ${formatTanggal(form.tanggal) || "-"}`,
      `Jam kunjungan: ${form.jam || "-"}`,
      `Jumlah tamu: ${form.jumlahTamu ? `${form.jumlahTamu} orang` : "-"}`,
      `Area yang diinginkan: ${form.area}`,
    ];

    if (form.catatan.trim()) {
      baris.push(`Catatan tambahan: ${form.catatan.trim()}`);
    }

    baris.push("", "Mohon dibantu konfirmasi ketersediaannya. Terima kasih.");
    return baris.join("\n");
  }, [form]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const hasilValidasi = validate();
    setErrors(hasilValidasi);
    if (Object.keys(hasilValidasi).length > 0) return;

    // Website ini belum punya backend (lihat PRD section 7, roadmap tahap 2),
    // jadi reservasi diteruskan ke WhatsApp admin dengan pesan yang sudah rapi.
    window.open(buildWhatsAppLink(pesanWhatsApp), "_blank", "noopener,noreferrer");
  }

  const labelClass =
    "block text-xs font-semibold uppercase tracking-[0.2em] text-wood-400";
  const inputClass =
    "mt-2 w-full rounded-xl border border-wood-200 bg-cream-100 px-4 py-3 text-sm text-wood-700 outline-none transition-colors placeholder:text-wood-300 focus:border-forest-500";

  return (
    <section
      id="reservasi"
      className="scroll-mt-24 bg-cream-DEFAULT px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="divider-accent justify-center text-xs font-semibold uppercase tracking-[0.4em] text-gold-600">
            Reservasi
          </p>
          <h2 className="font-heading mt-5 text-3xl font-semibold text-wood-800 sm:text-4xl">
            Pesan Tempat Dulu, Biar Tenang
          </h2>
          <p className="mt-5 text-wood-500">
            Isi datanya di bawah, nanti otomatis terkirim ke WhatsApp admin dalam
            format yang sudah rapi. Tidak perlu mengetik ulang.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          custom={0.1}
          className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_1fr]"
        >
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-[2rem] border border-wood-100 bg-cream-100 p-7 shadow-lg shadow-wood-900/5 sm:p-9"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="nama" className={labelClass}>
                  Nama Lengkap
                </label>
                <input
                  id="nama"
                  type="text"
                  value={form.nama}
                  onChange={(event) => updateField("nama", event.target.value)}
                  placeholder="Nama pemesan"
                  className={cn(inputClass, errors.nama && "border-red-400")}
                />
                <FieldError message={errors.nama} />
              </div>

              <div>
                <label htmlFor="telepon" className={labelClass}>
                  Nomor Telepon
                </label>
                <input
                  id="telepon"
                  type="tel"
                  inputMode="tel"
                  value={form.telepon}
                  onChange={(event) => updateField("telepon", event.target.value)}
                  placeholder="0812xxxxxxx"
                  className={cn(inputClass, errors.telepon && "border-red-400")}
                />
                <FieldError message={errors.telepon} />
              </div>

              <div>
                <label htmlFor="jumlahTamu" className={labelClass}>
                  Jumlah Tamu
                </label>
                <input
                  id="jumlahTamu"
                  type="number"
                  min={1}
                  value={form.jumlahTamu}
                  onChange={(event) => updateField("jumlahTamu", event.target.value)}
                  placeholder="Contoh: 8"
                  className={cn(inputClass, errors.jumlahTamu && "border-red-400")}
                />
                <FieldError message={errors.jumlahTamu} />
              </div>

              <div>
                <label htmlFor="tanggal" className={labelClass}>
                  Tanggal Kunjungan
                </label>
                <input
                  id="tanggal"
                  ref={tanggalRef}
                  type="date"
                  value={form.tanggal}
                  onChange={(event) => updateField("tanggal", event.target.value)}
                  className={cn(inputClass, errors.tanggal && "border-red-400")}
                />
                <FieldError message={errors.tanggal} />
              </div>

              <div>
                <label htmlFor="jam" className={labelClass}>
                  Jam Kunjungan
                </label>
                <input
                  id="jam"
                  type="time"
                  value={form.jam}
                  onChange={(event) => updateField("jam", event.target.value)}
                  className={cn(inputClass, errors.jam && "border-red-400")}
                />
                <FieldError message={errors.jam} />
              </div>

              <div className="sm:col-span-2">
                <span className={labelClass}>Area yang Diinginkan</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {AREA_OPTIONS.map((option) => {
                    const isActive = form.area === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => updateField("area", option)}
                        aria-pressed={isActive}
                        className={cn(
                          "rounded-full border px-4 py-2 text-sm transition-colors",
                          isActive
                            ? "border-forest-500 bg-forest-500 text-cream-100"
                            : "border-wood-200 text-wood-600 hover:border-forest-500",
                        )}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="catatan" className={labelClass}>
                  Catatan Tambahan (opsional)
                </label>
                <textarea
                  id="catatan"
                  rows={3}
                  value={form.catatan}
                  onChange={(event) => updateField("catatan", event.target.value)}
                  placeholder="Misal: acara ulang tahun, butuh proyektor, ada tamu anak-anak"
                  className={cn(inputClass, "resize-none")}
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-4 text-sm font-semibold text-wood-900 shadow-lg shadow-gold-900/15 transition-colors hover:bg-gold-400"
            >
              <Send className="h-4 w-4" />
              Kirim Reservasi via WhatsApp
            </motion.button>

            <p className="mt-4 text-center text-xs text-wood-400">
              Tombol ini akan membuka WhatsApp ke nomor admin{" "}
              {CONTACT.whatsapp.display}. Reservasi baru terhitung sah setelah
              dibalas oleh admin.
            </p>
          </form>

          {/* Pratinjau pesan supaya pengunjung yakin isinya sudah benar
              sebelum berpindah ke aplikasi WhatsApp. */}
          <div className="flex flex-col rounded-[2rem] bg-wood-900 p-7 shadow-xl shadow-wood-900/20 sm:p-8">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-gold-400" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
                Pratinjau Pesan
              </p>
            </div>

            <div className="mt-6 flex-1 rounded-2xl bg-forest-500/15 p-5">
              <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-cream-200/85">
                {pesanWhatsApp}
              </pre>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-cream-200/50">
              Isi pesan di atas berubah otomatis mengikuti data yang kamu isi di
              sebelah kiri.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-2 flex items-center gap-1.5 text-xs text-red-500">
      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
      {message}
    </p>
  );
}
