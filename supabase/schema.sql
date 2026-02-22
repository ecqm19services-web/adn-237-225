-- ADN_237_225 — Supabase Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  name TEXT,
  tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'pro')),
  referral_code TEXT UNIQUE DEFAULT substr(md5(random()::text), 1, 8),
  referred_by UUID REFERENCES profiles(id),
  premium_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Test results table
CREATE TABLE IF NOT EXISTS test_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  session_id TEXT NOT NULL,
  email TEXT,
  name TEXT,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  categories JSONB NOT NULL DEFAULT '{}',
  badge TEXT NOT NULL,
  badge_color TEXT NOT NULL,
  description TEXT NOT NULL,
  ai_interpretation TEXT,
  share_hook TEXT,
  social_score INTEGER CHECK (social_score >= 0 AND social_score <= 100),
  premium_badge_unlocked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id TEXT PRIMARY KEY,
  inviter_id TEXT NOT NULL,
  invitee_email TEXT NOT NULL,
  invitee_session_id TEXT,
  result_id UUID REFERENCES test_results(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Social validations table
CREATE TABLE IF NOT EXISTS social_validations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  result_id UUID NOT NULL REFERENCES test_results(id) ON DELETE CASCADE,
  validator_session_id TEXT NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(result_id, validator_session_id)
);

-- Payment logs table
CREATE TABLE IF NOT EXISTS payment_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  email TEXT,
  transaction_id TEXT UNIQUE NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'XOF',
  plan TEXT NOT NULL CHECK (plan IN ('quarterly', 'annual')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  provider TEXT NOT NULL DEFAULT 'cinetpay',
  provider_ref TEXT,
  payment_method TEXT,
  phone TEXT,
  error TEXT,
  paid_at TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_test_results_session ON test_results(session_id);
CREATE INDEX IF NOT EXISTS idx_test_results_user ON test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_inviter ON referrals(inviter_id);
CREATE INDEX IF NOT EXISTS idx_social_validations_result ON social_validations(result_id);
CREATE INDEX IF NOT EXISTS idx_payment_logs_email ON payment_logs(email);
CREATE INDEX IF NOT EXISTS idx_payment_logs_transaction ON payment_logs(transaction_id);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_validations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_logs ENABLE ROW LEVEL SECURITY;

-- Policies: allow service role full access (API routes use service role key)
-- Public read for test results by session (for sharing)
CREATE POLICY "Public read test results by id" ON test_results
  FOR SELECT USING (true);

CREATE POLICY "Service role full access profiles" ON profiles
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access test_results" ON test_results
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access referrals" ON referrals
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access social_validations" ON social_validations
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access payment_logs" ON payment_logs
  FOR ALL USING (auth.role() = 'service_role');
