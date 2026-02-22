import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { nanoid } from "nanoid";

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

    const { error } = await supabaseAdmin.from("referrals").insert(referrals);

    if (error) {
      console.error("Referral insert error:", error);
      return NextResponse.json({ error: "Failed to create referrals" }, { status: 500 });
    }

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

  const { data, error } = await supabaseAdmin
    .from("referrals")
    .select("*")
    .eq("inviter_id", inviterId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to fetch referrals" }, { status: 500 });
  }

  const completed = (data || []).filter((r) => r.status === "completed").length;
  return NextResponse.json({ referrals: data, completedCount: completed });
}
