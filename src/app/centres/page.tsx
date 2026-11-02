"use client";

import Link from "next/link";
import { useState } from "react";
import { REGIONS } from "@/lib/data";
import { useStore } from "@/lib/store";

// Arbre des centres (écran 2 de la maquette v13) :
// tronc Ontario, 5 branches régions, 26 feuilles centres.
export default function CentresPage() {
  const { store } = useStore();
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const q = filter.toLowerCase().trim();

  return (
    <>
      <h1>🌳 Arbre des centres</h1>
      <p className="lead">
        Tronc : Ontario. Branches : les 5 régions DriveTest. Feuilles : les centres.
        Touchez une branche pour la déplier, puis un centre pour voir sa fiche.
      </p>
      <div className="tree-hero">
        <svg viewBox="0 0 400 150" role="img" aria-label="Arbre des centres : Ontario, 5 régions, 26 centres">
          <rect width="400" height="150" fill="#0e1a2e" />
          <line x1="200" y1="140" x2="200" y2="70" stroke="#7a5200" strokeWidth="7" strokeLinecap="round" />
          <line x1="200" y1="95" x2="90" y2="45" stroke="#7a5200" strokeWidth="4" strokeLinecap="round" />
          <line x1="200" y1="95" x2="155" y2="40" stroke="#7a5200" strokeWidth="4" strokeLinecap="round" />
          <line x1="200" y1="85" x2="200" y2="35" stroke="#7a5200" strokeWidth="4" strokeLinecap="round" />
          <line x1="200" y1="95" x2="245" y2="40" stroke="#7a5200" strokeWidth="4" strokeLinecap="round" />
          <line x1="200" y1="95" x2="310" y2="45" stroke="#7a5200" strokeWidth="4" strokeLinecap="round" />
          <g fill="#34c759">
            <circle cx="90" cy="42" r="14" /><circle cx="155" cy="37" r="14" /><circle cx="200" cy="32" r="14" />
            <circle cx="245" cy="37" r="14" /><circle cx="310" cy="42" r="14" />
          </g>
          <text x="200" y="145" textAnchor="middle" fill="#eef3fb" fontSize="12" fontWeight="700">ONTARIO — 5 régions — 26 centres</text>
        </svg>
      </div>
      <label className="lbl" htmlFor="tree-search">Filtrer l&apos;arbre (ville ou centre)</label>
      <input
        className="field"
        id="tree-search"
        placeholder="Ex. Ottawa, Brampton, Windsor…"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {REGIONS.map((region) => {
        const leaves = region.centres.filter(
          (c) => !q || c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q),
        );
        if (leaves.length === 0) return null;
        const isOpen = q !== "" || !!open[region.id];
        return (
          <div key={region.id} className={`branch${isOpen ? " open" : ""}`}>
            <button
              className="branch-head"
              onClick={() => setOpen((o) => ({ ...o, [region.id]: !o[region.id] }))}
            >
              <span>🌿 {region.name}</span>
              <span><span className="cnt">{leaves.length} centre(s)</span> <span className="chev">›</span></span>
            </button>
            <div className="branch-body">
              {leaves.map((c) => (
                <Link
                  key={c.id}
                  className={`leaf${store.centreId === c.id ? " selected" : ""}`}
                  href={`/centres/${c.id}`}
                >
                  <span>
                    <span className="lname">{c.name}</span>
                    <span className="laddr" style={{ display: "block" }}>{c.addr}</span>
                  </span>
                  <span className={`tag ${c.routes ? "routes" : "soon"}`}>{c.routes ? "Parcours" : "À venir"}</span>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
      <p className="legal">
        Adresses réelles issues des annuaires publics DriveTest. Liste complète et officielle sur{" "}
        <a href="https://drivetest.ca/find-a-drivetest-centre/find-a-drivetest-centre/">drivetest.ca</a>.
        Seul Etobicoke a des parcours documentés dans cette version — les autres centres affichent « Parcours à venir ».
      </p>
    </>
  );
}
