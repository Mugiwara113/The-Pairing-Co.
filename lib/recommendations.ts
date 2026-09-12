import { supabase } from './supabase'
import { Meal, Pairing } from './types'

interface RecommendationParams {
  ingredients: string[]
  maxPrice?: number
  season?: 'spring' | 'summer' | 'fall' | 'winter'
}

interface MealWithPairings extends Meal {
  matchPercentage: number
  matchedIngredients: string[]
  missingIngredients: string[]
  pairings: {
    wine: Pairing[]
    spirits: Pairing[]
    desserts: Pairing[]
    flowers: Pairing[]
  }
}

/**
 * Get current season based on date
 */
export function getCurrentSeason(): 'spring' | 'summer' | 'fall' | 'winter' {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'fall'
  return 'winter'
}

/** Check if an ingredient is available in the requested season. */
async function isIngredientInSeason(ingredientId: string, season: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('ingredients')
    .select('seasonal_availability')
    .eq('id', ingredientId)
    .single()

  if (error) return true
  if (!data.seasonal_availability) return true

  const availability = data.seasonal_availability as Record<string, boolean>
  return availability[season] ?? true
}

/**
 * Get all meal IDs and their ingredient mappings
 */
async function getMealIngredientMappings() {
  const { data, error } = await supabase
    .from('meal_ingredients')
    .select('meal_id, ingredient_id, is_required')

  if (error) {
    console.error('Error fetching meal ingredients:', error)
    return []
  }

  return data || []
}

/**
 * Get meals by IDs with full details
 */
async function getMealsByIds(mealIds: string[]) {
  if (mealIds.length === 0) return []

  const { data, error } = await supabase
    .from('meals')
    .select('*')
    .in('id', mealIds)

  if (error) {
    console.error('Error fetching meals:', error)
    return []
  }

  return data || []
}

/**
 * Get pairings for a meal by type
 */
async function getMealPairingsByType(mealId: string, type: string) {
  const { data, error } = await supabase
    .from('meal_pairings')
    .select(`
      pairing_id,
      compatibility_score,
      pairings (*)
    `)
    .eq('meal_id', mealId)
    .eq('pairing_type', type)
    .order('compatibility_score', { ascending: false })

  if (error) {
    console.error(`Error fetching ${type} pairings:`, error)
    return []
  }

  return data ? data.map((item: any) => item.pairings) : []
}

/**
 * Calculate meal match score based on provided ingredients
 */
function calculateMatchScore(
  mealIngredients: Array<{ ingredient_id: string; is_required: boolean }>,
  userIngredientIds: Set<string>
): { score: number; matched: string[]; missing: string[] } {
  const matched: string[] = []
  const missing: string[] = []
  let requiredMatches = 0
  let requiredTotal = 0

  for (const mi of mealIngredients) {
    if (mi.is_required) {
      requiredTotal++
      if (userIngredientIds.has(mi.ingredient_id)) {
        requiredMatches++
        matched.push(mi.ingredient_id)
      } else {
        missing.push(mi.ingredient_id)
      }
    } else {
      if (userIngredientIds.has(mi.ingredient_id)) {
        matched.push(mi.ingredient_id)
      }
    }
  }

  // Meals must have at least 60% of required ingredients
  const requiredPercentage = requiredTotal > 0 ? requiredMatches / requiredTotal : 1
  const baseScore = requiredPercentage < 0.6 ? 0 : requiredPercentage * 100

  return {
    score: baseScore,
    matched,
    missing,
  }
}

/**
 * Get ingredient IDs by names (case-insensitive)
 */
async function getIngredientIdsByNames(names: string[]): Promise<Map<string, string>> {
  if (names.length === 0) return new Map()

  const { data, error } = await supabase
    .from('ingredients')
    .select('id, name')

  if (error) {
    console.error('Error fetching ingredients:', error)
    return new Map()
  }

  const nameToIdMap = new Map<string, string>()
  const lowerNames = new Set(names.map(n => n.toLowerCase()))

  for (const ingredient of data || []) {
    if (lowerNames.has(ingredient.name.toLowerCase())) {
      nameToIdMap.set(ingredient.name.toLowerCase(), ingredient.id)
    }
  }

  return nameToIdMap
}

/**
 * Main recommendation algorithm
 */
export async function getRecommendations(
  params: RecommendationParams
): Promise<MealWithPairings[]> {
  const { ingredients, maxPrice, season = getCurrentSeason() } = params

  // Get ingredient ID mappings
  const nameToIdMap = await getIngredientIdsByNames(ingredients)
  const ingredientAvailability = await Promise.all(
    [...nameToIdMap.values()].map(async ingredientId => ({
      ingredientId,
      isAvailable: await isIngredientInSeason(ingredientId, season),
    }))
  )
  const userIngredientIds = new Set(
    ingredientAvailability
      .filter(({ isAvailable }) => isAvailable)
      .map(({ ingredientId }) => ingredientId)
  )

  if (userIngredientIds.size === 0) {
    return []
  }

  // Get all meal-ingredient relationships
  const mealIngredients = await getMealIngredientMappings()

  // Group by meal
  const mealToIngredients = new Map<string, Array<{ ingredient_id: string; is_required: boolean }>>()
  for (const mi of mealIngredients) {
    if (!mealToIngredients.has(mi.meal_id)) {
      mealToIngredients.set(mi.meal_id, [])
    }
    mealToIngredients.get(mi.meal_id)!.push({
      ingredient_id: mi.ingredient_id,
      is_required: mi.is_required,
    })
  }

  // Score meals
  const scoredMeals: Array<{ id: string; score: number; matched: string[]; missing: string[] }> = []

  for (const [mealId, mealIngs] of mealToIngredients.entries()) {
    const { score, matched, missing } = calculateMatchScore(mealIngs, userIngredientIds)

    if (score > 0) {
      scoredMeals.push({
        id: mealId,
        score,
        matched,
        missing,
      })
    }
  }

  // Sort by score
  scoredMeals.sort((a, b) => b.score - a.score)

  // Get meal details
  const mealIds = scoredMeals.map(m => m.id)
  const meals = await getMealsByIds(mealIds)

  // Fetch pairings for each meal
  const recommendations: MealWithPairings[] = []

  for (const meal of meals) {
    const scoreData = scoredMeals.find(s => s.id === meal.id)
    if (!scoreData) continue

    // Filter by price if specified
    if (maxPrice && meal.base_price > maxPrice) {
      continue
    }

    // Get pairings
    const [winePairings, spiritPairings, dessertPairings, flowerPairings] = await Promise.all([
      getMealPairingsByType(meal.id, 'wine'),
      getMealPairingsByType(meal.id, 'spirit'),
      getMealPairingsByType(meal.id, 'dessert'),
      getMealPairingsByType(meal.id, 'flower'),
    ])

    recommendations.push({
      id: meal.id,
      name: meal.name,
      description: meal.description,
      basePrice: meal.base_price,
      cuisineType: meal.cuisine_type,
      difficultyLevel: meal.difficulty_level as any,
      prepTimeMins: meal.prep_time_mins,
      ingredients: [],
      matchPercentage: Math.round(scoreData.score),
      matchedIngredients: scoreData.matched,
      missingIngredients: scoreData.missing,
      pairings: {
        wine: winePairings,
        spirits: spiritPairings,
        desserts: dessertPairings,
        flowers: flowerPairings,
      },
    })
  }

  // Sort by match percentage
  return recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage)
}

/**
 * Get all available ingredients for autocomplete
 */
export async function getAllIngredients() {
  const { data, error } = await supabase
    .from('ingredients')
    .select('id, name, category')
    .order('name')

  if (error) {
    console.error('Error fetching ingredients:', error)
    return []
  }

  return data || []
}

/**
 * Get meals filtered by various criteria
 */
export async function getMeals(params?: {
  cuisineType?: string
  maxPrice?: number
  difficulty?: string
}) {
  let query = supabase.from('meals').select('*')

  if (params?.cuisineType) {
    query = query.eq('cuisine_type', params.cuisineType)
  }

  if (params?.maxPrice) {
    query = query.lte('base_price', params.maxPrice)
  }

  if (params?.difficulty) {
    query = query.eq('difficulty_level', params.difficulty)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching meals:', error)
    return []
  }

  return data || []
}
