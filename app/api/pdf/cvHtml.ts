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

function skillCategoryList(
  skills: CvData["skills"],
  categoryColor: string,
  itemsColor: string
): string {
  return `<div style="display:flex;flex-direction:column;gap:8px;">
    ${skills
      .map(
        (s) => `<div>
          ${
            s.category
              ? `<p style="margin:0;font-weight:600;color:${categoryColor};">${esc(
                  s.category
                )}</p>`
              : ""
          }
          ${
            s.items
              ? `<p style="margin:2px 0 0;color:${itemsColor};">${esc(s.items)}</p>`
              : ""
          }
        </div>`
      )
      .join("")}
  </div>`;
}

function sectionHeading(text: string, color: string, spacing = "0.15em"): string {
  return `<h2 style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:${spacing};color:${color};margin:0 0 10px;">${text}</h2>`;
}

function bulletList(text: string, textColor: string): string {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length === 0) return "";
  return `<ul style="margin:4px 0 0;padding-left:16px;list-style:disc;color:${textColor};">
    ${lines
      .map(
        (line) =>
          `<li style="font-size:12px;color:${textColor};margin-bottom:2px;line-height:1.5;text-align:justify;">${esc(
            line
          )}</li>`
      )
      .join("")}
  </ul>`;
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
            ? bulletList(exp.description, "#475569")
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
        <div style="font-size:13px;">${skillCategoryList(data.skills, "#1e293b", "#475569")}</div>
      </section>`
    : "";
  const languages = data.languages.length
    ? `<section>
        ${sectionHeading("Langues", color)}
        <div style="display:flex;flex-wrap:wrap;gap:6px 14px;">
          ${data.languages
            .map(
              (l) =>
                `<span style="display:inline-flex;align-items:center;font-size:13px;color:#475569;white-space:nowrap;">
                  <span style="width:6px;height:6px;border-radius:9999px;background:${color};margin-right:6px;"></span>${esc(
                  l.name
                )}
                </span>`
            )
            .join("")}
        </div>
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
              ${skillCategoryList(data.skills, "#f1f5f9", "#cbd5e1")}
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

function modernHtml(data: CvData): string {
  const color = data.theme.color;
  const name = fullName(data) || "Prénom Nom";
  const info = data.personalInfo;
  const contact = [
    info.email,
    info.phone,
    [info.address, info.postalCode, info.city].filter(Boolean).join(" "),
  ].filter(Boolean);

  const asideList = (title: string, items: string[]): string => {
    if (items.length === 0) return "";
    return `<div style="margin:0 0 24px;">
      ${sectionHeading(title, color)}
      <ul style="list-style:none;margin:0;padding:0;">
        ${items
          .map(
            (item) =>
              `<li style="font-size:14px;color:#475569;margin-bottom:4px;">${esc(
                item
              )}</li>`
          )
          .join("")}
      </ul>
    </div>`;
  };

  return `<div id="cv-preview" style="width:210mm;min-height:297mm;background:#fff;color:#1e293b;font-family:${SANS};">
    <header style="display:flex;align-items:center;gap:24px;padding:32px 40px;background:#0f172a;color:#fff;">
      ${photoCircle(data, "96px", `border-radius:12px;border:2px solid ${color};flex-shrink:0;`)}
      <div>
        <h1 style="font-size:24px;font-weight:700;margin:0;">${esc(name)}</h1>
        ${
          info.jobTitle
            ? `<p style="font-size:14px;font-weight:500;margin:4px 0 0;color:${color};">${esc(
                info.jobTitle
              )}</p>`
            : ""
        }
        ${
          contact.length
            ? `<div style="display:flex;flex-wrap:wrap;gap:4px 16px;margin-top:12px;font-size:11px;color:#cbd5e1;">${contact
                .map((c) => `<span>${esc(c)}</span>`)
                .join("")}</div>`
            : ""
        }
      </div>
    </header>
    <div style="display:flex;">
      <main style="flex:1;padding:28px 32px;">
        ${
          data.profile
            ? `<section style="margin:0 0 24px;">
                ${sectionHeading("Profil", color)}
                <p style="font-size:14px;line-height:1.6;color:#475569;margin:0;">${esc(
                  data.profile
                )}</p>
              </section>`
            : ""
        }
        ${experienceBlock(data, color)}
        ${educationBlock(data, color)}
      </main>
      <aside style="width:62mm;flex-shrink:0;border-left:1px solid #f1f5f9;padding:28px 24px;">
        ${
          data.skills.length
            ? `<div style="margin:0 0 24px;">
                ${sectionHeading("Compétences", color)}
                ${skillCategoryList(data.skills, "#1e293b", "#475569")}
              </div>`
            : ""
        }
        ${asideList("Langues", data.languages.map((l) => l.name))}
        ${asideList("Loisirs", data.hobbies.map((h) => h.name))}
      </aside>
    </div>
  </div>`;
}

function tealHtml(data: CvData): string {
  const color = data.theme.color;
  const name = fullName(data) || "Prénom Nom";
  const info = data.personalInfo;
  const address = [info.address, info.postalCode, info.city]
    .filter(Boolean)
    .join(" ");

  const asideHeading = (text: string): string =>
    `<h2 style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:rgba(255,255,255,0.8);margin:0 0 8px;">${text}</h2>`;

  return `<div id="cv-preview" style="display:flex;width:210mm;min-height:297mm;background:#fff;color:#1e293b;font-family:${SANS};">
    <aside style="position:relative;width:68mm;flex-shrink:0;overflow:hidden;background:${color};color:#fff;padding:36px 24px;display:flex;flex-direction:column;align-items:center;">
      <div style="width:112px;height:112px;margin-bottom:16px;overflow:hidden;border-radius:9999px;border:4px solid rgba(255,255,255,0.7);background:rgba(255,255,255,0.1);">
        ${
          info.photo
            ? `<img src="${esc(info.photo)}" alt="" style="width:100%;height:100%;object-fit:cover;" />`
            : ""
        }
      </div>
      <h1 style="font-size:18px;font-weight:700;line-height:1.25;text-align:center;margin:0;">${esc(
        name
      )}</h1>
      ${
        info.jobTitle
          ? `<p style="font-size:14px;text-align:center;color:rgba(255,255,255,0.85);margin:4px 0 0;">${esc(
              info.jobTitle
            )}</p>`
          : ""
      }
      <div style="width:100%;margin-top:32px;font-size:11px;">
        ${asideHeading("Contact")}
        ${
          info.email
            ? `<p style="margin:0 0 8px;word-break:break-all;">${esc(
                info.email
              )}</p>`
            : ""
        }
        ${info.phone ? `<p style="margin:0 0 8px;">${esc(info.phone)}</p>` : ""}
        ${address ? `<p style="margin:0;">${esc(address)}</p>` : ""}
      </div>
      ${
        data.skills.length
          ? `<div style="width:100%;margin-top:32px;font-size:11px;">
              ${asideHeading("Compétences")}
              ${skillCategoryList(data.skills, "#ffffff", "rgba(255,255,255,0.85)")}
            </div>`
          : ""
      }
      ${
        data.languages.length
          ? `<div style="width:100%;margin-top:32px;font-size:11px;">
              ${asideHeading("Langues")}
              ${data.languages
                .map(
                  (l) =>
                    `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px;">
                      <p style="margin:0;">${esc(l.name)}</p>
                      <div>${levelDots(
                        l.level,
                        "#ffffff",
                        "rgba(255,255,255,0.3)"
                      )}</div>
                    </div>`
                )
                .join("")}
            </div>`
          : ""
      }
      ${
        data.hobbies.length
          ? `<div style="width:100%;margin-top:32px;font-size:11px;">
              ${asideHeading("Loisirs")}
              <p style="margin:0;">${esc(
                data.hobbies.map((h) => h.name).filter(Boolean).join(", ")
              )}</p>
            </div>`
          : ""
      }
      <div
        style="position:absolute;bottom:-40px;right:-40px;width:160px;height:160px;border-radius:9999px;background:rgba(255,255,255,0.1);"
        aria-hidden="true"
      ></div>
    </aside>
    <main style="flex:1;padding:36px 32px;">
      ${
        data.profile
          ? `<section style="margin:0 0 28px;">
              ${sectionHeading("Profil", color)}
              <p style="font-size:14px;line-height:1.6;color:#475569;margin:0;">${esc(
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

function inlineChips(
  names: string[],
  color: string,
  size = "6px"
): string {
  return `<div style="display:flex;flex-wrap:wrap;gap:6px 14px;">
    ${names
      .map(
        (n) =>
          `<span style="display:inline-flex;align-items:center;font-size:13px;color:#475569;white-space:nowrap;">
            <span style="width:${size};height:${size};border-radius:9999px;background:${color};margin-right:6px;"></span>${esc(
            n
          )}
          </span>`
      )
      .join("")}
  </div>`;
}

function levelBar(level: number, color: string, track: string): string {
  const cells = Array.from(
    { length: 5 },
    (_, i) =>
      `<span style="flex:1;height:6px;border-radius:9999px;background:${
        i < level ? color : track
      };"></span>`
  ).join("");
  return `<div style="display:flex;gap:4px;flex:1;">${cells}</div>`;
}

function datePill(dates: string): string {
  return `<span style="display:inline-block;background:#f1f5f9;color:#64748b;border-radius:4px;padding:2px 8px;font-size:11px;font-weight:500;white-space:nowrap;">${esc(
    dates
  )}</span>`;
}

function chronoHtml(data: CvData): string {
  const color = data.theme.color;
  const name = fullName(data) || "Prénom Nom";
  const contact = contactLine(data);
  const contactInfo = data.personalInfo;

  const experienceItems = data.experiences
    .map((exp) => {
      const dates = `${formatDate(exp.startDate)} – ${
        exp.current ? "Présent" : formatDate(exp.endDate)
      }`;
      const company = [exp.company, exp.location].filter(Boolean).join(" · ");
      return `<div style="display:grid;grid-template-columns:38mm 1fr;gap:16px;margin-bottom:16px;">
        <div style="text-align:right;">${datePill(dates)}</div>
        <div>
          <h3 style="font-size:13px;font-weight:600;margin:0;color:#0f172a;">${
            esc(exp.title) || "Intitulé du poste"
          }</h3>
          ${
            company
              ? `<p style="font-size:11px;font-weight:500;margin:2px 0 0;color:#64748b;">${esc(
                  company
                )}</p>`
              : ""
          }
          ${exp.description ? bulletList(exp.description, "#475569") : ""}
        </div>
      </div>`;
    })
    .join("");

  const educationItems = data.educations
    .map((edu) => {
      const dates = `${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}`;
      const school = [edu.school, edu.location].filter(Boolean).join(" · ");
      return `<div style="display:grid;grid-template-columns:38mm 1fr;gap:16px;margin-bottom:16px;">
        <div style="text-align:right;">${datePill(dates)}</div>
        <div>
          <h3 style="font-size:13px;font-weight:600;margin:0;color:#0f172a;">${
            esc(edu.degree) || "Diplôme"
          }</h3>
          ${
            school
              ? `<p style="font-size:11px;font-weight:500;margin:2px 0 0;color:#64748b;">${esc(
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
        </div>
      </div>`;
    })
    .join("");

  return `<div id="cv-preview" style="width:210mm;min-height:297mm;background:#fff;color:#1e293b;font-family:${SANS};">
    <header style="text-align:center;padding:40px 40px 24px;">
      <h1 style="font-size:24px;font-weight:700;margin:0;color:#0f172a;">${esc(
        name
      )}</h1>
      ${
        contactInfo.jobTitle
          ? `<p style="font-size:14px;font-weight:500;margin:4px 0 0;color:${color};">${esc(
              contactInfo.jobTitle
            )}</p>`
          : ""
      }
      ${contact ? `<p style="font-size:11px;color:#64748b;margin:12px 0 0;">${esc(contact)}</p>` : ""}
    </header>
    <div style="height:4px;border-radius:9999px;background:${color};margin:0 40px;"></div>
    <main style="padding:32px 40px;">
      ${
        data.profile
          ? `<section style="margin:0 0 28px;">
              ${sectionHeading("Profil", color)}
              <p style="font-size:14px;line-height:1.6;color:#475569;margin:0;">${esc(
                data.profile
              )}</p>
            </section>`
          : ""
      }
      ${
        data.experiences.length
          ? `<section style="margin:0 0 28px;">
              ${sectionHeading("Expérience professionnelle", color)}
              ${experienceItems}
            </section>`
          : ""
      }
      ${
        data.educations.length
          ? `<section style="margin:0 0 28px;">
              ${sectionHeading("Formation", color)}
              ${educationItems}
            </section>`
          : ""
      }
      ${
        data.skills.length || data.languages.length
          ? `<div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin:0 0 24px;">
              ${
                data.skills.length
                  ? `<section>${sectionHeading(
                      "Compétences",
                      color
                    )}${skillCategoryList(data.skills, "#1e293b", "#475569")}</section>`
                  : ""
              }
              ${
                data.languages.length
                  ? `<section>${sectionHeading(
                      "Langues",
                      color
                    )}${inlineChips(data.languages.map((l) => l.name), color)}</section>`
                  : ""
              }
            </div>`
          : ""
      }
      ${hobbies(data, color)}
    </main>
  </div>`;
}

function functionalHtml(data: CvData): string {
  const color = data.theme.color;
  const name = fullName(data) || "Prénom Nom";
  const contact = contactLine(data);

  const languageRows = data.languages
    .map(
      (l) =>
        `<div style="display:flex;align-items:center;gap:12px;">
          <span style="width:128px;flex-shrink:0;font-size:13px;color:#334155;">${esc(
            l.name
          )}</span>
          ${levelBar(l.level, color, "#e2e8f0")}
        </div>`
    )
    .join("");

  const experienceItems = data.experiences
    .map((exp) => {
      const dates = `${formatDate(exp.startDate)} – ${
        exp.current ? "Présent" : formatDate(exp.endDate)
      }`;
      const company = [exp.company, exp.location].filter(Boolean).join(" · ");
      return `<div style="border-bottom:1px solid #f1f5f9;padding-bottom:12px;margin-bottom:16px;">
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
        ${exp.description ? bulletList(exp.description, "#475569") : ""}
      </div>`;
    })
    .join("");

  const educationItems = data.educations
    .map((edu) => {
      const dates = `${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}`;
      const school = [edu.school, edu.location].filter(Boolean).join(" · ");
      return `<div style="margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline;">
          <h3 style="font-size:13px;font-weight:600;margin:0;color:#0f172a;">${
            esc(edu.degree) || "Diplôme"
          }</h3>
          <span style="font-size:11px;color:#94a3b8;white-space:nowrap;">${dates}</span>
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

  return `<div id="cv-preview" style="width:210mm;min-height:297mm;background:#fff;color:#1e293b;font-family:${SANS};">
    <header style="padding:40px 40px 24px;">
      <h1 style="font-size:24px;font-weight:700;margin:0;color:#0f172a;">${esc(
        name
      )}</h1>
      ${
        data.personalInfo.jobTitle
          ? `<p style="font-size:14px;font-weight:500;margin:4px 0 0;color:${color};">${esc(
              data.personalInfo.jobTitle
            )}</p>`
          : ""
      }
      ${contact ? `<p style="font-size:11px;color:#64748b;margin:12px 0 0;">${esc(contact)}</p>` : ""}
    </header>
    <main style="padding:0 40px 40px;">
      ${
        data.profile
          ? `<section style="margin:0 0 28px;">
              ${sectionHeading("Profil", color)}
              <p style="font-size:14px;line-height:1.6;color:#475569;margin:0;">${esc(
                data.profile
              )}</p>
            </section>`
          : ""
      }
      ${
        data.skills.length
          ? `<section style="margin:0 0 28px;">
              ${sectionHeading("Compétences clés", color)}
              ${skillCategoryList(data.skills, "#1e293b", "#475569")}
            </section>`
          : ""
      }
      ${
        languageRows
          ? `<section style="margin:0 0 28px;">
              ${sectionHeading("Langues", color)}
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 32px;">
                ${languageRows}
              </div>
            </section>`
          : ""
      }
      ${
        data.experiences.length
          ? `<section style="margin:0 0 28px;">
              ${sectionHeading("Expérience professionnelle", color)}
              ${experienceItems}
            </section>`
          : ""
      }
      ${
        data.educations.length
          ? `<section style="margin:0 0 24px;">
              ${sectionHeading("Formation", color)}
              ${educationItems}
            </section>`
          : ""
      }
      ${hobbies(data, color)}
    </main>
  </div>`;
}

function timelineHtml(data: CvData): string {
  const color = data.theme.color;
  const name = fullName(data) || "Prénom Nom";
  const contact = contactLine(data);

  const entries = [
    ...data.experiences.map((exp) => {
      const dates = `${formatDate(exp.startDate)} – ${
        exp.current ? "Présent" : formatDate(exp.endDate)
      }`;
      const company = [exp.company, exp.location].filter(Boolean).join(" · ");
      return `<div style="position:relative;padding-left:24px;margin-bottom:24px;">
        <span style="position:absolute;left:-5px;top:4px;width:12px;height:12px;border-radius:9999px;background:${color};"></span>
        <p style="font-size:11px;font-weight:600;color:#94a3b8;margin:0;">${dates}</p>
        <h3 style="font-size:13px;font-weight:600;margin:2px 0 0;color:#0f172a;">${
          esc(exp.title) || "Intitulé du poste"
        }</h3>
        ${
          company
            ? `<p style="font-size:11px;font-weight:500;margin:2px 0 0;color:${color};">${esc(
                company
              )}</p>`
            : ""
        }
        ${exp.description ? bulletList(exp.description, "#475569") : ""}
      </div>`;
    }),
    ...data.educations.map((edu) => {
      const dates = `${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}`;
      const school = [edu.school, edu.location].filter(Boolean).join(" · ");
      return `<div style="position:relative;padding-left:24px;margin-bottom:24px;">
        <span style="position:absolute;left:-5px;top:4px;width:12px;height:12px;border-radius:9999px;background:#cbd5e1;"></span>
        <p style="font-size:11px;font-weight:600;color:#94a3b8;margin:0;">${dates}</p>
        <h3 style="font-size:13px;font-weight:600;margin:2px 0 0;color:#0f172a;">${
          esc(edu.degree) || "Diplôme"
        }</h3>
        ${
          school
            ? `<p style="font-size:11px;font-weight:500;margin:2px 0 0;color:#64748b;">${esc(
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
    }),
  ].join("");

  return `<div id="cv-preview" style="width:210mm;min-height:297mm;background:#fff;color:#1e293b;font-family:${SANS};">
    <header style="padding:40px 40px 0;">
      <h1 style="font-size:24px;font-weight:700;margin:0;color:#0f172a;">${esc(
        name
      )}</h1>
      ${
        data.personalInfo.jobTitle
          ? `<p style="font-size:14px;font-weight:500;margin:4px 0 0;color:${color};">${esc(
              data.personalInfo.jobTitle
            )}</p>`
          : ""
      }
      ${contact ? `<p style="font-size:11px;color:#64748b;margin:12px 0 0;">${esc(contact)}</p>` : ""}
    </header>
    <main style="padding:32px 40px 40px;">
      ${
        data.profile
          ? `<section style="margin:0 0 32px;">
              ${sectionHeading("Profil", color)}
              <p style="font-size:14px;line-height:1.6;color:#475569;margin:0;">${esc(
                data.profile
              )}</p>
            </section>`
          : ""
      }
      ${
        entries
          ? `<section style="margin:0 0 32px;">
              ${sectionHeading("Parcours", color)}
              <div style="border-left:2px solid ${color};padding-left:0;margin-left:5px;">${entries}</div>
            </section>`
          : ""
      }
      ${
        data.skills.length || data.languages.length
          ? `<div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin:0 0 24px;">
              ${
                data.skills.length
                  ? `<section>${sectionHeading(
                      "Compétences",
                      color
                    )}${skillCategoryList(data.skills, "#1e293b", "#475569")}</section>`
                  : ""
              }
              ${
                data.languages.length
                  ? `<section>${sectionHeading(
                      "Langues",
                      color
                    )}${inlineChips(data.languages.map((l) => l.name), color)}</section>`
                  : ""
              }
            </div>`
          : ""
      }
      ${hobbies(data, color)}
    </main>
  </div>`;
}

function creativeHtml(data: CvData): string {
  const color = data.theme.color;
  const name = fullName(data) || "Prénom Nom";
  const info = data.personalInfo;

  const experienceItems = data.experiences
    .map((exp) => {
      const dates = `${formatDate(exp.startDate)} – ${
        exp.current ? "Présent" : formatDate(exp.endDate)
      }`;
      const company = [exp.company, exp.location].filter(Boolean).join(" · ");
      return `<div style="background:#f8fafc;border-radius:12px;border-left:4px solid ${color};padding:16px;margin-bottom:16px;">
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
        ${exp.description ? bulletList(exp.description, "#475569") : ""}
      </div>`;
    })
    .join("");

  const educationItems = data.educations
    .map((edu) => {
      const dates = `${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}`;
      const school = [edu.school, edu.location].filter(Boolean).join(" · ");
      return `<div style="background:#f8fafc;border-radius:12px;border-left:4px solid #cbd5e1;padding:16px;margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline;">
          <h3 style="font-size:13px;font-weight:600;margin:0;color:#0f172a;">${
            esc(edu.degree) || "Diplôme"
          }</h3>
          <span style="font-size:11px;color:#94a3b8;white-space:nowrap;">${dates}</span>
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

  const languageChips = data.languages
    .map(
      (l) =>
        `<span style="display:inline-block;background:${color};color:#fff;border-radius:9999px;padding:4px 12px;font-size:11px;font-weight:500;white-space:nowrap;">${esc(
          l.name
        )}</span>`
    )
    .join("");
  const hobbyChips = data.hobbies
    .map(
      (h) =>
        `<span style="display:inline-block;border:1px solid ${color};color:#475569;border-radius:9999px;padding:4px 12px;font-size:11px;font-weight:500;white-space:nowrap;">${esc(
          h.name
        )}</span>`
    )
    .join("");

  return `<div id="cv-preview" style="width:210mm;min-height:297mm;background:#fff;color:#1e293b;font-family:${SANS};">
    <header style="display:flex;align-items:center;gap:32px;background:#0f172a;color:#fff;padding:32px 40px;">
      ${photoCircle(data, "96px", "border-radius:16px;border:4px solid rgba(255,255,255,0.2);flex-shrink:0;")}
      <div style="flex:1;">
        <h1 style="font-size:24px;font-weight:800;text-transform:uppercase;margin:0;">${esc(
          name
        )}</h1>
        ${
          info.jobTitle
            ? `<span style="display:inline-block;background:${color};color:#fff;border-radius:9999px;padding:2px 12px;font-size:11px;font-weight:600;margin-top:4px;">${esc(
                info.jobTitle
              )}</span>`
            : ""
        }
      </div>
      <div style="text-align:right;font-size:11px;color:#cbd5e1;">
        ${info.email ? `<p style="margin:0 0 4px;">${esc(info.email)}</p>` : ""}
        ${info.phone ? `<p style="margin:0 0 4px;">${esc(info.phone)}</p>` : ""}
        ${
          [info.address, info.postalCode, info.city].filter(Boolean).length
            ? `<p style="margin:0;">${esc(
                [info.address, info.postalCode, info.city]
                  .filter(Boolean)
                  .join(" ")
              )}</p>`
            : ""
        }
      </div>
    </header>
    <main style="padding:32px 40px;">
      ${
        data.profile
          ? `<section style="margin:0 0 28px;">
              ${sectionHeading("Profil", color)}
              <p style="font-size:14px;line-height:1.6;color:#475569;margin:0;">${esc(
                data.profile
              )}</p>
            </section>`
          : ""
      }
      ${
        data.experiences.length
          ? `<section style="margin:0 0 28px;">
              ${sectionHeading("Expérience professionnelle", color)}
              ${experienceItems}
            </section>`
          : ""
      }
      ${
        data.educations.length
          ? `<section style="margin:0 0 28px;">
              ${sectionHeading("Formation", color)}
              ${educationItems}
            </section>`
          : ""
      }
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;">
        ${
          data.skills.length
            ? `<section>
                ${sectionHeading("Compétences", color)}
                ${skillCategoryList(data.skills, "#1e293b", "#475569")}
              </section>`
            : ""
        }
        <div>
          ${
            data.languages.length
              ? `<section style="margin:0 0 28px;">
                  ${sectionHeading("Langues", color)}
                  <div style="display:flex;flex-wrap:wrap;gap:6px;">${languageChips}</div>
                </section>`
              : ""
          }
          ${
            data.hobbies.length
              ? `<section>
                  ${sectionHeading("Loisirs", color)}
                  <div style="display:flex;flex-wrap:wrap;gap:6px;">${hobbyChips}</div>
                </section>`
              : ""
          }
        </div>
      </div>
    </main>
  </div>`;
}

function twocolHtml(data: CvData): string {
  const color = data.theme.color;
  const info = data.personalInfo;
  const name = fullName(data) || "Prénom Nom";
  const address = [info.address, info.postalCode, info.city]
    .filter(Boolean)
    .join(" ");

  return `<div id="cv-preview" style="display:flex;width:210mm;min-height:297mm;background:#fff;color:#1e293b;font-family:${SANS};">
    <main style="flex:1;padding:36px 40px;">
      <header style="margin:0 0 28px;">
        <h1 style="font-size:24px;font-weight:700;margin:0;color:#0f172a;">${esc(
          name
        )}</h1>
        ${
          info.jobTitle
            ? `<p style="font-size:14px;font-weight:500;margin:4px 0 0;color:${color};">${esc(
                info.jobTitle
              )}</p>`
            : ""
        }
      </header>
      ${
        data.profile
          ? `<section style="margin:0 0 28px;">
              ${sectionHeading("Profil", color)}
              <p style="font-size:14px;line-height:1.6;color:#475569;margin:0;">${esc(
                data.profile
              )}</p>
            </section>`
          : ""
      }
      ${experienceBlock(data, color)}
      ${educationBlock(data, color)}
    </main>
    <aside style="width:62mm;flex-shrink:0;background:#f8fafc;border-left:1px solid #f1f5f9;padding:36px 24px;">
      <div style="margin:0 0 28px;">
        ${sectionHeading("Contact", color)}
        <div style="font-size:11px;color:#475569;">
          ${info.email ? `<p style="margin:0 0 4px;word-break:break-all;">${esc(info.email)}</p>` : ""}
          ${info.phone ? `<p style="margin:0 0 4px;">${esc(info.phone)}</p>` : ""}
          ${address ? `<p style="margin:0;">${esc(address)}</p>` : ""}
        </div>
      </div>
      ${
        data.skills.length
          ? `<div style="margin:0 0 28px;">
              ${sectionHeading("Compétences", color)}
              ${skillCategoryList(data.skills, "#1e293b", "#475569")}
            </div>`
          : ""
      }
      ${
        data.languages.length
          ? `<div style="margin:0 0 28px;">
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
            </div>`
          : ""
      }
      ${
        data.hobbies.length
          ? `<div>
              ${sectionHeading("Loisirs", color)}
              <p style="font-size:13px;color:#475569;margin:0;">${esc(
                data.hobbies.map((h) => h.name).filter(Boolean).join(", ")
              )}</p>
            </div>`
          : ""
      }
    </aside>
  </div>`;
}

function airyHtml(data: CvData): string {
  const color = data.theme.color;
  const name = fullName(data) || "Prénom Nom";
  const contact = contactLine(data);
  const title = data.personalInfo.jobTitle || "Curriculum Vitae";

  const experienceItems = data.experiences
    .map((exp) => {
      const dates = `${formatDate(exp.startDate)} – ${
        exp.current ? "Présent" : formatDate(exp.endDate)
      }`;
      const company = [exp.company, exp.location].filter(Boolean).join(" · ");
      return `<div style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline;">
          <h3 style="font-size:15px;font-weight:500;margin:0;color:#0f172a;">${
            esc(exp.title) || "Intitulé du poste"
          }</h3>
          <span style="font-size:11px;color:#94a3b8;white-space:nowrap;">${dates}</span>
        </div>
        ${
          company
            ? `<p style="font-size:10px;text-transform:uppercase;letter-spacing:0.1em;margin:2px 0 0;color:#94a3b8;">${esc(
                company
              )}</p>`
            : ""
        }
        ${exp.description ? bulletList(exp.description, "#64748b") : ""}
      </div>`;
    })
    .join("");

  const educationItems = data.educations
    .map((edu) => {
      const dates = `${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}`;
      const school = [edu.school, edu.location].filter(Boolean).join(" · ");
      return `<div style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline;">
          <h3 style="font-size:15px;font-weight:500;margin:0;color:#0f172a;">${
            esc(edu.degree) || "Diplôme"
          }</h3>
          <span style="font-size:11px;color:#94a3b8;white-space:nowrap;">${dates}</span>
        </div>
        ${
          school
            ? `<p style="font-size:10px;text-transform:uppercase;letter-spacing:0.1em;margin:2px 0 0;color:#94a3b8;">${esc(
                school
              )}</p>`
            : ""
        }
        ${
          edu.description
            ? `<p style="font-size:12px;margin:4px 0 0;color:#64748b;white-space:pre-line;">${esc(
                edu.description
              )}</p>`
            : ""
        }
      </div>`;
    })
    .join("");

  return `<div id="cv-preview" style="width:210mm;min-height:297mm;background:#fff;color:#475569;font-family:${SANS};">
    <header style="padding:56px 64px 32px;">
      <p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.35em;margin:0 0 8px;color:${color};">${esc(
    title
  )}</p>
      <h1 style="font-size:30px;font-weight:300;text-transform:uppercase;letter-spacing:0.2em;margin:0;color:#0f172a;">${esc(
        name
      )}</h1>
      ${contact ? `<p style="font-size:11px;color:#94a3b8;margin:20px 0 0;">${esc(contact)}</p>` : ""}
    </header>
    <div style="margin:0 64px;border-top:1px solid #e2e8f0;"></div>
    <main style="padding:40px 64px;">
      ${
        data.profile
          ? `<section style="margin:0 0 40px;">
              ${sectionHeading("Profil", color, "0.3em")}
              <p style="font-size:13px;line-height:1.9;color:#64748b;margin:0;">${esc(
                data.profile
              )}</p>
            </section>`
          : ""
      }
      ${
        data.experiences.length
          ? `<section style="margin:0 0 40px;">
              ${sectionHeading("Expérience professionnelle", color, "0.3em")}
              ${experienceItems}
            </section>`
          : ""
      }
      ${
        data.educations.length
          ? `<section style="margin:0 0 40px;">
              ${sectionHeading("Formation", color, "0.3em")}
              ${educationItems}
            </section>`
          : ""
      }
      ${
        data.skills.length || data.languages.length
          ? `<div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;margin:0 0 40px;">
              ${
                data.skills.length
                  ? `<section>${sectionHeading(
                      "Compétences",
                      color,
                      "0.3em"
                    )}${skillCategoryList(data.skills, "#1e293b", "#475569")}</section>`
                  : ""
              }
              ${
                data.languages.length
                  ? `<section>${sectionHeading(
                      "Langues",
                      color,
                      "0.3em"
                    )}${inlineChips(data.languages.map((l) => l.name), color, "4px")}</section>`
                  : ""
              }
            </div>`
          : ""
      }
      ${
        data.hobbies.length
          ? `<section>
              ${sectionHeading("Loisirs", color, "0.3em")}
              <p style="font-size:13px;color:#64748b;margin:0;">${esc(
                data.hobbies.map((h) => h.name).filter(Boolean).join(", ")
              )}</p>
            </section>`
          : ""
      }
    </main>
  </div>`;
}

export function buildPdfHtml(data: CvData): string {
  const body =
    data.theme.template === "classic"
      ? classicHtml(data)
      : data.theme.template === "minimal"
        ? minimalHtml(data)
        : data.theme.template === "modern"
          ? modernHtml(data)
          : data.theme.template === "teal"
            ? tealHtml(data)
            : data.theme.template === "chrono"
              ? chronoHtml(data)
              : data.theme.template === "functional"
                ? functionalHtml(data)
                : data.theme.template === "timeline"
                  ? timelineHtml(data)
                  : data.theme.template === "creative"
                    ? creativeHtml(data)
                    : data.theme.template === "twocol"
                      ? twocolHtml(data)
                      : data.theme.template === "airy"
                        ? airyHtml(data)
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
