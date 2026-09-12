-- Seed initial meal pairing data (comprehensive dataset)

-- ============================================
-- INGREDIENTS
-- ============================================

-- Proteins
INSERT INTO ingredients (name, category, seasonal_availability) VALUES
('Chicken breast', 'protein', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Chicken thighs', 'protein', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Ground beef', 'protein', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Beef tenderloin', 'protein', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Salmon', 'protein', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Halibut', 'protein', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Shrimp', 'protein', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Scallops', 'protein', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Ground turkey', 'protein', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Duck breast', 'protein', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Lamb', 'protein', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Pancetta', 'protein', '{"spring": true, "summer": true, "fall": true, "winter": true}');

-- Carbs
INSERT INTO ingredients (name, category, seasonal_availability) VALUES
('Angel hair pasta', 'carb', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Spaghetti', 'carb', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Penne', 'carb', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Fettuccine', 'carb', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Risotto rice', 'carb', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Jasmine rice', 'carb', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Arborio rice', 'carb', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Potatoes', 'carb', '{"spring": false, "summer": true, "fall": true, "winter": true}'),
('Sweet potatoes', 'carb', '{"spring": false, "summer": false, "fall": true, "winter": true}'),
('Couscous', 'carb', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Polenta', 'carb', '{"spring": true, "summer": true, "fall": true, "winter": true}');

-- Vegetables
INSERT INTO ingredients (name, category, seasonal_availability) VALUES
('Broccoli', 'vegetable', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Spinach', 'vegetable', '{"spring": true, "summer": false, "fall": true, "winter": true}'),
('Tomatoes', 'vegetable', '{"spring": false, "summer": true, "fall": true, "winter": false}'),
('Cherry tomatoes', 'vegetable', '{"spring": false, "summer": true, "fall": true, "winter": false}'),
('Bell peppers', 'vegetable', '{"spring": false, "summer": true, "fall": true, "winter": false}'),
('Mushrooms', 'vegetable', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Porcini mushrooms', 'vegetable', '{"spring": false, "summer": false, "fall": true, "winter": true}'),
('Garlic', 'vegetable', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Onion', 'vegetable', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Shallots', 'vegetable', '{"spring": false, "summer": true, "fall": true, "winter": true}'),
('Asparagus', 'vegetable', '{"spring": true, "summer": true, "fall": false, "winter": false}'),
('Zucchini', 'vegetable', '{"spring": false, "summer": true, "fall": true, "winter": false}'),
('Eggplant', 'vegetable', '{"spring": false, "summer": true, "fall": true, "winter": false}'),
('Arugula', 'vegetable', '{"spring": true, "summer": false, "fall": true, "winter": true}'),
('Kale', 'vegetable', '{"spring": true, "summer": false, "fall": true, "winter": true}'),
('Beets', 'vegetable', '{"spring": false, "summer": true, "fall": true, "winter": true}');

-- Dairy
INSERT INTO ingredients (name, category, seasonal_availability) VALUES
('Parmesan cheese', 'dairy', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Mozzarella', 'dairy', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Ricotta', 'dairy', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Goat cheese', 'dairy', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Mascarpone', 'dairy', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Heavy cream', 'dairy', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Butter', 'dairy', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Feta cheese', 'dairy', '{"spring": true, "summer": true, "fall": true, "winter": true}');

-- Spices & Herbs
INSERT INTO ingredients (name, category, seasonal_availability) VALUES
('Basil', 'spice', '{"spring": true, "summer": true, "fall": false, "winter": false}'),
('Oregano', 'spice', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Thyme', 'spice', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Rosemary', 'spice', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Sage', 'spice', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Parsley', 'spice', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Black pepper', 'spice', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Saffron', 'spice', '{"spring": false, "summer": false, "fall": true, "winter": false}'),
('Paprika', 'spice', '{"spring": true, "summer": true, "fall": true, "winter": true}');

-- ============================================
-- MEALS (20+ diverse options)
-- ============================================

INSERT INTO meals (name, description, base_price, cuisine_type, difficulty_level, prep_time_mins) VALUES
('Chicken Parmesan', 'Crispy breaded chicken topped with marinara and melted mozzarella', 14.99, 'Italian', 'medium', 30),
('Shrimp Scampi with Angel Hair', 'Succulent shrimp in garlic butter sauce over tender angel hair pasta', 16.99, 'Italian', 'easy', 20),
('Beef Bolognese', 'Rich meat sauce over fresh pasta with Parmesan', 15.99, 'Italian', 'medium', 40),
('Salmon with Garlic Butter', 'Pan-seared salmon with garlic butter and fresh herbs', 18.99, 'French', 'easy', 25),
('Mushroom Risotto', 'Creamy arborio rice with sautéed mushrooms and Parmesan', 12.99, 'Italian', 'medium', 35),
('Spinach and Ricotta Ravioli', 'Homemade ravioli with spinach and ricotta filling in cream sauce', 13.99, 'Italian', 'hard', 60),
('Duck Confit with Polenta', 'Slow-roasted duck leg served over creamy polenta with herbs', 22.99, 'French', 'hard', 90),
('Lamb Chops with Rosemary', 'Grilled lamb chops with fresh rosemary and garlic', 24.99, 'Mediterranean', 'medium', 25),
('Scallops with Saffron Risotto', 'Pan-seared scallops over aromatic saffron risotto', 25.99, 'Italian', 'hard', 45),
('Halibut with Asparagus', 'Delicate halibut fillet with spring asparagus and lemon', 21.99, 'French', 'easy', 22),
('Penne alla Vodka', 'Smooth tomato and vodka cream sauce with a hint of spice', 13.99, 'Italian', 'easy', 25),
('Chicken Piccata', 'Tender chicken cutlets with capers and white wine sauce', 14.99, 'Italian', 'easy', 20),
('Eggplant Parmesan', 'Layers of breaded eggplant with tomato sauce and mozzarella', 12.99, 'Italian', 'medium', 40),
('Beef Tenderloin', 'Prime aged beef with peppercorn crust and demi-glace', 28.99, 'French', 'hard', 35),
('Shrimp Risotto with Zucchini', 'Creamy risotto with fresh shrimp and summer zucchini', 17.99, 'Italian', 'medium', 40),
('Fettuccine Alfredo', 'Classic creamy Parmesan sauce over fresh fettuccine', 11.99, 'Italian', 'easy', 15),
('Chicken with Mushrooms', 'Sautéed chicken thighs with porcini mushrooms and cream', 15.99, 'French', 'medium', 30),
('Goat Cheese and Arugula Pasta', 'Fresh pasta with creamy goat cheese and peppery arugula', 12.99, 'Italian', 'easy', 18),
('Lamb Tagine', 'Moroccan-style braised lamb with dried fruits and spices', 19.99, 'North African', 'medium', 50),
('Seafood Pasta', 'Mixed shrimp and scallops in white wine garlic sauce', 18.99, 'Italian', 'medium', 30);

-- ============================================
-- PAIRINGS - WINES
-- ============================================

INSERT INTO pairings (name, type, description, price, flavor_profile, seasonal_availability) VALUES
('Chianti', 'wine', 'Classic Italian red with cherry notes', 25.99, 'fruity, earthy', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Pinot Grigio', 'wine', 'Crisp white wine with citrus and green apple notes', 22.99, 'crisp, fresh', '{"spring": true, "summer": true, "fall": false, "winter": true}'),
('Sauvignon Blanc', 'wine', 'Zesty white with tropical fruit notes', 24.99, 'zesty, fruity', '{"spring": true, "summer": true, "fall": true, "winter": false}'),
('Pinot Noir', 'wine', 'Elegant light red with berry flavors', 28.99, 'fruity, silky', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Cabernet Sauvignon', 'wine', 'Bold red with dark fruit and tannins', 32.99, 'bold, rich', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Barbera', 'wine', 'Italian red with acid and cherry depth', 26.99, 'fruity, acidic', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Riesling', 'wine', 'Off-dry white with floral notes', 23.99, 'floral, fruity', '{"spring": true, "summer": true, "fall": false, "winter": true}'),
('Chardonnay', 'wine', 'Rich white with oak and butter notes', 29.99, 'buttery, complex', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Prosecco', 'wine', 'Italian sparkling wine, light and festive', 19.99, 'bubbly, fruity', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Albariño', 'wine', 'Crisp Spanish white perfect for seafood', 24.99, 'citrus, mineral', '{"spring": false, "summer": true, "fall": true, "winter": false}'),
('Valpolicella', 'wine', 'Light Italian red with cherry and spice', 27.99, 'fruity, spicy', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Vermentino', 'wine', 'Coastal Italian white with sea salt notes', 23.99, 'mineral, citrus', '{"spring": false, "summer": true, "fall": false, "winter": false}');

-- ============================================
-- PAIRINGS - SPIRITS
-- ============================================

INSERT INTO pairings (name, type, description, price, flavor_profile, seasonal_availability) VALUES
('Limoncello', 'spirit', 'Italian lemon liqueur, best served cold', 18.99, 'citrus, sweet', '{"spring": false, "summer": true, "fall": false, "winter": false}'),
('Amaretto', 'spirit', 'Almond-flavored liqueur', 20.99, 'sweet, almond', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Prosecco Superiore', 'spirit', 'Premium Italian sparkling wine', 24.99, 'bubbly, elegant', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Frangelico', 'spirit', 'Hazelnut liqueur with herbal notes', 21.99, 'nutty, herbal', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Pisco', 'spirit', 'South American brandy, bright and fruity', 22.99, 'fruity, clean', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Vermouth Rosso', 'spirit', 'Italian fortified wine with herbs and spices', 19.99, 'herbal, sweet', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Grappa', 'spirit', 'Italian grape brandy, strong and aromatic', 25.99, 'strong, fruity', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Sambuca', 'spirit', 'Anise-flavored liqueur', 17.99, 'anise, sweet', '{"spring": true, "summer": true, "fall": true, "winter": true}');

-- ============================================
-- PAIRINGS - DESSERTS
-- ============================================

INSERT INTO pairings (name, type, description, price, flavor_profile, seasonal_availability) VALUES
('Tiramisu', 'dessert', 'Traditional Italian dessert with mascarpone and espresso', 8.99, 'coffee, creamy', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Panna Cotta with Berry Sauce', 'dessert', 'Silky Italian custard with fresh berry coulis', 9.99, 'creamy, fruity', '{"spring": true, "summer": true, "fall": true, "winter": false}'),
('Zabaglione', 'dessert', 'Light Italian custard with Marsala wine', 10.99, 'sweet, light', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Lemon Gelato', 'dessert', 'Refreshing Italian lemon ice cream', 7.99, 'citrus, sweet', '{"spring": false, "summer": true, "fall": false, "winter": false}'),
('Pistachio Gelato', 'dessert', 'Creamy gelato with real pistachios', 8.99, 'nutty, creamy', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Affogato', 'dessert', 'Vanilla gelato with hot espresso poured over', 6.99, 'coffee, vanilla', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Panettone', 'dessert', 'Traditional Italian cake with dried fruits', 9.99, 'fruity, sweet', '{"spring": false, "summer": false, "fall": false, "winter": true}'),
('Panna Cotta with Passion Fruit', 'dessert', 'Silky custard with tropical passion fruit', 10.99, 'creamy, tropical', '{"spring": false, "summer": true, "fall": false, "winter": false}'),
('Chocolate Mousse', 'dessert', 'Rich dark chocolate mousse', 7.99, 'chocolate, rich', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Strawberry Semifreddo', 'dessert', 'Italian frozen dessert with fresh strawberries', 9.99, 'fruity, creamy', '{"spring": true, "summer": true, "fall": false, "winter": false}');

-- ============================================
-- PAIRINGS - FLOWERS
-- ============================================

INSERT INTO pairings (name, type, description, price, flavor_profile, seasonal_availability) VALUES
('Edible Violets', 'flower', 'Delicate purple flowers, candied or fresh', 3.99, 'floral, sweet', '{"spring": true, "summer": false, "fall": false, "winter": false}'),
('Basil Flowers', 'flower', 'Delicate purple-pink flowers with subtle basil flavor', 2.99, 'floral, herbaceous', '{"spring": false, "summer": true, "fall": true, "winter": false}'),
('Nasturtiums', 'flower', 'Bright orange and red edible flowers with peppery taste', 4.99, 'peppery, floral', '{"spring": true, "summer": true, "fall": true, "winter": false}'),
('Rose Petals', 'flower', 'Elegant garnish for special occasions', 5.99, 'floral, romantic', '{"spring": true, "summer": true, "fall": true, "winter": true}'),
('Pansies', 'flower', 'Colorful edible flowers with mild sweet taste', 3.99, 'floral, mild', '{"spring": true, "summer": false, "fall": true, "winter": false}'),
('Borage Flowers', 'flower', 'Delicate blue flowers with cucumber flavor', 4.99, 'floral, herbaceous', '{"spring": false, "summer": true, "fall": false, "winter": false}'),
('Chamomile Flowers', 'flower', 'Pale yellow flowers with subtle floral sweetness', 2.99, 'floral, subtle', '{"spring": false, "summer": true, "fall": true, "winter": false}'),
('Calendula', 'flower', 'Golden orange petals with peppery notes', 3.99, 'peppery, floral', '{"spring": false, "summer": true, "fall": true, "winter": false}');

-- ============================================
-- MEAL-INGREDIENT RELATIONSHIPS
-- ============================================

-- Chicken Parmesan
INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '2 breasts', true FROM meals m, ingredients i 
WHERE m.name = 'Chicken Parmesan' AND i.name = 'Chicken breast';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '1 lb', true FROM meals m, ingredients i 
WHERE m.name = 'Chicken Parmesan' AND i.name = 'Spaghetti';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '1 cup', true FROM meals m, ingredients i 
WHERE m.name = 'Chicken Parmesan' AND i.name = 'Mozzarella';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '1/4 cup', false FROM meals m, ingredients i 
WHERE m.name = 'Chicken Parmesan' AND i.name = 'Parmesan cheese';

-- Shrimp Scampi
INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '1 lb', true FROM meals m, ingredients i 
WHERE m.name = 'Shrimp Scampi with Angel Hair' AND i.name = 'Shrimp';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '12 oz', true FROM meals m, ingredients i 
WHERE m.name = 'Shrimp Scampi with Angel Hair' AND i.name = 'Angel hair pasta';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '8 cloves', true FROM meals m, ingredients i 
WHERE m.name = 'Shrimp Scampi with Angel Hair' AND i.name = 'Garlic';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '4 tbsp', true FROM meals m, ingredients i 
WHERE m.name = 'Shrimp Scampi with Angel Hair' AND i.name = 'Butter';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '2 tbsp', false FROM meals m, ingredients i 
WHERE m.name = 'Shrimp Scampi with Angel Hair' AND i.name = 'Parsley';

-- Beef Bolognese
INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '1 lb', true FROM meals m, ingredients i 
WHERE m.name = 'Beef Bolognese' AND i.name = 'Ground beef';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '1 lb', true FROM meals m, ingredients i 
WHERE m.name = 'Beef Bolognese' AND i.name = 'Spaghetti';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '2 cups', true FROM meals m, ingredients i 
WHERE m.name = 'Beef Bolognese' AND i.name = 'Tomatoes';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '1/2 cup', true FROM meals m, ingredients i 
WHERE m.name = 'Beef Bolognese' AND i.name = 'Parmesan cheese';

-- Salmon with Garlic Butter
INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '6 oz', true FROM meals m, ingredients i 
WHERE m.name = 'Salmon with Garlic Butter' AND i.name = 'Salmon';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '4 tbsp', true FROM meals m, ingredients i 
WHERE m.name = 'Salmon with Garlic Butter' AND i.name = 'Butter';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '4 cloves', true FROM meals m, ingredients i 
WHERE m.name = 'Salmon with Garlic Butter' AND i.name = 'Garlic';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '1 tbsp', false FROM meals m, ingredients i 
WHERE m.name = 'Salmon with Garlic Butter' AND i.name = 'Thyme';

-- Mushroom Risotto
INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '1.5 cups', true FROM meals m, ingredients i 
WHERE m.name = 'Mushroom Risotto' AND i.name = 'Arborio rice';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '8 oz', true FROM meals m, ingredients i 
WHERE m.name = 'Mushroom Risotto' AND i.name = 'Mushrooms';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '1 cup', true FROM meals m, ingredients i 
WHERE m.name = 'Mushroom Risotto' AND i.name = 'Heavy cream';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '1/2 cup', true FROM meals m, ingredients i 
WHERE m.name = 'Mushroom Risotto' AND i.name = 'Parmesan cheese';

-- Spinach and Ricotta Ravioli
INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '1 lb', true FROM meals m, ingredients i 
WHERE m.name = 'Spinach and Ricotta Ravioli' AND i.name = 'Spinach';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '15 oz', true FROM meals m, ingredients i 
WHERE m.name = 'Spinach and Ricotta Ravioli' AND i.name = 'Ricotta';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '1 lb', true FROM meals m, ingredients i 
WHERE m.name = 'Spinach and Ricotta Ravioli' AND i.name = 'Fettuccine';

-- Duck Confit
INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '2 legs', true FROM meals m, ingredients i 
WHERE m.name = 'Duck Confit with Polenta' AND i.name = 'Duck breast';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '2 cups', true FROM meals m, ingredients i 
WHERE m.name = 'Duck Confit with Polenta' AND i.name = 'Polenta';

-- Lamb Chops
INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '1.5 lbs', true FROM meals m, ingredients i 
WHERE m.name = 'Lamb Chops with Rosemary' AND i.name = 'Lamb';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '2 sprigs', true FROM meals m, ingredients i 
WHERE m.name = 'Lamb Chops with Rosemary' AND i.name = 'Rosemary';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '6 cloves', true FROM meals m, ingredients i 
WHERE m.name = 'Lamb Chops with Rosemary' AND i.name = 'Garlic';

-- Scallops Saffron Risotto
INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '8 large', true FROM meals m, ingredients i 
WHERE m.name = 'Scallops with Saffron Risotto' AND i.name = 'Scallops';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '1.5 cups', true FROM meals m, ingredients i 
WHERE m.name = 'Scallops with Saffron Risotto' AND i.name = 'Risotto rice';

INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity, is_required) 
SELECT m.id, i.id, '1 pinch', true FROM meals m, ingredients i 
WHERE m.name = 'Scallops with Saffron Risotto' AND i.name = 'Saffron';

-- ============================================
-- MEAL-PAIRING RELATIONSHIPS
-- ============================================

-- Chicken Parmesan pairings
INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'wine', 95 FROM meals m, pairings p 
WHERE m.name = 'Chicken Parmesan' AND p.name = 'Chianti';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'wine', 85 FROM meals m, pairings p 
WHERE m.name = 'Chicken Parmesan' AND p.name = 'Barbera';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'dessert', 90 FROM meals m, pairings p 
WHERE m.name = 'Chicken Parmesan' AND p.name = 'Tiramisu';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'spirit', 75 FROM meals m, pairings p 
WHERE m.name = 'Chicken Parmesan' AND p.name = 'Prosecco Superiore';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'flower', 70 FROM meals m, pairings p 
WHERE m.name = 'Chicken Parmesan' AND p.name = 'Rose Petals';

-- Shrimp Scampi pairings
INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'wine', 95 FROM meals m, pairings p 
WHERE m.name = 'Shrimp Scampi with Angel Hair' AND p.name = 'Pinot Grigio';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'wine', 92 FROM meals m, pairings p 
WHERE m.name = 'Shrimp Scampi with Angel Hair' AND p.name = 'Vermentino';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'spirit', 85 FROM meals m, pairings p 
WHERE m.name = 'Shrimp Scampi with Angel Hair' AND p.name = 'Limoncello';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'dessert', 88 FROM meals m, pairings p 
WHERE m.name = 'Shrimp Scampi with Angel Hair' AND p.name = 'Lemon Gelato';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'flower', 80 FROM meals m, pairings p 
WHERE m.name = 'Shrimp Scampi with Angel Hair' AND p.name = 'Borage Flowers';

-- Beef Bolognese pairings
INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'wine', 98 FROM meals m, pairings p 
WHERE m.name = 'Beef Bolognese' AND p.name = 'Chianti';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'wine', 92 FROM meals m, pairings p 
WHERE m.name = 'Beef Bolognese' AND p.name = 'Barbera';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'dessert', 85 FROM meals m, pairings p 
WHERE m.name = 'Beef Bolognese' AND p.name = 'Tiramisu';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'spirit', 80 FROM meals m, pairings p 
WHERE m.name = 'Beef Bolognese' AND p.name = 'Amaretto';

-- Salmon pairings
INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'wine', 96 FROM meals m, pairings p 
WHERE m.name = 'Salmon with Garlic Butter' AND p.name = 'Chardonnay';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'wine', 90 FROM meals m, pairings p 
WHERE m.name = 'Salmon with Garlic Butter' AND p.name = 'Albariño';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'dessert', 88 FROM meals m, pairings p 
WHERE m.name = 'Salmon with Garlic Butter' AND p.name = 'Panna Cotta with Berry Sauce';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'flower', 85 FROM meals m, pairings p 
WHERE m.name = 'Salmon with Garlic Butter' AND p.name = 'Nasturtiums';

-- Mushroom Risotto pairings
INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'wine', 92 FROM meals m, pairings p 
WHERE m.name = 'Mushroom Risotto' AND p.name = 'Pinot Noir';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'wine', 88 FROM meals m, pairings p 
WHERE m.name = 'Mushroom Risotto' AND p.name = 'Valpolicella';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'dessert', 90 FROM meals m, pairings p 
WHERE m.name = 'Mushroom Risotto' AND p.name = 'Zabaglione';

-- Spinach Ricotta Ravioli pairings
INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'wine', 90 FROM meals m, pairings p 
WHERE m.name = 'Spinach and Ricotta Ravioli' AND p.name = 'Pinot Grigio';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'dessert', 92 FROM meals m, pairings p 
WHERE m.name = 'Spinach and Ricotta Ravioli' AND p.name = 'Panna Cotta with Berry Sauce';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'flower', 80 FROM meals m, pairings p 
WHERE m.name = 'Spinach and Ricotta Ravioli' AND p.name = 'Edible Violets';

-- Duck Confit pairings
INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'wine', 98 FROM meals m, pairings p 
WHERE m.name = 'Duck Confit with Polenta' AND p.name = 'Pinot Noir';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'wine', 95 FROM meals m, pairings p 
WHERE m.name = 'Duck Confit with Polenta' AND p.name = 'Cabernet Sauvignon';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'spirit', 85 FROM meals m, pairings p 
WHERE m.name = 'Duck Confit with Polenta' AND p.name = 'Grappa';

-- Lamb Chops pairings
INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'wine', 96 FROM meals m, pairings p 
WHERE m.name = 'Lamb Chops with Rosemary' AND p.name = 'Cabernet Sauvignon';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'wine', 92 FROM meals m, pairings p 
WHERE m.name = 'Lamb Chops with Rosemary' AND p.name = 'Bordeaux';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'dessert', 88 FROM meals m, pairings p 
WHERE m.name = 'Lamb Chops with Rosemary' AND p.name = 'Pistachio Gelato';

-- Scallops Saffron pairings
INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'wine', 97 FROM meals m, pairings p 
WHERE m.name = 'Scallops with Saffron Risotto' AND p.name = 'Chardonnay';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'spirit', 90 FROM meals m, pairings p 
WHERE m.name = 'Scallops with Saffron Risotto' AND p.name = 'Prosecco Superiore';

INSERT INTO meal_pairings (meal_id, pairing_id, pairing_type, compatibility_score)
SELECT m.id, p.id, 'dessert', 92 FROM meals m, pairings p 
WHERE m.name = 'Scallops with Saffron Risotto' AND p.name = 'Panna Cotta with Passion Fruit';
