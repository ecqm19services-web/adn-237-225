import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cpm_trans_id, cpm_site_id, cpm_amount, cpm_currency, cpm_payid, cpm_payment_date, cpm_payment_time, cpm_error_message, cpm_result, payment_method, cel_phone_num } = body;

    if (cpm_result !== "00") {
      await supabaseAdmin
        .from("payment_logs")
        .update({ status: "failed", provider_ref: cpm_payid, error: cpm_error_message })
        .eq("transaction_id", cpm_trans_id);
      return NextResponse.json({ message: "Payment failed recorded" });
    }

    const { data: log } = await supabaseAdmin
      .from("payment_logs")
      .select("*")
      .eq("transaction_id", cpm_trans_id)
      .single();

    if (!log) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    await supabaseAdmin
      .from("payment_logs")
      .update({
        status: "completed",
        provider_ref: cpm_payid,
        payment_method,
        phone: cel_phone_num || null,
        paid_at: `${cpm_payment_date} ${cpm_payment_time}`,
      })
      .eq("transaction_id", cpm_trans_id);

    if (log.user_id) {
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + (log.plan === "annual" ? 12 : 3));

      await supabaseAdmin
        .from("profiles")
        .update({ tier: "pro", premium_expires_at: expiresAt.toISOString() })
        .eq("id", log.user_id);
    } else if (log.email) {
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + (log.plan === "annual" ? 12 : 3));

      const { data: existing } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("email", log.email)
        .single();

      if (existing) {
        await supabaseAdmin
          .from("profiles")
          .update({ tier: "pro", premium_expires_at: expiresAt.toISOString() })
          .eq("email", log.email);
      }
    }

    return NextResponse.json({ message: "OK" });
  } catch (err) {
    console.error("Payment notify error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
