"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/lib/questions";

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sessionId] = useState(() => `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`);

  const question = QUESTIONS[currentIndex];
  const progress = ((currentIndex) / QUESTIONS.length) * 100;
  const isLast = currentIndex === QUESTIONS.length - 1;

  useEffect(() => {
    setSelected(answers[question.id] ?? null);
  }, [currentIndex, answers, question.id]);

  function handleSelect(value: number) {
    setSelected(value);
  }

  async function handleNext() {
    if (selected === null) return;

    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);

    if (isLast) {
      setSubmitting(true);
      try {
        const res = await fetch("/api/results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: newAnswers, sessionId }),
        });
        const data = await res.json();
        if (data.result?.id) {
          router.push(`/results/${data.result.id}`);
        } else {
          router.push(`/results?sessionId=${sessionId}`);
        }
      } catch {
        router.push(`/results?sessionId=${sessionId}`);
      }
      return;
    }

    setCurrentIndex((i) => i + 1);
  }

  function handleBack() {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }

  const categoryColors: Record<string, string> = {
    mindset: "#FF6B35",
    style: "#FFD700",
    social: "#4CAF50",
    energy: "#9C27B0",
  };

  const categoryLabels: Record<string, string> = {
    mindset: "Mindset",
    style: "Style",
    social: "Social",
    energy: "Énergie",
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#2a2a3a] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧬</span>
          <span className="font-bold text-gradient">ADN_237_225</span>
        </div>
        <div className="text-sm text-gray-400">
          {currentIndex + 1} / {QUESTIONS.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-[#2a2a3a]">
        <div
          className="progress-bar h-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Quiz content */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl slide-up">
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-6">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{
                background: `${categoryColors[question.category]}20`,
                color: categoryColors[question.category],
                border: `1px solid ${categoryColors[question.category]}40`,
              }}
            >
              {categoryLabels[question.category]}
            </span>
            <span className="text-xs text-gray-500">Question {currentIndex + 1}</span>
          </div>

          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-snug">
            {question.text}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-10">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`option-card ${selected === opt.value ? "selected" : ""}`}
              >
                <span className="text-base">{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Retour
            </button>

            <button
              onClick={handleNext}
              disabled={selected === null || submitting}
              className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting
                ? "Calcul en cours... 🧬"
                : isLast
                ? "Voir mon ADN 🚀"
                : "Suivant →"}
            </button>
          </div>
        </div>
      </div>

      {/* Question dots */}
      <div className="px-6 py-4 flex justify-center gap-1.5 flex-wrap">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              background:
                i < currentIndex
                  ? "#FF6B35"
                  : i === currentIndex
                  ? "#FFD700"
                  : "#2a2a3a",
            }}
          />
        ))}
      </div>
    </main>
  );
}
