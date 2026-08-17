"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CvData, emptyCvData } from "./types";

const STORAGE_KEY = "cv-create-data";

export type EditorView = "cv" | "letter";

type CvContextValue = {
  data: CvData;
  setData: React.Dispatch<React.SetStateAction<CvData>>;
  view: EditorView;
  setView: React.Dispatch<React.SetStateAction<EditorView>>;
};

const CvContext = createContext<CvContextValue | null>(null);

export function CvProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CvData>(emptyCvData);
  const [view, setView] = useState<EditorView>("cv");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setData({ ...emptyCvData, ...JSON.parse(raw) });
      }
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, hydrated]);

  const value = useMemo(() => ({ data, setData, view, setView }), [data, view]);

  return <CvContext.Provider value={value}>{children}</CvContext.Provider>;
}

export function useCv() {
  const ctx = useContext(CvContext);
  if (!ctx) throw new Error("useCv must be used within a CvProvider");
  return ctx;
}
