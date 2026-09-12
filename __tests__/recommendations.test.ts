// Documentation showing how to use the recommendation algorithm

/**
 * TESTING THE RECOMMENDATION ALGORITHM
 * 
 * Run these after setting up Supabase and seeding the database.
 */

/**
 * TEST 1: Get recommendations for basic ingredients
 * Should return Chicken Parmesan and other chicken dishes
 */
export const test1 = {
  name: 'Basic ingredient matching',
  endpoint: 'POST /api/recommendations',
  body: {
    ingredients: ['Chicken breast', 'Angel hair pasta'],
  },
  expectedBehavior: [
    'Returns meals containing chicken breast and/or pasta',
    'Highest match percentage first',
  ],
}

/**
 * TEST 2: Price filtering
 * Should exclude meals above the price limit
 */
export const test2 = {
  name: 'Price filtering',
  endpoint: 'POST /api/recommendations',
  body: {
    ingredients: ['Salmon', 'Butter', 'Garlic'],
    maxPrice: 20,
  },
  expectedBehavior: [
    'Returns salmon dishes under $20',
    'Salmon with Garlic Butter ($18.99) included',
  ],
}

/**
 * TEST 3: Seasonal filtering
 */
export const test3 = {
  name: 'Seasonal filtering',
  endpoint: 'POST /api/recommendations',
  body: {
    ingredients: ['Shrimp', 'Angel hair pasta'],
    season: 'summer',
  },
  expectedBehavior: [
    'Returns summer-available meals and pairings',
    'Limoncello only appears in summer',
  ],
}

// CURL EXAMPLES

/**
 * curl -X POST http://localhost:3000/api/recommendations \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "ingredients": ["Chicken breast", "Angel hair pasta"]
 *   }'
 */

/**
 * curl http://localhost:3000/api/ingredients
 */

/**
 * curl "http://localhost:3000/api/recommendations?ingredients=Chicken%20breast,Spaghetti"
 */

export default {
  test1,
  test2,
  test3,
}
