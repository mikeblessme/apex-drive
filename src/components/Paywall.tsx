"use client";

// Prix à définir (décision de Mike en attente) — aucun paiement dans cette version.
export default function Paywall({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="paywall" role="dialog" aria-modal="true" aria-label="Débloquer l'accès complet" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet">
        <h2>Débloquez l&apos;accès complet</h2>
        <p className="sub">5 parcours d&apos;examen simulé par centre</p>
        <div className="perk"><span className="ok" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5 9.5 18 20 6.5" /></svg></span><span><strong>1er parcours gratuit</strong> par centre, sans carte bancaire</span></div>
        <div className="perk"><span className="ok" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5 9.5 18 20 6.5" /></svg></span><span>Les 5 parcours en boucle, départ et arrivée au centre</span></div>
        <div className="perk"><span className="ok" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5 9.5 18 20 6.5" /></svg></span><span>Manœuvres documentées rue par rue</span></div>
        <div className="perk"><span className="ok" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5 9.5 18 20 6.5" /></svg></span><span>Cartes hors-ligne et mode examen blanc</span></div>
        <div className="pricebox">
          <div className="p">Prix à définir</div>
          <div className="n">Le modèle tarifaire sera fixé avant le lancement. Aucun paiement dans cette version.</div>
        </div>
        <button className="btn" onClick={onClose}>Continuer</button>
        <button className="btn ghost" onClick={onClose}>Plus tard</button>
      </div>
    </div>
  );
}
