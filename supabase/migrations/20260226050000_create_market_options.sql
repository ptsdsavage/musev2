-- Create market_options table
CREATE TABLE public.market_options (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  market_id uuid NOT NULL REFERENCES public.markets(id) ON DELETE CASCADE,
  name text NOT NULL,
  color_hex text DEFAULT '#999',
  votes integer NOT NULL DEFAULT 0,
  preorders integer NOT NULL DEFAULT 0,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_market_options_market_id ON public.market_options(market_id);

-- Enable RLS
ALTER TABLE public.market_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Market options are viewable by everyone"
  ON public.market_options FOR SELECT USING (true);

-- Seed options for each market
-- On Running
INSERT INTO public.market_options (market_id, name, color_hex, votes, preorders, position)
SELECT id, '🔥 Hot', '#E85D3A', 142, 38, 1 FROM public.markets WHERE brand_name = 'On'
UNION ALL
SELECT id, '🧊 Not', '#5B8DEF', 58, 12, 2 FROM public.markets WHERE brand_name = 'On';

-- SKIMS
INSERT INTO public.market_options (market_id, name, color_hex, votes, preorders, position)
SELECT id, '🔥 Hot', '#E85D3A', 210, 65, 1 FROM public.markets WHERE brand_name = 'SKIMS'
UNION ALL
SELECT id, '🧊 Not', '#5B8DEF', 45, 8, 2 FROM public.markets WHERE brand_name = 'SKIMS';

-- Alo
INSERT INTO public.market_options (market_id, name, color_hex, votes, preorders, position)
SELECT id, '🔥 Hot', '#E85D3A', 120, 30, 1 FROM public.markets WHERE brand_name = 'Alo'
UNION ALL
SELECT id, '🧊 Not', '#5B8DEF', 80, 20, 2 FROM public.markets WHERE brand_name = 'Alo';

-- Stanley
INSERT INTO public.market_options (market_id, name, color_hex, votes, preorders, position)
SELECT id, '🔥 Hot', '#E85D3A', 95, 22, 1 FROM public.markets WHERE brand_name = 'Stanley'
UNION ALL
SELECT id, '🧊 Not', '#5B8DEF', 105, 28, 2 FROM public.markets WHERE brand_name = 'Stanley';

-- Ilia
INSERT INTO public.market_options (market_id, name, color_hex, votes, preorders, position)
SELECT id, '🔥 Hot', '#E85D3A', 165, 45, 1 FROM public.markets WHERE brand_name = 'Ilia'
UNION ALL
SELECT id, '🧊 Not', '#5B8DEF', 35, 5, 2 FROM public.markets WHERE brand_name = 'Ilia';

-- Rhode
INSERT INTO public.market_options (market_id, name, color_hex, votes, preorders, position)
SELECT id, '🔥 Hot', '#E85D3A', 188, 55, 1 FROM public.markets WHERE brand_name = 'Rhode'
UNION ALL
SELECT id, '🧊 Not', '#5B8DEF', 62, 15, 2 FROM public.markets WHERE brand_name = 'Rhode';
