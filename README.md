# 🧬 ADN_237_225

**Test psychoculturel viral pour Cameroun (237) et Côte d'Ivoire (225)**

Plateforme de quiz culturel avec mécanique virale, badges personnalisés, validation sociale et paiement Wave.

## 🚀 Démo Live

**Production:** https://adn-237-225.vercel.app

## ✨ Fonctionnalités

- 🎯 **Quiz psychoculturel** : 15 questions sur mindset, style, social, énergie culturelle
- 🏆 **Badges animés** : 5 niveaux (Lion Culturel, Ambassadeur, Enfant du Terroir, Citoyen du Monde, Explorateur)
- 🤖 **IA personnalisée** : Analyse générée par Google Gemini (pro) ou Groq (gratuit)
- 🔥 **Mécanique virale** : Partage WhatsApp/Twitter avec hooks optimisés
- 🤝 **Validation sociale** : 2 amis répondent 3 questions pour débloquer le badge premium
- 💳 **Paiement Wave** : QR code dynamique, 1000 FCFA/trimestre
- 🎨 **UI ultra moderne** : Animations Framer Motion, confettis, micro-interactions

## 🛠️ Stack Technique

- **Frontend:** Next.js 16 + TypeScript + Tailwind CSS
- **Animations:** Framer Motion
- **Backend:** Next.js API Routes
- **Base de données:** Appwrite Cloud
- **IA:** Google Gemini (load balancing 4 clés) + Groq + Hugging Face (fallback)
- **Paiement:** Wave (QR code)
- **Déploiement:** Vercel

## 📦 Installation

```bash
npm install
cp .env.example .env.local
# Remplis les variables d'environnement dans .env.local
npm run dev
```

## 🔧 Configuration

Voir `CONFIGURATION_FINALE.md` pour le guide complet de configuration Appwrite et Vercel.

### Variables d'environnement requises

```bash
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=[ton-project-id]
APPWRITE_API_KEY=[ta-clé-api]
APPWRITE_DATABASE_ID=[database-id]
APPWRITE_COLLECTION_RESULTS=[collection-id]
APPWRITE_COLLECTION_REFERRALS=[collection-id]
APPWRITE_COLLECTION_VALIDATIONS=[collection-id]
APPWRITE_COLLECTION_PAYMENTS=[collection-id]
GOOGLE_API_KEYS=[clé1,clé2,clé3,clé4]
GROQ_API_KEY=[ta-clé-groq]
WAVE_QR_URL=[ton-lien-wave-qr]
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📋 Architecture

```
app/
├── page.tsx              # Landing page virale
├── quiz/                 # Quiz 15 questions
├── results/[id]/         # Résultats + badge animé
├── premium/              # Abonnement + QR Wave
├── validate/[resultId]/  # Validation sociale
└── api/
    ├── results/          # Calcul score + IA
    ├── referral/         # Invitations amis
    ├── validate/         # Validation sociale
    └── payment/          # Wave QR + logs

components/ui/
├── badge-card.tsx        # Badge animé avec ring
├── animated-button.tsx   # Boutons avec micro-interactions
├── qr-modal.tsx          # Modal QR Wave
├── share-card.tsx        # Partage social animé
└── confetti.tsx          # Confettis célébration

lib/
├── appwrite.ts           # Client Appwrite + types
├── ai-router.ts          # Load balancing IA multi-providers
├── questions.ts          # Questions + scoring
└── utils.ts              # Helpers
```

## 🎯 Parcours Utilisateur

1. **Landing** → CTA "Découvrir mon ADN"
2. **Quiz** → 15 questions (3 min)
3. **Résultats** → Badge animé + confettis + score détaillé
4. **Partage** → WhatsApp/Twitter (mécanique virale)
5. **Premium** → QR Wave 1000 FCFA → Badge premium + validation sociale

## 🚀 Déploiement

```bash
git push origin master
npx vercel deploy --prod
```

## 📊 KPIs Cibles

- Taux de complétion quiz : >65%
- Coefficient viral (K-factor) : >1.2
- Conversion premium : 2-6%
- Rétention 30j : >20%

## 📄 License

Propriétaire - ADN_237_225 © 2026
