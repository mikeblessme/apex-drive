import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Chrome } from "@/components/ui";

export const metadata: Metadata = {
  title: "Apex Drive 3D — Trouvez votre centre d'examen",
  description:
    "L'Ontario est le tronc, les régions sont les branches, les centres sont les feuilles. Explorez l'arbre des centres DriveTest.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1424",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Suspense>
          <Chrome>{children}</Chrome>
        </Suspense>
      </body>
    </html>
  );
}
