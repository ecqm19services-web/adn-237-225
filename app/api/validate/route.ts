import { NextRequest, NextResponse } from "next/server";
import { appwriteConfig, ensureAppwriteConfig, getAppwrite, newId } from "@/lib/appwrite";
import { Query } from "node-appwrite";

export const VALIDATION_QUESTIONS = [
  {
    id: "v1",
    text: "Cette personne est-elle quelqu'un de fiable ?",
    options: [
      { value: 4, label: "Très fiable, toujours là 💯" },
      { value: 3, label: "Généralement fiable" },
      { value: 2, label: "Parfois fiable" },
      { value: 1, label: "Pas vraiment fiable" },
    ],
  },
  {
    id: "v2",
    text: "Comment décris-tu son énergie sociale ?",
    options: [
      { value: 4, label: "Très sociable, âme de la fête 🎉" },
      { value: 3, label: "Sociable mais sélectif" },
      { value: 2, label: "Plutôt réservé" },
      { value: 1, label: "Très introverti" },
    ],
  },
  {
    id: "v3",
    text: "Quel est son rapport à la culture africaine ?",
    options: [
      { value: 4, label: "Très attaché à ses racines 🌍" },
      { value: 3, label: "Attaché mais ouvert à d'autres cultures" },
      { value: 2, label: "Peu attaché, plutôt cosmopolite" },
      { value: 1, label: "Pas vraiment intéressé par la culture" },
    ],
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resultId, validatorSessionId, answers } = body;

    if (!resultId || !validatorSessionId || !answers) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    ensureAppwriteConfig();
    const { db } = getAppwrite();

    const existing = await db.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.validations,
      [Query.equal("result_id", resultId), Query.equal("validator_session", validatorSessionId)]
    );

    if (existing.total > 0) {
      return NextResponse.json({ error: "Already validated" }, { status: 409 });
    }

    await db.createDocument(appwriteConfig.databaseId, appwriteConfig.collections.validations, newId(), {
      result_id: resultId,
      validator_session: validatorSessionId,
      answers: JSON.stringify(answers),
    });

    const validations = await db.listDocuments(appwriteConfig.databaseId, appwriteConfig.collections.validations, [
      Query.equal("result_id", resultId),
    ]);

    const count = validations.total || 0;

    if (count >= 2) {
      const avgAnswers: Record<string, number> = {};
      VALIDATION_QUESTIONS.forEach((q) => {
        const vals = validations.documents.map((v) => {
          const ans = JSON.parse((v as any).answers || "{}");
          return ans[q.id] || 0;
        });
        avgAnswers[q.id] = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
      });

      const socialScore = Math.round(
        (Object.values(avgAnswers).reduce((a, b) => a + b, 0) /
          (VALIDATION_QUESTIONS.length * 4)) *
          100
      );

      await db.updateDocument(appwriteConfig.databaseId, appwriteConfig.collections.results, resultId, {
        social_score: socialScore,
        premium: true,
      });
    }

    return NextResponse.json({ success: true, validationCount: count });
  } catch (err) {
    console.error("Validate API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const resultId = searchParams.get("resultId");

  if (!resultId) {
    return NextResponse.json({ error: "Missing resultId" }, { status: 400 });
  }

  ensureAppwriteConfig();
  const { db } = getAppwrite();
  const list = await db.listDocuments(appwriteConfig.databaseId, appwriteConfig.collections.validations, [
    Query.equal("result_id", resultId),
  ]);

  return NextResponse.json({ count: list.total || 0, validations: list.documents });
}
