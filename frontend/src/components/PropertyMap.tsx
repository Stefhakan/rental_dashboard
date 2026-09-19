import { formatRent, scoreTier } from '../format'
import type { Property } from '../types'

interface PropertyMapProps {
  properties: Property[]
  onViewDetails: (property: Property) => void
}

interface Placed {
  property: Property
  latitude: number
  longitude: number
}

/** Leaves a margin so pins near the edge of the bounds stay fully visible. */
const PAD = 8

function project(value: number, min: number, max: number): number {
  if (max - min < 1e-9) return 50
  return PAD + ((value - min) / (max - min)) * (100 - PAD * 2)
}

/**
 * Plots listings by their coordinates on a plain grid. There is no basemap
 * behind it yet, so this shows relative position only.
 */
export function PropertyMap({ properties, onViewDetails }: PropertyMapProps) {
  const placed: Placed[] = properties.flatMap((property) =>
    property.latitude === null || property.longitude === null
      ? []
      : [
          {
            property,
            latitude: property.latitude,
            longitude: property.longitude,
          },
        ],
  )

  if (placed.length === 0) {
    return (
      <div className="panel-empty">
        <p>No coordinates on these listings yet.</p>
        <p className="muted">
          The map draws from <code>latitude</code> and <code>longitude</code> on
          each property.
        </p>
      </div>
    )
  }

  const lats = placed.map((p) => p.latitude)
  const lngs = placed.map((p) => p.longitude)
  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)

  return (
    <div className="map">
      <div className="map-plot">
        {placed.map(({ property, latitude, longitude }) => (
          <button
            key={property.id}
            type="button"
            className={`map-pin tier-${scoreTier(property.overall)}`}
            style={{
              left: `${project(longitude, minLng, maxLng)}%`,
              // Latitude grows north, the y axis grows down.
              top: `${100 - project(latitude, minLat, maxLat)}%`,
            }}
            title={`${property.neighborhood} — ${formatRent(property.rent)}/mo`}
            onClick={() => onViewDetails(property)}
          >
            <span className="map-pin-score">{property.overall}</span>
            <span className="map-pin-label">
              {property.neighborhood} · {formatRent(property.rent)}
            </span>
          </button>
        ))}
      </div>
      <p className="map-note">
        Relative positions from listing coordinates — a tiled basemap is not
        wired up yet.
      </p>
    </div>
  )
}
