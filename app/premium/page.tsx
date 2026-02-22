"use client";

import { useState } from "react";
import Link from "next/link";
import { QRModal } from "@/components/ui/qr-modal";
import { AnimatedButton } from "@/components/ui/animated-button";
import { motion } from "framer-motion";

const FEATURES_FREE = [
  "Score ADN global (0-100)",
  "Badge standard",
  "Partage sur réseaux sociaux",
  "Résultats par dimension",
];

const FEATURES_PREMIUM = [
  "Tout ce qui est gratuit",
  "Badge Premium + QR Code",
  "Analyse IA personnalisée approfondie",
  "Validation sociale par tes amis",
  "Historique de tous tes scores",
  "Comparaison par ville / pays",
  "Sans publicité",
  "Accès prioritaire aux nouvelles questions",
];

export default function PremiumPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [plan, setPlan] = useState<"quarterly" | "annual">("quarterly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");

  async function handleCheckout() {
    if (!email) {
      setError("Entre ton email pour continuer.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, plan }),
      });
      const data = await res.json();
      if (data.paymentUrl) {
        setPaymentUrl(data.paymentUrl);
        setShowQR(true);
      } else {
        setError(data.error || "Erreur lors de l'initialisation du paiement.");
      }
    } catch {
      setError("Erreur réseau. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a3a]">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🧬</span>
          <span className="font-bold text-gradient">ADN_237_225</span>
        </Link>
        <Link href="/quiz" className="btn-primary text-sm py-2 px-4">
          Faire le test
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#1a1500] border border-[#FFD700]/30 rounded-full px-4 py-2 text-sm text-[#FFD700] mb-6">
            <span>⭐</span>
            <span>Passe au niveau supérieur</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            ADN_237_225 <span className="text-gradient">Premium</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Débloque l&apos;analyse complète de ton ADN culturel, le badge premium avec QR code et la validation sociale par tes amis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Free */}
          <div className="card p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-1">Gratuit</h2>
              <div className="text-3xl font-black text-gray-400">0 FCFA</div>
            </div>
            <ul className="space-y-3 mb-6">
              {FEATURES_FREE.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-green-400">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/quiz" className="btn-secondary w-full text-center block">
              Commencer gratuitement
            </Link>
          </div>

          {/* Premium */}
          <div className="card p-6 border-[#FFD700]/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#FFD700] text-black text-xs font-black px-3 py-1 rounded-bl-xl">
              POPULAIRE
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-bold mb-1 text-[#FFD700]">Premium ⭐</h2>

              {/* Plan toggle */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setPlan("quarterly")}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                    plan === "quarterly"
                      ? "bg-[#FF6B35] text-white"
                      : "bg-[#1a1a2e] text-gray-400 border border-[#2a2a3a]"
                  }`}
                >
                  Trimestriel
                </button>
                <button
                  onClick={() => setPlan("annual")}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                    plan === "annual"
                      ? "bg-[#FF6B35] text-white"
                      : "bg-[#1a1a2e] text-gray-400 border border-[#2a2a3a]"
                  }`}
                >
                  Annuel (-12%)
                </button>
              </div>

              <div className="text-3xl font-black text-gradient">
                {plan === "quarterly" ? "1 000" : "3 500"} FCFA
              </div>
              <div className="text-sm text-gray-400">
                {plan === "quarterly" ? "par trimestre" : "par an (économise 500 FCFA)"}
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {FEATURES_PREMIUM.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-200">
                  <span className="text-[#FFD700]">★</span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Checkout form */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Ton prénom (optionnel)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B35] text-sm"
              />
              <input
                type="email"
                placeholder="Ton email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B35] text-sm"
              />
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <AnimatedButton
                onClick={handleCheckout}
                disabled={loading}
                variant="primary"
                size="lg"
                className="w-full"
              >
                {loading ? "Génération QR..." : `Payer ${plan === "quarterly" ? "1 000" : "3 500"} FCFA 🌊`}
              </AnimatedButton>
            </div>

            <p className="text-xs text-gray-600 mt-3 text-center">
              Paiement Wave via QR sécurisé. Ouvre l&apos;app Wave et valide le paiement.
            </p>
          </div>
        </div>

        {/* Payment methods */}
        <div className="card p-6 text-center mb-8">
          <h3 className="font-bold mb-4 text-gray-300">Méthodes de paiement acceptées</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Wave 🌊"].map((m) => (
              <span key={m} className="bg-[#1a1a2e] border border-[#2a2a3a] rounded-lg px-4 py-2 text-sm text-gray-300">
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-6">Questions fréquentes</h2>
          {[
            {
              q: "Comment fonctionne le badge premium ?",
              a: "Après paiement, tu invites 2 amis à répondre 3 questions sur toi. Dans les 24h, tu reçois ton badge premium consolidé avec un QR code unique.",
            },
            {
              q: "Puis-je annuler mon abonnement ?",
              a: "Oui, tu peux annuler à tout moment. Ton accès premium reste actif jusqu'à la fin de la période payée.",
            },
            {
              q: "Le test est-il vraiment un test génétique ?",
              a: "Non. ADN_237_225 est un test de divertissement psychoculturel. Il ne fait aucune analyse génétique ou médicale. C'est un quiz fun sur ta culture et ton mindset.",
            },
            {
              q: "Quels pays sont supportés ?",
              a: "Cameroun, Côte d'Ivoire, Sénégal, et tous les pays UEMOA/CEMAC via Wave, Orange Money, MTN. Paiement international par carte bancaire.",
            },
          ].map((item) => (
            <div key={item.q} className="card p-5">
              <h3 className="font-bold text-sm mb-2 text-[#FF6B35]">{item.q}</h3>
              <p className="text-gray-400 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <QRModal
        isOpen={showQR}
        onClose={() => setShowQR(false)}
        paymentUrl={paymentUrl}
        amount={plan === "quarterly" ? 1000 : 3500}
        plan={plan}
      />
    </main>
  );
}
