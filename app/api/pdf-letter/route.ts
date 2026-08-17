import { NextRequest, NextResponse } from "next/server";
import { buildLetterHtml } from "../pdf/letterHtml";
import { launchBrowser } from "../pdf/browser";
import { emptyCvData } from "../../cv/types";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = { ...emptyCvData, ...body };
  const html = buildLetterHtml(data);

  let browser;
  try {
    browser = await launchBrowser();
  } catch (error) {
    console.error("[letter-pdf] Échec du lancement du navigateur :", error);
    return NextResponse.json(
      { error: "Impossible de lancer le navigateur pour générer le PDF.", details: String(error) },
      { status: 500 },
    );
  }

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMediaType("print");

    const pdf = await page.pdf({
      format: "a4",
      printBackground: true,
      margin: { top: "0", bottom: "0", left: "0", right: "0" },
    });

    if (!pdf || pdf.length === 0) {
      throw new Error("PDF generation returned an empty document");
    }

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("[letter-pdf] Échec de la génération du PDF :", error);
    return NextResponse.json(
      { error: "Échec de la génération du PDF.", details: String(error) },
      { status: 500 },
    );
  } finally {
    await browser.close();
  }
}
