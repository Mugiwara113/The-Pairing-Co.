'use client'

import { useState, useCallback } from 'react'

interface IngredientInputProps {
  selectedIngredients: string[]
  setSelectedIngredients: (ingredients: string[]) => void
}

const INGREDIENT_SUGGESTIONS = [
  'Chicken breast',
  'Angel hair pasta',
  'Ground beef',
  'Salmon',
  'Shrimp',
  'Mushrooms',
  'Broccoli',
  'Spinach',
  'Tomatoes',
  'Garlic',
  'Onion',
  'Bell peppers',
  'Basil',
  'Oregano',
  'Parmesan cheese',
  'Mozzarella',
]

export default function IngredientInput({ selectedIngredients, setSelectedIngredients }: IngredientInputProps) {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)

    if (value.length > 0) {
      const filtered = INGREDIENT_SUGGESTIONS.filter(
        (ingredient) =>
          ingredient.toLowerCase().includes(value.toLowerCase()) &&
          !selectedIngredients.includes(ingredient)
      )
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const addIngredient = useCallback((ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient])
      setInput('')
      setSuggestions([])
    }
  }, [selectedIngredients, setSelectedIngredients])

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i !== ingredient))
  }

  return (
    <div className="w-full">
      <div className="relative mb-4">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Search and add ingredients..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
        />

        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addIngredient(suggestion)}
                className="block w-full text-left px-4 py-2 hover:bg-amber-50 transition"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Ingredients Tags */}
      <div className="flex flex-wrap gap-2">
        {selectedIngredients.map((ingredient) => (
          <div
            key={ingredient}
            className="bg-amber-200 text-amber-900 px-3 py-1 rounded-full flex items-center gap-2"
          >
            {ingredient}
            <button
              onClick={() => removeIngredient(ingredient)}
              className="text-amber-900 hover:text-amber-700 font-bold"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
