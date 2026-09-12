-- Database schema for meal pairing app

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE,
  username VARCHAR UNIQUE,
  auth_provider VARCHAR NOT NULL CHECK (auth_provider IN ('google', 'github', 'email')),
  auth_id VARCHAR,
  is_guest BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ingredients table
CREATE TABLE ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR UNIQUE NOT NULL,
  category VARCHAR NOT NULL CHECK (category IN ('protein', 'carb', 'vegetable', 'dairy', 'spice', 'other')),
  seasonal_availability JSONB DEFAULT '{"spring": true, "summer": true, "fall": true, "winter": true}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Meals table
CREATE TABLE meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  description TEXT,
  base_price DECIMAL(8,2) NOT NULL,
  cuisine_type VARCHAR,
  difficulty_level VARCHAR CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
  prep_time_mins INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Meal-Ingredient join table
CREATE TABLE meal_ingredients (
  meal_id UUID REFERENCES meals(id) ON DELETE CASCADE,
  ingredient_id UUID REFERENCES ingredients(id) ON DELETE CASCADE,
  quantity VARCHAR,
  is_required BOOLEAN DEFAULT true,
  PRIMARY KEY (meal_id, ingredient_id)
);

-- Pairings table (wine, spirits, desserts, flowers)
CREATE TABLE pairings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  type VARCHAR NOT NULL CHECK (type IN ('wine', 'spirit', 'dessert', 'flower')),
  description TEXT,
  price DECIMAL(8,2),
  flavor_profile VARCHAR,
  seasonal_availability JSONB DEFAULT '{"spring": true, "summer": true, "fall": true, "winter": true}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Meal-Pairing recommendations join table
CREATE TABLE meal_pairings (
  meal_id UUID REFERENCES meals(id) ON DELETE CASCADE,
  pairing_id UUID REFERENCES pairings(id) ON DELETE CASCADE,
  pairing_type VARCHAR NOT NULL CHECK (pairing_type IN ('wine', 'spirit', 'dessert', 'flower')),
  compatibility_score INT CHECK (compatibility_score >= 1 AND compatibility_score <= 100),
  PRIMARY KEY (meal_id, pairing_id)
);

-- User saved meals
CREATE TABLE user_saved_meals (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  meal_id UUID REFERENCES meals(id) ON DELETE CASCADE,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, meal_id)
);

-- User preferences
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  max_price DECIMAL(8,2),
  dietary_restrictions JSONB,
  preferred_cuisines JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_meals_cuisine_type ON meals(cuisine_type);
CREATE INDEX idx_ingredients_category ON ingredients(category);
CREATE INDEX idx_pairings_type ON pairings(type);
CREATE INDEX idx_user_saved_meals_user_id ON user_saved_meals(user_id);
CREATE INDEX idx_user_saved_meals_meal_id ON user_saved_meals(meal_id);
CREATE INDEX idx_meal_ingredients_meal_id ON meal_ingredients(meal_id);
CREATE INDEX idx_meal_ingredients_ingredient_id ON meal_ingredients(ingredient_id);
CREATE INDEX idx_meal_pairings_meal_id ON meal_pairings(meal_id);
CREATE INDEX idx_meal_pairings_pairing_id ON meal_pairings(pairing_id);
