"use client";

import { useState } from "react";
import { useCv } from "../CvContext";
import { createId } from "../types";
import { Field, Section, Textarea } from "../ui";

export function AutoGenerateForm() {
  const { data, setData } = useCv();
  const [jobOffer, setJobOffer] = useState("");
  const [rawInfo, setRawInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleGenerate() {
    if (!rawInfo.trim() || loading) return;
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/auto-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobOffer,
          rawInfo,
          candidateName: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`.trim(),
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Échec de la génération automatique.");

      const result = body.result as {
        jobTitle: string;
        profile: string;
        experiences: Array<{
          title: string;
          company: string;
          location: string;
          startDate: string;
          endDate: string;
          current: boolean;
          description: string;
        }>;
        educations: Array<{
          degree: string;
          school: string;
          location: string;
          startDate: string;
          endDate: string;
          description: string;
        }>;
        skills: Array<{ name: string; level: number }>;
        languages: Array<{ name: string; level: number }>;
        coverLetter: string;
      };

      setData((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, jobTitle: result.jobTitle || prev.personalInfo.jobTitle },
        profile: result.profile || prev.profile,
        experiences: result.experiences.map((exp) => ({ id: createId(), ...exp })),
        educations: result.educations.map((edu) => ({ id: createId(), ...edu })),
        skills: result.skills.map((skill) => ({ id: createId(), ...skill })),
        languages: result.languages.map((lang) => ({ id: createId(), ...lang })),
        coverLetter: result.coverLetter || prev.coverLetter,
      }));
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section
      title="Génération automatique"
      subtitle="Collez vos infos et l'offre d'emploi : l'IA remplit le CV et rédige la lettre de motivation"
    >
      <Field label="Offre d'emploi (optionnel)">
        <Textarea
          placeholder="Collez ici le texte de l'offre d'emploi visée..."
          value={jobOffer}
          onChange={(e) => setJobOffer(e.target.value)}
        />
      </Field>
      <Field label="Vos informations (expériences, formation, compétences, langues...)">
        <Textarea
          placeholder="Décrivez en vrac votre parcours : postes occupés, entreprises, dates, diplômes, compétences, langues..."
          value={rawInfo}
          onChange={(e) => setRawInfo(e.target.value)}
          className="min-h-[140px]"
        />
      </Field>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || !rawInfo.trim()}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Génération en cours..." : "✨ Générer automatiquement le CV et la lettre"}
        </button>
        {success && <span className="text-sm text-emerald-600">CV et lettre générés avec succès.</span>}
      </div>
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <p className="text-xs text-slate-400">
        Cette action remplace le titre du poste, le profil, les expériences, formations, compétences, langues et la
        lettre de motivation ci-dessous.
      </p>
    </Section>
  );
}
