"use client";

import { CvData } from "../types";
import { formatDate } from "../format";
import { BulletList } from "../ui";

export function MinimalTemplate({ data }: { data: CvData }) {
  const { personalInfo: info } = data;
  const color = data.theme.color;
  const fullName = [info.firstName, info.lastName].filter(Boolean).join(" ");
  const contact = [info.email, info.phone, [info.address, info.postalCode, info.city].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white px-12 py-10 text-slate-800">
      <header className="mb-8 flex items-center gap-5">
        {info.photo && (
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={info.photo} alt="" className="h-full w-full object-cover" />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{fullName || "Prénom Nom"}</h1>
          {info.jobTitle && (
            <p className="mt-1 text-base font-medium" style={{ color }}>
              {info.jobTitle}
            </p>
          )}
        </div>
      </header>

      {contact && (
        <p className="mb-8 border-b border-slate-200 pb-4 text-xs text-slate-500">{contact}</p>
      )}

      {data.profile && (
        <section className="mb-7">
          <p className="text-sm leading-relaxed text-slate-600">{data.profile}</p>
        </section>
      )}

      {data.experiences.length > 0 && (
        <section className="mb-7">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.15em]" style={{ color }}>
            Expérience professionnelle
          </h2>
          <div className="space-y-4">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {exp.title || "Intitulé du poste"}
                  </h3>
                  <span className="whitespace-nowrap text-xs text-slate-400">
                    {formatDate(exp.startDate)} – {exp.current ? "Présent" : formatDate(exp.endDate)}
                  </span>
                </div>
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
            ))}
          </div>
        </section>
      )}

      {data.educations.length > 0 && (
        <section className="mb-7">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.15em]" style={{ color }}>
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
                <p className="text-xs font-medium text-slate-500">
                  {[edu.school, edu.location].filter(Boolean).join(" · ")}
                </p>
                {edu.description && (
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {data.skills.length > 0 && (
          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.15em]" style={{ color }}>
              Compétences
            </h2>
            <ul className="space-y-1 text-sm text-slate-600">
              {data.skills.map((s) => (
                <li key={s.id}>{s.name}</li>
              ))}
            </ul>
          </section>
        )}

        {data.languages.length > 0 && (
          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.15em]" style={{ color }}>
              Langues
            </h2>
            <ul className="space-y-1 text-sm text-slate-600">
              {data.languages.map((l) => (
                <li key={l.id}>{l.name}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {data.hobbies.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.15em]" style={{ color }}>
            Loisirs
          </h2>
          <p className="text-sm text-slate-600">{data.hobbies.map((h) => h.name).filter(Boolean).join(", ")}</p>
        </section>
      )}
    </div>
  );
}
