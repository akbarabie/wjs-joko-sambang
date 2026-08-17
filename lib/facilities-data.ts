// Data terpusat halaman Facilities & Spaces (PRD Step 5).
// Sumber konten: PDF Company Profile halaman "Public Space" & "Additional
// Services", ditambah poin fasilitas yang disebut di PRD section 2.2 dan 5.
//
// Icon disimpan sebagai string (bukan komponen React) supaya file ini tetap
// murni data dan aman diimpor dari server component maupun client component.
// Pemetaan string ke komponen lucide-react dilakukan di masing-masing UI.

export type FacilityIconName =
  | "armchair"
  | "snowflake"
  | "wifi"
  | "sun"
  | "trees"
  | "mountain"
  | "wind"
  | "users"
  | "projector"
  | "volume"
  | "presentation"
  | "music"
  | "landmark"
  | "car"
  | "camera"
  | "party"
  | "coffee";

export type FacilityFeature = {
  icon: FacilityIconName;
  label: string;
};

export type SpaceItem = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  /** Foto pertama dipakai sebagai tampilan awal, sisanya jadi thumbnail. */
  images: { src: string; alt: string }[];
  features: FacilityFeature[];
  /**
   * CATATAN PENTING: angka kapasitas di bawah masih perkiraan sementara
   * supaya layout kartu terlihat utuh saat development. Wajib dikonfirmasi
   * ke pemilik cafe sebelum website di-deploy ke production.
   */
  capacity: string;
  bestFor: string[];
};

export const PUBLIC_SPACES: SpaceItem[] = [
  {
    id: "indoor",
    name: "Indoor Space",
    tagline: "Sejuk, tenang, dan tetap terang alami",
    description:
      "Ruang dalam dengan perpaduan elemen kayu Jawa dan sentuhan modern. Jendela besar dari lantai sampai plafon membuat pemandangan kebun dan pegunungan tetap terlihat dari dalam ruangan, tanpa harus kepanasan atau kehujanan.",
    images: [
      {
        src: "/images/facilities/facility-indoor-1.jpg",
        alt: "Area indoor dengan kursi merah di dekat jendela besar",
      },
      {
        src: "/images/facilities/facility-indoor-2.JPG",
        alt: "Area indoor dengan sofa merah dan meja bar",
      },
      {
        src: "/images/facilities/facility-indoor-3.jpg",
        alt: "Area indoor berlantai catur hitam putih dengan meja bundar",
      },
    ],
    features: [
      { icon: "armchair", label: "Kursi & sofa nyaman" },
      { icon: "snowflake", label: "Ruangan ber-AC" },
      { icon: "wifi", label: "Free WiFi" },
      { icon: "coffee", label: "Cocok untuk work from cafe" },
    ],
    capacity: "± 60 tamu",
    bestFor: ["Nongkrong santai", "Kerja & belajar", "Makan keluarga"],
  },
  {
    id: "outdoor",
    name: "Outdoor Space",
    tagline: "Udara pegunungan Batu yang asri",
    description:
      "Area terbuka dengan taman hijau, gapura kayu ukir, dan balkon berpagar kaca yang langsung menghadap kebun. Paling enak dipakai sore hari saat udara Kota Batu mulai adem dan cahayanya bagus untuk foto.",
    images: [
      {
        src: "/images/facilities/facility-outdoor-1.jpeg",
        alt: "Area outdoor dengan kursi rotan bulat dan gapura kayu ukir Jawa",
      },
      {
        src: "/images/facilities/facility-outdoor-2.jpeg",
        alt: "Area outdoor dengan sofa rotan kuning dikelilingi tanaman hijau",
      },
      {
        src: "/images/facilities/facility-outdoor-3.JPG",
        alt: "Rooftop outdoor berpagar kaca menghadap kebun",
      },
    ],
    features: [
      { icon: "trees", label: "Taman hijau asri" },
      { icon: "mountain", label: "View kebun & pegunungan" },
      { icon: "wind", label: "Udara sejuk alami" },
      { icon: "camera", label: "Banyak spot foto" },
    ],
    capacity: "± 80 tamu",
    bestFor: ["Sore santai", "Foto & konten", "Kumpul komunitas"],
  },
];

export const PRIVATE_SPACES: SpaceItem[] = [
  {
    id: "vip-room",
    name: "VIP / Meeting Room",
    tagline: "Ruang tertutup untuk rapat serius",
    description:
      "Ruang privat dengan meja kayu solid memanjang, cocok untuk rapat kerja, presentasi klien, atau diskusi yang butuh suasana tenang tanpa terganggu keramaian area umum.",
    images: [
      {
        src: "/images/facilities/facility-vip-room.jpeg",
        alt: "Room VIP dengan meja kayu panjang dan lukisan dinding",
      },
    ],
    features: [
      { icon: "projector", label: "Proyektor" },
      { icon: "presentation", label: "Papan presentasi" },
      { icon: "volume", label: "Sound system" },
      { icon: "snowflake", label: "Ruangan ber-AC" },
    ],
    capacity: "± 20 tamu",
    bestFor: ["Rapat kerja", "Presentasi klien", "Diskusi tertutup"],
  },
  {
    id: "event-space",
    name: "Event Space",
    tagline: "Ruang lapang untuk acara berkelompok",
    description:
      "Area serbaguna yang sudah beberapa kali dipakai untuk beauty class, sarasehan, gathering komunitas, hingga acara keluarga. Tata letak meja bisa disesuaikan dengan bentuk acara, dan paket konsumsi bisa digabung dengan menu buffet atau meal box.",
    images: [
      {
        src: "/images/facilities/facility-event-space.jpeg",
        alt: "Event space saat dipakai acara beauty class",
      },
    ],
    features: [
      { icon: "users", label: "Layout meja fleksibel" },
      { icon: "volume", label: "Sound system" },
      { icon: "party", label: "Dekorasi bisa disesuaikan" },
      { icon: "coffee", label: "Paket buffet & meal box" },
    ],
    capacity: "± 100 tamu",
    bestFor: ["Gathering", "Beauty class", "Sarasehan & seminar"],
  },
];

export type HighlightService = {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
};

export const HIGHLIGHT_SERVICES: HighlightService[] = [
  {
    id: "live-music",
    name: "Live Music",
    description:
      "Panggung akustik di malam hari dengan lighting hangat, menemani obrolan tanpa membuat suara jadi terlalu ramai.",
    image: "/images/facilities/facility-live-music.JPG",
    alt: "Panggung live music malam hari dengan penyanyi dan lighting hangat",
  },
  {
    id: "musholla",
    name: "Musholla",
    description:
      "Musholla bersih, wangi, dan adem yang langsung menghadap taman. Salah satu hal yang paling sering disebut pengunjung di ulasan Google Maps.",
    image: "/images/facilities/facility-musholla.jpeg",
    alt: "Musholla bersih dan adem menghadap taman",
  },
];

export type SupportFacility = {
  icon: FacilityIconName;
  label: string;
  note: string;
};

export const SUPPORT_FACILITIES: SupportFacility[] = [
  { icon: "wifi", label: "Free WiFi", note: "Stabil untuk kerja & meeting online" },
  { icon: "car", label: "Area Parkir", note: "Muat mobil dan rombongan bus kecil" },
  { icon: "landmark", label: "Musholla", note: "Bersih, wangi, menghadap taman" },
  { icon: "camera", label: "Spot Foto", note: "Gapura ukir, taman, dan rooftop" },
];

export const VENUE_PHOTOS = [
  {
    id: "venue-1",
    src: "/images/facilities/facility-hero.JPG",
    alt: "Ruang lounge dengan konsep Joglo",
    caption: "Lounge Joglo",
  },
  {
    id: "venue-2",
    src: "/images/facilities/facility-outdoor-2.jpeg",
    alt: "Venue kolam ikan yang syahdu",
    caption: "Kolam Ikan",
  },
  {
    id: "venue-3",
    src: "/images/facilities/gbr 4.jpg",
    alt: "Area indoor dengan jendela panorama menghadap kebun",
    caption: "Panorama Indoor",
  },
  {
    id: "venue-4",
    src: "/images/facilities/facility-outdoor-3.JPG",
    alt: "Gapura kayu ukir Jawa di area outdoor",
    caption: "Gapura Ukir Jawa",
  },
  {
    id: "venue-5",
    src: "/images/facilities/facility-toilet.jpeg",
    alt: "Area toilet yang selalu bersih",
    caption: "Toilet Bersih",
  },
];
