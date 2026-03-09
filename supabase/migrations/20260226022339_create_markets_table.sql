-- Enable UUID generation if not already enabled
create extension if not exists "uuid-ossp";

-- ========================
-- MARKETS TABLE
-- ========================
create table public.markets (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  category text,
  image_url text,
  creator_id uuid references auth.users(id) on delete set null,
  resolution_source text,
  closes_at timestamptz not null,
  resolved_at timestamptz,
  outcome boolean,
  status text not null default 'open' check (status in ('open', 'closed', 'resolved', 'cancelled')),
  brand_name text,
  sub_category text,
  product_type text,
  similar_words text[],
  price numeric(10, 2),
  variant_type text,
  variant_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_markets_status on public.markets(status);
create index idx_markets_creator_id on public.markets(creator_id);
create index idx_markets_closes_at on public.markets(closes_at);
create index idx_markets_brand_name on public.markets(brand_name);
create index idx_markets_sub_category on public.markets(sub_category);
create index idx_markets_product_type on public.markets(product_type);

-- ========================
-- BETS TABLE
-- ========================
create table public.bets (
  id uuid primary key default uuid_generate_v4(),
  market_id uuid not null references public.markets(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(10, 2) not null check (amount > 0),
  side boolean not null,  -- true = YES, false = NO
  odds numeric(5, 4) not null check (odds > 0 and odds < 1),
  payout numeric(10, 2),
  status text not null default 'pending' check (status in ('pending', 'won', 'lost', 'cancelled', 'refunded')),
  settled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_bets_market_id on public.bets(market_id);
create index idx_bets_user_id on public.bets(user_id);
create index idx_bets_status on public.bets(status);

-- ========================
-- POSITIONS TABLE
-- ========================
create table public.positions (
  id uuid primary key default uuid_generate_v4(),
  market_id uuid not null references public.markets(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  side boolean not null,  -- true = YES, false = NO
  shares numeric(12, 4) not null default 0,
  avg_price numeric(5, 4) not null default 0,
  total_invested numeric(10, 2) not null default 0,
  realized_pnl numeric(10, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (market_id, user_id, side)
);

create index idx_positions_market_id on public.positions(market_id);
create index idx_positions_user_id on public.positions(user_id);

-- ========================
-- COMMENTS TABLE
-- ========================
create table public.comments (
  id uuid primary key default uuid_generate_v4(),
  market_id uuid not null references public.markets(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  parent_id uuid references public.comments(id) on delete cascade,
  body text not null check (char_length(body) > 0),
  is_edited boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_comments_market_id on public.comments(market_id);
create index idx_comments_user_id on public.comments(user_id);
create index idx_comments_parent_id on public.comments(parent_id);

-- ========================
-- ROW LEVEL SECURITY
-- ========================

-- Markets
alter table public.markets enable row level security;

create policy "Markets are viewable by everyone"
  on public.markets for select using (true);

create policy "Authenticated users can create markets"
  on public.markets for insert to authenticated
  with check (auth.uid() = creator_id);

create policy "Creators can update their own markets"
  on public.markets for update to authenticated
  using (auth.uid() = creator_id);

-- Bets
alter table public.bets enable row level security;

create policy "Users can view their own bets"
  on public.bets for select to authenticated
  using (auth.uid() = user_id);

create policy "Authenticated users can place bets"
  on public.bets for insert to authenticated
  with check (auth.uid() = user_id);

-- Positions
alter table public.positions enable row level security;

create policy "Users can view their own positions"
  on public.positions for select to authenticated
  using (auth.uid() = user_id);

create policy "Authenticated users can create positions"
  on public.positions for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own positions"
  on public.positions for update to authenticated
  using (auth.uid() = user_id);

-- Comments
alter table public.comments enable row level security;

create policy "Comments are viewable by everyone"
  on public.comments for select using (true);

create policy "Authenticated users can create comments"
  on public.comments for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own comments"
  on public.comments for update to authenticated
  using (auth.uid() = user_id);

create policy "Users can delete their own comments"
  on public.comments for delete to authenticated
  using (auth.uid() = user_id);

-- ========================
-- AUTO-UPDATE TRIGGERS
-- ========================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_markets_updated
  before update on public.markets
  for each row execute function public.handle_updated_at();

create trigger on_bets_updated
  before update on public.bets
  for each row execute function public.handle_updated_at();

create trigger on_positions_updated
  before update on public.positions
  for each row execute function public.handle_updated_at();

create trigger on_comments_updated
  before update on public.comments
  for each row execute function public.handle_updated_at();

