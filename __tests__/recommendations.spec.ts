import { getCurrentSeason } from '@/lib/recommendations'

jest.mock('@/lib/supabase', () => ({
  supabase: {},
}))

describe('getCurrentSeason', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it.each([
    [new Date(2026, 0, 15), 'winter'],
    [new Date(2026, 2, 15), 'spring'],
    [new Date(2026, 5, 15), 'summer'],
    [new Date(2026, 8, 15), 'fall'],
    [new Date(2026, 11, 15), 'winter'],
  ])('returns %s for %s', (date, expectedSeason) => {
    jest.useFakeTimers().setSystemTime(date)

    expect(getCurrentSeason()).toBe(expectedSeason)
  })
})