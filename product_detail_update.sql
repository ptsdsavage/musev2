-- Clear existing variant_names and variant_types
DELETE FROM variant_names;
DELETE FROM variant_types;

-- Create variant_types for each market
INSERT INTO variant_types (market_id, name, position)
SELECT id, 'Color', 1 FROM markets WHERE brand_name = 'SKIMS';

INSERT INTO variant_types (market_id, name, position)
SELECT id, 'Color', 1 FROM markets WHERE brand_name = 'Alo';

INSERT INTO variant_types (market_id, name, position)
SELECT id, 'Color', 1 FROM markets WHERE brand_name = 'Stanley';

INSERT INTO variant_types (market_id, name, position)
SELECT id, 'Product', 1 FROM markets WHERE brand_name = 'Ilia';

INSERT INTO variant_types (market_id, name, position)
SELECT id, 'Color', 1 FROM markets WHERE brand_name = 'Rhode';

INSERT INTO variant_types (market_id, name, position)
SELECT id, 'Color', 1 FROM markets WHERE brand_name = 'On';

-- SKIMS variants
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Multi Animal', '#8B6F5E', 130, 40, 1 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'SKIMS';
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Bloom', '#E8A0B4', 95, 30, 2 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'SKIMS';

-- Alo variants
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Bright Red', '#E02020', 75, 20, 1 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'Alo';
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Candy Pink', '#FF69B4', 60, 15, 2 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'Alo';
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Wild Rose', '#C76D7E', 45, 12, 3 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'Alo';

-- Stanley variants
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Blue Sky', '#87CEEB', 55, 14, 1 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'Stanley';
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Daffodil', '#FFD700', 50, 16, 2 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'Stanley';
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Peach Rose', '#FFDAB9', 48, 10, 3 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'Stanley';
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Coastal Teal', '#3AAFA9', 42, 8, 4 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'Stanley';

-- Ilia variants
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Liquid Powder Eye Tint', '#C4A882', 100, 30, 1 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'Ilia';
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Skin Blur', '#E8C4A0', 80, 20, 2 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'Ilia';
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Serum Concealer', '#D4A876', 40, 10, 3 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'Ilia';

-- Rhode variants
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Jelly Bean', '#E07B7B', 110, 35, 1 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'Rhode';
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Salty Tan', '#D2B48C', 88, 25, 2 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'Rhode';
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Expresso', '#4A2C2A', 50, 12, 3 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'Rhode';

-- On variants
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Iceberg', '#D6ECF0', 85, 22, 1 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'On';
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Olice', '#808000', 72, 18, 2 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'On';
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Wolf', '#6B6B6B', 60, 15, 3 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'On';
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Sailor', '#1F3A5F', 55, 12, 4 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'On';
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Pearl', '#F0EAD6', 48, 10, 5 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'On';
INSERT INTO variant_names (variant_type_id, name, color_hex, votes, preorders, position)
SELECT vt.id, 'Tangerine', '#FF9944', 43, 8, 6 FROM variant_types vt JOIN markets m ON m.id = vt.market_id WHERE m.brand_name = 'On';
