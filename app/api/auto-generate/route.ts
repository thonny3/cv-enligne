import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";
export const maxDuration = 60;

const client = new Anthropic();

const CV_SCHEMA = {
  type: "object",
  properties: {
    jobTitle: { type: "string", description: "Intitulé de poste à afficher sous le nom" },
    profile: { type: "string", description: "Résumé de profil professionnel, 3-4 phrases" },
    experiences: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          company: { type: "string" },
          location: { type: "string" },
          startDate: { type: "string", description: "Format AAAA-MM, vide si inconnu" },
          endDate: { type: "string", description: "Format AAAA-MM, vide si poste actuel ou inconnu" },
          current: { type: "boolean" },
          description: { type: "string", description: "2 à 4 puces séparées par des sauts de ligne" },
        },
        required: ["title", "company", "location", "startDate", "endDate", "current", "description"],
        additionalProperties: false,
      },
    },
    educations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          degree: { type: "string" },
          school: { type: "string" },
          location: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },
          description: { type: "string" },
        },
        required: ["degree", "school", "location", "startDate", "endDate", "description"],
        additionalProperties: false,
      },
    },
    skills: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          level: { type: "integer", description: "Niveau de 1 (débutant) à 5 (expert)" },
        },
        required: ["name", "level"],
        additionalProperties: false,
      },
    },
    languages: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          level: { type: "integer", description: "Niveau de 1 (débutant) à 5 (courant)" },
        },
        required: ["name", "level"],
        additionalProperties: false,
      },
    },
    coverLetter: {
      type: "string",
      description: "Lettre de motivation complète adaptée à l'offre d'emploi, en français, prête à être envoyée",
    },
  },
  required: ["jobTitle", "profile", "experiences", "educations", "skills", "languages", "coverLetter"],
  additionalProperties: false,
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const jobOffer = typeof body.jobOffer === "string" ? body.jobOffer.trim() : "";
  const rawInfo = typeof body.rawInfo === "string" ? body.rawInfo.trim() : "";
  const candidateName = typeof body.candidateName === "string" ? body.candidateName.trim() : "";

  if (!rawInfo) {
    return NextResponse.json(
      { error: "Merci de renseigner vos informations (expériences, formation, compétences...)." },
      { status: 400 },
    );
  }

  try {
    const response = await client.messages.parse({
      model: "claude-opus-5",
      max_tokens: 4096,
      system:
        "Tu es un expert RH francophone. À partir des informations brutes fournies par un candidat et, si disponible, d'une offre d'emploi, tu structures un CV complet et tu rédiges une lettre de motivation adaptée à l'offre. N'invente aucun fait (dates, entreprises, diplômes) : reformule et structure uniquement ce que le candidat a fourni. Si une information manque, laisse le champ vide plutôt que d'inventer.",
      messages: [
        {
          role: "user",
          content: [
            candidateName && `Nom du candidat : ${candidateName}`,
            jobOffer ? `Offre d'emploi visée :\n${jobOffer}` : "Aucune offre d'emploi précise n'a été fournie : rédige une lettre de motivation générique adaptée au profil.",
            `Informations brutes du candidat (expériences, formation, compétences, langues...) :\n${rawInfo}`,
          ]
            .filter(Boolean)
            .join("\n\n"),
        },
      ],
      output_config: { format: { type: "json_schema", schema: CV_SCHEMA } },
    });

    const result = response.parsed_output;
    if (!result) {
      return NextResponse.json({ error: "La génération n'a pas produit de résultat exploitable." }, { status: 502 });
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("[auto-generate] Échec de la génération :", error);
    return NextResponse.json(
      { error: "Échec de la génération automatique.", details: String(error) },
      { status: 500 },
    );
  }
}
