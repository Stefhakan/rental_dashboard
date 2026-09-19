# API contract

What the frontend expects from the FastAPI backend. Vite proxies `/api` to
`http://127.0.0.1:8000` (see `vite.config.ts`), so the backend should mount these
routes under the `/api` prefix. Set `VITE_API_BASE_URL` to target another host.

## `GET /api/properties`

The only endpoint the homepage calls.

### Query parameters

| Param          | Type   | Notes                                                                             |
| -------------- | ------ | --------------------------------------------------------------------------------- |
| `min_rent`     | int    | Inclusive lower bound on monthly rent.                                             |
| `max_rent`     | int    | Inclusive upper bound on monthly rent.                                             |
| `min_bedrooms` | int    | Inclusive; `0` means "any".                                                        |
| `cats_allowed` | bool   | **Only sent when the filter is on.** Absent means "don't care".                    |
| `sort`         | string | One of `overall`, `price`, `commute`, `neighborhood`, `amenities`. Descending.      |

### Response

```json
{
  "total": 12,
  "count": 2,
  "results": [
    {
      "id": "wh-1",
      "neighborhood": "Woodland Hills",
      "address": "21100 Ventura Blvd",
      "rent": 3150,
      "bedrooms": 2,
      "bathrooms": 2,
      "sqft": 1050,
      "cats_allowed": true,
      "dogs_allowed": false,
      "photo_url": "https://…/photo.jpg",
      "listing_url": "https://…/listing",
      "latitude": 34.1684,
      "longitude": -118.6059,
      "overall": 87,
      "scores": {
        "commute": 82,
        "price": 88,
        "neighborhood": 85,
        "amenities": 94
      },
      "distances": {
        "work_minutes": 31,
        "grocery_miles": 0.3,
        "park_miles": 0.4
      }
    }
  ]
}
```

Field notes:

- `total` — every property saved, **ignoring** the filters. This drives the
  "N Properties Saved" counter in the header, so it must not shrink when filters
  narrow the list.
- `count` — results after filtering (length of `results`).
- `overall` — 0-100, computed server-side. The UI displays it as given; it does
  not recompute it from `scores`.
- `scores.*` — each 0-100. The UI colors them: ≥85 green, ≥70 amber, below that
  red.
- `distances.work_minutes` — integer minutes. `grocery_miles` / `park_miles` —
  floats, rendered to one decimal.
- `photo_url`, `listing_url`, `latitude`, `longitude` — nullable. A null photo
  renders a placeholder; null coordinates drop the listing from the map view.
- `bathrooms` may be fractional (`1.5`); the UI prints integers without a decimal.

Types live in [`src/types.ts`](src/types.ts) and should stay in sync with the
Pydantic models.

## Not yet called by the UI

The **+ Add Rental** and **Settings** buttons currently show a "not wired up"
notice. When endpoints exist (e.g. `POST /api/properties`), hook them up in
`src/api.ts` and replace the notice handlers in `src/App.tsx`.

## CORS

Not needed in dev because of the Vite proxy. For a deployed frontend on a
different origin, add `CORSMiddleware` with the frontend origin.
