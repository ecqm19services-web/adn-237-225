import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { appwriteConfig, ensureAppwriteConfig, getAppwrite, newId } from "@/lib/appwrite";
import { Query } from "node-appwrite";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { inviterId, inviteeEmails, resultId } = body;

    if (!inviterId || !inviteeEmails || !Array.isArray(inviteeEmails)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const referrals = inviteeEmails.slice(0, 2).map((email: string) => ({
      id: nanoid(),
      inviter_id: inviterId,
      invitee_email: email.toLowerCase().trim(),
      result_id: resultId || null,
      status: "pending",
    }));

    ensureAppwriteConfig();
    const { db } = getAppwrite();

    await Promise.all(
      referrals.map((r) =>
        db.createDocument(appwriteConfig.databaseId, appwriteConfig.collections.referrals, newId(), {
          inviter_id: r.inviter_id,
          invitee_email: r.invitee_email,
          invitee_session_id: r.result_id || null,
          result_id: r.result_id || null,
          status: r.status,
        })
      )
    );

    return NextResponse.json({ success: true, count: referrals.length });
  } catch (err) {
    console.error("Referral API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const inviterId = searchParams.get("inviterId");

  if (!inviterId) {
    return NextResponse.json({ error: "Missing inviterId" }, { status: 400 });
  }

  ensureAppwriteConfig();
  const { db } = getAppwrite();
  const list = await db.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.collections.referrals,
    [Query.equal("inviter_id", inviterId), Query.orderDesc("$createdAt")]
  );

  const completed = (list.documents || []).filter((r) => r.status === "completed").length;
  return NextResponse.json({ referrals: list.documents, completedCount: completed });
}
