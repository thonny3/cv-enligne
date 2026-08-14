"use client";

import { useState } from "react";
import { useCv } from "./CvContext";

export function Toolbar() {
  const { data } = useCv();
  const [loading, setLoading] = useState(false);

  async function downloadPdf() {
    setLoading(true);
    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("PDF generation failed");

      const blob = await response.blob();
      console.log(
        `[cv] PDF reçu du serveur : ${(blob.size / 1024).toFixed(1)} Ko (${blob.size} octets)`
      );
      if (blob.size === 0) throw new Error("PDF vide");

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "cv.pdf";
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Erreur lors de la génération du PDF"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600" />
        <span className="text-sm font-semibold text-slate-900">Créateur de CV</span>
      </div>
      <button
        type="button"
        onClick={downloadPdf}
        disabled={loading}
        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Génération..." : "Télécharger le PDF"}
      </button>
    </header>
  );
}
