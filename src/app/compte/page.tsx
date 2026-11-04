"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { findCentre } from "@/lib/data";
import { useStore } from "@/lib/store";
import dynamic from "next/dynamic";
import { Toast } from "@/components/ui";
import SheetSkeleton from "@/components/SheetSkeleton";

// Feuilles chargées en différé : jamais dans le bundle initial, téléchargées
// au premier clic seulement (rendu conditionnel, sinon le chunk partirait
// dès le montage de la page). Fermer une feuille la démonte : son état
// interne (quiz, visite, brouillon de signalement) repart de zéro à la
// prochaine ouverture.
const Paywall = dynamic(() => import("@/components/Paywall"), {
  loading: () => <SheetSkeleton label="Chargement de l'accès complet" />,
});
const ReportSheet = dynamic(() => import("@/components/ReportSheet"), {
  loading: () => <SheetSkeleton label="Chargement du formulaire de signalement" />,
});

// Compte (écran 5 de la maquette v13).
// Tout reste sur cet appareil : aucun compte, aucun serveur (tranche 1, sans backend).
export default function ComptePage() {
  const { store, update } = useStore();
  const centre = findCentre(store.centreId) ?? findCentre("etobicoke");
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  if (!centre) return null;
  const localParts = [
    store.examDate ? `Date d'examen : ${store.examDate}` : null,
    store.reports.length ? `${store.reports.length} signalement(s) enregistré(s) localement` : "Aucun signalement enregistré",
  ].filter(Boolean);

  return (
    <>
      <h1>Mon compte</h1>
      <div className="card">
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Mon centre</div>
        <div style={{ color: "var(--muted)", fontSize: 14 }}>{centre.name}<br />{centre.addr}</div>
        <Link className="btn secondary" href="/centres" style={{ marginTop: 12 }}>Changer de centre (arbre)</Link>
      </div>
      <div className="card">
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Mes parcours</div>
        <div style={{ color: "var(--muted)", fontSize: 14 }}>
          {centre.routes ? "1 parcours débloqué sur 5 (Parcours 1 — gratuit)" : "Aucun parcours documenté pour ce centre pour l'instant"}
        </div>
        <button className="btn" style={{ marginTop: 12 }} onClick={() => setPaywallOpen(true)}>Débloquer l&apos;accès complet</button>
      </div>
      <div className="card">
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Outils</div>
        <button
          className="btn secondary"
          onClick={() => setToast("Bientôt — les cartes hors-ligne arrivent en tranche 2, avec l'application installable.")}
        >
          Télécharger les cartes hors-ligne
        </button>
        <button className="btn secondary" onClick={() => setReportOpen(true)}>Signaler une erreur de parcours</button>
      </div>
      <div className="card">
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Mes données locales</div>
        <div style={{ color: "var(--muted)", fontSize: 14 }}>{localParts.join(" · ")}</div>
        <p className="legal" style={{ marginTop: 8 }}>Tout reste sur cet appareil (aucun compte, aucun serveur) — tranche 1, sans backend.</p>
        <p className="legal"><Link href="/confidentialite">Politique de confidentialité</Link></p>
      </div>
      <p className="hint">App Next.js — v13, arbre des centres, persistance locale. Données de parcours fictives.</p>

      {paywallOpen && <Paywall open={paywallOpen} onClose={() => setPaywallOpen(false)} />}
      {reportOpen && <ReportSheet
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        onSave={(route, text) => {
          update({ reports: [...store.reports, { route, text, date: new Date().toISOString().slice(0, 10) }] });
          setToast("Signalement enregistré sur cet appareil. L'envoi à l'équipe arrive en tranche 2.");
        }}
      />}
      <Toast message={toast} />
    </>
  );
}
