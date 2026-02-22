import { execSync } from "child_process";

const DATABASE_ID = "699b2c15001d90e29fb8";
const RESULTS_ID = "699b2d29000b87869a98";
const REFERRALS_ID = "699b2d31003792a546fe";
const VALIDATIONS_ID = "699b2d3600366590d6fd";
const PAYMENTS_ID = "699b2d3a0038f77864ea";
const PROJECT_ID = "699b1e060018ea1a36ee";

const envVars = [
  { key: "APPWRITE_DATABASE_ID", value: DATABASE_ID },
  { key: "APPWRITE_COLLECTION_RESULTS", value: RESULTS_ID },
  { key: "APPWRITE_COLLECTION_REFERRALS", value: REFERRALS_ID },
  { key: "APPWRITE_COLLECTION_VALIDATIONS", value: VALIDATIONS_ID },
  { key: "APPWRITE_COLLECTION_PAYMENTS", value: PAYMENTS_ID },
  { key: "APPWRITE_PROJECT_ID", value: PROJECT_ID },
];

console.log("🔧 Configuration Vercel avec les IDs Appwrite...\n");

for (const { key, value } of envVars) {
  try {
    console.log(`   Suppression ${key}...`);
    execSync(`echo "y" | npx vercel env rm ${key} production`, { stdio: "pipe" });
  } catch {
    // Variable n'existe pas, on continue
  }
  
  try {
    console.log(`   Ajout ${key}...`);
    execSync(`echo "${value}" | npx vercel env add ${key} production`, { stdio: "pipe" });
    console.log(`   ✅ ${key} configuré\n`);
  } catch (error: any) {
    console.error(`   ❌ Erreur ${key}:`, error.message);
  }
}

console.log("\n✅ Variables Vercel configurées !");
console.log("\n🚀 Déploiement en cours...\n");

try {
  execSync("npx vercel deploy --prod", { stdio: "inherit" });
  console.log("\n🎉 DÉPLOIEMENT RÉUSSI !");
} catch (error) {
  console.error("\n❌ Erreur de déploiement");
  process.exit(1);
}
