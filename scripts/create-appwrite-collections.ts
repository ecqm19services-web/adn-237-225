import { Client, Databases, ID } from "node-appwrite";

const ENDPOINT = "https://cloud.appwrite.io/v1";
const PROJECT_ID = "699b1e060018ea1a36ee";
const API_KEY = "standard_8d4178659132d25727914276e54c43400ea24544c15c88777c0a5b663d2e83ea203405f6ab85d10e650b6271293709640b880215ed19e2b9d9fc9c741adfe16f5c72ea7c8d36c6ded42625ae79bbd099f53f8c63dc3541307391c39dc6050b9907a11d68c748f89bc57d5efd8cfa17d608dfe35ac27b6ff29fe1b469f2eeb22f";

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);

async function setup() {
  try {
    console.log("🚀 Création de la base de données ADN_237_225...\n");
    
    const dbId = ID.unique();
    const db = await databases.create(dbId, "adn_237_225_db", true);
    console.log(`✅ Base de données créée: ${db.$id}\n`);

    await new Promise(r => setTimeout(r, 2000));

    console.log("📦 Création des collections...\n");

    // Collection 1: test_results
    const resultsId = ID.unique();
    await databases.createCollection(db.$id, resultsId, "test_results");
    console.log(`✅ Collection test_results: ${resultsId}`);

    await new Promise(r => setTimeout(r, 1000));
    await databases.createStringAttribute(db.$id, resultsId, "user_id", 255, false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, resultsId, "session_id", 255, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, resultsId, "email", 255, false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, resultsId, "name", 255, false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createIntegerAttribute(db.$id, resultsId, "score", true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, resultsId, "categories", 10000, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, resultsId, "badge", 255, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, resultsId, "badge_color", 50, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, resultsId, "description", 5000, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, resultsId, "ai_interpretation", 5000, false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, resultsId, "share_hook", 1000, false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createIntegerAttribute(db.$id, resultsId, "social_score", false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createBooleanAttribute(db.$id, resultsId, "premium_badge_unlocked", false, false);

    console.log("   → Attributs test_results créés\n");

    // Collection 2: referrals
    const referralsId = ID.unique();
    await databases.createCollection(db.$id, referralsId, "referrals");
    console.log(`✅ Collection referrals: ${referralsId}`);

    await new Promise(r => setTimeout(r, 1000));
    await databases.createStringAttribute(db.$id, referralsId, "inviter_id", 255, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, referralsId, "invitee_email", 255, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, referralsId, "invitee_session_id", 255, false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, referralsId, "result_id", 255, false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createEnumAttribute(db.$id, referralsId, "status", ["pending", "completed"], true, "pending");

    console.log("   → Attributs referrals créés\n");

    // Collection 3: social_validations
    const validationsId = ID.unique();
    await databases.createCollection(db.$id, validationsId, "social_validations");
    console.log(`✅ Collection social_validations: ${validationsId}`);

    await new Promise(r => setTimeout(r, 1000));
    await databases.createStringAttribute(db.$id, validationsId, "result_id", 255, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, validationsId, "validator_session_id", 255, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, validationsId, "answers", 10000, true);

    console.log("   → Attributs social_validations créés\n");

    // Collection 4: payment_logs
    const paymentsId = ID.unique();
    await databases.createCollection(db.$id, paymentsId, "payment_logs");
    console.log(`✅ Collection payment_logs: ${paymentsId}`);

    await new Promise(r => setTimeout(r, 1000));
    await databases.createStringAttribute(db.$id, paymentsId, "user_id", 255, false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, paymentsId, "email", 255, false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, paymentsId, "transaction_id", 255, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createIntegerAttribute(db.$id, paymentsId, "amount", true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, paymentsId, "currency", 10, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createEnumAttribute(db.$id, paymentsId, "plan", ["quarterly", "annual"], true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createEnumAttribute(db.$id, paymentsId, "status", ["pending", "completed", "failed"], true, "pending");
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, paymentsId, "provider", 50, true);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, paymentsId, "provider_ref", 255, false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, paymentsId, "payment_method", 100, false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, paymentsId, "phone", 50, false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, paymentsId, "error", 1000, false);
    await new Promise(r => setTimeout(r, 500));
    await databases.createStringAttribute(db.$id, paymentsId, "paid_at", 100, false);

    console.log("   → Attributs payment_logs créés\n");

    console.log("\n✨ Configuration Appwrite terminée !\n");
    console.log("📋 IDs générés:\n");
    console.log(`DATABASE_ID=${db.$id}`);
    console.log(`RESULTS_ID=${resultsId}`);
    console.log(`REFERRALS_ID=${referralsId}`);
    console.log(`VALIDATIONS_ID=${validationsId}`);
    console.log(`PAYMENTS_ID=${paymentsId}`);

    return {
      databaseId: db.$id,
      resultsId,
      referralsId,
      validationsId,
      paymentsId,
    };

  } catch (error: any) {
    console.error("❌ Erreur:", error.message || error);
    if (error.response) {
      console.error("Détails:", error.response);
    }
    throw error;
  }
}

setup()
  .then((ids) => {
    console.log("\n✅ Appwrite configuré avec succès!");
    console.log("\n🔧 Configuration automatique de Vercel...\n");
    
    const { execSync } = require("child_process");
    
    execSync(`echo "${ids.databaseId}" | npx vercel env rm APPWRITE_DATABASE_ID production`, { stdio: "inherit" });
    execSync(`echo "${ids.databaseId}" | npx vercel env add APPWRITE_DATABASE_ID production`, { stdio: "inherit" });
    
    execSync(`echo "${ids.resultsId}" | npx vercel env add APPWRITE_COLLECTION_RESULTS production`, { stdio: "inherit" });
    execSync(`echo "${ids.referralsId}" | npx vercel env add APPWRITE_COLLECTION_REFERRALS production`, { stdio: "inherit" });
    execSync(`echo "${ids.validationsId}" | npx vercel env add APPWRITE_COLLECTION_VALIDATIONS production`, { stdio: "inherit" });
    execSync(`echo "${ids.paymentsId}" | npx vercel env add APPWRITE_COLLECTION_PAYMENTS production`, { stdio: "inherit" });
    
    execSync(`echo "699b1e060018ea1a36ee" | npx vercel env rm APPWRITE_PROJECT_ID production`, { stdio: "inherit" });
    execSync(`echo "699b1e060018ea1a36ee" | npx vercel env add APPWRITE_PROJECT_ID production`, { stdio: "inherit" });
    
    console.log("\n✅ Vercel configuré !");
    console.log("\n🚀 Déploiement en cours...\n");
    
    execSync("npx vercel deploy --prod", { stdio: "inherit" });
    
    console.log("\n✅ Déploiement terminé !");
    process.exit(0);
  })
  .catch(() => {
    process.exit(1);
  });
