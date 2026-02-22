"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { generateShareText, getWhatsAppShareUrl, getTwitterShareUrl } from "@/lib/utils";
import { BadgeCard } from "@/components/ui/badge-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ShareCard } from "@/components/ui/share-card";
import { Confetti } from "@/components/ui/confetti";
import { motion } from "framer-motion";

interface Result {
  id: string;
  score: number;
  categories: Record<string, number>;
  badge: string;
  badge_color: string;
  description: string;
  ai_interpretation: string | null;
  share_hook: string | null;
  social_score?: number;
  premium_badge_unlocked?: boolean;
}

const categoryLabels: Record<string, string> = {
  mindset: "Mindset 🧠",
  style: "Style 👗",
  social: "Social 🤝",
  energy: "Énergie 🔥",
};

function ScoreRing({ score }: { score: number }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="120" height="120" className="-rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#2a2a3a" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#FF6B35"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.5s ease" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-black text-gradient">{score}</div>
        <div className="text-xs text-gray-400">/100</div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInvite, setShowInvite] = useState(false);
  const [emails, setEmails] = useState(["", ""]);
  const [inviteSent, setInviteSent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    fetch(`/api/results?id=${params.id}`)
      .then((r) => r.json())
      .then((d) => {
        setResult(d.result);
        setLoading(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  async function handleSendInvites() {
    const validEmails = emails.filter((e) => e.includes("@"));
    if (validEmails.length < 1) return;

    await fetch("/api/referral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inviterId: params.id,
        inviteeEmails: validEmails,
        resultId: params.id,
      }),
    });
    setInviteSent(true);
  }


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 float inline-block">🧬</div>
          <p className="text-gray-400">Analyse de ton ADN culturel...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Résultat introuvable</p>
          <Link href="/quiz" className="btn-primary">Refaire le test</Link>
        </div>
      </div>
    );
  }

  const shareText = result.share_hook || generateShareText(result.score, result.badge);
  const whatsappUrl = getWhatsAppShareUrl(shareText);
  const twitterUrl = getTwitterShareUrl(shareText);

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a3a]">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧬</span>
          <span className="font-bold text-gradient">ADN_237_225</span>
        </div>
        <Link href="/quiz" className="btn-secondary text-sm py-2 px-4">
          Refaire le test
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {showConfetti && <Confetti />}
        {/* Badge hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <BadgeCard
          badge={result.badge}
          score={result.score}
          badgeColor={result.badge_color}
          description={result.description}
          size="large"
        />
      </motion.div>

        {/* AI Interpretation */}
        {result.ai_interpretation && result.ai_interpretation !== result.description && (
          <div className="card p-6 mb-6 slide-up border-[#FF6B35]/20">
            <div className="flex items-center gap-2 mb-3">
              <span> </span>
              <span className="text-sm font-bold text-[#FF6B35]">Analyse IA personnalisée</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{result.ai_interpretation}</p>
          </div>
        )}

        {/* Category breakdown */}
        <div className="card p-6 mb-6 slide-up">
          <h2 className="font-bold mb-4">Détail par dimension</h2>
          <div className="space-y-4">
            {Object.entries(result.categories).map(([cat, score]) => (
              <div key={cat}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{categoryLabels[cat] || cat}</span>
                  <span className="font-bold text-[#FF6B35]">{score}/100</span>
                </div>
                <div className="h-2 bg-[#2a2a3a] rounded-full overflow-hidden">
                  <div
                    className="progress-bar h-full"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social validation / premium badge */}
        {!result.premium_badge_unlocked && (
          <div className="card p-6 mb-6 border-[#FFD700]/30 slide-up">
            <div className="flex items-center gap-2 mb-3">
              <span> </span>
              <span className="font-bold text-[#FFD700]">Débloque ton Badge Premium</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Invite 2 amis à répondre 3 questions sur toi. Reçois ton badge final consolidé en 24h !
            </p>
            {!showInvite ? (
              <button onClick={() => setShowInvite(true)} className="btn-primary w-full">
                 Inviter 2 amis maintenant
              </button>
            ) : inviteSent ? (
              <div className="text-center py-4">
                <div className="text-3xl mb-2"> </div>
                <p className="text-green-400 font-bold">Invitations envoyées !</p>
                <p className="text-gray-400 text-sm mt-1">Tu recevras ton badge premium dans 24h.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {emails.map((email, i) => (
                  <input
                    key={i}
                    type="email"
                    placeholder={`Email de l'ami ${i + 1}`}
                    value={email}
                    onChange={(e) => {
                      const newEmails = [...emails];
                      newEmails[i] = e.target.value;
                      setEmails(newEmails);
                    }}
                    className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B35]"
                  />
                ))}
                <button onClick={handleSendInvites} className="btn-primary w-full">
                  Envoyer les invitations 
                </button>
              </div>
            )}
          </div>
        )}

        {result.premium_badge_unlocked && (
          <div className="card p-6 mb-6 border-[#FFD700]/50 bg-[#1a1500] slide-up">
            <div className="text-center">
              <div className="text-4xl mb-2"> </div>
              <h3 className="font-black text-[#FFD700] text-xl mb-1">Badge Premium Débloqué !</h3>
              {result.social_score !== undefined && (
                <p className="text-gray-300 text-sm">
                  Score social validé par tes amis : <strong className="text-[#FFD700]">{result.social_score}/100</strong>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Share */}
        <ShareCard shareText={shareText} whatsappUrl={whatsappUrl} twitterUrl={twitterUrl} />

        {/* Premium upsell */}
        <div className="card p-6 text-center slide-up border-[#FF6B35]/20">
          <h3 className="font-bold text-lg mb-2">Passe en Premium </h3>
          <p className="text-gray-400 text-sm mb-4">
            Historique de scores, comparaison par ville, badge QR, analyse détaillée — seulement <strong className="text-[#FF6B35]">1000 FCFA/trimestre</strong>
          </p>
          <Link href="/premium" className="btn-primary inline-block">
            Passer Premium maintenant
          </Link>
        </div>

        <div className="text-center mt-8">
          <Link href="/quiz" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
            Refaire le test →
          </Link>
        </div>
      </div>
    </main>
  );
}
