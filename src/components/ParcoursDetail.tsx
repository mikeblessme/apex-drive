"use client";

import Link from "next/link";
import { useState } from "react";
import { MANOEUVRES, mapsUrl, type Centre, type RouteMeta } from "@/lib/data";
import dynamic from "next/dynamic";
import SheetSkeleton from "@/components/SheetSkeleton";

// Feuilles chargées en différé : voir le commentaire dans src/app/compte/page.tsx.
const Paywall = dynamic(() => import("@/components/Paywall"), {
  loading: () => <SheetSkeleton label="Chargement de l'accès complet" />,
});
const QuizSheet = dynamic(() => import("@/components/QuizSheet"), {
  loading: () => <SheetSkeleton label="Chargement de l'examen blanc" />,
});
const TourSheet = dynamic(() => import("@/components/TourSheet"), {
  loading: () => <SheetSkeleton label="Chargement de la visite guidée" />,
});

// Détail parcours (écran 4 de la maquette v13) — parcours 1 d'Etobicoke, gratuit.
// Carte schématique DISTINCTE par parcours (tracé SVG propre à chaque parcours).
// Les parcours 2–5 sont verrouillés : la page affiche le paywall, pas le détail.
export default function ParcoursDetail({ route, centre }: { route: RouteMeta; centre: Centre }) {
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);

  if (route.locked) {
    return (
      <>
        <h1>{route.title}</h1>
        <p className="lead">Ce parcours est verrouillé. Débloquez l&apos;accès complet pour le consulter.</p>
        <button className="btn" onClick={() => setPaywallOpen(true)}>Débloquer l&apos;accès complet</button>
        <Link className="btn secondary" href="/centres/etobicoke">Retour aux parcours</Link>
        {paywallOpen && <Paywall open={paywallOpen} onClose={() => setPaywallOpen(false)} />}
      </>
    );
  }

  return (
    <>
      <h1>{route.title}</h1>
      <p className="lead">Départ et arrivée : DriveTest Etobicoke. Tracé schématique (données fictives — maquette).</p>
      <div className="map-wrap">
        <svg viewBox="0 0 400 300" role="img" aria-label="Carte schématique du parcours en boucle">
          <rect width="400" height="300" fill="#0e1a2e" />
          <g stroke="#22344f" strokeWidth="10">
            <line x1="0" y1="75" x2="400" y2="75" /><line x1="0" y1="150" x2="400" y2="150" />
            <line x1="0" y1="225" x2="400" y2="225" /><line x1="100" y1="0" x2="100" y2="300" />
            <line x1="200" y1="0" x2="200" y2="300" /><line x1="300" y1="0" x2="300" y2="300" />
          </g>
          <g stroke="#2c4266" strokeWidth="2">
            <line x1="0" y1="112" x2="400" y2="112" /><line x1="0" y1="188" x2="400" y2="188" />
            <line x1="150" y1="0" x2="150" y2="300" /><line x1="250" y1="0" x2="250" y2="300" />
          </g>
          <path d={route.path} fill="none" stroke="#3d7bff" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" />
          <path d={route.path} fill="none" stroke="#8fb4ff" strokeWidth="2" strokeLinejoin="round" strokeDasharray="2 10" />
          <circle cx="200" cy="150" r="13" fill="#34c759" />
          <circle cx="200" cy="150" r="5" fill="#0a1424" />
          <text x="200" y="182" textAnchor="middle" fill="#eef3fb" fontSize="12" fontWeight="700">Centre d&apos;examen</text>
          <text x="200" y="196" textAnchor="middle" fill="#93a4c0" fontSize="11">Départ / Arrivée</text>
        </svg>
        <div className="infobar"><span>{route.km}</span><span>{route.minutes}</span><span>Boucle fermée</span></div>
      </div>
      <div className="btn-row">
        <a className="btn" href={`${mapsUrl(centre.addr)}&travelmode=driving`} target="_blank" rel="noopener noreferrer">
          Démarrer la navigation
        </a>
      </div>
      <p className="hint" style={{ marginTop: 2 }}>
        La navigation ouvre l&apos;itinéraire vers le centre dans Maps. Le guidage du parcours lui-même arrive en tranche 3 (GPS).
      </p>
      <div className="btn-row">
        <button className="btn secondary" onClick={() => setQuizOpen(true)}>Examen blanc</button>
        <button className="btn secondary" onClick={() => setTourOpen(true)}>Mode démo</button>
      </div>

      <h2>Manœuvres du parcours</h2>
      <div className="fictif">Exemples fictifs — les manœuvres réelles seront documentées rue par rue, par centre.</div>
      <div className="card" style={{ padding: "6px 14px" }}>
        {MANOEUVRES.map((m) => (
          <div key={m.t} className="manoeuvre">
            <span className="dot" />
            <div><div className="t">{m.t}</div><div className="s">{m.s}</div></div>
          </div>
        ))}
      </div>
      <p className="legal">Parcours reconstitué — non officiel.</p>

      {quizOpen && <QuizSheet open={quizOpen} onClose={() => setQuizOpen(false)} />}
      {tourOpen && <TourSheet open={tourOpen} onClose={() => setTourOpen(false)} />}
    </>
  );
}
