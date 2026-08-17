import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";

const client = new Anthropic();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const text = typeof body.text === "string" ? body.text.trim() : "";
  const context = typeof body.context === "string" ? body.context : "";

  if (!text) {
    return NextResponse.json({ error: "Le texte à améliorer est vide." }, { status: 400 });
  }

  try {
    const response = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 1024,
      system:
        "Tu améliores des textes de CV en français : plus clair, plus percutant, sans fautes, en gardant le sens et les faits d'origine. Ne rajoute pas d'informations inventées. Réponds uniquement avec le texte amélioré, sans introduction ni commentaire.",
      messages: [
        {
          role: "user",
          content: context
            ? `Contexte : ${context}\n\nTexte à améliorer :\n${text}`
            : `Texte à améliorer :\n${text}`,
        },
      ],
    });

    const improved = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    if (!improved) {
      return NextResponse.json({ error: "Aucune amélioration n'a été générée." }, { status: 502 });
    }

    return NextResponse.json({ text: improved });
  } catch (error) {
    console.error("[improve-text] Échec de l'appel à Claude :", error);
    return NextResponse.json(
      { error: "Échec de l'amélioration du texte.", details: String(error) },
      { status: 500 },
    );
  }
}
