from pydantic import BaseModel
from models import Scores, Distances, Property, PropertyListResponse


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
