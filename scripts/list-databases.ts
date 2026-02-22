import { Client, Databases } from "node-appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("699b1e060018ea1a36ee")
  .setKey("standard_8d4178659132d25727914276e54c43400ea24544c15c88777c0a5b663d2e83ea203405f6ab85d10e650b6271293709640b880215ed19e2b9d9fc9c741adfe16f5c72ea7c8d36c6ded42625ae79bbd099f53f8c63dc3541307391c39dc6050b9907a11d68c748f89bc57d5efd8cfa17d608dfe35ac27b6ff29fe1b469f2eeb22f");

const databases = new Databases(client);

async function listDatabases() {
  try {
    const list = await databases.list();
    console.log("📋 Bases de données existantes:\n");
    list.databases.forEach((db: any) => {
      console.log(`  - ${db.name} (ID: ${db.$id})`);
    });
    
    if (list.databases.length > 0) {
      console.log(`\n💡 Utilise la base existante: ${list.databases[0].$id}`);
      return list.databases[0].$id;
    }
  } catch (error: any) {
    console.error("❌ Erreur:", error.message);
  }
}

listDatabases();
