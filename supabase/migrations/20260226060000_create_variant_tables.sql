-- Create variant_types table
CREATE TABLE public.variant_types (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  market_id uuid NOT NULL REFERENCES public.markets(id) ON DELETE CASCADE,
  name text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_variant_types_market_id ON public.variant_types(market_id);

-- Create variant_names table (the actual options displayed in charts)
CREATE TABLE public.variant_names (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  variant_type_id uuid NOT NULL REFERENCES public.variant_types(id) ON DELETE CASCADE,
  name text NOT NULL,
  color_hex text DEFAULT '#999',
  votes integer NOT NULL DEFAULT 0,
  preorders integer NOT NULL DEFAULT 0,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_variant_names_variant_type_id ON public.variant_names(variant_type_id);

-- Enable RLS
ALTER TABLE public.variant_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.variant_names ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Variant types are viewable by everyone"
  ON public.variant_types FOR SELECT USING (true);

CREATE POLICY "Variant names are viewable by everyone"
  ON public.variant_names FOR SELECT USING (true);

-- Seed: On Running — variant_type = "Color"
INSERT INTO public.variant_types (id, market_id, name, position)
SELECT uuid_generate_v4(), id, 'Color', 1 FROM public.markets WHERE brand_name = 'On';

INSERT INTO public.variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Cloud White', '#F5F5F0', 85, 22, 1
FROM public.variant_types vt JOIN public.markets m ON m.id = vt.market_id WHERE m.brand_name = 'On' AND vt.name = 'Color'
UNION ALL
SELECT vt.id, 'All Black', '#1A1A1A', 72, 18, 2
FROM public.variant_types vt JOIN public.markets m ON m.id = vt.market_id WHERE m.brand_name = 'On' AND vt.name = 'Color'
UNION ALL
SELECT vt.id, 'Moss Green', '#5A7247', 43, 10, 3
FROM public.variant_types vt JOIN public.markets m ON m.id = vt.market_id WHERE m.brand_name = 'On' AND vt.name = 'Color';

-- Seed: SKIMS — variant_type = "Style"
INSERT INTO public.variant_types (id, market_id, name, position)
SELECT uuid_generate_v4(), id, 'Style', 1 FROM public.markets WHERE brand_name = 'SKIMS';

INSERT INTO public.variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Fits Everybody', '#D4A89C', 130, 40, 1
FROM public.variant_types vt JOIN public.markets m ON m.id = vt.market_id WHERE m.brand_name = 'SKIMS' AND vt.name = 'Style'
UNION ALL
SELECT vt.id, 'Soft Lounge', '#8B6F5E', 95, 30, 2
FROM public.variant_types vt JOIN public.markets m ON m.id = vt.market_id WHERE m.brand_name = 'SKIMS' AND vt.name = 'Style'
UNION ALL
SELECT vt.id, 'Cotton', '#C9B8A8', 30, 8, 3
FROM public.variant_types vt JOIN public.markets m ON m.id = vt.market_id WHERE m.brand_name = 'SKIMS' AND vt.name = 'Style';

-- Seed: Alo — variant_type = "Category"
INSERT INTO public.variant_types (id, market_id, name, position)
SELECT uuid_generate_v4(), id, 'Category', 1 FROM public.markets WHERE brand_name = 'Alo';

INSERT INTO public.variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Leggings', '#7B5EA7', 75, 20, 1
FROM public.variant_types vt JOIN public.markets m ON m.id = vt.market_id WHERE m.brand_name = 'Alo' AND vt.name = 'Category'
UNION ALL
SELECT vt.id, 'Sports Bras', '#E85D75', 60, 15, 2
FROM public.variant_types vt JOIN public.markets m ON m.id = vt.market_id WHERE m.brand_name = 'Alo' AND vt.name = 'Category'
UNION ALL
SELECT vt.id, 'Jackets', '#4A90D9', 45, 12, 3
FROM public.variant_types vt JOIN public.markets m ON m.id = vt.market_id WHERE m.brand_name = 'Alo' AND vt.name = 'Category';

-- Seed: Stanley — variant_type = "Color"
INSERT INTO public.variant_types (id, market_id, name, position)
SELECT uuid_generate_v4(), id, 'Color', 1 FROM public.markets WHERE brand_name = 'Stanley';

INSERT INTO public.variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Quencher Pink', '#F4A7BB', 55, 14, 1
FROM public.variant_types vt JOIN public.markets m ON m.id = vt.market_id WHERE m.brand_name = 'Stanley' AND vt.name = 'Color'
UNION ALL
SELECT vt.id, 'Cream', '#F5F0E8', 50, 16, 2
FROM public.variant_types vt JOIN public.markets m ON m.id = vt.market_id WHERE m.brand_name = 'Stanley' AND vt.name = 'Color'
UNION ALL
SELECT vt.id, 'Alpine Green', '#3B6B4A', 48, 10, 3
FROM public.variant_types vt JOIN public.markets m ON m.id = vt.market_id WHERE m.brand_name = 'Stanley' AND vt.name = 'Color';

-- Seed: Ilia — variant_type = "Product"
INSERT INTO public.variant_types (id, market_id, name, position)
SELECT uuid_generate_v4(), id, 'Product', 1 FROM public.markets WHERE brand_name = 'Ilia';

INSERT INTO public.variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Super Serum Skin Tint', '#E8C4A0', 100, 30, 1
FROM public.variant_types vt JOIN public.markets m ON m.id = vt.market_id WHERE m.brand_name = 'Ilia' AND vt.name = 'Product'
UNION ALL
SELECT vt.id, 'Limitless Lash Mascara', '#2C2C2C', 80, 20, 2
FROM public.variant_types vt JOIN public.markets m ON m.id = vt.market_id WHERE m.brand_name = 'Ilia' AND vt.name = 'Product'
UNION ALL
SELECT vt.id, 'Multi-Stick', '#C4726C', 40, 10, 3
FROM public.variant_types vt JOIN public.markets m ON m.id = vt.market_id WHERE m.brand_name = 'Ilia' AND vt.name = 'Product';

-- Seed: Rhode — variant_type = "Product"
INSERT INTO public.variant_types (id, market_id, name, position)
SELECT uuid_generate_v4(), id, 'Product', 1 FROM public.markets WHERE brand_name = 'Rhode';

INSERT INTO public.variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Lip Peptide Treatment', '#E07B7B', 110, 35, 1
FROM public.variant_types vt JOIN public.markets m ON m.id = vt.market_id WHERE m.brand_name = 'Rhode' AND vt.name = 'Product'
UNION ALL
SELECT vt.id, 'Glazing Milk', '#F0D6C8', 88, 25, 2
FROM public.variant_types vt JOIN public.markets m ON m.id = vt.market_id WHERE m.brand_name = 'Rhode' AND vt.name = 'Product'
UNION ALL
SELECT vt.id, 'Barrier Butter', '#D4B896', 50, 12, 3
FROM public.variant_types vt JOIN public.markets m ON m.id = vt.market_id WHERE m.brand_name = 'Rhode' AND vt.name = 'Product';
