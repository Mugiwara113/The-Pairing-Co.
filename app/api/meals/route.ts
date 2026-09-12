import { NextResponse } from 'next/server'
import { getMeals } from '@/lib/recommendations'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { cuisineType, maxPrice, difficulty } = body

    const meals = await getMeals({
      cuisineType,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      difficulty,
    })

    return NextResponse.json({
      success: true,
      meals,
      count: meals.length,
    })
  } catch (error) {
    console.error('Error fetching meals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch meals' },
      { status: 500 }
    )
  }
}
