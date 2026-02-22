import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="card p-10 text-center max-w-md w-full">
        <div className="text-6xl mb-4 float inline-block">🏆</div>
        <h1 className="text-3xl font-black mb-3 text-gradient">Paiement réussi !</h1>
        <p className="text-gray-300 mb-2">
          Bienvenue dans ADN_237_225 Premium ⭐
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Ton compte a été mis à jour. Tu as maintenant accès à toutes les fonctionnalités premium — badge QR, analyse IA approfondie, historique et comparaisons.
        </p>
        <div className="space-y-3">
          <Link href="/quiz" className="btn-primary w-full block text-center">
            🧬 Refaire le test en Premium
          </Link>
          <Link href="/" className="btn-secondary w-full block text-center">
            Retour à l&apos;accueil
          </Link>
        </div>
        <p className="text-xs text-gray-600 mt-6">
          Un email de confirmation a été envoyé. Conserve-le pour accéder à ton compte.
        </p>
      </div>
    </main>
  );
}
