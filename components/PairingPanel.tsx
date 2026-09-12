'use client'

import { useState } from 'react'
import { MealPairing, Pairing } from '@/lib/types'

interface PairingPanelProps {
  pairings?: MealPairing
  onAddPairing?: (pairing: Pairing, type: Pairing['type']) => void
}

const sections: Array<{ title: string; icon: string; type: Pairing['type']; key: keyof MealPairing }> = [
  { title: 'Wines', icon: '🍷', type: 'wine', key: 'wine' },
  { title: 'Spirits', icon: '🥃', type: 'spirit', key: 'spirits' },
  { title: 'Desserts', icon: '🍰', type: 'dessert', key: 'desserts' },
  { title: 'Flowers', icon: '🌹', type: 'flower', key: 'flowers' },
]

function PairingSection({
  title,
  icon,
  type,
  pairings,
  onAdd,
}: {
  title: string
  icon: string
  type: Pairing['type']
  pairings: Pairing[]
  onAdd?: PairingPanelProps['onAddPairing']
}) {
  const [expanded, setExpanded] = useState(false)

  if (pairings.length === 0) {
    return <div className="border-b border-gray-200 p-3 text-sm text-gray-500">{icon} {title}: No pairings</div>
  }

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-3 text-left transition hover:bg-gray-50"
        aria-expanded={expanded}
      >
        <span className="flex items-center gap-2 font-semibold text-gray-800">
          <span className="text-xl">{icon}</span>
          {title}
          <span className="rounded bg-amber-100 px-2 py-1 text-xs text-amber-700">{pairings.length}</span>
        </span>
        <span aria-hidden="true" className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {expanded && (
        <div className="space-y-2 border-t border-gray-200 bg-gray-50 p-3">
          {pairings.map((pairing) => (
            <div key={pairing.id} className="rounded-lg border border-gray-200 bg-white p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-800">{pairing.name}</p>
                  <p className="mt-1 text-xs text-gray-600">{pairing.description}</p>
                </div>
                <p className="whitespace-nowrap font-bold text-amber-900">${pairing.price.toFixed(2)}</p>
              </div>
              <button
                type="button"
                onClick={() => onAdd?.(pairing, type)}
                disabled={!onAdd}
                className="mt-3 w-full rounded bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-200 disabled:cursor-default disabled:opacity-60"
              >
                Add to Meal
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PairingPanel({ pairings = {}, onAddPairing }: PairingPanelProps) {
  const hasPairings = sections.some(({ key }) => (pairings[key] || []).length > 0)

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4">
        <h3 className="text-lg font-bold text-amber-900">🍷 Pairing Suggestions</h3>
        <p className="mt-1 text-sm text-gray-700">Enhance your meal with complementary drinks and desserts.</p>
      </div>
      {sections.map(({ title, icon, type, key }) => (
        <PairingSection key={key} title={title} icon={icon} type={type} pairings={pairings[key] || []} onAdd={onAddPairing} />
      ))}
      {!hasPairings && <p className="p-6 text-center text-sm text-gray-600">No pairing suggestions available for this meal.</p>}
    </div>
  )
}