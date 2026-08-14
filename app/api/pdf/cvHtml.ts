import { CvData } from "../../cv/types";
import { formatDate } from "../../cv/format";

const SANS = "'Arial', 'Helvetica', sans-serif";

function esc(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function fullName(data: CvData): string {
  return [data.personalInfo.firstName, data.personalInfo.lastName]
    .filter(Boolean)
    .join(" ");
}

function contactLine(data: CvData): string {
  const info = data.personalInfo;
  const address = [info.address, info.postalCode, info.city]
    .filter(Boolean)
    .join(" ");
  return [info.email, info.phone, address].filter(Boolean).join("  ·  ");
}

function levelDots(level: number, color: string, empty: string): string {
  let html = "";
  for (let i = 0; i < 5; i++) {
    const bg = i < level ? color : empty;
    html += `<span style="display:inline-block;width:6px;height:6px;border-radius:9999px;background:${bg};margin-right:4px;"></span>`;
  }
  return html;
}

function sectionHeading(text: string, color: string, spacing = "0.15em"): string {
  return `<h2 style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:${spacing};color:${color};margin:0 0 10px;">${text}</h2>`;
}

function experienceBlock(
  data: CvData,
  color: string,
  opts: { indent?: boolean; margin?: string } = {}
): string {
  if (data.experiences.length === 0) return "";
  const indent = opts.indent
    ? `border-left:2px solid ${color};padding-left:16px;`
    : "";
  const items = data.experiences
    .map((exp) => {
      const company = [exp.company, exp.location].filter(Boolean).join(" · ");
      const dates = `${formatDate(exp.startDate)} – ${
        exp.current ? "Présent" : formatDate(exp.endDate)
      }`;
      return `<div style="margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline;">
          <h3 style="font-size:13px;font-weight:600;margin:0;color:#0f172a;">${
            esc(exp.title) || "Intitulé du poste"
          }</h3>
          <span style="font-size:11px;color:#94a3b8;white-space:nowrap;">${dates}</span>
        </div>
        ${
          company
            ? `<p style="font-size:11px;font-weight:500;margin:2px 0 0;color:${color};">${esc(
                company
              )}</p>`
            : ""
        }
        ${
          exp.description
            ? `<p style="font-size:12px;margin:4px 0 0;color:#475569;white-space:pre-line;">${esc(
                exp.description
              )}</p>`
            : ""
        }
      </div>`;
    })
    .join("");
  return `<section style="margin:${opts.margin || "0 0 24px"};">
    ${sectionHeading("Expérience professionnelle", color)}
    <div style="${indent}">${items}</div>
  </section>`;
}

function educationBlock(
  data: CvData,
  color: string,
  opts: { indent?: boolean; margin?: string } = {}
): string {
  if (data.educations.length === 0) return "";
  const indent = opts.indent
    ? `border-left:2px solid ${color};padding-left:16px;`
    : "";
  const items = data.educations
    .map((edu) => {
      const school = [edu.school, edu.location].filter(Boolean).join(" · ");
      return `<div style="margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline;">
          <h3 style="font-size:13px;font-weight:600;margin:0;color:#0f172a;">${
            esc(edu.degree) || "Diplôme"
          }</h3>
          <span style="font-size:11px;color:#94a3b8;white-space:nowrap;">${formatDate(
            edu.startDate
          )} – ${formatDate(edu.endDate)}</span>
        </div>
        ${
          school
            ? `<p style="font-size:11px;font-weight:500;margin:2px 0 0;color:${color};">${esc(
                school
              )}</p>`
            : ""
        }
        ${
          edu.description
            ? `<p style="font-size:12px;margin:4px 0 0;color:#475569;white-space:pre-line;">${esc(
                edu.description
              )}</p>`
            : ""
        }
      </div>`;
    })
    .join("");
  return `<section style="margin:${opts.margin || "0 0 24px"};">
    ${sectionHeading("Formation", color)}
    <div style="${indent}">${items}</div>
  </section>`;
}

function skillsLanguages(data: CvData, color: string): string {
  if (data.skills.length === 0 && data.languages.length === 0) return "";
  const skills = data.skills.length
    ? `<section>
        ${sectionHeading("Compétences", color)}
        <ul style="list-style:none;margin:0;padding:0;">
          ${data.skills
            .map(
              (s) =>
                `<li style="font-size:13px;color:#475569;margin-bottom:4px;">${esc(
                  s.name
                )}</li>`
            )
            .join("")}
        </ul>
      </section>`
    : "";
  const languages = data.languages.length
    ? `<section>
        ${sectionHeading("Langues", color)}
        <ul style="list-style:none;margin:0;padding:0;">
          ${data.languages
            .map(
              (l) =>
                `<li style="font-size:13px;color:#475569;margin-bottom:4px;">${esc(
                  l.name
                )}</li>`
            )
            .join("")}
        </ul>
      </section>`
    : "";
  return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin:0 0 24px;">${skills}${languages}</div>`;
}

function hobbies(data: CvData, color: string): string {
  if (data.hobbies.length === 0) return "";
  return `<section style="margin:0 0 24px;">
    ${sectionHeading("Loisirs", color)}
    <p style="font-size:13px;color:#475569;margin:0;">${esc(
      data.hobbies.map((h) => h.name).filter(Boolean).join(", ")
    )}</p>
  </section>`;
}

function contactIcon(name: "mail" | "phone" | "pin", color: string): string {
  const paths =
    name === "mail"
      ? `<rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>`
      : name === "phone"
        ? `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>`
        : `<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="12" cy="10" r="3" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>`;
  return `<svg viewBox="0 0 24 24" style="width:11px;height:11px;flex-shrink:0;vertical-align:-1px;" aria-hidden="true">${paths}</svg>`;
}

function contactLineWithIcon(
  value: string,
  icon: "mail" | "phone" | "pin",
  color: string
): string {
  return `<p style="display:flex;align-items:center;gap:6px;margin:0 0 6px;word-break:break-all;">${contactIcon(
    icon,
    color
  )}<span>${esc(value)}</span></p>`;
}

function photoCircle(data: CvData, size: string, style: string): string {
  if (!data.personalInfo.photo) return "";
  return `<div style="width:${size};height:${size};overflow:hidden;border-radius:9999px;${style}">
    <img src="${esc(data.personalInfo.photo)}" alt="" style="width:100%;height:100%;object-fit:cover;" />
  </div>`;
}

function sidebarHtml(data: CvData): string {
  const color = data.theme.color;
  const name = fullName(data) || "Prénom Nom";
  const info = data.personalInfo;
  return `<div id="cv-preview" style="display:flex;width:210mm;min-height:297mm;background:#fff;color:#1e293b;font-family:${SANS};">
    <aside style="width:30%;background:#0f172a;color:#f1f5f9;padding:32px 24px;flex-shrink:0;">
      <div style="width:112px;height:112px;margin:0 auto 24px;overflow:hidden;border-radius:9999px;border:4px solid #334155;background:#1e293b;">
        ${
          info.photo
            ? `<img src="${esc(info.photo)}" alt="" style="width:100%;height:100%;object-fit:cover;" />`
            : ""
        }
      </div>
      <div style="text-align:center;">
        <h1 style="font-size:20px;font-weight:700;line-height:1.25;margin:0;">${esc(
          name
        )}</h1>
        ${
          info.jobTitle
            ? `<p style="font-size:13px;color:${color};margin:4px 0 0;">${esc(
                info.jobTitle
              )}</p>`
            : ""
        }
      </div>
      <div style="margin-top:32px;font-size:11px;">
        <h2 style="display:flex;align-items:center;gap:6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${color};margin:0 0 10px;">
          ${contactIcon("mail", color)}Contact
        </h2>
        ${
          info.email
            ? contactLineWithIcon(info.email, "mail", "#f1f5f9")
            : ""
        }
        ${
          info.phone
            ? contactLineWithIcon(info.phone, "phone", "#f1f5f9")
            : ""
        }
        ${
          [info.address, info.postalCode, info.city].filter(Boolean).length
            ? contactLineWithIcon(
                [info.address, info.postalCode, info.city]
                  .filter(Boolean)
                  .join(" "),
                "pin",
                "#f1f5f9"
              )
            : ""
        }
      </div>
      ${
        data.skills.length
          ? `<div style="margin-top:32px;font-size:11px;">
              ${sectionHeading("Compétences", color, "0.08em")}
              ${data.skills
                .map(
                  (s) =>
                    `<p style="margin:0 0 6px;">${esc(
                      s.name
                    )}</p><div style="margin-bottom:8px;">${levelDots(
                      s.level,
                      color,
                      "#334155"
                    )}</div>`
                )
                .join("")}
            </div>`
          : ""
      }
      ${
        data.languages.length
          ? `<div style="margin-top:32px;font-size:11px;">
              ${sectionHeading("Langues", color, "0.08em")}
              ${data.languages
                .map(
                  (l) =>
                    `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                      <p style="margin:0;">${esc(l.name)}</p>
                      <div>${levelDots(l.level, color, "#334155")}</div>
                    </div>`
                )
                .join("")}
            </div>`
          : ""
      }
      ${
        data.hobbies.length
          ? `<div style="margin-top:32px;font-size:11px;">
              ${sectionHeading("Loisirs", color, "0.08em")}
              <p style="margin:0;">${esc(
                data.hobbies.map((h) => h.name).filter(Boolean).join(", ")
              )}</p>
            </div>`
          : ""
      }
    </aside>
    <main style="flex:1;padding:32px;">
      ${
        data.profile
          ? `<section style="margin:0 0 28px;">
              ${sectionHeading("Profil", color)}
              <p style="font-size:13px;line-height:1.6;color:#475569;margin:0;">${esc(
                data.profile
              )}</p>
            </section>`
          : ""
      }
      ${experienceBlock(data, color)}
      ${educationBlock(data, color)}
    </main>
  </div>`;
}

function classicHtml(data: CvData): string {
  const color = data.theme.color;
  const name = fullName(data) || "Prénom Nom";
  const contact = contactLine(data);
  return `<div id="cv-preview" style="width:210mm;min-height:297mm;background:#fff;color:#1e293b;font-family:${SANS};">
    <header style="display:flex;align-items:center;gap:24px;padding:32px 40px;background:${color};color:#fff;">
      ${photoCircle(data, "96px", "border:4px solid rgba(255,255,255,0.4);flex-shrink:0;")}
      <div>
        <h1 style="font-size:24px;font-weight:700;margin:0;">${esc(name)}</h1>
        ${
          data.personalInfo.jobTitle
            ? `<p style="font-size:14px;margin:4px 0 0;color:rgba(255,255,255,0.9);">${esc(
                data.personalInfo.jobTitle
              )}</p>`
            : ""
        }
        ${
          contact
            ? `<p style="font-size:11px;margin:8px 0 0;color:rgba(255,255,255,0.8);">${esc(
                contact
              )}</p>`
            : ""
        }
      </div>
    </header>
    <main style="padding:32px 40px;">
      ${
        data.profile
          ? `<section style="margin:0 0 24px;">
              ${sectionHeading("Profil", color)}
              <p style="font-size:13px;line-height:1.6;color:#475569;margin:0;">${esc(
                data.profile
              )}</p>
            </section>`
          : ""
      }
      ${experienceBlock(data, color, { indent: true })}
      ${educationBlock(data, color, { indent: true })}
      ${skillsLanguages(data, color)}
      ${hobbies(data, color)}
    </main>
  </div>`;
}

function minimalHtml(data: CvData): string {
  const color = data.theme.color;
  const name = fullName(data) || "Prénom Nom";
  const contact = contactLine(data);
  return `<div id="cv-preview" style="width:210mm;min-height:297mm;background:#fff;color:#1e293b;padding:40px 48px;font-family:${SANS};">
    <header style="display:flex;align-items:center;gap:20px;margin-bottom:32px;">
      ${photoCircle(data, "80px", "border-radius:8px;flex-shrink:0;")}
      <div>
        <h1 style="font-size:30px;font-weight:700;letter-spacing:-0.02em;color:#0f172a;margin:0;">${esc(
          name
        )}</h1>
        ${
          data.personalInfo.jobTitle
            ? `<p style="font-size:16px;font-weight:500;color:${color};margin:4px 0 0;">${esc(
                data.personalInfo.jobTitle
              )}</p>`
            : ""
        }
      </div>
    </header>
    ${
      contact
        ? `<p style="font-size:11px;color:#64748b;margin:0 0 32px;padding-bottom:16px;border-bottom:1px solid #e2e8f0;">${esc(
            contact
          )}</p>`
        : ""
    }
    ${
      data.profile
        ? `<section style="margin:0 0 28px;">
            <p style="font-size:13px;line-height:1.6;color:#475569;margin:0;">${esc(
              data.profile
            )}</p>
          </section>`
        : ""
    }
    ${experienceBlock(data, color)}
    ${educationBlock(data, color)}
    ${skillsLanguages(data, color)}
    ${hobbies(data, color)}
  </div>`;
}

export function buildPdfHtml(data: CvData): string {
  const body =
    data.theme.template === "classic"
      ? classicHtml(data)
      : data.theme.template === "minimal"
        ? minimalHtml(data)
        : sidebarHtml(data);

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
</head>
<body style="margin:0;padding:0;background:#fff;">
${body}
</body>
</html>`;
}
