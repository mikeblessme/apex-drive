"use client";

import { useCallback, useEffect, useState } from "react";

// Persistance locale — même clé que la maquette v13, avec migration v12.
// Tout reste sur l'appareil : aucun compte, aucun serveur (tranche 1, sans backend).
export type Store = {
  examDate: string;
  filter: string;
  reports: { route: string; text: string; date: string }[];
  centreId: string;
};

const KEY = "apex-drive-v13";
const OLD_KEY = "apex-drive-v12";

const DEFAULT_STORE: Store = { examDate: "", filter: "all", reports: [], centreId: "etobicoke" };

function load(): Store {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw) as Partial<Store>;
      return {
        examDate: s.examDate || "",
        filter: s.filter || "all",
        reports: Array.isArray(s.reports) ? s.reports : [],
        centreId: s.centreId || "etobicoke",
      };
    }
    const old = window.localStorage.getItem(OLD_KEY);
    if (old) {
      const o = JSON.parse(old) as Partial<Store>;
      return { examDate: o.examDate || "", filter: o.filter || "all", reports: Array.isArray(o.reports) ? o.reports : [], centreId: "etobicoke" };
    }
  } catch {
    // stockage indisponible : on continue sans persistance
  }
  return DEFAULT_STORE;
}

export function useStore() {
  const [store, setStore] = useState<Store>(DEFAULT_STORE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setStore(load());
    setReady(true);
  }, []);

  const update = useCallback((patch: Partial<Store>) => {
    setStore((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return { store, update, ready };
}

// Compte à rebours — logique de dates de la maquette (J-N, Jour J, Examen passé).
export function countdownText(examDate: string): string {
  if (!examDate) return "Choisissez une date pour voir le compte à rebours.";
  const target = new Date(`${examDate}T00:00:00`);
  if (Number.isNaN(target.getTime())) return "Choisissez une date pour voir le compte à rebours.";
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diff = Math.round((target.getTime() - now.getTime()) / 86400000);
  if (diff < 0) return "Examen passé. Bonne chance pour la suite.";
  if (diff === 0) return "Jour J. Respirez, vous êtes prêt.";
  return `J-${diff} avant l'examen`;
}
