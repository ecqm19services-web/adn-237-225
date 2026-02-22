import Link from "next/link";

const STATS = [
  { value: "15", label: "Questions" },
  { value: "5", label: "Badges" },
  { value: "100", label: "Score max" },
  { value: "24h", label: "Badge Premium" },
];

const BADGES = [
  { emoji: "🦁", name: "Lion Culturel", score: "85+" },
  { emoji: "🌍", name: "Ambassadeur", score: "70+" },
  { emoji: "🌱", name: "Enfant du Terroir", score: "55+" },
  { emoji: "🌐", name: "Citoyen du Monde", score: "40+" },
  { emoji: "🧭", name: "Explorateur", score: "<40" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a3a]">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧬</span>
          <span className="font-bold text-lg text-gradient">ADN_237_225</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/premium" className="btn-secondary text-sm py-2 px-4">
            Premium
          </Link>
          <Link href="/quiz" className="btn-primary text-sm py-2 px-4">
            Commencer
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-[#1a1a2e] border border-[#FF6B35]/30 rounded-full px-4 py-2 text-sm text-[#FF6B35] mb-8">
          <span>🔥</span>
          <span>Test psychoculturel viral — 100% gratuit</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          Quel est ton{" "}
          <span className="text-gradient">ADN Culturel</span>{" "}
          237/225 ? 🧬
        </h1>

        <p className="text-xl text-gray-400 mb-4 max-w-2xl mx-auto">
          Découvre ton score psychoculturel unique — mindset, style, énergie sociale et racines culturelles.
          Partage ton badge et défie tes amis !
        </p>

        <p className="text-xs text-gray-600 mb-10">
          ⚠️ ADN_237_225 est un test de divertissement psychoculturel. Ce n&apos;est pas un diagnostic médical, génétique ou scientifique.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/quiz" className="btn-primary text-lg py-4 px-10 pulse-glow inline-block">
            🚀 Découvrir mon ADN — Gratuit
          </Link>
          <Link href="/premium" className="btn-secondary text-lg py-4 px-10 inline-block">
            ⭐ Premium — 1000 FCFA/trimestre
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {STATS.map((s) => (
            <div key={s.label} className="card p-4 text-center">
              <div className="text-3xl font-black text-gradient">{s.value}</div>
              <div className="text-sm text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10">Comment ça marche ? 🎯</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "1", icon: "📝", title: "Réponds au quiz", desc: "15 questions sur ta culture, ton mindset et ton style de vie. Ça prend 3 minutes." },
              { step: "2", icon: "🏆", title: "Reçois ton badge", desc: "Score instantané + badge personnalisé. Partage sur WhatsApp, TikTok, Facebook." },
              { step: "3", icon: "🔥", title: "Badge Premium", desc: "Invite 2 amis à répondre 3 questions sur toi. Reçois ton badge final en 24h !" },
            ].map((item) => (
              <div key={item.step} className="card p-6 text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center text-sm font-bold text-white">
                    {item.step}
                  </div>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-4">Les 5 Badges ADN 🏅</h2>
          <p className="text-gray-400 mb-10">Quel badge vas-tu obtenir ?</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {BADGES.map((b) => (
              <div key={b.name} className="card p-4 text-center hover:border-[#FF6B35] transition-colors">
                <div className="text-4xl mb-2 float inline-block">{b.emoji}</div>
                <div className="font-bold text-sm mb-1">{b.name}</div>
                <div className="text-xs text-[#FF6B35]">Score {b.score}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <div className="card p-8 mb-20">
          <h2 className="text-2xl font-bold mb-6">Ce que disent les participants 💬</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Kouamé A.", flag: "🇨🇮", text: "J'ai partagé mon badge sur WhatsApp et en 1h tous mes amis avaient fait le test ! Trop drôle 😂", badge: "Lion Culturel 🦁" },
              { name: "Brice N.", flag: "🇨🇲", text: "Le score est tellement précis c'est flippant. Mon badge Ambassadeur me ressemble à 100%.", badge: "Ambassadeur 🌍" },
              { name: "Fatou D.", flag: "🇸🇳", text: "Le badge premium avec la validation de mes amis c'est la meilleure idée ! Trop fun.", badge: "Enfant du Terroir 🌱" },
            ].map((t) => (
              <div key={t.name} className="bg-[#1a1a2e] rounded-xl p-4 text-left">
                <p className="text-gray-300 text-sm mb-3 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">{t.flag} {t.name}</span>
                  <span className="text-xs text-[#FFD700]">{t.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card p-10 text-center">
          <h2 className="text-4xl font-black mb-4">
            Prêt à découvrir ton <span className="text-gradient">ADN Culturel</span> ?
          </h2>
          <p className="text-gray-400 mb-8">Rejoins des milliers de participants. 100% gratuit, 3 minutes.</p>
          <Link href="/quiz" className="btn-primary text-xl py-5 px-14 pulse-glow inline-block">
            🧬 Commencer le test maintenant
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2a2a3a] px-6 py-8 text-center text-gray-600 text-sm">
        <p className="mb-2">
          <strong className="text-gray-400">ADN_237_225</strong> — Test de divertissement psychoculturel
        </p>
        <p className="text-xs">
          ⚠️ Ce test n&apos;est pas un diagnostic médical, génétique ou scientifique. Pour le divertissement uniquement.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <Link href="/privacy" className="hover:text-gray-400 transition-colors">Confidentialité</Link>
          <Link href="/terms" className="hover:text-gray-400 transition-colors">Conditions</Link>
          <Link href="/premium" className="hover:text-gray-400 transition-colors">Premium</Link>
        </div>
      </footer>
    </main>
  );
}
