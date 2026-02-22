import { Client, Databases, ID } from "node-appwrite";

const endpoint = process.env.APPWRITE_ENDPOINT;
const projectId = process.env.APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

if (!endpoint || !projectId || !apiKey) {
  console.warn("Appwrite env vars missing: endpoint/projectId/apiKey");
}

let _client: Client | null = null;
let _db: Databases | null = null;

export function getAppwrite() {
  if (!_client) {
    _client = new Client();
    if (endpoint) _client.setEndpoint(endpoint);
    if (projectId) _client.setProject(projectId);
    if (apiKey) _client.setKey(apiKey);
  }
  if (!_db && _client) {
    _db = new Databases(_client);
  }
  if (!_client || !_db) throw new Error("Appwrite client not initialized");
  return { client: _client, db: _db };
}

export function newId() {
  return ID.unique();
}

export interface ResultDocument {
  user_id?: string | null;
  session_id: string;
  email?: string | null;
  name?: string | null;
  score: number;
  categories: Record<string, number>;
  badge: string;
  badge_color: string;
  description: string;
  ai_interpretation?: string | null;
  share_hook?: string | null;
  social_score?: number;
  premium_badge_unlocked?: boolean;
}

export interface ReferralDocument {
  inviter_id: string;
  invitee_email: string;
  invitee_session_id?: string | null;
  result_id?: string | null;
  status: "pending" | "completed";
}

export interface ValidationDocument {
  result_id: string;
  validator_session_id: string;
  answers: Record<string, number>;
}

export interface PaymentLogDocument {
  user_id?: string | null;
  email?: string | null;
  transaction_id: string;
  amount: number;
  currency: string;
  plan: "quarterly" | "annual";
  status: "pending" | "completed" | "failed";
  provider: string;
  provider_ref?: string | null;
  payment_method?: string | null;
  phone?: string | null;
  error?: string | null;
  paid_at?: string | null;
}

export const appwriteConfig = {
  databaseId: process.env.APPWRITE_DATABASE_ID || "",
  collections: {
    results: process.env.APPWRITE_COLLECTION_RESULTS || "",
    referrals: process.env.APPWRITE_COLLECTION_REFERRALS || "",
    validations: process.env.APPWRITE_COLLECTION_VALIDATIONS || "",
    payments: process.env.APPWRITE_COLLECTION_PAYMENTS || "",
  },
};

export function ensureAppwriteConfig() {
  if (!endpoint || !projectId || !apiKey) throw new Error("Appwrite credentials missing");
  if (!appwriteConfig.databaseId) throw new Error("APPWRITE_DATABASE_ID missing");
  const cols = appwriteConfig.collections;
  if (!cols.results || !cols.referrals || !cols.validations || !cols.payments) {
    throw new Error("Appwrite collection IDs missing");
  }
}
