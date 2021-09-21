import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import RestaurantService from '../services/RestaurantService'

const Restaurant = () => {
    let id = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState([]);
    let location = useLocation();


    useEffect(() => {
        RestaurantService.getRestaurant(id.id).then((response) => {
            // console.log(response.data)
            setRestaurantDetails(response.data)
        })
    }, [id])

    return (
        <div>
            <h1 className="text-center text-7xl pt-12 pb-4">{restaurantDetails.restaurantName}</h1>
            <p className="text-center text-2xl pb-4 ">Description: Hallo{restaurantDetails.restaurantDesc}</p>
            <div className="flex flex-col mx-10 gap-y-12">
                {
                    restaurantDetails.allFood?.map(
                        food =>
                            <div className="border rounded shadow-md py-3" key={food.foodId}>
                                <div className="flex flex-row gap-2 p-6 rounded-md">
                                    <img src="/images/{food.picturePath}" className="h-full w-32 border flex-col mx-auto" alt="food pic" />
                                    <div className="flex-col mx-auto">
                                        <h1>{food.foodId}</h1>
                                        <p>{food.foodName}</p>
                                        <p>{food.foodDesc}</p>
                                    </div>


                                </div>
                                <div className="flex">
                                    <div className="flex-col">
                                        
                                    </div>
                                    <Link 
                                    to={{
                                        pathname: `/restaurant/${id.id}/${food.foodId}`,
                                        // This is the trick! This link sets
                                        // the `background` in location state.
                                        state: { background: location }
                                      }}
                                    
                                    className="flex flex-col border px-4 py-2 my-4 rounded-lg hover:shadow text-center mx-auto">
                                        Add to order
                                    </Link>
                                </div>

                            </div>
                    )
                }
            </div>
            <button className="flex mx-auto py-2 px-4 border my-10 rounded shadow-md">Make Reservation</button>
        </div>
    )
}

export default Restaurant
