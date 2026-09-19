from typing import Annotated
from fastapi import FastAPI, Query
from pydantic import BaseModel  

class Scores(BaseModel):
    commute: int
    price: int
    neighborhood: int
    amenities: int

class Distances(BaseModel):
    work_minutes: int
    grocery_miles: int
    park_miles: int

class Property(BaseModel):
    id: str
    neighborhood: str
    address: str
    rent: int
    bedrooms: int
    bathrooms: int
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

app = FastAPI()

@app.get("/api/properties", response_model=PropertyListResponse)

def get_property():

    prop_list= {
        "total": 2,
        "count": 2,
        "results": [
            Property(
                id= "Hello",
                neighborhood= "Moorpark",
                address= "88 S Garfield Ave",
                rent= 2800,
                bedrooms= 2,
                bathrooms= 2,
                sqft= 1000,
                cats_allowed= True,
                dogs_allowed= False,
                photo_url= None,
                listing_url= None,
                latitude= 34.094507,
                longitude= -118.123951,
                overall= 9,
                scores= Scores(
                    commute= 8,
                    price= 8,
                    neighborhood= 8,
                    amenities= 8,
                ),
                distances= Distances(
                    work_minutes= 45,
                    grocery_miles= 3,
                    park_miles= 10,
                )
            ),
            Property(
                id= "Hello",
                neighborhood= "Moorpark",
                address= "88 S Garfield Ave",
                rent= 2800,
                bedrooms= 2,
                bathrooms= 2,
                sqft= 1000,
                cats_allowed= True,
                dogs_allowed= False,
                photo_url= None,
                listing_url= None,
                latitude= 34.094507,
                longitude= -118.123951,
                overall= 9,
                scores= Scores(
                    commute= 8,
                    price= 8,
                    neighborhood= 8,
                    amenities= 8,
                ),
                distances= Distances(
                    work_minutes= 45,
                    grocery_miles= 3,
                    park_miles= 10,
                )
            ),
        ]
    }

    return prop_list
        
