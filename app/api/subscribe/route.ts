import { Resend } from "resend";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const timestamp = new Date().toISOString();

    // 1. Save to Google Sheet
    const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK;
    if (sheetUrl) {
      await fetch(sheetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, date: timestamp }),
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
        text: `Someone wants to stay in touch.\n\nEmail: ${email}\nDate: ${timestamp}`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
