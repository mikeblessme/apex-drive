"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

// Les feuilles (Paywall, QuizSheet, TourSheet, ReportSheet) vivent désormais dans
// leurs propres fichiers et sont chargées en différé via next/dynamic par leurs
// consommateurs : elles ne font plus partie du bundle partagé initial.

// ---- Toast ----
export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="toast show" role="status">
      {message}
    </div>
  );
}

// Icône ligne unique : 18px, trait 1.5, couleur du rôle de texte courant.
// Remplace les cases vides de la tabbar (aucune icône = aucun sens) sans
// ajouter de dépendance : les tracés sont des lignes, pas des pictos colorés.
function Ico({ d, circles }: { d: string; circles?: [number, number, number][] }) {
  return (
    <svg className="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d.split(",").map((p) => (
        <path key={p} d={p} />
      ))}
      {(circles ?? []).map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
      ))}
    </svg>
  );
}

// ---- Chrome : barre d'app + bouton Retour + onglets ----
export function Chrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const tabFor = (p: string) =>
    p === "/" ? isHome : p === "/centres" ? pathname.startsWith("/centres") : p === "/parcours" ? pathname.startsWith("/parcours") : pathname === "/compte";
  return (
    <div className="phone">
      <header className="appbar">
        {!isHome && (
          <button className="backbtn show" aria-label="Retour à l'écran précédent" onClick={() => router.back()}>
            ← Retour
          </button>
        )}
        <span>Apex Drive 3D <span className="ver">app Next.js — v13</span></span>
      </header>
      <main>{children}</main>
      <nav className="tabbar" aria-label="Navigation principale">
        <Link href="/" className={tabFor("/") ? "on" : ""}><Ico d="M3 11l9-8 9 8,M5 10v11h14V10,M9 21v-6h6v6" />Accueil</Link>
        <Link href="/centres" className={tabFor("/centres") ? "on" : ""}><Ico d="M12 22v-9,M12 13L5 6,M12 13l7-7,M12 9V4" />Centres</Link>
        <Link href="/parcours/1" className={tabFor("/parcours") ? "on" : ""}><Ico d="M5 19C5 9 13 5 19 5" circles={[[5, 19, 2.5], [19, 5, 2.5]]} />Parcours</Link>
        <Link href="/compte" className={tabFor("/compte") ? "on" : ""}><Ico d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" circles={[[12, 8, 4]]} />Compte</Link>
      </nav>
    </div>
  );
}
