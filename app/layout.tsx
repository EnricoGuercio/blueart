import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HashScrollFix from "@/components/HashScrollFix";

// Vedi next.config.ts: impostato dal workflow GitHub Actions al nome del
// repository per l'export su GitHub Pages di progetto, vuoto altrove.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Blue Art — Servizi con e per artisti",
  description:
    "Blue Art è una cooperativa che lavora nel campo della cultura e delle arti, con l'obiettivo di creare connessioni tra artisti, territorio e comunità.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  icons: {
    icon: `${basePath}/logo/favicon.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        {/* Font self-hosted: percorso assoluto "/fonts/..." non gestibile da
            un CSS statico in funzione del basePath di build — interpolato
            qui invece che in globals.css, vedi nota lì. */}
        <style>{`
          @font-face {
            font-family: "Raleway";
            src: url("${basePath}/fonts/Raleway-Regular.ttf") format("truetype");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "Raleway";
            src: url("${basePath}/fonts/Raleway-Medium.ttf") format("truetype");
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "Raleway";
            src: url("${basePath}/fonts/Raleway-SemiBold.ttf") format("truetype");
            font-weight: 600;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "Raleway";
            src: url("${basePath}/fonts/Raleway-Bold.ttf") format("truetype");
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
      </head>
      <body>
        <HashScrollFix />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
