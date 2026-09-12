# Meal Pairing API Documentation

## Quick Start

All API endpoints are available at `http://localhost:3000/api/`

## Endpoints

### 🔍 Get Recommendations

**POST** `/api/recommendations`

Returns meal recommendations based on provided ingredients.

**Request:**
```json
{
  "ingredients": ["Chicken breast", "Angel hair pasta"],
  "maxPrice": 25,
  "season": "summer"
}
```

**Response:**
```json
{
  "success": true,
  "recommendations": [
    {
      "id": "uuid",
      "name": "Chicken Parmesan",
      "description": "Crispy breaded chicken topped with marinara",
      "basePrice": 14.99,
      "cuisineType": "Italian",
      "difficultyLevel": "medium",
      "prepTimeMins": 30,
      "matchPercentage": 95,
      "matchedIngredients": ["ingredient-id-1"],
      "missingIngredients": ["ingredient-id-2"],
      "pairings": {
        "wine": [
          {
            "id": "uuid",
            "name": "Chianti",
            "type": "wine",
            "price": 25.99,
            "description": "Classic Italian red",
            "flavorProfile": "fruity, earthy"
          }
        ],
        "spirits": [],
        "desserts": [
          {
            "id": "uuid",
            "name": "Tiramisu",
            "type": "dessert",
            "price": 8.99,
            "description": "Italian dessert with mascarpone"
          }
        ],
        "flowers": []
      }
    }
  ],
  "count": 1,
  "query": {
    "ingredients": ["Chicken breast", "Angel hair pasta"],
    "maxPrice": 25,
    "season": "summer"
  }
}
```

**Parameters:**
- `ingredients` (required): Array of ingredient names
- `maxPrice` (optional): Maximum meal price
- `season` (optional): 'spring', 'summer', 'fall', 'winter' (defaults to current season)

---

### 🔍 Get Recommendations (Query String)

**GET** `/api/recommendations?ingredients=Chicken%20breast,Angel%20hair%20pasta&maxPrice=25`

Same as POST but using query parameters. Useful for URL sharing.

**Query Parameters:**
- `ingredients` (required): Comma-separated ingredient names
- `maxPrice` (optional): Maximum price
- `season` (optional): Season filter

---

### 🥕 Get All Ingredients

**GET** `/api/ingredients`

Returns all available ingredients for autocomplete/dropdown.

**Response:**
```json
{
  "success": true,
  "ingredients": [
    {
      "id": "uuid",
      "name": "Chicken breast",
      "category": "protein"
    },
    {
      "id": "uuid",
      "name": "Angel hair pasta",
      "category": "carb"
    }
  ],
  "count": 58
}
```

---

### 🍽️ Get Meals

**POST** `/api/meals`

Get meals with optional filters.

**Request:**
```json
{
  "cuisineType": "Italian",
  "maxPrice": 20,
  "difficulty": "easy"
}
```

**Response:**
```json
{
  "success": true,
  "meals": [
    {
      "id": "uuid",
      "name": "Chicken Parmesan",
      "description": "Crispy breaded chicken...",
      "base_price": 14.99,
      "cuisine_type": "Italian",
      "difficulty_level": "medium",
      "prep_time_mins": 30
    }
  ],
  "count": 5
}
```

**Parameters:**
- `cuisineType` (optional): Filter by cuisine
- `maxPrice` (optional): Maximum price
- `difficulty` (optional): 'easy', 'medium', 'hard'

---

## Match Percentage Calculation

```
matchPercentage = (matchedRequiredIngredients / totalRequiredIngredients) × 100
```

**Requirement:** Meals must have ≥60% of required ingredients to be recommended.

**Example:**
- Chicken Parmesan requires: Chicken breast, Spaghetti, Mozzarella (3 required)
- User provides: Chicken breast, Angel hair pasta (2 provided)
- Match: 1/3 = 33% → **Not recommended** (below 60%)

- User provides: Chicken breast, Spaghetti, Mozzarella (exact match)
- Match: 3/3 = 100% → **Highly recommended**

---

## Seasonal Availability

All ingredients and pairings have seasonal availability:

```json
{
  "spring": true,
  "summer": true,
  "fall": true,
  "winter": false
}
```

When you specify a season, only items available in that season are included.

---

## Compatibility Scores

Meal-pairing compatibility (1-100):
- 95-100: Excellent match (highly recommended)
- 85-94: Very good match
- 75-84: Good match
- <75: Fair match

Pairings are sorted by score, with best matches first.

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message",
  "details": "Additional context if available"
}
```

### Common Errors

| Status | Error | Cause |
|--------|-------|-------|
| 400 | "Please provide at least one ingredient" | Empty ingredients array |
| 400 | "Invalid request" | Malformed JSON |
| 500 | "Failed to get recommendations" | Database connection error |
| 500 | "Missing Supabase credentials" | Environment variables not set |

---

## Examples

### Basic Recommendation
```bash
curl -X POST http://localhost:3000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "ingredients": ["Chicken breast"]
  }'
```

### With Filters
```bash
curl -X POST http://localhost:3000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "ingredients": ["Salmon", "Butter"],
    "maxPrice": 25,
    "season": "summer"
  }'
```

### Get Ingredients
```bash
curl http://localhost:3000/api/ingredients
```

### URL Query Format (Shareable)
```bash
curl "http://localhost:3000/api/recommendations?ingredients=Chicken%20breast,Spaghetti&maxPrice=20&season=summer"
```

---

## Frontend Integration

Use the provided API helper:

```typescript
import { api } from '@/lib/api'

// Get recommendations
const result = await api.getRecommendations(
  ['Chicken breast', 'Angel hair pasta'],
  25,
  'summer'
)

// Get all ingredients (for autocomplete)
const ingredients = await api.getIngredients()

// Get filtered meals
const meals = await api.getMeals('Italian', 20)
```

Or fetch directly:

```typescript
const response = await fetch('/api/recommendations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ingredients: ['Chicken breast', 'Angel hair pasta'],
    maxPrice: 25,
    season: 'summer'
  })
})

const data = await response.json()
if (data.success) {
  console.log(data.recommendations)
}
```

---

## Performance

- Single ingredient query: ~50-100ms
- Multiple ingredients with pairings: ~200-300ms
- All indexed database queries
- Parallel pairing fetches (optimized)

---

## Troubleshooting

### No recommendations returned
- Check that ingredients exist in database (use `/api/ingredients`)
- Verify ingredient names are correct (case-insensitive but must match exactly)
- Some ingredients may be unavailable in selected season

### "Missing Supabase credentials"
- Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
- Restart dev server after changing environment variables

### Pairings not showing
- Check that the meal has pairings in the database
- Verify pairings are available in selected season
- May be empty for newly added meals

