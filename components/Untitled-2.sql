-- ========================
-- ORDERS TABLE
-- ========================
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  market_id uuid NOT NULL REFERENCES public.markets(id) ON DELETE CASCADE,
  option_id uuid NOT NULL REFERENCES public.variant_names(id) ON DELETE CASCADE,

  -- Order details
  kind text NOT NULL CHECK (kind IN ('vote', 'preorder')),
  quantity integer NOT NULL DEFAULT 1,
  unit_price numeric(10, 2),
  total_price numeric(10, 2),
  discount_pct numeric(5, 2) DEFAULT 0,        -- predictor discount applied
  points_spent integer NOT NULL DEFAULT 0,       -- vote points used

  -- Fulfillment
  status text NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending',        -- awaiting market resolution
    'confirmed',      -- prediction was correct, order confirmed
    'cancelled',      -- prediction wrong or user cancelled
    'shipped',
    'delivered',
    'refunded'
  )),
  shipping_address jsonb,                        -- snapshot at time of order
  tracking_number text,
  shipped_at timestamptz,
  delivered_at timestamptz,

  -- Prediction outcome
  prediction_correct boolean,                    -- null until market resolves
  resolved_at timestamptz,
  points_earned integer DEFAULT 0,               -- points awarded if correct

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_market_id ON public.orders(market_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_kind ON public.orders(kind);

-- ========================
-- REWARDS TABLE
-- ========================
CREATE TABLE public.rewards (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Reward definition
  type text NOT NULL CHECK (type IN (
    'points',            -- earned vote points
    'discount',          -- predictor discount unlock
    'early_access',      -- early access to a drop
    'free_shipping',
    'bonus_multiplier',  -- temporary score multiplier
    'referral_bonus'
  )),
  title text NOT NULL,
  description text,
  image_url text,

  -- Value
  points_amount integer DEFAULT 0,               -- for points-type rewards
  discount_pct numeric(5, 2) DEFAULT 0,          -- for discount-type rewards
  multiplier numeric(3, 1) DEFAULT 1.0,          -- for bonus multiplier rewards

  -- Source
  source_type text CHECK (source_type IN ('vote', 'preorder', 'streak', 'badge', 'referral', 'system')),
  source_id uuid,                                -- FK to order/badge that triggered it
  market_id uuid REFERENCES public.markets(id) ON DELETE SET NULL,

  -- Lifecycle
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'redeemed', 'expired')),
  redeemed_at timestamptz,
  expires_at timestamptz,

  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_rewards_user_id ON public.rewards(user_id);
CREATE INDEX idx_rewards_type ON public.rewards(type);
CREATE INDEX idx_rewards_status ON public.rewards(status);
CREATE INDEX idx_rewards_expires_at ON public.rewards(expires_at);

-- ========================
-- BADGES TABLE
-- ========================
CREATE TABLE public.badges (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Badge definition (shared across all users)
  slug text UNIQUE NOT NULL,                     -- e.g. 'first_vote', 'streak_5'
  title text NOT NULL,
  description text,
  icon_url text,
  category text NOT NULL CHECK (category IN (
    'milestone',     -- first vote, 10th vote, etc.
    'streak',        -- 3-day streak, 7-day streak
    'accuracy',      -- 50% correct, 80% correct
    'social',        -- first referral, 5 friends
    'shopping',      -- first preorder, first delivery
    'special'        -- limited edition, seasonal
  )),

  -- Unlock criteria
  criteria_type text NOT NULL,                   -- e.g. 'total_votes', 'streak', 'correct_pct'
  criteria_threshold integer NOT NULL DEFAULT 1, -- e.g. 5 for "5 votes"
  points_reward integer NOT NULL DEFAULT 0,      -- points granted on unlock
  rarity text NOT NULL DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),

  position integer DEFAULT 0,                    -- display order
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_badges_slug ON public.badges(slug);
CREATE INDEX idx_badges_category ON public.badges(category);

-- ========================
-- USER_BADGES (join table)
-- ========================
CREATE TABLE public.user_badges (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  badge_id uuid NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  unlocked_at timestamptz NOT NULL DEFAULT now(),

  UNIQUE (user_id, badge_id)
);

CREATE INDEX idx_user_badges_user_id ON public.user_badges(user_id);
CREATE INDEX idx_user_badges_badge_id ON public.user_badges(badge_id);