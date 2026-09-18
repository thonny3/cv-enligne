"use client";

import { CvData } from "../types";
import { formatDate } from "../format";
import { BulletList } from "../ui";

export function ChronologicalTemplate({ data }: { data: CvData }) {
  const { personalInfo: info } = data;
  const color = data.theme.color;
  const fullName = [info.firstName, info.lastName].filter(Boolean).join(" ");
  const contact = [info.email, info.phone, [info.address, info.postalCode, info.city].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-slate-800">
      <header className="px-10 pb-6 pt-10 text-center">
        <h1 className="text-2xl font-bold text-slate-900">{fullName || "Prénom Nom"}</h1>
        {info.jobTitle && (
          <p className="mt-1 text-sm font-medium" style={{ color }}>
            {info.jobTitle}
          </p>
        )}
        {contact && <p className="mt-3 text-xs text-slate-500">{contact}</p>}
      </header>
      <div className="mx-10 h-1 rounded-full" style={{ backgroundColor: color }} />

      <main className="px-10 py-8">
        {data.profile && (
          <section className="mb-7">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color }}>
              Profil
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">{data.profile}</p>
          </section>
        )}

        {data.experiences.length > 0 && (
          <section className="mb-7">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color }}>
              Expérience professionnelle
            </h2>
            <div className="space-y-4">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="grid grid-cols-[38mm_1fr] gap-4">
                  <div className="pt-0.5 text-right">
                    <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                      {formatDate(exp.startDate)} – {exp.current ? "Présent" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{exp.title || "Intitulé du poste"}</h3>
                    <p className="text-xs font-medium text-slate-500">
                      {[exp.company, exp.location].filter(Boolean).join(" · ")}
                    </p>
                    {exp.description && (
                      <BulletList
                        text={exp.description}
                        className="mt-1 text-sm leading-relaxed text-slate-600"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.educations.length > 0 && (
          <section className="mb-7">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color }}>
              Formation
            </h2>
            <div className="space-y-4">
              {data.educations.map((edu) => (
                <div key={edu.id} className="grid grid-cols-[38mm_1fr] gap-4">
                  <div className="pt-0.5 text-right">
                    <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{edu.degree || "Diplôme"}</h3>
                    <p className="text-xs font-medium text-slate-500">
                      {[edu.school, edu.location].filter(Boolean).join(" · ")}
                    </p>
                    {edu.description && (
                      <p className="mt-1 text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {data.skills.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color }}>
                Compétences
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
            <section>
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color }}>
                Langues
              </h2>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {data.languages.map((l) => (
                  <span key={l.id} className="flex items-center text-sm text-slate-600">
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                    {l.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {data.hobbies.length > 0 && (
          <section className="mt-6">
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
