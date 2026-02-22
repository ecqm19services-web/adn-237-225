"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { VALIDATION_QUESTIONS } from "@/app/api/validate/route";

export default function ValidatePage() {
  const params = useParams();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [validatorSession] = useState(
    () => `val_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  );

  async function handleSubmit() {
    if (Object.keys(answers).length < VALIDATION_QUESTIONS.length) {
      setError("Réponds à toutes les questions avant de valider.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resultId: params.resultId,
          validatorSessionId: validatorSession,
          answers,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setDone(true);
      } else {
        setError(data.error || "Erreur lors de la validation.");
      }
    } catch {
      setError("Erreur réseau. Réessaie.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="card p-10 text-center max-w-md w-full">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-black mb-3">Merci pour ta validation !</h1>
          <p className="text-gray-400 mb-6">
            Ton ami recevra son badge premium consolidé dans les 24h. Tu es un vrai ami 🙌
          </p>
          <Link href="/quiz" className="btn-primary inline-block">
            🧬 Faire mon propre test
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a3a]">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧬</span>
          <span className="font-bold text-gradient">ADN_237_225</span>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🤝</div>
          <h1 className="text-2xl font-black mb-2">Valide l&apos;ADN de ton ami</h1>
          <p className="text-gray-400 text-sm">
            Réponds à 3 questions sur cette personne. Tes réponses sont anonymes et aideront à consolider son badge premium.
          </p>
        </div>

        <div className="space-y-6">
          {VALIDATION_QUESTIONS.map((q, idx) => (
            <div key={q.id} className="card p-5 slide-up">
              <p className="font-bold mb-4 text-sm">
                <span className="text-[#FF6B35] mr-2">{idx + 1}.</span>
                {q.text}
              </p>
              <div className="space-y-2">
                {q.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.value }))}
                    className={`option-card ${answers[q.id] === opt.value ? "selected" : ""}`}
                  >
                    <span className="text-sm">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center mt-4">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting || Object.keys(answers).length < VALIDATION_QUESTIONS.length}
          className="btn-primary w-full mt-8 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? "Envoi en cours..." : "Valider l'ADN de mon ami 🚀"}
        </button>

        <p className="text-xs text-gray-600 text-center mt-4">
          Tes réponses sont anonymes. ADN_237_225 est un test de divertissement, pas un diagnostic.
        </p>
      </div>
    </main>
  );
}
