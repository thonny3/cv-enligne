"use client";

import { CvData } from "../../types";

function formatLetterDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export function ModernLetterTemplate({ data }: { data: CvData }) {
  const info = data.personalInfo;
  const letter = data.letter;
  const color = data.theme.color;
  const fullName = [info.firstName, info.lastName].filter(Boolean).join(" ");
  const senderAddress = [info.address, [info.postalCode, info.city].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex w-[210mm] min-h-[297mm] flex-col bg-white text-sm text-slate-800">
      <header className="px-16 py-10 text-white" style={{ backgroundColor: color }}>
        <h1 className="text-2xl font-bold">{fullName || "Prénom Nom"}</h1>
        {info.jobTitle && <p className="mt-1 text-sm text-white/90">{info.jobTitle}</p>}
        <p className="mt-3 text-xs text-white/80">
          {[senderAddress, info.email, info.phone].filter(Boolean).join("  ·  ")}
        </p>
      </header>

      <main className="flex flex-1 flex-col px-16 py-10">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 leading-relaxed">
            {letter.recipientName && (
              <p className="break-words font-medium text-slate-900">{letter.recipientName}</p>
            )}
            {letter.recipientCompany && <p className="break-words text-slate-500">{letter.recipientCompany}</p>}
            {letter.recipientAddress && (
              <p className="whitespace-pre-line break-words text-slate-500">{letter.recipientAddress}</p>
            )}
          </div>
          <p className="whitespace-nowrap text-slate-400">
            {[info.city, formatLetterDate(letter.date)].filter(Boolean).join(", le ")}
          </p>
        </div>

        {letter.subject && (
          <p
            className="mt-8 inline-block w-fit max-w-full break-words rounded-full px-4 py-1.5 text-xs font-semibold text-white"
            style={{ backgroundColor: color }}
          >
            {letter.subject}
          </p>
        )}

        <div className="mt-6 flex-1 whitespace-pre-line break-words leading-relaxed text-slate-700">
          {letter.body || "Rédigez ici le contenu de votre lettre de motivation..."}
        </div>

        <p className="mt-8 whitespace-pre-line break-words leading-relaxed text-slate-700">{letter.closing}</p>

        <p className="mt-10 font-semibold" style={{ color }}>
          {fullName}
        </p>
      </main>
    </div>
  );
}
