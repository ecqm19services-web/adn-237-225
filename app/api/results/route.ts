import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { calculateScore } from "@/lib/questions";
import { generateProfileInterpretation, generateShareHook } from "@/lib/ai-router";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { answers, sessionId, userId, email, name } = body;

    if (!answers || !sessionId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { total, categories, badge, badgeColor, description } = calculateScore(answers);

    const tier = userId ? "pro" : "free";

    let aiInterpretation: string | null = null;
    let shareHook: string | null = null;

    try {
      aiInterpretation = await generateProfileInterpretation(total, categories, badge, tier);
      shareHook = await generateShareHook(total, badge, tier);
    } catch {
      // AI optional — use fallback description
      aiInterpretation = description;
    }

    const { data: result, error } = await supabaseAdmin
      .from("test_results")
      .insert({
        user_id: userId || null,
        session_id: sessionId,
        score: total,
        categories,
        badge,
        badge_color: badgeColor,
        description,
        ai_interpretation: aiInterpretation,
        share_hook: shareHook,
        email: email || null,
        name: name || null,
      })
      .select()
      .single();

    if (error) {
      console.error("DB insert error:", error);
      return NextResponse.json({ error: "Failed to save result" }, { status: 500 });
    }

    return NextResponse.json({ result });
  } catch (err) {
    console.error("Results API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const resultId = searchParams.get("id");

  if (!sessionId && !resultId) {
    return NextResponse.json({ error: "Missing sessionId or id" }, { status: 400 });
  }

  const query = supabaseAdmin.from("test_results").select("*");

  if (resultId) {
    query.eq("id", resultId);
  } else {
    query.eq("session_id", sessionId!);
  }

  const { data, error } = await query.single();

  if (error || !data) {
    return NextResponse.json({ error: "Result not found" }, { status: 404 });
  }

  return NextResponse.json({ result: data });
}
