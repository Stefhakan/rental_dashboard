const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const decimal = new Intl.NumberFormat('en-US')

export const formatRent = (rent: number) => currency.format(rent)

export const formatSqft = (sqft: number) => `${decimal.format(sqft)}sf`

export const formatMiles = (miles: number) => `${miles.toFixed(1)} mi`

export const formatMinutes = (minutes: number) => `${minutes} min`

/** Beds and baths print as "2" rather than "2.0", but half baths survive. */
export const formatRooms = (rooms: number) =>
  Number.isInteger(rooms) ? String(rooms) : rooms.toFixed(1)

/** Buckets a 0-100 score so the UI can color it consistently everywhere. */
export function scoreTier(score: number): 'high' | 'mid' | 'low' {
  if (score >= 85) return 'high'
  if (score >= 70) return 'mid'
  return 'low'
}
