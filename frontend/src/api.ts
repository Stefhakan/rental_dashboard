import type { Filters, PropertyListResponse } from './types'

/**
 * Vite proxies `/api` to the FastAPI server (see vite.config.ts), so relative
 * URLs work in dev. Set VITE_API_BASE_URL to point at another host in prod.
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export class ApiError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

function buildQuery(filters: Filters): string {
  const params = new URLSearchParams({
    min_rent: String(filters.minRent),
    max_rent: String(filters.maxRent),
    min_bedrooms: String(filters.minBedrooms),
    sort: filters.sort,
  })
  // Only constrain on pets when the filter is actually on, so the backend can
  // treat an absent param as "don't care".
  if (filters.catsAllowed) params.set('cats_allowed', 'true')
  return params.toString()
}

export async function fetchProperties(
  filters: Filters,
  signal?: AbortSignal,
): Promise<PropertyListResponse> {
  let response: Response
  try {
    response = await fetch(`${BASE_URL}/api/properties?${buildQuery(filters)}`, {
      headers: { Accept: 'application/json' },
      signal,
    })
  } catch (cause) {
    if (signal?.aborted) throw cause
    throw new ApiError('Could not reach the API. Is the FastAPI server running?')
  }

  if (!response.ok) {
    throw new ApiError(
      `The API responded with ${response.status} ${response.statusText}.`,
      response.status,
    )
  }

  return (await response.json()) as PropertyListResponse
}
