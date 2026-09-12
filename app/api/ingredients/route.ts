import { NextResponse } from 'next/server'
import { getAllIngredients } from '@/lib/recommendations'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const ingredients = await getAllIngredients()

    return NextResponse.json({
      success: true,
      ingredients,
      count: ingredients.length,
    })
  } catch (error) {
    console.error('Error fetching ingredients:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ingredients' },
      { status: 500 }
    )
  }
}
