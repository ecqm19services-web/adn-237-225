import { NextRequest, NextResponse } from "next/server";
import { appwriteConfig, ensureAppwriteConfig, getAppwrite, newId } from "@/lib/appwrite";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, email, name, plan } = body;

    if (!email || !plan) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const amount = plan === "quarterly" ? 1000 : 3500;
    const currency = "XOF";
    const waveUrl = process.env.WAVE_QR_URL || process.env.NEXT_PUBLIC_WAVE_QR_URL;
    const transactionId = `WAVE_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    if (!waveUrl) {
      return NextResponse.json({ error: "WAVE_QR_URL manquant" }, { status: 500 });
    }

    ensureAppwriteConfig();
    const { db } = getAppwrite();
    await db.createDocument(appwriteConfig.databaseId, appwriteConfig.collections.payments, newId(), {
      email,
      transaction_id: transactionId,
      amount,
      currency,
      plan,
      status: "pending",
      provider: "wave",
      meta: JSON.stringify({ userId, name }),
    });

    return NextResponse.json({
      paymentUrl: waveUrl,
      transactionId,
    });
  } catch (err) {
    console.error("Payment API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
