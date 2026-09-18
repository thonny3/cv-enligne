"use client";

import { CvData } from "../types";
import { formatDate } from "../format";
import { BulletList } from "../ui";

export function ModernTemplate({ data }: { data: CvData }) {
  const { personalInfo: info } = data;
  const color = data.theme.color;
  const fullName = [info.firstName, info.lastName].filter(Boolean).join(" ");

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-slate-800">
      <header className="flex items-center gap-6 px-10 py-8 text-white" style={{ backgroundColor: "#0f172a" }}>
        {info.photo && (
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border-2" style={{ borderColor: color }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={info.photo} alt="" className="h-full w-full object-cover" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold">{fullName || "Prénom Nom"}</h1>
          {info.jobTitle && (
            <p className="mt-1 text-sm font-medium" style={{ color }}>
              {info.jobTitle}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300">
            {info.email && <span>{info.email}</span>}
            {info.phone && <span>{info.phone}</span>}
            {(info.address || info.city) && (
              <span>
                {[info.address, info.postalCode, info.city].filter(Boolean).join(" ")}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        <main className="flex-1 px-8 py-7">
          {data.profile && (
            <section className="mb-6">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color }}>
                Profil
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">{data.profile}</p>
            </section>
          )}

          {data.experiences.length > 0 && (
            <section className="mb-6">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color }}>
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
        </main>

        <aside className="w-[62mm] border-l border-slate-100 px-6 py-7">
          {data.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color }}>
                Compétences
              </h2>
              <ul className="space-y-1.5 text-sm text-slate-600">
                {data.skills.map((s) => (
                  <li key={s.id}>
                    {s.category && <span className="font-semibold text-slate-800">{s.category} : </span>}
                    {s.items}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color }}>
                Langues
              </h2>
              <ul className="space-y-1 text-sm text-slate-600">
                {data.languages.map((l) => (
                  <li key={l.id}>{l.name}</li>
                ))}
              </ul>
            </div>
          )}

          {data.hobbies.length > 0 && (
            <div>
              <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color }}>
                Loisirs
              </h2>
              <ul className="space-y-1 text-sm text-slate-600">
                {data.hobbies.map((h) => (
                  <li key={h.id}>{h.name}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
