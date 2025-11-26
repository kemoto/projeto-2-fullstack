import React, { createContext, useContext, useMemo, useState } from "react";

const KEY = "compositions_v1";
const CompositionsContext = createContext(null);

export function CompositionsProvider({ children }) {
  const [compositions, setCompositions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      return [];
    }
  });

  const value = useMemo(() => {
    function addComposition(comp) {
      const next = [{ ...comp, id: crypto.randomUUID?.() || String(Date.now()) }, ...compositions];
      setCompositions(next);
      localStorage.setItem(KEY, JSON.stringify(next));
    }

    function removeComposition(id) {
      const next = compositions.filter((c) => c.id !== id);
      setCompositions(next);
      localStorage.setItem(KEY, JSON.stringify(next));
    }

    return { compositions, addComposition, removeComposition };
  }, [compositions]);

  return <CompositionsContext.Provider value={value}>{children}</CompositionsContext.Provider>;
}

export function useCompositions() {
  const ctx = useContext(CompositionsContext);
  if (!ctx) throw new Error("useCompositions must be used within CompositionsProvider");
  return ctx;
}
