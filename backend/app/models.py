from pydantic import BaseModel  

class Scores(BaseModel):
    commute: int
    price: int
    neighborhood: int
    amenities: int

class Distances(BaseModel):
    work_minutes: int
    grocery_miles: float
    park_miles: float

class Property(BaseModel):
    id: str
    neighborhood: str
    address: str
    rent: int
    bedrooms: int
    bathrooms: float
    sqft: int
    cats_allowed: bool
    dogs_allowed: bool
    photo_url: str | None
    listing_url: str | None
    latitude: float | None
    longitude: float | None
    overall: int
    scores: Scores
    distances: Distances

class PropertyListResponse(BaseModel):
    total: int
    count: int
    results: list[Property]
