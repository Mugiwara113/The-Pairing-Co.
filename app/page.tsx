'use client'

import Link from 'next/link'
import { useState } from 'react'
import IngredientInput from '@/components/IngredientInput'

export default function Home() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-amber-900">🍽️ Meal Pairing</div>
          <div className="space-x-4">
            <Link href="/" className="hover:text-amber-700">Home</Link>
            <Link href="/dashboard" className="hover:text-amber-700">Dashboard</Link>
            <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">Login</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-amber-900 mb-4">
          Perfect Meal Pairings
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Tell us what you have. We&apos;ll recommend the perfect meal with wine, spirits, desserts, and flowers.
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">What do you have?</h2>
          
          <IngredientInput 
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
          />

          <div className="mt-8 p-4 bg-amber-50 rounded-lg">
            <p className="text-gray-700">
              <strong>Selected:</strong> {selectedIngredients.length > 0 ? selectedIngredients.join(', ') : 'None yet'}
            </p>
          </div>

          <button className="mt-6 w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition">
            Get Recommendations
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2026 Meal Pairing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
