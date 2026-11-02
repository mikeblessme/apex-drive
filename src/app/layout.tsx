import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Chrome } from "@/components/ui";

export const metadata: Metadata = {
  title: "Apex Drive 3D — Trouvez votre centre d'examen",
  description:
    "L'Ontario est le tronc, les régions sont les branches, les centres sont les feuilles. Explorez l'arbre des centres DriveTest.",
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
