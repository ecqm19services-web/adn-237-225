export type UserTier = "free" | "pro";

interface KeyMeta {
  key: string;
  remainingMinute: number;
  remainingDay: number;
  errorRate: number;
  latency: number;
  cooldownUntil: number;
  rpmLimit: number;
  rpdLimit: number;
}

const keyPool: KeyMeta[] = (process.env.GOOGLE_API_KEYS || "")
  .split(",")
  .filter(Boolean)
  .map((key) => ({
    key: key.trim(),
    remainingMinute: 60,
    remainingDay: 1500,
    errorRate: 0,
    latency: 200,
    cooldownUntil: 0,
    rpmLimit: 60,
    rpdLimit: 1500,
  }));

function getBestGoogleKey(): KeyMeta | null {
  const now = Date.now();
  const available = keyPool.filter(
    (k) =>
      k.cooldownUntil < now &&
      k.remainingMinute > 5 &&
      k.remainingDay > 50 &&
      k.errorRate < 0.3
  );
  if (!available.length) return null;
  available.sort(
    (a, b) =>
      b.remainingDay / b.rpdLimit +
      (1 - b.errorRate) -
      (a.remainingDay / a.rpdLimit + (1 - a.errorRate))
  );
  return available[0];
}

function markKeyError(key: KeyMeta) {
  key.errorRate = Math.min(1, key.errorRate + 0.1);
  key.cooldownUntil = Date.now() + 60_000;
}

function markKeySuccess(key: KeyMeta, latencyMs: number) {
  key.remainingMinute = Math.max(0, key.remainingMinute - 1);
  key.remainingDay = Math.max(0, key.remainingDay - 1);
  key.latency = (key.latency * 0.8 + latencyMs * 0.2);
  key.errorRate = Math.max(0, key.errorRate - 0.02);
}

async function callGemini(prompt: string, keyMeta: KeyMeta): Promise<string> {
  const start = Date.now();
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${keyMeta.key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
      }),
    }
  );
  if (!res.ok) {
    markKeyError(keyMeta);
    throw new Error(`Gemini error: ${res.status}`);
  }
  const data = await res.json();
  markKeySuccess(keyMeta, Date.now() - start);
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

async function callGroq(prompt: string): Promise<string> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 512,
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`Groq error: ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

async function callHuggingFace(prompt: string): Promise<string> {
  const res = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 512, temperature: 0.7 },
      }),
    }
  );
  if (!res.ok) throw new Error(`HF error: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data[0]?.generated_text || "" : data?.generated_text || "";
}

export async function routeAI(prompt: string, tier: UserTier): Promise<string> {
  if (tier === "pro") {
    const key = getBestGoogleKey();
    if (key) {
      try {
        return await callGemini(prompt, key);
      } catch {
        // fall through
      }
    }
    try {
      return await callGroq(prompt);
    } catch {
      // fall through
    }
    return await callHuggingFace(prompt);
  } else {
    try {
      return await callGroq(prompt);
    } catch {
      // fall through
    }
    try {
      return await callHuggingFace(prompt);
    } catch {
      // fall through
    }
    const key = getBestGoogleKey();
    if (key) return await callGemini(prompt, key);
    throw new Error("All AI providers unavailable");
  }
}

export async function generateProfileInterpretation(
  score: number,
  categories: Record<string, number>,
  badge: string,
  tier: UserTier
): Promise<string> {
  const prompt = `Tu es un analyste culturel bienveillant et enthousiaste spécialisé dans les cultures d'Afrique centrale et de l'Ouest (Cameroun 237, Côte d'Ivoire 225, Sénégal).

Un utilisateur vient de compléter le test ADN_237_225 avec ces résultats :
- Score global : ${score}/100
- Badge obtenu : ${badge}
- Mindset : ${categories.mindset || 0}/100
- Style : ${categories.style || 0}/100
- Social : ${categories.social || 0}/100
- Énergie culturelle : ${categories.energy || 0}/100

Génère une analyse personnalisée de 3-4 phrases, chaleureuse, positive et motivante. 
Utilise un ton familier et authentique. Inclus 1-2 emojis pertinents.
Mentionne les points forts et donne un conseil culturel inspirant.
IMPORTANT: C'est un test de divertissement psychoculturel, pas un diagnostic médical ou génétique.`;

  return await routeAI(prompt, tier);
}

export async function generateShareHook(
  score: number,
  badge: string,
  tier: UserTier
): Promise<string> {
  const prompt = `Génère un texte viral court (max 2 phrases) pour partager sur WhatsApp/TikTok/Facebook.
Score ADN_237_225 : ${score}/100, Badge : ${badge}.
Le texte doit donner envie aux amis de faire le test. Utilise 1-2 emojis. Inclus "ADN_237_225".`;
  return await routeAI(prompt, tier);
}
