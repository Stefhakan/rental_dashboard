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

prop_results= [
    Property(
        id= "Hello",
        neighborhood= "Alhambra",
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
        overall= 82,
        scores= Scores(
            commute= 62,
            price= 93,
            neighborhood= 74,
            amenities= 84,
        ),
        distances= Distances(
            work_minutes= 45,
            grocery_miles= 3,
            park_miles= 10,
        )
     ),
    Property(
        id= "Goodbye",
        neighborhood= "Moorpark",
        address= "13747 Blue Ridge Way",
        rent= 4800,
        bedrooms= 1,
        bathrooms= 2,
        sqft= 1000,
        cats_allowed= False,
        dogs_allowed= False,
        photo_url= None,
        listing_url= None,
        latitude= 34.094507,
        longitude= -118.123951,
        overall= 88,
        scores= Scores(
            commute= 85,
            price= 66,
            neighborhood= 87,
            amenities= 79,
        ),
        distances= Distances(
            work_minutes= 45,
            grocery_miles= 3,
            park_miles= 10,
        )
    ),
    Property(
        id= "Hej",
        neighborhood= "Pasadena",
        address= "650 E Green St",
        rent= 3200,
        bedrooms= 2,
        bathrooms= 2,
        sqft= 1007,
        cats_allowed= False,
        dogs_allowed= False,
        photo_url= None,
        listing_url= None,
        latitude= 34.094507,
        longitude= -118.123951,
        overall= 96,
        scores= Scores(
            commute= 95,
            price= 76,
            neighborhood= 97,
            amenities= 89,
        ),
        distances= Distances(
            work_minutes= 5,
            grocery_miles= 3,
            park_miles= 10,
        )
    ),
]


app = FastAPI()

@app.get("/api/properties", response_model=PropertyListResponse)

def get_property(
    min_rent: Annotated[int, Query()],
    max_rent: Annotated[int, Query()],
    min_bedrooms: Annotated[int, Query()],
    cats_allowed: Annotated[bool, Query()] = None,
    sort: Annotated[str, Query()] = 'overall',
):
    
    print(cats_allowed)

    proper_list= []

    for i in prop_results:
        if i.rent >= min_rent and i.rent <= max_rent and i.bedrooms >= min_bedrooms and (cats_allowed is None or i.cats_allowed):
            proper_list.append(i)
    
    if sort == "overall":
        print(sort)
        new_list_sorted = sorted(proper_list, key=lambda o: o.overall, reverse=True)
        prop_list= {
        "total": len(prop_results),
        "count": len(proper_list),
        "results": new_list_sorted
        }

        return prop_list
    elif sort == "price":
        new_list_sorted_price = sorted(proper_list, key=lambda p: p.scores.price, reverse=True)
        print(new_list_sorted_price)
        prop_list= {
        "total": len(prop_results),
        "count": len(proper_list),
        "results": new_list_sorted_price
        }
        return prop_list
    elif sort == "neighborhood":
        new_list_sorted_neigh = sorted(proper_list, key=lambda p: p.scores.neighborhood, reverse=True)
        prop_list= {
        "total": len(prop_results),
        "count": len(proper_list),
        "results": new_list_sorted_neigh
        }
        return prop_list
    elif sort == "amenities":
        new_list_sorted_amen = sorted(proper_list, key=lambda p: p.scores.amenities, reverse=True)
        prop_list= {
        "total": len(prop_results),
        "count": len(proper_list),
        "results": new_list_sorted_amen
        }
        return prop_list
    elif sort == "commute":
        new_list_sorted_comm = sorted(proper_list, key=lambda p: p.scores.commute, reverse=True)
        prop_list= {
        "total": len(prop_results),
        "count": len(proper_list),
        "results": new_list_sorted_comm
        }
        return prop_list
    else:
        prop_list= {
        "total": len(prop_results),
        "count": len(proper_list),
        "results": proper_list
        }
        return prop_list
        

