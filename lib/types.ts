// lib/types.ts

export interface Ingredient {
  id: string
  name: string
  category: 'protein' | 'carb' | 'vegetable' | 'dairy' | 'spice' | 'other'
  seasonalAvailability: Record<string, boolean>
}

export interface Meal {
  id: string
  name: string
  description: string
  basePrice: number
  cuisineType: string
  difficultyLevel: 'easy' | 'medium' | 'hard'
  prepTimeMins: number
  ingredients: MealIngredient[]
  pairings?: MealPairing
}

export interface MealIngredient {
  ingredientId: string
  quantity: string
  isRequired: boolean
}

export interface Pairing {
  id: string
  name: string
  type: 'wine' | 'spirit' | 'dessert' | 'flower'
  description: string
  price: number
  flavorProfile?: string
  seasonalAvailability: Record<string, boolean>
}

export interface MealPairing {
  wine?: Pairing[]
  spirits?: Pairing[]
  desserts?: Pairing[]
  flowers?: Pairing[]
}

export interface User {
  id: string
  email: string
  username: string
  authProvider: 'google' | 'github' | 'email'
  isGuest: boolean
  createdAt: Date
}

export interface UserPreferences {
  userId: string
  maxPrice?: number
  dietaryRestrictions?: string[]
  preferredCuisines?: string[]
}

export interface SavedMeal {
  userId: string
  mealId: string
  savedAt: Date
}
