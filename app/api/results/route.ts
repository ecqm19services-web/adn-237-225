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

  return NextResponse.json({ result: doc });
}
