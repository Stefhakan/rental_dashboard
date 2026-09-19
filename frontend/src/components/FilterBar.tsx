import { formatRent } from '../format'
import type { Filters, SortKey, ViewMode } from '../types'
import { RangeSlider } from './RangeSlider'

export const RENT_FLOOR = 500
export const RENT_CEILING = 8000
export const RENT_STEP = 50

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'overall', label: 'Overall Score' },
  { value: 'price', label: 'Price Score' },
  { value: 'commute', label: 'Commute Score' },
  { value: 'neighborhood', label: 'Neighborhood Score' },
  { value: 'amenities', label: 'Amenities Score' },
]

const BEDROOM_OPTIONS = [0, 1, 2, 3, 4]

const VIEW_OPTIONS: { value: ViewMode; label: string }[] = [
  { value: 'cards', label: 'Cards' },
  { value: 'map', label: 'Map' },
  { value: 'table', label: 'Table' },
]

interface FilterBarProps {
  filters: Filters
  onChange: (filters: Filters) => void
  view: ViewMode
  onViewChange: (view: ViewMode) => void
}

export function FilterBar({
  filters,
  onChange,
  view,
  onViewChange,
}: FilterBarProps) {
  const patch = (changes: Partial<Filters>) =>
    onChange({ ...filters, ...changes })

  return (
    <div className="filter-bar">
      <div className="filter-row">
        <div className="filter">
          <span className="filter-label">Budget</span>
          <RangeSlider
            min={RENT_FLOOR}
            max={RENT_CEILING}
            step={RENT_STEP}
            low={filters.minRent}
            high={filters.maxRent}
            labelLow={formatRent(filters.minRent)}
            labelHigh={formatRent(filters.maxRent)}
            onChange={(minRent, maxRent) => patch({ minRent, maxRent })}
          />
        </div>

        <div className="filter">
          <label className="filter-label" htmlFor="bedrooms">
            Bedrooms
          </label>
          <select
            id="bedrooms"
            className="select"
            value={filters.minBedrooms}
            onChange={(event) =>
              patch({ minBedrooms: Number(event.target.value) })
            }
          >
            {BEDROOM_OPTIONS.map((count) => (
              <option key={count} value={count}>
                {count === 0 ? 'Any' : `${count}+`}
              </option>
            ))}
          </select>
        </div>

        <div className="filter">
          <span className="filter-label">Cats</span>
          <button
            type="button"
            className="toggle"
            role="switch"
            aria-checked={filters.catsAllowed}
            aria-label="Only show cat-friendly rentals"
            onClick={() => patch({ catsAllowed: !filters.catsAllowed })}
          >
            <span className="toggle-knob" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="filter-row filter-row-secondary">
        <div className="filter">
          <label className="filter-label" htmlFor="sort">
            Sort by
          </label>
          <select
            id="sort"
            className="select"
            value={filters.sort}
            onChange={(event) =>
              patch({ sort: event.target.value as SortKey })
            }
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter">
          <span className="filter-label">View</span>
          <div className="segmented" role="group" aria-label="View mode">
            {VIEW_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className="segment"
                aria-pressed={view === option.value}
                onClick={() => onViewChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
