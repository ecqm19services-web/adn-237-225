"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function ResultsRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("sessionId");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      router.push("/quiz");
      return;
    }
    fetch(`/api/results?sessionId=${sessionId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.result?.id) {
          router.replace(`/results/${d.result.id}`);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, [sessionId, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Résultat introuvable</p>
          <a href="/quiz" className="btn-primary">Refaire le test</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4 float inline-block">🧬</div>
        <p className="text-gray-400">Chargement de tes résultats...</p>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-5xl float inline-block">🧬</div>
      </div>
    }>
      <ResultsRedirect />
    </Suspense>
  );
}
