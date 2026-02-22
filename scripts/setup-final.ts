import { Client, Databases, ID } from "node-appwrite";
import { execSync } from "child_process";

const ENDPOINT = "https://cloud.appwrite.io/v1";
const PROJECT_ID = "699b1e060018ea1a36ee";
const API_KEY = "standard_8d4178659132d25727914276e54c43400ea24544c15c88777c0a5b663d2e83ea203405f6ab85d10e650b6271293709640b880215ed19e2b9d9fc9c741adfe16f5c72ea7c8d36c6ded42625ae79bbd099f53f8c63dc3541307391c39dc6050b9907a11d68c748f89bc57d5efd8cfa17d608dfe35ac27b6ff29fe1b469f2eeb22f";
const DATABASE_ID = "699b2c15001d90e29fb8";

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);

async function setup() {
  try {
    console.log("📦 Création des collections...\n");

    // Collection 1: test_results
    const resultsId = ID.unique();
    await databases.createCollection(DATABASE_ID, resultsId, "test_results");
    console.log(`✅ test_results: ${resultsId}`);

    await new Promise(r => setTimeout(r, 1000));
    await databases.createStringAttribute(DATABASE_ID, resultsId, "session_id", 100, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(DATABASE_ID, resultsId, "email", 150, false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createIntegerAttribute(DATABASE_ID, resultsId, "score", true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(DATABASE_ID, resultsId, "badge", 100, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(DATABASE_ID, resultsId, "badge_color", 20, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(DATABASE_ID, resultsId, "data", 50000, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createIntegerAttribute(DATABASE_ID, resultsId, "social_score", false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createBooleanAttribute(DATABASE_ID, resultsId, "premium", false, false);

    // Collection 2: referrals
    const referralsId = ID.unique();
    await databases.createCollection(DATABASE_ID, referralsId, "referrals");
    console.log(`✅ referrals: ${referralsId}`);

    await new Promise(r => setTimeout(r, 1000));
    await databases.createStringAttribute(DATABASE_ID, referralsId, "inviter_id", 100, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(DATABASE_ID, referralsId, "invitee_email", 150, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(DATABASE_ID, referralsId, "result_id", 100, false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(DATABASE_ID, referralsId, "status", 20, false);

    // Collection 3: social_validations
    const validationsId = ID.unique();
    await databases.createCollection(DATABASE_ID, validationsId, "social_validations");
    console.log(`✅ social_validations: ${validationsId}`);

    await new Promise(r => setTimeout(r, 1000));
    await databases.createStringAttribute(DATABASE_ID, validationsId, "result_id", 100, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(DATABASE_ID, validationsId, "validator_session", 100, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(DATABASE_ID, validationsId, "answers", 5000, true);

    // Collection 4: payment_logs
    const paymentsId = ID.unique();
    await databases.createCollection(DATABASE_ID, paymentsId, "payment_logs");
    console.log(`✅ payment_logs: ${paymentsId}`);

    await new Promise(r => setTimeout(r, 1000));
    await databases.createStringAttribute(DATABASE_ID, paymentsId, "email", 150, false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(DATABASE_ID, paymentsId, "transaction_id", 100, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createIntegerAttribute(DATABASE_ID, paymentsId, "amount", true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(DATABASE_ID, paymentsId, "currency", 10, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(DATABASE_ID, paymentsId, "plan", 20, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(DATABASE_ID, paymentsId, "status", 20, false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(DATABASE_ID, paymentsId, "provider", 30, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(DATABASE_ID, paymentsId, "meta", 5000, false);

    console.log("\n✨ Collections créées !\n");

    return { databaseId: DATABASE_ID, resultsId, referralsId, validationsId, paymentsId };

  } catch (error: any) {
    console.error("❌ Erreur:", error.message || error);
    throw error;
  }
}

setup()
  .then(async (ids) => {
    console.log("🔧 Configuration Vercel...\n");
    
    try { execSync(`echo "${ids.databaseId}" | npx vercel env rm APPWRITE_DATABASE_ID production 2>&1`, { stdio: "inherit" }); } catch {}
    execSync(`echo "${ids.databaseId}" | npx vercel env add APPWRITE_DATABASE_ID production 2>&1`, { stdio: "inherit" });
    
    try { execSync(`echo "${ids.resultsId}" | npx vercel env rm APPWRITE_COLLECTION_RESULTS production 2>&1`, { stdio: "inherit" }); } catch {}
    execSync(`echo "${ids.resultsId}" | npx vercel env add APPWRITE_COLLECTION_RESULTS production 2>&1`, { stdio: "inherit" });
    
    try { execSync(`echo "${ids.referralsId}" | npx vercel env rm APPWRITE_COLLECTION_REFERRALS production 2>&1`, { stdio: "inherit" }); } catch {}
    execSync(`echo "${ids.referralsId}" | npx vercel env add APPWRITE_COLLECTION_REFERRALS production 2>&1`, { stdio: "inherit" });
    
    try { execSync(`echo "${ids.validationsId}" | npx vercel env rm APPWRITE_COLLECTION_VALIDATIONS production 2>&1`, { stdio: "inherit" }); } catch {}
    execSync(`echo "${ids.validationsId}" | npx vercel env add APPWRITE_COLLECTION_VALIDATIONS production 2>&1`, { stdio: "inherit" });
    
    try { execSync(`echo "${ids.paymentsId}" | npx vercel env rm APPWRITE_COLLECTION_PAYMENTS production 2>&1`, { stdio: "inherit" }); } catch {}
    execSync(`echo "${ids.paymentsId}" | npx vercel env add APPWRITE_COLLECTION_PAYMENTS production 2>&1`, { stdio: "inherit" });
    
    try { execSync(`echo "699b1e060018ea1a36ee" | npx vercel env rm APPWRITE_PROJECT_ID production 2>&1`, { stdio: "inherit" }); } catch {}
    execSync(`echo "699b1e060018ea1a36ee" | npx vercel env add APPWRITE_PROJECT_ID production 2>&1`, { stdio: "inherit" });
    
    console.log("\n✅ Vercel configuré !");
    console.log("\n🚀 Déploiement...\n");
    
    execSync("npx vercel deploy --prod 2>&1", { stdio: "inherit" });
    
    console.log("\n🎉 TOUT EST CONFIGURÉ ET DÉPLOYÉ !");
    process.exit(0);
  })
  .catch(() => {
    process.exit(1);
  });
