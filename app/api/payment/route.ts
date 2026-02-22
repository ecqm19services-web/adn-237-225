import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, email, name, plan } = body;

    if (!email || !plan) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const amount = plan === "quarterly" ? 1000 : 3500;
    const currency = "XOF";

    const cinetpayPayload = {
      apikey: process.env.CINETPAY_API_KEY,
      site_id: process.env.CINETPAY_SITE_ID,
      transaction_id: `ADN_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      amount,
      currency,
      description: `ADN_237_225 Premium — ${plan === "quarterly" ? "Trimestriel" : "Annuel"}`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/notify`,
      customer_email: email,
      customer_name: name || email,
      channels: "ALL",
      metadata: JSON.stringify({ userId, plan }),
    };

    const res = await fetch("https://api-checkout.cinetpay.com/v2/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cinetpayPayload),
    });

    const data = await res.json();

    if (data.code !== "201") {
      console.error("CinetPay error:", data);
      return NextResponse.json(
        { error: "Payment initialization failed", details: data.message },
        { status: 500 }
      );
    }

    await supabaseAdmin.from("payment_logs").insert({
      user_id: userId || null,
      email,
      transaction_id: cinetpayPayload.transaction_id,
      amount,
      currency,
      plan,
      status: "pending",
      provider: "cinetpay",
    });

    return NextResponse.json({
      paymentUrl: data.data.payment_url,
      transactionId: cinetpayPayload.transaction_id,
    });
  } catch (err) {
    console.error("Payment API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
