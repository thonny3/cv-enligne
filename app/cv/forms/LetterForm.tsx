"use client";

import { useCv } from "../CvContext";
import { LetterData, letterTemplates } from "../types";
import { Field, Input, Section, Textarea } from "../ui";

export function LetterForm() {
  const { data, setData } = useCv();
  const letter = data.letter;

  function update<K extends keyof LetterData>(key: K, value: LetterData[K]) {
    setData((prev) => ({ ...prev, letter: { ...prev.letter, [key]: value } }));
  }

  return (
    <>
      <Section title="Modèle de lettre" subtitle="Choisissez la mise en page de votre lettre de motivation">
        <div className="flex flex-wrap gap-3">
          {letterTemplates.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => update("template", t.id)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                letter.template === t.id
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Destinataire" subtitle="Informations sur l'entreprise ou la personne destinataire">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date">
            <Input
              type="date"
              value={letter.date}
              onChange={(e) => update("date", e.target.value)}
            />
          </Field>
          <Field label="Nom du destinataire">
            <Input
              value={letter.recipientName}
              onChange={(e) => update("recipientName", e.target.value)}
              placeholder="Madame, Monsieur / Nom du recruteur"
            />
          </Field>
        </div>
        <Field label="Entreprise">
          <Input
            value={letter.recipientCompany}
            onChange={(e) => update("recipientCompany", e.target.value)}
          />
        </Field>
        <Field label="Adresse">
          <Textarea
            value={letter.recipientAddress}
            onChange={(e) => update("recipientAddress", e.target.value)}
            className="min-h-[60px]"
          />
        </Field>
      </Section>

      <Section title="Contenu de la lettre" subtitle="Rédigez librement votre lettre de motivation">
        <Field label="Objet">
          <Input
            value={letter.subject}
            onChange={(e) => update("subject", e.target.value)}
            placeholder="Candidature au poste de..."
          />
        </Field>
        <Field label="Corps de la lettre">
          <Textarea
            value={letter.body}
            onChange={(e) => update("body", e.target.value)}
            className="min-h-[260px]"
            placeholder="Madame, Monsieur,&#10;&#10;Rédigez ici le contenu de votre lettre..."
          />
        </Field>
        <Field label="Formule de politesse">
          <Textarea
            value={letter.closing}
            onChange={(e) => update("closing", e.target.value)}
            className="min-h-[60px]"
          />
        </Field>
      </Section>
    </>
  );
}
