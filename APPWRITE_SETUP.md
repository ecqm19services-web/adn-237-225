# Configuration Appwrite pour ADN_237_225

## Étape 1: Créer la base de données

1. Va sur https://cloud.appwrite.io/console
2. Sélectionne ton projet (ou crée-en un nouveau)
3. Va dans "Databases" → "Create Database"
4. Nom: `adn_237_225_db`
5. Note le **Database ID** généré

## Étape 2: Créer les 4 collections

### Collection 1: test_results

**Attributs:**
- `user_id` (String, 255, optional)
- `session_id` (String, 255, required)
- `email` (String, 255, optional)
- `name` (String, 255, optional)
- `score` (Integer, required)
- `categories` (String, 10000, required) - JSON stringifié
- `badge` (String, 255, required)
- `badge_color` (String, 50, required)
- `description` (String, 5000, required)
- `ai_interpretation` (String, 5000, optional)
- `share_hook` (String, 1000, optional)
- `social_score` (Integer, optional)
- `premium_badge_unlocked` (Boolean, optional, default: false)

**Indexes:**
- `session_id_idx` sur `session_id`
- `user_id_idx` sur `user_id`

---

### Collection 2: referrals

**Attributs:**
- `inviter_id` (String, 255, required)
- `invitee_email` (String, 255, required)
- `invitee_session_id` (String, 255, optional)
- `result_id` (String, 255, optional)
- `status` (Enum: ["pending", "completed"], required, default: "pending")

**Indexes:**
- `inviter_id_idx` sur `inviter_id`

---

### Collection 3: social_validations

**Attributs:**
- `result_id` (String, 255, required)
- `validator_session_id` (String, 255, required)
- `answers` (String, 10000, required) - JSON stringifié

**Indexes:**
- `result_id_idx` sur `result_id`

---

### Collection 4: payment_logs

**Attributs:**
- `user_id` (String, 255, optional)
- `email` (String, 255, optional)
- `transaction_id` (String, 255, required)
- `amount` (Integer, required)
- `currency` (String, 10, required)
- `plan` (Enum: ["quarterly", "annual"], required)
- `status` (Enum: ["pending", "completed", "failed"], required, default: "pending")
- `provider` (String, 50, required)
- `provider_ref` (String, 255, optional)
- `payment_method` (String, 100, optional)
- `phone` (String, 50, optional)
- `error` (String, 1000, optional)
- `paid_at` (String, 100, optional)

**Indexes:**
- `transaction_id_idx` sur `transaction_id`
- `email_idx` sur `email`

---

## Étape 3: Variables d'environnement Vercel

Une fois les collections créées, configure ces variables sur Vercel:

```bash
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=[TON_PROJECT_ID]
APPWRITE_API_KEY=[TON_APPWRITE_API_KEY]
APPWRITE_DATABASE_ID=[DATABASE_ID_CRÉÉ]
APPWRITE_COLLECTION_RESULTS=[COLLECTION_RESULTS_ID]
APPWRITE_COLLECTION_REFERRALS=[COLLECTION_REFERRALS_ID]
APPWRITE_COLLECTION_VALIDATIONS=[COLLECTION_VALIDATIONS_ID]
APPWRITE_COLLECTION_PAYMENTS=[COLLECTION_PAYMENTS_ID]
GOOGLE_API_KEYS=[TES_CLÉS_GOOGLE_SÉPARÉES_PAR_VIRGULES]
GROQ_API_KEY=[TA_CLÉ_GROQ]
WAVE_QR_URL=[TON_LIEN_WAVE_QR]
NEXT_PUBLIC_APP_URL=https://adn-237-225.vercel.app
```

## Commande pour configurer sur Vercel (une fois les IDs récupérés):

```bash
echo "[DATABASE_ID]" | npx vercel env add APPWRITE_DATABASE_ID production
echo "[RESULTS_ID]" | npx vercel env add APPWRITE_COLLECTION_RESULTS production
echo "[REFERRALS_ID]" | npx vercel env add APPWRITE_COLLECTION_REFERRALS production
echo "[VALIDATIONS_ID]" | npx vercel env add APPWRITE_COLLECTION_VALIDATIONS production
echo "[PAYMENTS_ID]" | npx vercel env add APPWRITE_COLLECTION_PAYMENTS production
echo "https://cloud.appwrite.io/v1" | npx vercel env add APPWRITE_ENDPOINT production
echo "[PROJECT_ID]" | npx vercel env add APPWRITE_PROJECT_ID production
echo "[APPWRITE_API_KEY]" | npx vercel env add APPWRITE_API_KEY production
echo "[WAVE_QR_URL]" | npx vercel env add WAVE_QR_URL production
```
