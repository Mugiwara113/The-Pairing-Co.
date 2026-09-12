# Recommendation Algorithm

## Overview

The recommendation algorithm intelligently matches user-provided ingredients against meals in the database, returning sorted recommendations based on match percentage and user preferences.

## How It Works

### 1. **Ingredient Matching**
- User provides ingredient names (case-insensitive)
- Algorithm converts names to ingredient IDs
- Only matches are used for recommendation calculation

### 2. **Match Scoring**
Score = (Required Ingredients Matched / Total Required Ingredients) * 100

- Meals must have ≥ 60% of required ingredients to qualify
- Optional ingredients boost the score
- Meals are ranked by match percentage (highest first)

### 3. **Filtering**
- **Price:** Excludes meals exceeding `maxPrice` parameter
- **Season:** Can filter by current or specified season
- **Availability:** Considers seasonal availability of ingredients and pairings

### 4. **Pairing Recommendations**
For each recommended meal, retrieves:
- Wine pairings (sorted by compatibility score)
- Spirit pairings (sorted by compatibility score)
- Dessert pairings (sorted by compatibility score)
- Flower pairings (sorted by compatibility score)

## API Endpoints

### POST `/api/recommendations`

Get meal recommendations based on ingredients.

**Request:**
```json
{
  "ingredients": ["Chicken breast", "Angel hair pasta"],
  "maxPrice": 20,
  "season": "summer"
}
```

**Response:** Array of recommended meals with pairings and match percentage

### GET `/api/recommendations?ingredients=Chicken%20breast&maxPrice=20`

Query-based recommendations.

### GET `/api/ingredients`

Get all available ingredients for autocomplete.

### POST `/api/meals`

Get meals with optional filters (cuisine, price, difficulty).

## Match Calculation

```
matchPercentage = (matchedRequiredIngredients / totalRequiredIngredients) × 100
```

- Minimum 60% required ingredients to qualify
- Sorted by highest match percentage first

## Testing

```bash
curl -X POST http://localhost:3000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "ingredients": ["Chicken breast", "Angel hair pasta"],
    "maxPrice": 20
  }'
```
