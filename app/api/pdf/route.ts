import { NextRequest, NextResponse } from "next/server";
import { buildPdfHtml } from "./cvHtml";
import { emptyCvData } from "../../cv/types";

export const runtime = "nodejs";
export const maxDuration = 30;

const isProduction = process.env.NODE_ENV === "production" || !!process.env.VERCEL;

async function launchBrowser() {
  if (isProduction) {
    const chromium = (await import("@sparticuz/chromium")).default;
    const puppeteerCore = await import("puppeteer-core");
    return puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }

  const puppeteer = await import("puppeteer");
  return puppeteer.launch({ headless: true });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = { ...emptyCvData, ...body };
  const html = buildPdfHtml(data);

  const browser = await launchBrowser();
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
