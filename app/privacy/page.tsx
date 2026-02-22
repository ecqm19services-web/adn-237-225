import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a3a]">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🧬</span>
          <span className="font-bold text-gradient">ADN_237_225</span>
        </Link>
      </nav>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-black mb-8">Politique de Confidentialité</h1>
        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Données collectées</h2>
            <p>ADN_237_225 collecte uniquement les données nécessaires au fonctionnement du service : email (optionnel), prénom (optionnel), réponses au quiz, et score calculé. Aucune donnée génétique ou médicale n&apos;est collectée.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Utilisation des données</h2>
            <p>Les données sont utilisées pour : afficher tes résultats, générer ton badge, envoyer les invitations à tes amis (si tu choisis de les inviter), et améliorer le service. Tes données ne sont jamais vendues à des tiers.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Stockage et sécurité</h2>
            <p>Les données sont stockées de manière sécurisée via Supabase (chiffrement TLS, accès contrôlé). Les clés API et secrets ne sont jamais exposés côté client.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Tes droits</h2>
            <p>Tu peux demander la suppression de tes données à tout moment en nous contactant. Conformément aux lois de protection des données du Sénégal (CDP), de la Côte d&apos;Ivoire (ARTCI) et du Cameroun.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-white mb-2">5. Cookies</h2>
            <p>Nous utilisons uniquement des cookies fonctionnels nécessaires au service (session, préférences). Aucun cookie publicitaire tiers n&apos;est utilisé sans consentement.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-white mb-2">6. Contact</h2>
            <p>Pour toute question relative à tes données : contact@adn237225.com</p>
          </section>
        </div>
        <div className="mt-8">
          <Link href="/" className="btn-secondary inline-block">← Retour à l&apos;accueil</Link>
        </div>
      </div>
    </main>
  );
}
