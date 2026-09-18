"use client";

import { CvData } from "../types";
import { formatDate } from "../format";
import { BulletList } from "../ui";

export function TwoColumnTemplate({ data }: { data: CvData }) {
  const { personalInfo: info } = data;
  const color = data.theme.color;
  const fullName = [info.firstName, info.lastName].filter(Boolean).join(" ");

  return (
    <div className="flex w-[210mm] min-h-[297mm] bg-white text-slate-800">
      <main className="flex-1 px-10 py-9">
        <header className="mb-7">
          <h1 className="text-2xl font-bold text-slate-900">{fullName || "Prénom Nom"}</h1>
          {info.jobTitle && (
            <p className="mt-1 text-sm font-medium" style={{ color }}>
              {info.jobTitle}
            </p>
          )}
        </header>

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
                <div key={exp.id}>
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
      </main>

      <aside className="w-[62mm] shrink-0 space-y-7 border-l border-slate-100 bg-slate-50 px-6 py-9">
        <div>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color }}>
            Contact
          </h2>
          <div className="space-y-1 text-xs text-slate-600">
            {info.email && <p className="break-all">{info.email}</p>}
            {info.phone && <p>{info.phone}</p>}
            {(info.address || info.city) && (
              <p>{[info.address, info.postalCode, info.city].filter(Boolean).join(" ")}</p>
            )}
          </div>
        </div>

        {data.skills.length > 0 && (
          <div>
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color }}>
              Compétences
            </h2>
            <div className="space-y-1.5 text-sm text-slate-600">
              {data.skills.map((s) => (
                <p key={s.id}>
                  {s.category && <span className="font-semibold text-slate-800">{s.category} : </span>}
                  {s.items}
                </p>
              ))}
            </div>
          </div>
        )}

        {data.languages.length > 0 && (
          <div>
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color }}>
              Langues
            </h2>
            <div className="space-y-1 text-sm text-slate-600">
              {data.languages.map((l) => (
                <p key={l.id}>{l.name}</p>
              ))}
            </div>
          </div>
        )}

        {data.hobbies.length > 0 && (
          <div>
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color }}>
              Loisirs
            </h2>
            <p className="text-sm text-slate-600">{data.hobbies.map((h) => h.name).filter(Boolean).join(", ")}</p>
          </div>
        )}
      </aside>
    </div>
  );
}
