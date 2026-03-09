CREATE TABLE public.users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Identity
  email text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  display_name text,
  avatar_url text,
  phone text,

  -- Shopper profile
  shipping_address_line1 text,
  shipping_address_line2 text,
  shipping_city text,
  shipping_state text,
  shipping_zip text,
  shipping_country text DEFAULT 'US',

  -- Predictor profile
  trend_iq_score integer NOT NULL DEFAULT 0,
  points_balance integer NOT NULL DEFAULT 100,   -- spendable vote points
  total_votes integer NOT NULL DEFAULT 0,
  total_preorders integer NOT NULL DEFAULT 0,
  correct_picks integer NOT NULL DEFAULT 0,
  streak integer NOT NULL DEFAULT 0,
  best_streak integer NOT NULL DEFAULT 0,
  global_rank integer,

  -- Engagement
  referral_code text UNIQUE,
  referred_by uuid REFERENCES public.users(id) ON DELETE SET NULL,
  onboarding_completed boolean NOT NULL DEFAULT false,

  -- Auth / system
  auth_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,  -- links to Supabase Auth
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'deleted')),
  last_login_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_username ON public.users(username);
CREATE INDEX idx_users_auth_id ON public.users(auth_id);
CREATE INDEX idx_users_trend_iq_score ON public.users(trend_iq_score DESC);
CREATE INDEX idx_users_global_rank ON public.users(global_rank);