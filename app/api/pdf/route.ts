import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { buildPdfHtml } from "./cvHtml";
import { emptyCvData } from "../../cv/types";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = { ...emptyCvData, ...body };
  const html = buildPdfHtml(data);

  const browser = await puppeteer.launch({ headless: true });
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

    console.log(`[cv-pdf] Taille du PDF généré : ${(pdf.length / 1024).toFixed(1)} Ko (${pdf.length} octets)`);

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } finally {
    await browser.close();
  }
}
