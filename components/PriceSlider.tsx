'use client'

import type { ChangeEvent } from 'react'

interface PriceSliderProps {
  minPrice: number
  maxPrice: number
  onMinChange: (value: number) => void
  onMaxChange: (value: number) => void
  step?: number
  label?: string
}

export default function PriceSlider({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
  step = 1,
  label = 'Price Range',
}: PriceSliderProps) {
  const range = Math.max(maxPrice, minPrice + step)
  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    onMinChange(Math.min(Number(event.target.value), maxPrice - step))
  }
  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    onMaxChange(Math.max(Number(event.target.value), minPrice + step))
  }

  return (
    <div className="w-full">
      <label className="mb-4 block text-sm font-semibold text-gray-700">{label}</label>
      <div className="mb-4 flex items-center justify-between rounded-lg bg-amber-50 p-3">
        <span className="font-bold text-amber-900">${minPrice.toFixed(2)}</span>
        <span className="text-gray-400">-</span>
        <span className="font-bold text-amber-900">${maxPrice.toFixed(2)}</span>
      </div>
      <div className="space-y-2">
        <input aria-label="Minimum price" type="range" min="0" max={range} step={step} value={minPrice} onChange={handleMinChange} className="w-full accent-amber-600" />
        <input aria-label="Maximum price" type="range" min="0" max={range} step={step} value={maxPrice} onChange={handleMaxChange} className="w-full accent-amber-600" />
      </div>
    </div>
  )
}