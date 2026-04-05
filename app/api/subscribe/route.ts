import { Resend } from "resend";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

function parseDevice(ua: string): string {
  if (/mobile|android|iphone|ipad/i.test(ua)) return "Mobile";
  if (/tablet/i.test(ua)) return "Tablet";
  return "Desktop";
}

function parseBrowser(ua: string): string {
  if (/edg\//i.test(ua)) return "Edge";
  if (/chrome/i.test(ua) && !/chromium/i.test(ua)) return "Chrome";
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return "Safari";
  if (/firefox/i.test(ua)) return "Firefox";
  return "Other";
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const h = headers();
    const timestamp = new Date().toISOString();
    const country = h.get("x-vercel-ip-country") || "Unknown";
    const city = h.get("x-vercel-ip-city") || "Unknown";
    const referrer = h.get("referer") || "Direct";
    const ua = h.get("user-agent") || "";
    const device = parseDevice(ua);
    const browser = parseBrowser(ua);

    const row = { email, date: timestamp, country, city, referrer, device, browser };

    // 1. Save to Google Sheet
    const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK;
    if (sheetUrl) {
      await fetch(sheetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row),
      }).catch(() => {});
    }

    // 2. Send notification email
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "Blooming <onboarding@resend.dev>",
        to: "hello@weareblooming.co",
        subject: `New subscriber: ${email}`,
        text: `New subscriber:\n\nEmail: ${email}\nDate: ${timestamp}\nLocation: ${city}, ${country}\nReferrer: ${referrer}\nDevice: ${device}\nBrowser: ${browser}`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
