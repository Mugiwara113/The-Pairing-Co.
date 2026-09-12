'use client'

interface SeasonalToggleProps {
  enabled: boolean
  onToggle: (enabled: boolean) => void
  currentSeason?: string
}

function getCurrentSeason(): string {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'Spring'
  if (month >= 5 && month <= 7) return 'Summer'
  if (month >= 8 && month <= 10) return 'Fall'
  return 'Winter'
}

export default function SeasonalToggle({ enabled, onToggle, currentSeason = getCurrentSeason() }: SeasonalToggleProps) {
  return (
    <div className="w-full">
      <label className="mb-3 block text-sm font-semibold text-gray-700">Seasonal Filtering</label>
      <div className="flex items-center gap-4 rounded-lg border-2 border-amber-200 bg-amber-50 p-4">
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label="Toggle seasonal filtering"
          onClick={() => onToggle(!enabled)}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${enabled ? 'bg-amber-600' : 'bg-gray-300'}`}
        >
          <span className={`inline-block h-6 w-6 rounded-full bg-white transition-transform ${enabled ? 'translate-x-7' : 'translate-x-1'}`} />
        </button>
        <div>
          <p className="text-sm font-semibold text-gray-800">{enabled ? 'Filtering by season' : 'All items shown'}</p>
          <p className="text-xs text-gray-600">{enabled ? `Showing items available in ${currentSeason}.` : `Enable to filter by ${currentSeason}.`}</p>
        </div>
      </div>
    </div>
  )
}