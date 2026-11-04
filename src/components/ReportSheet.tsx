"use client";

import { useState } from "react";

// Signalement : formulaire enregistré localement (envoi tranche 2)
export default function ReportSheet({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (route: string, text: string) => void;
}) {
  const [route, setRoute] = useState("1");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  if (!open) return null;
  return (
    <div className="paywall" role="dialog" aria-modal="true" aria-label="Signaler une erreur de parcours" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet">
        <h2>Signaler une erreur</h2>
        <p className="sub">Votre signalement est enregistré sur cet appareil. L&apos;envoi à l&apos;équipe arrive en tranche 2.</p>
        <label className="lbl" htmlFor="report-route">Parcours concerné</label>
        <select className="field" id="report-route" value={route} onChange={(e) => setRoute(e.target.value)}>
          <option value="1">Parcours 1</option>
          <option value="2">Parcours 2</option>
          <option value="3">Parcours 3</option>
          <option value="4">Parcours 4</option>
          <option value="5">Parcours 5</option>
        </select>
        <label className="lbl" htmlFor="report-text">Que faut-il corriger ?</label>
        <textarea className="field" id="report-text" rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder="Ex. : la rue indiquée pour le stationnement parallèle n'existe pas…" />
        {error && <p style={{ color: "#ff8a80", fontSize: 13 }}>{error}</p>}
        <button
          className="btn"
          onClick={() => {
            if (!text.trim()) { setError("Décrivez l'erreur avant d'enregistrer."); return; }
            onSave(route, text.trim());
            setText("");
            setError("");
            onClose();
          }}
        >
          Enregistrer localement
        </button>
        <button className="btn ghost" onClick={onClose}>Annuler</button>
      </div>
    </div>
  );
}
