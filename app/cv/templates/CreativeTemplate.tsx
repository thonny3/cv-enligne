"use client";

import { CvData } from "../types";
import { formatDate } from "../format";
import { BulletList } from "../ui";

function SkillBar({ level, color }: { level: number; color: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
      <div className="h-full rounded-full" style={{ width: `${level * 20}%`, backgroundColor: color }} />
    </div>
  );
}

export function CreativeTemplate({ data }: { data: CvData }) {
  const { personalInfo: info } = data;
  const color = data.theme.color;
  const fullName = [info.firstName, info.lastName].filter(Boolean).join(" ");

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-slate-800">
      <header className="flex items-center gap-8 bg-slate-900 px-10 py-8 text-white">
        {info.photo && (
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-white/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={info.photo} alt="" className="h-full w-full object-cover" />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold uppercase tracking-tight">{fullName || "Prénom Nom"}</h1>
          {info.jobTitle && (
            <p className="mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-semibold text-white" style={{ backgroundColor: color }}>
              {info.jobTitle}
            </p>
          )}
        </div>
        <div className="space-y-1 text-right text-xs text-slate-300">
          {info.email && <p>{info.email}</p>}
          {info.phone && <p>{info.phone}</p>}
          {(info.address || info.city) && (
            <p>{[info.address, info.postalCode, info.city].filter(Boolean).join(" ")}</p>
          )}
        </div>
      </header>

      <main className="px-10 py-8">
        {data.profile && (
          <section className="mb-7">
            <h2 className="mb-2 text-sm font-extrabold uppercase tracking-wider" style={{ color }}>
              Profil
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">{data.profile}</p>
          </section>
        )}

        {data.experiences.length > 0 && (
          <section className="mb-7">
            <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider" style={{ color }}>
              Expérience professionnelle
            </h2>
            <div className="space-y-4">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="rounded-xl border-l-4 bg-slate-50 p-4" style={{ borderColor: color }}>
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
          <section className="mb-7">
            <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider" style={{ color }}>
              Formation
            </h2>
            <div className="space-y-4">
              {data.educations.map((edu) => (
                <div key={edu.id} className="rounded-xl border-l-4 border-slate-300 bg-slate-50 p-4">
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

        <div className="grid grid-cols-2 gap-8">
          {data.skills.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider" style={{ color }}>
                Compétences
              </h2>
              <div className="space-y-2">
                {data.skills.map((s) => (
                  <div key={s.id} className="flex items-center gap-3">
                    <span className="w-32 shrink-0 text-sm text-slate-700">{s.name}</span>
                    <SkillBar level={s.level} color={color} />
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="space-y-7">
            {data.languages.length > 0 && (
              <section>
                <h2 className="mb-2 text-sm font-extrabold uppercase tracking-wider" style={{ color }}>
                  Langues
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {data.languages.map((l) => (
                    <span
                      key={l.id}
                      className="rounded-full px-3 py-1 text-xs font-medium text-white"
                      style={{ backgroundColor: color }}
                    >
                      {l.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {data.hobbies.length > 0 && (
              <section>
                <h2 className="mb-2 text-sm font-extrabold uppercase tracking-wider" style={{ color }}>
                  Loisirs
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {data.hobbies.map((h) => (
                    <span key={h.id} className="rounded-full border px-3 py-1 text-xs font-medium text-slate-600" style={{ borderColor: color }}>
                      {h.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
