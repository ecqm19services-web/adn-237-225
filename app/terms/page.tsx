import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a3a]">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🧬</span>
          <span className="font-bold text-gradient">ADN_237_225</span>
        </Link>
      </nav>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-black mb-8">Conditions d&apos;Utilisation</h1>
        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Nature du service</h2>
            <p>ADN_237_225 est un test de <strong>divertissement psychoculturel</strong>. Il ne constitue en aucun cas un diagnostic médical, génétique, psychologique ou scientifique. Les résultats sont fournis à titre ludique uniquement.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Utilisation acceptable</h2>
            <p>Tu t&apos;engages à utiliser le service de manière honnête et respectueuse. Toute tentative de fraude (faux comptes, manipulation des résultats, abus du système de parrainage) entraînera la suspension du compte.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Abonnement Premium</h2>
            <p>L&apos;abonnement Premium est facturé 1 000 FCFA par trimestre ou 3 500 FCFA par an. Le paiement est non remboursable sauf en cas de défaillance technique de notre part. L&apos;accès reste actif jusqu&apos;à la fin de la période payée.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Propriété intellectuelle</h2>
            <p>Le contenu, les questions, les badges et la marque ADN_237_225 sont protégés. Toute reproduction sans autorisation est interdite.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-white mb-2">5. Limitation de responsabilité</h2>
            <p>ADN_237_225 ne peut être tenu responsable d&apos;une mauvaise interprétation des résultats. Les scores sont des indicateurs de divertissement, pas des vérités absolues.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-white mb-2">6. Droit applicable</h2>
            <p>Ces conditions sont régies par le droit applicable au Cameroun, à la Côte d&apos;Ivoire et au Sénégal selon la localisation de l&apos;utilisateur.</p>
          </section>
        </div>
        <div className="mt-8">
          <Link href="/" className="btn-secondary inline-block">← Retour à l&apos;accueil</Link>
        </div>
      </div>
    </main>
  );
}
