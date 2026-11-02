"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ETOBICOKE_ROUTES, mapsUrl, type Centre } from "@/lib/data";
import { countdownText, useStore } from "@/lib/store";
import { Paywall, Toast } from "@/components/ui";

// Fiche centre (écran 3 de la maquette v13).
// Etobicoke : 5 parcours (1 gratuit, 2–5 verrouillés → paywall).
// Autres centres : « Parcours à venir », jamais inventés.
export default function CentreDetail({ centre }: { centre: Centre }) {
  const id = centre.id;
  const { store, update } = useStore();
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (centre) update({ centreId: centre.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  if (!centre) {
    return (
      <>
        <h1>Centre introuvable</h1>
        <p className="lead">Ce centre ne fait pas partie de l&apos;arbre des centres.</p>
        <Link className="btn secondary" href="/centres">🌳 Retour à l&apos;arbre des centres</Link>
      </>
    );
  }

  const filter = store.filter;
  const visibleRoutes = ETOBICOKE_ROUTES.filter(
    (r) => filter === "all" || (filter === "new" && r.isNew) || (filter === "pop" && r.isPop),
  );

  return (
    <>
      <h1>{centre.name}</h1>
      <p className="lead">{centre.addr}</p>
      <a className="btn secondary" href={mapsUrl(centre.addr)} target="_blank" rel="noopener noreferrer">
        Itinéraire vers le centre
      </a>

      <div className="card">
        <label className="lbl" htmlFor="date-exam" style={{ marginTop: 0 }}>Date de mon examen</label>
        <input
          className="field"
          type="date"
          id="date-exam"
          value={store.examDate}
          onChange={(e) => update({ examDate: e.target.value })}
        />
        <div className="count"><small>{countdownText(store.examDate)}</small></div>
        {store.examDate && (
          <div className="hint" style={{ marginTop: 8 }}>✓ Date enregistrée sur cet appareil — elle sera toujours là au prochain passage.</div>
        )}
      </div>

      {centre.routes ? (
        <div>
          <h2>Parcours d&apos;examen simulé</h2>
          <div className="pill-row">
            <button className={`pill${filter === "all" ? " on" : ""}`} onClick={() => update({ filter: "all" })}>Tous</button>
            <button className={`pill${filter === "new" ? " on" : ""}`} onClick={() => update({ filter: "new" })}>Nouveaux</button>
            <button className={`pill${filter === "pop" ? " on" : ""}`} onClick={() => update({ filter: "pop" })}>Populaires</button>
          </div>
          {visibleRoutes.map((r) => (
            <div key={r.id}>
              {r.locked ? (
                <button className="route" onClick={() => setPaywallOpen(true)}>
                  <div className="top">
                    <span className="name">Parcours {r.id}</span>
                    <span className="badges">
                      <span className="badge boucle">Boucle</span>
                      {r.isNew && <span className="badge nouveau">Nouveau</span>}
                      <span className="badge verrou">Verrouillé</span>
                    </span>
                  </div>
                  <div className="meta">{r.km} — {r.minutes}</div>
                  <div className="loop">Départ et arrivée au centre d&apos;examen</div>
                </button>
              ) : (
                <Link className="route" href={`/parcours/${r.id}`}>
                  <div className="top">
                    <span className="name">Parcours {r.id}</span>
                    <span className="badges">
                      <span className="badge boucle">Boucle</span>
                      <span className="badge gratuit">Gratuit</span>
                    </span>
                  </div>
                  <div className="meta">{r.km} — {r.minutes}</div>
                  <div className="loop">Départ et arrivée au centre d&apos;examen</div>
                </Link>
              )}
            </div>
          ))}
          <button className="btn" onClick={() => setPaywallOpen(true)}>Débloquer l&apos;accès complet</button>
          <p className="legal">Parcours reconstitués — non officiels. Les tracés exacts varient selon l&apos;examinateur et le jour de l&apos;examen.</p>
        </div>
      ) : (
        <div>
          <h2>Parcours de ce centre</h2>
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Parcours à venir</div>
            <div style={{ color: "var(--muted)", fontSize: 14 }}>
              Aucun parcours documenté pour ce centre dans cette version. Les parcours sont documentés centre par centre,
              rue par rue — jamais inventés.
            </div>
            <button
              className="btn secondary"
              style={{ marginTop: 12 }}
              onClick={() => setToast(`Noté pour ${centre.name} — rappel local enregistré. Les parcours arrivent centre par centre.`)}
            >
              Me prévenir quand les parcours arrivent
            </button>
          </div>
        </div>
      )}

      <Paywall open={paywallOpen} onClose={() => setPaywallOpen(false)} />
      <Toast message={toast} />
    </>
  );
}
