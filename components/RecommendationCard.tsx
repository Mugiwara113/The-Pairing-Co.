'use client'

import { Meal } from '@/lib/types'

interface RecommendationCardProps {
  meal: Meal
  matchPercentage: number
  onFavorite?: (mealId: string) => void
  onViewDetails?: (meal: Meal) => void
  isFavorited?: boolean
}

export default function RecommendationCard({ meal, matchPercentage, onFavorite, onViewDetails, isFavorited = false }: RecommendationCardProps) {
  const matchColor = matchPercentage >= 90 ? 'bg-green-100 text-green-800' : matchPercentage >= 70 ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'

  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="flex items-start justify-between gap-4 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4">
        <div>
          <h3 className="text-xl font-bold text-amber-900">{meal.name}</h3>
          <p className="mt-1 text-sm text-gray-700">{meal.description}</p>
        </div>
        <span className={`whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold ${matchColor}`}>{matchPercentage}% Match</span>
      </div>
      <div className="p-4">
        <div className="mb-4 grid grid-cols-3 gap-2 border-b border-gray-200 pb-4">
          <div><p className="text-xs text-gray-600">Price</p><p className="font-bold text-amber-900">${meal.basePrice.toFixed(2)}</p></div>
          <div><p className="text-xs text-gray-600">Prep Time</p><p className="font-bold text-gray-800">{meal.prepTimeMins}m</p></div>
          <div><p className="text-xs text-gray-600">Difficulty</p><p className="font-bold capitalize text-gray-800">{meal.difficultyLevel}</p></div>
        </div>
        <div className="flex gap-2">
          {onViewDetails && <button type="button" onClick={() => onViewDetails(meal)} className="flex-1 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700">View Details</button>}
          <button type="button" onClick={() => onFavorite?.(meal.id)} disabled={!onFavorite} aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${isFavorited ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'} disabled:cursor-default disabled:opacity-60`}>{isFavorited ? '♥' : '♡'}</button>
        </div>
      </div>
    </article>
  )
}