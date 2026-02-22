import { NextRequest, NextResponse } from "next/server";
import { calculateScore } from "@/lib/questions";
import { generateProfileInterpretation, generateShareHook } from "@/lib/ai-router";
import { ensureAppwriteConfig, getAppwrite, appwriteConfig, newId } from "@/lib/appwrite";
import { Query } from "node-appwrite";

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

    ensureAppwriteConfig();
    const { db } = getAppwrite();
    const doc = await db.createDocument(appwriteConfig.databaseId, appwriteConfig.collections.results, newId(), {
      session_id: sessionId,
      email: email || null,
      score: total,
      badge,
      badge_color: badgeColor,
      data: JSON.stringify({
        categories,
        description,
        ai_interpretation: aiInterpretation,
        share_hook: shareHook,
        name: name || null,
        user_id: userId || null,
      }),
      social_score: 0,
      premium: false,
    });

    return NextResponse.json({ result: doc });
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

  ensureAppwriteConfig();
  const { db } = getAppwrite();
  const queries = resultId ? [Query.equal("$id", resultId)] : [Query.equal("session_id", sessionId!)];
  const list = await db.listDocuments(appwriteConfig.databaseId, appwriteConfig.collections.results, queries);
  const doc = list.documents[0];
  if (!doc) {
    return NextResponse.json({ error: "Result not found" }, { status: 404 });
  }

  const data = JSON.parse((doc as any).data || "{}");
  const result = {
    id: doc.$id,
    session_id: (doc as any).session_id,
    email: (doc as any).email,
    score: (doc as any).score,
    badge: (doc as any).badge,
    badge_color: (doc as any).badge_color,
    social_score: (doc as any).social_score,
    premium_badge_unlocked: (doc as any).premium,
    ...data,
  };

  return NextResponse.json({ result });
}
