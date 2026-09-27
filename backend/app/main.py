from typing import Annotated
from fastapi import FastAPI, Query
from pydantic import BaseModel  
from models import Scores, Distances, Property, PropertyListResponse
from data import prop_results

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
        

