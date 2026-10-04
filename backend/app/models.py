from pydantic import BaseModel, Field, computed_field

from scoring import (
    COMMUTE_BEST_MINUTES,
    COMMUTE_WORST_MINUTES,
    RENT_BEST,
    RENT_WORST,
    score_between,
)

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
    distances: Distances

    # Judged by hand. Everything else in `scores` is calculated below, so these
    # two are inputs only - they stay out of the JSON the frontend receives.
    neighborhood_score: int = Field(exclude=True)
    amenities_score: int = Field(exclude=True)

    @computed_field
    @property
    def scores(self) -> Scores:
        return Scores(
            commute=score_between(
                self.distances.work_minutes,
                COMMUTE_BEST_MINUTES,
                COMMUTE_WORST_MINUTES,
            ),
            price=score_between(self.rent, RENT_BEST, RENT_WORST),
            neighborhood=self.neighborhood_score,
            amenities=self.amenities_score,
        )

    @computed_field
    @property
    def overall(self) -> int:
        s = self.scores
        return round((s.commute + s.price + s.neighborhood + s.amenities) / 4)

class PropertyListResponse(BaseModel):
    total: int
    count: int
    results: list[Property]


"""
This section will be the notes for the Score Validation part

The overall score will be the average of commute, price, neighborhood, amenities

distance from work to home will create the commute score

price scores will work as the below:



"""