export interface Question {
  id: string;
  text: string;
  category: "mindset" | "style" | "social" | "energy";
  options: { value: number; label: string }[];
}

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "Quand tu arrives à une fête que tu ne connais pas, tu fais quoi en premier ?",
    category: "social",
    options: [
      { value: 4, label: "Je salue tout le monde et je me présente direct 🤝" },
      { value: 3, label: "Je cherche quelqu'un que je connais d'abord" },
      { value: 2, label: "Je prends un verre et j'observe avant d'agir" },
      { value: 1, label: "Je reste discret et j'attends qu'on vienne vers moi" },
    ],
  },
  {
    id: "q2",
    text: "Un ami te demande de l'aider à déménager un samedi matin. Tu réponds quoi ?",
    category: "social",
    options: [
      { value: 4, label: "Présent ! À quelle heure je viens ? 💪" },
      { value: 3, label: "Je viens mais j'arrive un peu plus tard" },
      { value: 2, label: "Je négocie pour venir l'après-midi" },
      { value: 1, label: "J'invente une excuse... désolé frère 😅" },
    ],
  },
  {
    id: "q3",
    text: "Comment tu gères quand quelqu'un te manque de respect en public ?",
    category: "mindset",
    options: [
      { value: 4, label: "Je recadre calmement mais fermement sur place" },
      { value: 3, label: "Je garde mon calme mais j'en parle après" },
      { value: 2, label: "J'ignore et je passe mon chemin" },
      { value: 1, label: "Je bouillonne mais je dis rien" },
    ],
  },
  {
    id: "q4",
    text: "Quelle phrase te ressemble le plus ?",
    category: "mindset",
    options: [
      { value: 4, label: "\"On ne réussit pas seul, la famille c'est tout\"" },
      { value: 3, label: "\"Je travaille dur, les résultats viennent\"" },
      { value: 2, label: "\"Profite de la vie, demain on verra\"" },
      { value: 1, label: "\"Je fais confiance au destin\"" },
    ],
  },
  {
    id: "q5",
    text: "Ton style vestimentaire au quotidien c'est plutôt ?",
    category: "style",
    options: [
      { value: 4, label: "Tenue traditionnelle ou wax — fierté culturelle 🌍" },
      { value: 3, label: "Streetwear moderne avec une touche africaine" },
      { value: 2, label: "Casual international, confort avant tout" },
      { value: 1, label: "Costume/tenue pro, toujours présentable" },
    ],
  },
  {
    id: "q6",
    text: "Quand tu entends un vieux morceau de coupé-décalé ou bikutsi, tu fais quoi ?",
    category: "energy",
    options: [
      { value: 4, label: "Je me lève et je danse immédiatement 🕺" },
      { value: 3, label: "Je bouge la tête et je chante" },
      { value: 2, label: "Je souris et je me souviens de bons moments" },
      { value: 1, label: "Je continue ce que je faisais" },
    ],
  },
  {
    id: "q7",
    text: "Comment tu prends tes grandes décisions de vie ?",
    category: "mindset",
    options: [
      { value: 4, label: "Je consulte la famille et les anciens d'abord" },
      { value: 3, label: "J'en parle avec mes amis proches" },
      { value: 2, label: "Je réfléchis seul et je décide" },
      { value: 1, label: "Je suis mon instinct direct" },
    ],
  },
  {
    id: "q8",
    text: "Un inconnu te demande de l'aide dans la rue. Ta réaction ?",
    category: "social",
    options: [
      { value: 4, label: "J'aide sans hésiter, c'est normal 🤲" },
      { value: 3, label: "J'aide si j'ai le temps et si ça me semble sincère" },
      { value: 2, label: "Je suis prudent, je demande d'abord les détails" },
      { value: 1, label: "Je préfère ne pas m'impliquer" },
    ],
  },
  {
    id: "q9",
    text: "Qu'est-ce qui te rend le plus fier de ta culture ?",
    category: "energy",
    options: [
      { value: 4, label: "La solidarité et l'hospitalité — on partage tout 🏠" },
      { value: 3, label: "La musique, la danse, l'art de vivre" },
      { value: 2, label: "La résilience et la débrouillardise" },
      { value: 1, label: "La richesse des langues et traditions" },
    ],
  },
  {
    id: "q10",
    text: "Comment tu gères l'argent quand tu en as ?",
    category: "mindset",
    options: [
      { value: 4, label: "Je partage avec la famille et j'aide les proches" },
      { value: 3, label: "J'épargne d'abord, puis je profite un peu" },
      { value: 2, label: "J'investis dans des projets ou business" },
      { value: 1, label: "Je profite maintenant, on verra demain" },
    ],
  },
  {
    id: "q11",
    text: "Ton rapport à la ponctualité ?",
    category: "social",
    options: [
      { value: 1, label: "L'heure africaine c'est une philosophie, pas un défaut 😄" },
      { value: 2, label: "Je suis souvent en retard mais j'essaie" },
      { value: 3, label: "Je fais des efforts pour être à l'heure" },
      { value: 4, label: "Je suis toujours à l'heure, c'est une question de respect" },
    ],
  },
  {
    id: "q12",
    text: "Quand tu cuisines ou que tu manges, c'est plutôt ?",
    category: "energy",
    options: [
      { value: 4, label: "Plat traditionnel fait maison — ndolé, attiéké, thiébou... 🍲" },
      { value: 3, label: "Mix entre cuisine locale et internationale" },
      { value: 2, label: "Fast food ou livraison, je suis pressé" },
      { value: 1, label: "Je mange ce qui est disponible, pas de préférence" },
    ],
  },
  {
    id: "q13",
    text: "Comment tu réagis face à un échec ?",
    category: "mindset",
    options: [
      { value: 4, label: "Je me relève, j'analyse et je recommence plus fort 💪" },
      { value: 3, label: "Je prends du temps pour digérer puis je repars" },
      { value: 2, label: "Je cherche du soutien auprès de mes proches" },
      { value: 1, label: "C'est difficile, ça prend du temps" },
    ],
  },
  {
    id: "q14",
    text: "Ton ambition principale dans la vie ?",
    category: "energy",
    options: [
      { value: 4, label: "Réussir et élever toute ma famille avec moi 🌟" },
      { value: 3, label: "Construire quelque chose qui dure, un héritage" },
      { value: 2, label: "Vivre bien, voyager, être libre" },
      { value: 1, label: "Être en paix et heureux au quotidien" },
    ],
  },
  {
    id: "q15",
    text: "Quand tu parles de ton pays ou ta ville, tu le fais comment ?",
    category: "energy",
    options: [
      { value: 4, label: "Avec fierté et passion — c'est le meilleur endroit ! 🇨🇲🇨🇮🇸🇳" },
      { value: 3, label: "Avec amour mais lucidité sur les défis" },
      { value: 2, label: "De façon neutre, j'aime mais je critique aussi" },
      { value: 1, label: "Je préfère ne pas trop en parler" },
    ],
  },
];

export function calculateScore(answers: Record<string, number>): {
  total: number;
  categories: Record<string, number>;
  badge: string;
  badgeColor: string;
  description: string;
} {
  const categoryScores: Record<string, { sum: number; count: number }> = {
    mindset: { sum: 0, count: 0 },
    style: { sum: 0, count: 0 },
    social: { sum: 0, count: 0 },
    energy: { sum: 0, count: 0 },
  };

  QUESTIONS.forEach((q) => {
    const answer = answers[q.id];
    if (answer !== undefined) {
      categoryScores[q.category].sum += answer;
      categoryScores[q.category].count += 1;
    }
  });

  const categories: Record<string, number> = {};
  let totalSum = 0;
  let totalCount = 0;

  Object.entries(categoryScores).forEach(([cat, { sum, count }]) => {
    if (count > 0) {
      categories[cat] = Math.round((sum / (count * 4)) * 100);
      totalSum += sum;
      totalCount += count;
    }
  });

  const total = Math.round((totalSum / (totalCount * 4)) * 100);

  let badge: string;
  let badgeColor: string;
  let description: string;

  if (total >= 85) {
    badge = "Lion Culturel 🦁";
    badgeColor = "#FFD700";
    description = "Tu es l'incarnation vivante de la culture 237/225. Solidarité, fierté et énergie — tu portes les valeurs de ta terre avec une force rare.";
  } else if (total >= 70) {
    badge = "Ambassadeur 🌍";
    badgeColor = "#FF6B35";
    description = "Tu es profondément ancré dans ta culture tout en étant ouvert au monde. Un pont entre tradition et modernité.";
  } else if (total >= 55) {
    badge = "Enfant du Terroir 🌱";
    badgeColor = "#4CAF50";
    description = "Tu gardes les racines tout en explorant de nouveaux horizons. Ton ADN culturel est solide et en évolution.";
  } else if (total >= 40) {
    badge = "Citoyen du Monde 🌐";
    badgeColor = "#2196F3";
    description = "Tu navigues entre plusieurs cultures avec aisance. Cosmopolite dans l'âme, tu apportes une vision unique.";
  } else {
    badge = "Explorateur 🧭";
    badgeColor = "#9C27B0";
    description = "Tu es en quête de ton identité culturelle. Ce voyage est une richesse — continue d'explorer !";
  }

  return { total, categories, badge, badgeColor, description };
}
