import { NextResponse } from 'next/server'
import { getRecommendations } from '@/lib/recommendations'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { ingredients, maxPrice, season } = body

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json(
        { error: 'Please provide at least one ingredient' },
        { status: 400 }
      )
    }

    const recommendations = await getRecommendations({
      ingredients,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      season,
    })

    return NextResponse.json({
      success: true,
      recommendations,
      count: recommendations.length,
      query: {
        ingredients,
        maxPrice,
        season,
      },
    })
  } catch (error) {
    console.error('Recommendation error:', error)
    return NextResponse.json(
      { error: 'Failed to get recommendations', details: String(error) },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const ingredientsParam = searchParams.get('ingredients')
    const maxPrice = searchParams.get('maxPrice')
    const season = searchParams.get('season')

    if (!ingredientsParam) {
      return NextResponse.json(
        { error: 'Please provide ingredients as comma-separated query parameter' },
        { status: 400 }
      )
    }

    const ingredients = ingredientsParam.split(',').map(i => i.trim())

    const recommendations = await getRecommendations({
      ingredients,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      season: season as any,
    })

    return NextResponse.json({
      success: true,
      recommendations,
      count: recommendations.length,
    })
  } catch (error) {
    console.error('Recommendation error:', error)
    return NextResponse.json(
      { error: 'Failed to get recommendations' },
      { status: 500 }
    )
  }
}
