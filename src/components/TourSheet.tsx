"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { TOUR } from "@/lib/data";

// Mode démo : visite guidée en 4 étapes
export default function TourSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
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
