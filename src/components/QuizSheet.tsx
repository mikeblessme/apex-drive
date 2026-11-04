"use client";

import { useState } from "react";
import { QUIZ } from "@/lib/data";

// Examen blanc (mini-quiz local, entraînement seulement)
export default function QuizSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
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
            <div style={{ textAlign: "center", fontWeight: 600, fontSize: 18, margin: "16px 0" }}>
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
