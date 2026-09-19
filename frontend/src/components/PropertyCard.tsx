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

interface PropertyCardProps {
  property: Property
  onViewDetails: (property: Property) => void
}

export function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  const { distances, scores } = property

  return (
    <article className="card">
      <div className="card-photo">
        {property.photo_url ? (
          <img src={property.photo_url} alt={property.address} loading="lazy" />
        ) : (
          <span className="card-photo-placeholder">Property photo</span>
        )}
      </div>

      <div className="card-body">
        <header className="card-heading">
          <h3 className="card-neighborhood">{property.neighborhood}</h3>
          <p className="card-address">{property.address}</p>
        </header>

        <p className="card-rent">
          {formatRent(property.rent)}
          <span className="card-rent-unit">/mo</span>
        </p>

        <p className="card-specs">
          <span>{formatRooms(property.bedrooms)} bd</span>
          <span aria-hidden="true">•</span>
          <span>{formatRooms(property.bathrooms)} ba</span>
          <span aria-hidden="true">•</span>
          <span>{formatSqft(property.sqft)}</span>
        </p>

        <div className={`card-overall tier-${scoreTier(property.overall)}`}>
          <svg className="star" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.5l2.9 6.05 6.6.92-4.8 4.62 1.18 6.56L12 17.55 6.12 20.65l1.18-6.56-4.8-4.62 6.6-.92z" />
          </svg>
          <span className="card-overall-value">{property.overall}</span>
          <span className="card-overall-label">Overall</span>
        </div>

        <dl className="score-list">
          {SCORE_ROWS.map(({ key, label }) => {
            const value = scores[key]
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

        <ul className="distance-list">
          <li>
            <span className="distance-icon" aria-hidden="true">
              🚗
            </span>
            <span className="distance-label">Work</span>
            <span className="distance-value">
              {formatMinutes(distances.work_minutes)}
            </span>
          </li>
          <li>
            <span className="distance-icon" aria-hidden="true">
              🛒
            </span>
            <span className="distance-label">Grocery</span>
            <span className="distance-value">
              {formatMiles(distances.grocery_miles)}
            </span>
          </li>
          <li>
            <span className="distance-icon" aria-hidden="true">
              🌳
            </span>
            <span className="distance-label">Park</span>
            <span className="distance-value">
              {formatMiles(distances.park_miles)}
            </span>
          </li>
        </ul>

        <button
          type="button"
          className="btn btn-block"
          onClick={() => onViewDetails(property)}
        >
          View Details
        </button>
      </div>
    </article>
  )
}
