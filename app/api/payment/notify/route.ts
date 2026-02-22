import { NextRequest, NextResponse } from "next/server";
import { appwriteConfig, ensureAppwriteConfig, getAppwrite } from "@/lib/appwrite";
import { Query } from "node-appwrite";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      transaction_id,
      status,
      provider_ref,
      payment_method,
      phone,
      paid_at,
    } = body;

    if (!transaction_id) {
      return NextResponse.json({ error: "Missing transaction_id" }, { status: 400 });
    }

    ensureAppwriteConfig();
    const { db } = getAppwrite();

    const list = await db.listDocuments(appwriteConfig.databaseId, appwriteConfig.collections.payments, [
      Query.equal("transaction_id", transaction_id),
    ]);
    const log = list.documents[0];

    if (!log) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    await db.updateDocument(appwriteConfig.databaseId, appwriteConfig.collections.payments, log.$id, {
      status: status || "completed",
      provider_ref: provider_ref || null,
      payment_method: payment_method || null,
      phone: phone || null,
      paid_at: paid_at || new Date().toISOString(),
    });

    return NextResponse.json({ message: "OK" });
  } catch (err) {
    console.error("Payment notify error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
