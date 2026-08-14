"use client";

import { CvData } from "../types";
import { formatDate } from "../format";

function LevelDots({ level, color, mutedClass }: { level: number; color: string; mutedClass: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${i >= level ? mutedClass : ""}`}
          style={i < level ? { backgroundColor: color } : undefined}
        />
      ))}
    </div>
  );
}

export function SidebarTemplate({ data }: { data: CvData }) {
  const { personalInfo: info } = data;
  const color = data.theme.color;
  const fullName = [info.firstName, info.lastName].filter(Boolean).join(" ");

  return (
    <div className="flex w-[210mm] min-h-[297mm] bg-white text-slate-800">
      <aside className="w-[70mm] bg-slate-900 px-6 py-8 text-slate-100">
        <div className="mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full border-4 border-slate-700 bg-slate-800">
          {info.photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={info.photo} alt="" className="h-full w-full object-cover" />
          )}
        </div>

        <div className="space-y-1 text-center">
          <h1 className="text-xl font-bold leading-tight">{fullName || "Prénom Nom"}</h1>
          {info.jobTitle && (
            <p className="text-sm" style={{ color }}>
              {info.jobTitle}
            </p>
          )}
        </div>

        <div className="mt-8 space-y-2 text-xs">
          <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color }}>
            Contact
          </h2>
          {info.email && <p className="break-all">{info.email}</p>}
          {info.phone && <p>{info.phone}</p>}
          {(info.address || info.city) && (
            <p>
              {info.address}
              {info.address && (info.city || info.postalCode) ? ", " : ""}
              {info.postalCode} {info.city}
            </p>
          )}
        </div>

        {data.skills.length > 0 && (
          <div className="mt-8 space-y-2 text-xs">
            <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color }}>
              Compétences
            </h2>
            {data.skills.map((s) => (
              <div key={s.id} className="space-y-1">
                <p>{s.name}</p>
                <LevelDots level={s.level} color={color} mutedClass="bg-slate-700" />
              </div>
            ))}
          </div>
        )}

        {data.languages.length > 0 && (
          <div className="mt-8 space-y-2 text-xs">
            <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color }}>
              Langues
            </h2>
            {data.languages.map((l) => (
              <div key={l.id} className="flex items-center justify-between">
                <p>{l.name}</p>
                <LevelDots level={l.level} color={color} mutedClass="bg-slate-700" />
              </div>
            ))}
          </div>
        )}

        {data.hobbies.length > 0 && (
          <div className="mt-8 space-y-1 text-xs">
            <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color }}>
              Loisirs
            </h2>
            <p>{data.hobbies.map((h) => h.name).filter(Boolean).join(", ")}</p>
          </div>
        )}
      </aside>

      <main className="flex-1 px-8 py-8">
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
                    <h3 className="text-sm font-semibold text-slate-900">
                      {exp.title || "Intitulé du poste"}
                    </h3>
                    <span className="whitespace-nowrap text-xs text-slate-400">
                      {formatDate(exp.startDate)} – {exp.current ? "Présent" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-xs font-medium" style={{ color }}>
                    {[exp.company, exp.location].filter(Boolean).join(" · ")}
                  </p>
                  {exp.description && (
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
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
    </div>
  );
}
