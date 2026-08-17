import Image from "next/image";

export function AboutHero() {
  return (
    /* Tambahkan rounded-b-[2.5rem] sm:rounded-b-[3.5rem] jika ingin dibuat melengkung */
    <section className="relative flex h-[45vh] min-h-[320px] items-end overflow-hidden bg-wood-900">
      <Image
        src="/images/about/gbr 1.jpeg"
        alt="Gedung WJS Joko Sambang Café"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-wood-950/90 via-wood-950/50 to-wood-950/40" />
    </section>
  );
}
