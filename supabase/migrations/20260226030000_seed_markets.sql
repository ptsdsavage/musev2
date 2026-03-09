-- Seed markets with product images
insert into public.markets (title, description, brand_name, category, sub_category, product_type, image_url, price, status, closes_at) values
  ('Alo Yoga', 'Will Alo Yoga be the top athleisure brand this season?', 'Alo', 'Fashion', 'Athleisure', 'Apparel', '/images/markets/alomarket.png', 0.00, 'open', now() + interval '30 days'),
  ('Ilia Beauty', 'Will Ilia dominate the clean beauty market?', 'Ilia', 'Beauty', 'Clean Beauty', 'Skincare', '/images/markets/Iliamarket.png', 0.00, 'open', now() + interval '30 days'),
  ('On Running', 'Will On Running overtake Nike in the running category?', 'On', 'Fashion', 'Footwear', 'Sneakers', '/images/markets/onmarket.png', 0.00, 'open', now() + interval '30 days'),
  ('Rhode Skin', 'Will Rhode Skin be the breakout beauty brand of the year?', 'Rhode', 'Beauty', 'Skincare', 'Skincare', '/images/markets/rhodemarket.png', 0.00, 'open', now() + interval '30 days'),
  ('SKIMS', 'Will SKIMS continue to lead the shapewear category?', 'SKIMS', 'Fashion', 'Shapewear', 'Apparel', '/images/markets/skimsmarket.png', 0.00, 'open', now() + interval '30 days'),
  ('Stanley', 'Will Stanley cups remain the top trending drinkware?', 'Stanley', 'Lifestyle', 'Drinkware', 'Accessories', '/images/markets/stanleymarket.png', 0.00, 'open', now() + interval '30 days');
