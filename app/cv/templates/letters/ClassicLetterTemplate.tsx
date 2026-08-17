"use client";

import { CvData } from "../../types";

function formatLetterDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export function ClassicLetterTemplate({ data }: { data: CvData }) {
  const info = data.personalInfo;
  const letter = data.letter;
  const color = data.theme.color;
  const fullName = [info.firstName, info.lastName].filter(Boolean).join(" ");
  const senderAddress = [info.address, [info.postalCode, info.city].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="flex w-[210mm] min-h-[297mm] flex-col bg-white px-16 py-14 text-sm text-slate-800">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 whitespace-pre-line break-words leading-relaxed">
          <p className="font-semibold text-slate-900">{fullName || "Prénom Nom"}</p>
          {senderAddress && <p className="text-slate-500">{senderAddress}</p>}
          {info.email && <p className="text-slate-500">{info.email}</p>}
          {info.phone && <p className="text-slate-500">{info.phone}</p>}
        </div>
        <div className="min-w-0 text-right leading-relaxed">
          {letter.recipientName && (
            <p className="break-words font-medium text-slate-900">{letter.recipientName}</p>
          )}
          {letter.recipientCompany && <p className="break-words text-slate-500">{letter.recipientCompany}</p>}
          {letter.recipientAddress && (
            <p className="whitespace-pre-line break-words text-slate-500">{letter.recipientAddress}</p>
          )}
        </div>
      </div>

      <p className="mt-10 text-right text-slate-500">
        {[info.city, formatLetterDate(letter.date)].filter(Boolean).join(", le ")}
      </p>

      {letter.subject && (
        <p className="mt-8 break-words font-semibold text-slate-900" style={{ color }}>
          Objet : {letter.subject}
        </p>
      )}

      <div className="mt-6 flex-1 whitespace-pre-line break-words leading-relaxed text-slate-700">
        {letter.body || "Rédigez ici le contenu de votre lettre de motivation..."}
      </div>

      <p className="mt-8 whitespace-pre-line break-words leading-relaxed text-slate-700">{letter.closing}</p>

      <p className="mt-10 text-right font-medium text-slate-900">{fullName}</p>
    </div>
  );
}
