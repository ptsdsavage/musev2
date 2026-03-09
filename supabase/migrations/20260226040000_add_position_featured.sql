-- Add position and featured columns
ALTER TABLE public.markets ADD COLUMN position integer NOT NULL DEFAULT 0;
ALTER TABLE public.markets ADD COLUMN featured boolean NOT NULL DEFAULT false;

-- Create index for common homepage query
CREATE INDEX idx_markets_featured ON public.markets(featured);
CREATE INDEX idx_markets_position ON public.markets(position);

-- Update existing seed data with positions and featured status
UPDATE public.markets SET position = 1, featured = true WHERE brand_name = 'On';
UPDATE public.markets SET position = 2, featured = true WHERE brand_name = 'SKIMS';
UPDATE public.markets SET position = 3, featured = true WHERE brand_name = 'Alo';
UPDATE public.markets SET position = 4, featured = true WHERE brand_name = 'Stanley';
UPDATE public.markets SET position = 5, featured = true WHERE brand_name = 'Ilia';
UPDATE public.markets SET position = 6, featured = true WHERE brand_name = 'Rhode';
