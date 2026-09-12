// lib/api.ts - Client-side API utilities

interface FetchOptions {
  method?: string
  body?: any
  headers?: Record<string, string>
}

async function apiCall(endpoint: string, options: FetchOptions = {}) {
  const { method = 'GET', body, headers = {} } = options

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  if (body) {
    fetchOptions.body = JSON.stringify(body)
  }

  const response = await fetch(`/api${endpoint}`, fetchOptions)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'API request failed')
  }

  return response.json()
}

export const api = {
  // Recommendations
  getRecommendations: (ingredients: string[], maxPrice?: number, season?: string) =>
    apiCall('/recommendations', {
      method: 'POST',
      body: { ingredients, maxPrice, season },
    }),

  // Ingredients
  getIngredients: () =>
    apiCall('/ingredients'),

  // Meals
  getMeals: (cuisineType?: string, maxPrice?: number) =>
    apiCall('/meals', {
      method: 'POST',
      body: { cuisineType, maxPrice },
    }),
}
