import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _supabase;
}

export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _supabaseAdmin;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return (getSupabase() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return (getSupabaseAdmin() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export type Profile = {
  id: string;
  email: string;
  name: string | null;
  tier: "free" | "pro";
  referral_code: string;
  referred_by: string | null;
  created_at: string;
};

export type TestResult = {
  id: string;
  user_id: string | null;
  session_id: string;
  score: number;
  categories: Record<string, number>;
  badge: string;
  badge_color: string;
  description: string;
  ai_interpretation: string | null;
  share_hook: string | null;
  created_at: string;
};

export type Referral = {
  id: string;
  inviter_id: string;
  invitee_email: string;
  invitee_session_id: string | null;
  status: "pending" | "completed";
  created_at: string;
};

export type SocialValidation = {
  id: string;
  result_id: string;
  validator_session_id: string;
  answers: Record<string, number>;
  created_at: string;
};
