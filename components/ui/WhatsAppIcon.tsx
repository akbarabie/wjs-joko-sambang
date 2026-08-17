// lucide-react tidak menyediakan icon brand (lihat catatan di Footer.tsx),
// jadi WhatsApp dibuat manual dari bentuk generik "bubble chat + gagang
// telepon", gaya filled solid supaya konsisten dengan InstagramIcon dan
// TikTokIcon. Diletakkan di sini (bukan lokal di satu file) karena dipakai
// berulang: tombol RSVP di Navbar (desktop & mobile), dan berpotensi dipakai
// lagi nanti di Footer/Contact page (Step 7).

export function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Z" />
      <path d="M9 8.5c.2-.5.4-.5.6-.5h.5c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .5-.1.6l-.5.5c-.2.2-.2.4 0 .7.5.9 1.6 2 2.5 2.5.3.2.5.2.7 0l.5-.5c.2-.2.4-.2.6-.1l1.4.6c.3.1.4.3.4.5v.5c0 .2 0 .4-.5.6-.8.4-1.6.4-2.4.1a7 7 0 0 1-4-3.9c-.3-.7-.3-1.5.1-2.3Z" />
    </svg>
  );
}
