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

// Squelette de la coquille (barre d'app + contenu) pendant que Chrome
// suspend au pré-rendu. Ne pas confondre avec loading.tsx, qui couvre le
// contenu de page une fois la coquille montée.
function ChromeSkeleton() {
  return (
    <div className="phone" role="status" aria-label="Chargement de l'application">
      <header className="appbar"><span>Apex Drive 3D</span></header>
      <main>
        <div className="skel skel-title" />
        <div className="skel skel-line" />
        <div className="skel skel-line short" />
        <div className="skel skel-block" />
      </main>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Suspense fallback={<ChromeSkeleton />}>
          <Chrome>{children}</Chrome>
        </Suspense>
      </body>
    </html>
  );
}
