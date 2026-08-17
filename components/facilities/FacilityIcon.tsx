// Jembatan antara data fasilitas (yang menyimpan icon sebagai string) dengan
// komponen icon asli dari lucide-react. Dipisah ke file sendiri supaya
// lib/facilities-data.ts tetap murni data, dan kalau ada icon baru cukup
// ditambah di satu tempat ini saja.

import {
  Armchair,
  Camera,
  Car,
  Coffee,
  Landmark,
  Mountain,
  Music,
  PartyPopper,
  Presentation,
  Projector,
  Snowflake,
  Sun,
  Trees,
  Users,
  Volume2,
  Wifi,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { FacilityIconName } from "@/lib/facilities-data";

const ICON_MAP: Record<FacilityIconName, LucideIcon> = {
  armchair: Armchair,
  snowflake: Snowflake,
  wifi: Wifi,
  sun: Sun,
  trees: Trees,
  mountain: Mountain,
  wind: Wind,
  users: Users,
  projector: Projector,
  volume: Volume2,
  presentation: Presentation,
  music: Music,
  landmark: Landmark,
  car: Car,
  camera: Camera,
  party: PartyPopper,
  coffee: Coffee,
};

type FacilityIconProps = {
  name: FacilityIconName;
  className?: string;
};

export function FacilityIcon({ name, className }: FacilityIconProps) {
  const Icon = ICON_MAP[name];
  return <Icon className={className} aria-hidden="true" />;
}
