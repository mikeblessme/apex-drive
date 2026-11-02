"use client";

import Link from "next/link";
import { useState } from "react";
import { findCentre, searchCentres, type Centre } from "@/lib/data";

// Accueil (écran 1 de la maquette v13).
// Différence honnête vs maquette : la recherche ne renvoie plus Etobicoke
// pour n'importe quelle saisie — elle ne renvoie que les centres qui
// correspondent vraiment, et dit explicitement quand il n'y en a aucun.
export default function Home() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<Centre[]>([]);
  const [locating, setLocating] = useState(false);
  const [geoShown, setGeoShown] = useState(false);

  const etobicoke = findCentre("etobicoke");

  const doSearch = () => {
    setResults(searchCentres(query));
    setSearched(true);
  };

  return (
    <>
      <h1>Trouvez votre centre d&apos;examen</h1>
      <p className="lead">
        L&apos;Ontario est le tronc, les régions sont les branches, les centres sont les feuilles.
        Explorez l&apos;arbre ou laissez l&apos;app vous guider vers le centre le plus proche.
      </p>
      <button
        className="btn"
        disabled={locating}
        onClick={() => {
          setLocating(true);
          setTimeout(() => {
            setLocating(false);
            setGeoShown(true);
          }, 1200);
        }}
      >
        {locating ? (
          <>
            <span className="spinner" />Localisation en cours…
          </>
        ) : geoShown ? (
          "Position détectée"
        ) : (
          "Utiliser ma position"
        )}
      </button>
      <p className="lead" style={{ textAlign: "center", margin: "14px 0 6px" }}>ou</p>
      <Link className="btn secondary" href="/centres">🌳 Explorer l&apos;arbre des centres</Link>

      <label className="lbl" htmlFor="search">Rechercher un centre</label>
      <input
        className="field"
        id="search"
        placeholder="Code postal ou ville (ex. M9C 5M1)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") doSearch(); }}
      />
      <button className="btn secondary" onClick={doSearch}>Rechercher</button>

      {searched && (
        <div style={{ marginTop: 16 }}>
          <h2>Résultats de recherche</h2>
          {results.length === 0 ? (
            <p className="hint">Aucun centre ne correspond à cette recherche. Essayez une ville ou un code postal de l&apos;Ontario, ou explorez l&apos;arbre des centres.</p>
          ) : (
            results.map((c) => (
              <Link key={c.id} className="leaf" href={`/centres/${c.id}`}>
                <span>
                  <span className="lname">{c.name}</span>
                  <span className="laddr" style={{ display: "block" }}>{c.addr}</span>
                </span>
                <span className={`tag ${c.routes ? "routes" : "soon"}`}>{c.routes ? "Parcours" : "À venir"}</span>
              </Link>
            ))
          )}
        </div>
      )}

      {geoShown && etobicoke && (
        <div style={{ marginTop: 16 }}>
          <h2>Centre le plus proche</h2>
          <div className="card center-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 800, fontSize: 17 }}>{etobicoke.name}</div>
              <div className="dist">à 3,2 km</div>
            </div>
            <div style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 6 }}>{etobicoke.addr}</div>
            <div className="fictif">Distance fictive — exemple pour la maquette.</div>
            <Link className="btn" href="/centres/etobicoke">Voir les parcours</Link>
          </div>
        </div>
      )}
      <p className="hint">
        Maquette : la géolocalisation est simulée. Les adresses des centres sont réelles (annuaires publics) ;
        seuls les parcours d&apos;Etobicoke sont documentés pour l&apos;instant.
      </p>
    </>
  );
}
