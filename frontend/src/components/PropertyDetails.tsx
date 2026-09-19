import { useEffect, useRef } from 'react'

import {
  formatMiles,
  formatMinutes,
  formatRent,
  formatRooms,
  formatSqft,
  scoreTier,
} from '../format'
import type { Property } from '../types'

const SCORE_ROWS = [
  { key: 'commute', label: 'Commute' },
  { key: 'price', label: 'Price' },
  { key: 'neighborhood', label: 'Neighborhood' },
  { key: 'amenities', label: 'Amenities' },
] as const

interface PropertyDetailsProps {
  property: Property
  onClose: () => void
}

export function PropertyDetails({ property, onClose }: PropertyDetailsProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dialogRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const pets = [
    property.cats_allowed ? 'Cats' : null,
    property.dogs_allowed ? 'Dogs' : null,
  ].filter(Boolean)

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`${property.neighborhood} details`}
        tabIndex={-1}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="dialog-header">
          <div>
            <h2>{property.neighborhood}</h2>
            <p className="muted">{property.address}</p>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-small"
            onClick={onClose}
          >
            Close
          </button>
        </header>

        {property.photo_url && (
          <img
            className="dialog-photo"
            src={property.photo_url}
            alt={property.address}
          />
        )}

        <dl className="dialog-facts">
          <div>
            <dt>Rent</dt>
            <dd>{formatRent(property.rent)}/mo</dd>
          </div>
          <div>
            <dt>Layout</dt>
            <dd>
              {formatRooms(property.bedrooms)} bd ·{' '}
              {formatRooms(property.bathrooms)} ba
            </dd>
          </div>
          <div>
            <dt>Size</dt>
            <dd>{formatSqft(property.sqft)}</dd>
          </div>
          <div>
            <dt>Pets</dt>
            <dd>{pets.length > 0 ? pets.join(' & ') : 'None'}</dd>
          </div>
          <div>
            <dt>Work</dt>
            <dd>{formatMinutes(property.distances.work_minutes)}</dd>
          </div>
          <div>
            <dt>Grocery</dt>
            <dd>{formatMiles(property.distances.grocery_miles)}</dd>
          </div>
          <div>
            <dt>Park</dt>
            <dd>{formatMiles(property.distances.park_miles)}</dd>
          </div>
          <div>
            <dt>Overall</dt>
            <dd>
              <span className={`pill tier-${scoreTier(property.overall)}`}>
                {property.overall}
              </span>
            </dd>
          </div>
        </dl>

        <dl className="score-list">
          {SCORE_ROWS.map(({ key, label }) => {
            const value = property.scores[key]
            return (
              <div className="score" key={key}>
                <dt className="score-label">{label}</dt>
                <dd className="score-value">
                  <span
                    className={`score-bar tier-${scoreTier(value)}`}
                    style={{ ['--score' as string]: `${value}%` }}
                    aria-hidden="true"
                  />
                  <span className="score-number">{value}</span>
                </dd>
              </div>
            )
          })}
        </dl>

        {property.listing_url && (
          <a
            className="btn btn-primary btn-block"
            href={property.listing_url}
            target="_blank"
            rel="noreferrer"
          >
            Open original listing
          </a>
        )}
      </div>
    </div>
  )
}
