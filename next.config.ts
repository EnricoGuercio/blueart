import type { NextConfig } from "next";

// Impostato dal workflow GitHub Actions al nome del repository (es.
// "/blueart-demo"), così l'export statico funziona sotto
// https://<utente>.github.io/<repo>/ senza hardcodare il nome qui. In locale
// e nel build per Aruba (dominio proprio, nessun sotto-path) resta vuoto.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
