import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./sanity/env";

/*
  Konfigurasi untuk perintah sanity di terminal, misalnya saat mengekspor
  atau mengimpor isi dataset. Nilainya diambil dari environment variable
  yang sama dengan yang dipakai website, jadi tidak ada angka yang ditulis
  ganda di dua tempat.
*/
export default defineCliConfig({
  api: { projectId, dataset },
});
