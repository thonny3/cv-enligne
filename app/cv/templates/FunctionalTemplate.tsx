"use client";

import { CvData } from "../types";
import { formatDate } from "../format";
import { BulletList } from "../ui";

function LevelBar({ level, color }: { level: number; color: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 flex-1 rounded-full ${i >= level ? "bg-slate-200" : ""}`}
          style={i < level ? { backgroundColor: color } : undefined}
        />
      ))}
    </div>
  );
}

export function FunctionalTemplate({ data }: { data: CvData }) {
  const { personalInfo: info } = data;
  const color = data.theme.color;
  const fullName = [info.firstName, info.lastName].filter(Boolean).join(" ");
  const contact = [info.email, info.phone, [info.address, info.postalCode, info.city].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-slate-800">
      <header className="px-10 pb-6 pt-10">
        <h1 className="text-2xl font-bold text-slate-900">{fullName || "Prénom Nom"}</h1>
        {info.jobTitle && (
          <p className="mt-1 text-sm font-medium" style={{ color }}>
            {info.jobTitle}
          </p>
        )}
        {contact && <p className="mt-3 text-xs text-slate-500">{contact}</p>}
      </header>

      <main className="px-10 pb-10">
        {data.profile && (
          <section className="mb-7">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color }}>
              Profil
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">{data.profile}</p>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="mb-7">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color }}>
              Compétences clés
            </h2>
            <div className="space-y-1.5">
              {data.skills.map((s) => (
                <p key={s.id} className="text-sm text-slate-600">
                  {s.category && <span className="font-semibold text-slate-800">{s.category} : </span>}
                  {s.items}
                </p>
              ))}
            </div>
          </section>
        )}

        {data.languages.length > 0 && (
          <section className="mb-7">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color }}>
              Langues
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {data.languages.map((l) => (
                <div key={l.id} className="flex items-center gap-3">
                  <span className="w-32 shrink-0 text-sm text-slate-700">{l.name}</span>
                  <LevelBar level={l.level} color={color} />
                </div>
              ))}
            </div>
          </section>
        )}

        {data.experiences.length > 0 && (
          <section className="mb-7">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color }}>
              Expérience professionnelle
            </h2>
            <div className="space-y-4">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="border-b border-slate-100 pb-3 last:border-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-sm font-semibold text-slate-900">{exp.title || "Intitulé du poste"}</h3>
                    <span className="whitespace-nowrap text-xs text-slate-400">
                      {formatDate(exp.startDate)} – {exp.current ? "Présent" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-xs font-medium" style={{ color }}>
                    {[exp.company, exp.location].filter(Boolean).join(" · ")}
                  </p>
                  {exp.description && (
                    <BulletList
                      text={exp.description}
                      className="mt-1 text-sm leading-relaxed text-slate-600"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.educations.length > 0 && (
          <section>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color }}>
              Formation
            </h2>
            <div className="space-y-4">
              {data.educations.map((edu) => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-sm font-semibold text-slate-900">{edu.degree || "Diplôme"}</h3>
                    <span className="whitespace-nowrap text-xs text-slate-400">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-xs font-medium" style={{ color }}>
                    {[edu.school, edu.location].filter(Boolean).join(" · ")}
                  </p>
                  {edu.description && (
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 whitespace-pre-line">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.hobbies.length > 0 && (
          <section className="mt-7">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color }}>
              Loisirs
            </h2>
            <p className="text-sm text-slate-600">{data.hobbies.map((h) => h.name).filter(Boolean).join(", ")}</p>
          </section>
        )}
      </main>
    </div>
  );
}
