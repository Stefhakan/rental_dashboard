export interface Scores {
  commute: number
  price: number
  neighborhood: number
  amenities: number
}

export interface Distances {
  work_minutes: number
  grocery_miles: number
  park_miles: number
}

export interface Property {
  id: string
  neighborhood: string
  address: string
  rent: number
  bedrooms: number
  bathrooms: number
  sqft: number
  cats_allowed: boolean
  dogs_allowed: boolean
  photo_url: string | null
  listing_url: string | null
  latitude: number | null
  longitude: number | null
  overall: number
  scores: Scores
  distances: Distances
}

export interface PropertyListResponse {
  /** Properties saved in total, before any filter is applied. */
  total: number
  /** Properties remaining after the requested filters. */
  count: number
  results: Property[]
}

export type SortKey =
  | 'overall'
  | 'price'
  | 'commute'
  | 'neighborhood'
  | 'amenities'

export type ViewMode = 'cards' | 'map' | 'table'

export interface Filters {
  minRent: number
  maxRent: number
  minBedrooms: number
  catsAllowed: boolean
  sort: SortKey
}
