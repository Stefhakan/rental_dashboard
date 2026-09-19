import { useCallback, useEffect, useState } from 'react'

import './App.css'
import { ApiError, fetchProperties } from './api'
import { FilterBar, RENT_CEILING, RENT_FLOOR } from './components/FilterBar'
import { Header } from './components/Header'
import { PropertyCard } from './components/PropertyCard'
import { PropertyDetails } from './components/PropertyDetails'
import { PropertyMap } from './components/PropertyMap'
import { PropertyTable } from './components/PropertyTable'
import type { Filters, Property, ViewMode } from './types'

const DEFAULT_FILTERS: Filters = {
  minRent: 2500,
  maxRent: 4000,
  minBedrooms: 2,
  catsAllowed: true,
  sort: 'overall',
}

/** Wait this long after the last filter change before hitting the API. */
const FILTER_DEBOUNCE_MS = 250

function App() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [view, setView] = useState<ViewMode>('cards')
  const [properties, setProperties] = useState<Property[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Property | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const data = await fetchProperties(filters, controller.signal)
        setProperties(data.results)
        setTotal(data.total)
        setError(null)
      } catch (cause) {
        if (controller.signal.aborted) return
        setProperties([])
        setError(
          cause instanceof ApiError
            ? cause.message
            : 'Something went wrong loading properties.',
        )
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }, FILTER_DEBOUNCE_MS)

    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  }, [filters])

  const openDetails = useCallback(
    (property: Property) => setSelected(property),
    [],
  )

  return (
    <div className="app">
      <Header
        onAddRental={() =>
          setNotice('Adding a rental is not wired up to the API yet.')
        }
        onOpenSettings={() => setNotice('Settings are not built yet.')}
      />

      <main className="app-main">
        <div className="page-heading">
          <h1>Rental Search Dashboard</h1>
          <p className="saved-count">
            {total} {total === 1 ? 'Property' : 'Properties'} Saved
          </p>
        </div>

        <FilterBar
          filters={filters}
          onChange={setFilters}
          view={view}
          onViewChange={setView}
        />

        {notice && (
          <div className="banner banner-info" role="status">
            <span>{notice}</span>
            <button
              type="button"
              className="btn btn-ghost btn-small"
              onClick={() => setNotice(null)}
            >
              Dismiss
            </button>
          </div>
        )}

        {error && (
          <div className="banner banner-error" role="alert">
            <span>{error}</span>
            <button
              type="button"
              className="btn btn-ghost btn-small"
              onClick={() => setFilters({ ...filters })}
            >
              Retry
            </button>
          </div>
        )}

        {loading && properties.length === 0 && !error && (
          <div className="card-grid" aria-hidden="true">
            {Array.from({ length: 4 }, (_, index) => (
              <div className="card card-skeleton" key={index} />
            ))}
          </div>
        )}

        {!loading && !error && properties.length === 0 && (
          <div className="panel-empty">
            <p>No rentals match these filters.</p>
            <button
              type="button"
              className="btn"
              onClick={() =>
                setFilters({
                  ...DEFAULT_FILTERS,
                  minRent: RENT_FLOOR,
                  maxRent: RENT_CEILING,
                  minBedrooms: 0,
                  catsAllowed: false,
                })
              }
            >
              Clear filters
            </button>
          </div>
        )}

        {properties.length > 0 && (
          <div className={loading ? 'results is-stale' : 'results'}>
            {view === 'cards' && (
              <div className="card-grid">
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewDetails={openDetails}
                  />
                ))}
              </div>
            )}
            {view === 'table' && (
              <PropertyTable
                properties={properties}
                onViewDetails={openDetails}
              />
            )}
            {view === 'map' && (
              <PropertyMap
                properties={properties}
                onViewDetails={openDetails}
              />
            )}
          </div>
        )}
      </main>

      {selected && (
        <PropertyDetails
          property={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}

export default App
