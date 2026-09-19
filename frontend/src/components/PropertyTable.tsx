import {
  formatMiles,
  formatMinutes,
  formatRent,
  formatRooms,
  formatSqft,
  scoreTier,
} from '../format'
import type { Property } from '../types'

interface PropertyTableProps {
  properties: Property[]
  onViewDetails: (property: Property) => void
}

export function PropertyTable({
  properties,
  onViewDetails,
}: PropertyTableProps) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Neighborhood</th>
            <th scope="col">Rent</th>
            <th scope="col">Layout</th>
            <th scope="col" className="num">
              Overall
            </th>
            <th scope="col" className="num">
              Commute
            </th>
            <th scope="col" className="num">
              Price
            </th>
            <th scope="col" className="num">
              Nbhd
            </th>
            <th scope="col" className="num">
              Amen.
            </th>
            <th scope="col" className="num">
              Work
            </th>
            <th scope="col" className="num">
              Grocery
            </th>
            <th scope="col" className="num">
              Park
            </th>
            <th scope="col">
              <span className="sr-only">Details</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <th scope="row">
                <span className="table-neighborhood">
                  {property.neighborhood}
                </span>
                <span className="table-address">{property.address}</span>
              </th>
              <td>{formatRent(property.rent)}/mo</td>
              <td>
                {formatRooms(property.bedrooms)} bd ·{' '}
                {formatRooms(property.bathrooms)} ba · {formatSqft(property.sqft)}
              </td>
              <td className="num">
                <span className={`pill tier-${scoreTier(property.overall)}`}>
                  {property.overall}
                </span>
              </td>
              <td className="num">{property.scores.commute}</td>
              <td className="num">{property.scores.price}</td>
              <td className="num">{property.scores.neighborhood}</td>
              <td className="num">{property.scores.amenities}</td>
              <td className="num">
                {formatMinutes(property.distances.work_minutes)}
              </td>
              <td className="num">
                {formatMiles(property.distances.grocery_miles)}
              </td>
              <td className="num">{formatMiles(property.distances.park_miles)}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-small"
                  onClick={() => onViewDetails(property)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
