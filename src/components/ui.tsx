"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { QUIZ, TOUR } from "@/lib/data";

// ---- Toast ----
export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="toast show" role="status">
      {message}
    </div>
  );
}

// ---- Paywall ----
// Prix à définir (décision de Mike en attente) — aucun paiement dans cette version.
export function Paywall({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="paywall" role="dialog" aria-modal="true" aria-label="Débloquer l'accès complet" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet">
        <h2>Débloquez l&apos;accès complet</h2>
        <p className="sub">5 parcours d&apos;examen simulé par centre</p>
        <div className="perk"><span className="ok">✓</span><span><strong>1er parcours gratuit</strong> par centre, sans carte bancaire</span></div>
        <div className="perk"><span className="ok">✓</span><span>Les 5 parcours en boucle, départ et arrivée au centre</span></div>
        <div className="perk"><span className="ok">✓</span><span>Manœuvres documentées rue par rue</span></div>
        <div className="perk"><span className="ok">✓</span><span>Cartes hors-ligne et mode examen blanc</span></div>
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

// ---- Examen blanc (mini-quiz local, entraînement seulement) ----
export function QuizSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  if (!open) return null;
  const answered = Object.keys(answers).length;
  const score = QUIZ.reduce((n, q, i) => n + (answers[i] === q.ok ? 1 : 0), 0);
  return (
    <div className="paywall" role="dialog" aria-modal="true" aria-label="Examen blanc" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet">
        <h2>Examen blanc — entraînement</h2>
        <p className="sub">3 questions générales. Entraînement seulement — ce n&apos;est pas l&apos;examen officiel.</p>
        <div>
          {QUIZ.map((item, qi) => (
            <div key={qi}>
              <div className="quiz-q">{qi + 1}. {item.q}</div>
              {item.opts.map((opt, oi) => {
                const picked = answers[qi];
                const cls = picked === undefined ? "" : oi === item.ok ? " correct" : oi === picked ? " wrong" : "";
                return (
                  <button
                    key={oi}
                    className={`btn secondary quiz-opt${cls}`}
                    disabled={picked !== undefined}
                    onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        {answered === QUIZ.length && (
          <>
            <div style={{ textAlign: "center", fontWeight: 800, fontSize: 18, margin: "14px 0" }}>
              Score : {score} / {QUIZ.length}
            </div>
            <button className="btn" onClick={() => setAnswers({})}>Recommencer</button>
          </>
        )}
        <button className="btn ghost" onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}

// ---- Mode démo : visite guidée en 4 étapes ----
export function TourSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const router = useRouter();
  if (!open) return null;
  const last = step === TOUR.length - 1;
  return (
    <div className="paywall" role="dialog" aria-modal="true" aria-label="Visite guidée" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet">
        <h2>Mode démo — visite guidée</h2>
        <p className="tour-step">{TOUR[step].text}</p>
        <button
          className="btn"
          onClick={() => {
            if (last) { onClose(); return; }
            const next = step + 1;
            setStep(next);
            router.push(TOUR[next].href);
          }}
        >
          {last ? "Terminer la visite" : "Suivant"}
        </button>
        <button className="btn ghost" onClick={onClose}>Terminer la visite</button>
      </div>
    </div>
  );
}

// ---- Signalement : formulaire enregistré localement (envoi tranche 2) ----
export function ReportSheet({
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
        <Link href="/" className={tabFor("/") ? "on" : ""}><span className="ico" />Accueil</Link>
        <Link href="/centres" className={tabFor("/centres") ? "on" : ""}><span className="ico" />Centres</Link>
        <Link href="/parcours/1" className={tabFor("/parcours") ? "on" : ""}><span className="ico" />Parcours</Link>
        <Link href="/compte" className={tabFor("/compte") ? "on" : ""}><span className="ico" />Compte</Link>
      </nav>
    </div>
  );
}
