import { CvData } from "../../cv/types";

function esc(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function nl2br(value: string): string {
  return esc(value).replaceAll("\n", "<br/>");
}

function formatLetterDate(value: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return esc(value);
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export function buildLetterHtml(data: CvData): string {
  const info = data.personalInfo;
  const letter = data.letter;
  const color = data.theme.color;
  const fullName = esc([info.firstName, info.lastName].filter(Boolean).join(" ")) || "Prénom Nom";
  const senderAddress = [info.address, [info.postalCode, info.city].filter(Boolean).join(" ")]
    .filter(Boolean)
    .map(esc)
    .join("<br/>");
  const dateLine = esc([info.city, formatLetterDate(letter.date)].filter(Boolean).join(", le "));

  const modern = letter.template === "modern";

  const header = modern
    ? `<div style="background:${color};color:#fff;padding:40px 64px;">
        <h1 style="margin:0;font-size:22px;font-weight:700;">${fullName}</h1>
        ${info.jobTitle ? `<p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.9);">${esc(info.jobTitle)}</p>` : ""}
        <p style="margin:12px 0 0;font-size:11px;color:rgba(255,255,255,0.8);">${[senderAddress ? senderAddress.replaceAll("<br/>", " · ") : "", esc(info.email), esc(info.phone)].filter(Boolean).join("  ·  ")}</p>
      </div>`
    : `<div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div style="line-height:1.6;">
          <p style="margin:0;font-weight:600;color:#0f172a;">${fullName}</p>
          ${senderAddress ? `<p style="margin:0;color:#64748b;">${senderAddress}</p>` : ""}
          ${info.email ? `<p style="margin:0;color:#64748b;">${esc(info.email)}</p>` : ""}
          ${info.phone ? `<p style="margin:0;color:#64748b;">${esc(info.phone)}</p>` : ""}
        </div>
        <div style="text-align:right;line-height:1.6;">
          ${letter.recipientName ? `<p style="margin:0;font-weight:500;color:#0f172a;">${esc(letter.recipientName)}</p>` : ""}
          ${letter.recipientCompany ? `<p style="margin:0;color:#64748b;">${esc(letter.recipientCompany)}</p>` : ""}
          ${letter.recipientAddress ? `<p style="margin:0;color:#64748b;">${nl2br(letter.recipientAddress)}</p>` : ""}
        </div>
      </div>
      <p style="margin-top:40px;text-align:right;color:#64748b;">${dateLine}</p>`;

  const body = `
    ${
      modern
        ? `<div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <div style="line-height:1.6;">
              ${letter.recipientName ? `<p style="margin:0;font-weight:500;color:#0f172a;">${esc(letter.recipientName)}</p>` : ""}
              ${letter.recipientCompany ? `<p style="margin:0;color:#64748b;">${esc(letter.recipientCompany)}</p>` : ""}
              ${letter.recipientAddress ? `<p style="margin:0;color:#64748b;">${nl2br(letter.recipientAddress)}</p>` : ""}
            </div>
            <p style="white-space:nowrap;color:#94a3b8;">${dateLine}</p>
          </div>`
        : ""
    }
    ${
      letter.subject
        ? modern
          ? `<p style="margin-top:32px;display:inline-block;padding:6px 16px;border-radius:9999px;background:${color};color:#fff;font-size:11px;font-weight:600;">${esc(letter.subject)}</p>`
          : `<p style="margin-top:32px;font-weight:600;color:${color};">Objet : ${esc(letter.subject)}</p>`
        : ""
    }
    <div style="margin-top:24px;line-height:1.7;color:#334155;">
      ${nl2br(letter.body) || "Rédigez ici le contenu de votre lettre de motivation..."}
    </div>
    <p style="margin-top:32px;line-height:1.7;color:#334155;">${nl2br(letter.closing)}</p>
    <p style="margin-top:40px;${modern ? `font-weight:600;color:${color};` : "text-align:right;font-weight:500;color:#0f172a;"}">${fullName}</p>
  `;

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; overflow-wrap: break-word; word-break: break-word; }
  body { margin: 0; font-family: 'Arial', 'Helvetica', sans-serif; font-size: 13px; color: #1e293b; }
  @page { size: A4; margin: 0; }
</style>
</head>
<body>
  <div style="width:210mm;min-height:297mm;background:#fff;${modern ? "" : "padding:56px 64px;"}display:flex;flex-direction:column;">
    ${header}
    <div style="${modern ? "padding:40px 64px;" : ""}flex:1;display:flex;flex-direction:column;">
      ${body}
    </div>
  </div>
</body>
</html>`;
}
