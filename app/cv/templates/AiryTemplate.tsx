"use client";

import { CvData } from "../types";
import { formatDate } from "../format";
import { BulletList } from "../ui";

export function AiryTemplate({ data }: { data: CvData }) {
  const { personalInfo: info } = data;
  const color = data.theme.color;
  const fullName = [info.firstName, info.lastName].filter(Boolean).join(" ");
  const contact = [info.email, info.phone, [info.address, info.postalCode, info.city].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join("   ·   ");

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-slate-700">
      <header className="px-16 pb-8 pt-14">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color }}>
          {info.jobTitle || "Curriculum Vitae"}
        </p>
        <h1 className="text-3xl font-light uppercase tracking-[0.2em] text-slate-900">
          {fullName || "Prénom Nom"}
        </h1>
        {contact && <p className="mt-5 text-xs text-slate-400">{contact}</p>}
      </header>
      <div className="mx-16 border-t border-slate-200" />

      <main className="px-16 py-10">
        {data.profile && (
          <section className="mb-10">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color }}>
              Profil
            </h2>
            <p className="text-sm leading-loose text-slate-500">{data.profile}</p>
          </section>
        )}

        {data.experiences.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.3em]" style={{ color }}>
              Expérience professionnelle
            </h2>
            <div className="space-y-6">
              {data.experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-base font-medium text-slate-900">{exp.title || "Intitulé du poste"}</h3>
                    <span className="whitespace-nowrap text-xs tracking-wider text-slate-400">
                      {formatDate(exp.startDate)} – {exp.current ? "Présent" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs uppercase tracking-widest text-slate-400">
                    {[exp.company, exp.location].filter(Boolean).join(" · ")}
                  </p>
                  {exp.description && (
                    <BulletList
                      text={exp.description}
                      className="mt-2 text-sm leading-loose text-slate-500"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.educations.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.3em]" style={{ color }}>
              Formation
            </h2>
            <div className="space-y-6">
              {data.educations.map((edu) => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-base font-medium text-slate-900">{edu.degree || "Diplôme"}</h3>
                    <span className="whitespace-nowrap text-xs tracking-wider text-slate-400">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs uppercase tracking-widest text-slate-400">
                    {[edu.school, edu.location].filter(Boolean).join(" · ")}
                  </p>
                  {edu.description && (
                    <p className="mt-2 text-sm leading-loose text-slate-500 whitespace-pre-line">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-12">
          {data.skills.length > 0 && (
            <section>
              <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color }}>
                Compétences
              </h2>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-600">
                {data.skills.map((s) => (
                  <span key={s.id} className="flex items-center">
                    <span className="mr-1.5 inline-block h-1 w-1 rounded-full" style={{ backgroundColor: color }} />
                    {s.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.languages.length > 0 && (
            <section>
              <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color }}>
                Langues
              </h2>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-600">
                {data.languages.map((l) => (
                  <span key={l.id} className="flex items-center">
                    <span className="mr-1.5 inline-block h-1 w-1 rounded-full" style={{ backgroundColor: color }} />
                    {l.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {data.hobbies.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color }}>
              Loisirs
            </h2>
            <p className="text-sm text-slate-500">{data.hobbies.map((h) => h.name).filter(Boolean).join(", ")}</p>
          </section>
        )}
      </main>
    </div>
  );
}
