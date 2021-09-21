import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import RestaurantService from '../services/RestaurantService'

const Restaurant = () => {
    let id = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState([]);


    useEffect(() => {
        console.log(id.id)
        RestaurantService.getRestaurant(id.id).then((response) => {
            console.log(response.data)
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
                            <div className="border">
                                <div key={food.foodId} className="flex flex-row gap-2 p-6 rounded-md">
                                    <img src="/images/{food.picturePath}" className="h-full w-32 border " alt="food pic" />
                                    <div className="flex-col">
                                        <h1>{food.foodId}</h1>
                                        <p>{food.foodName}</p>
                                        <p>{food.foodDesc}</p>
                                    </div>


                                </div>
                                <div className="flex">
                                    <div className="flex-col">
                                        
                                    </div>
                                    <button className="flex inline-block flex-col border px-4 py-2 my-4 rounded-lg hover:shadow text-center justify-center">
                                        Add to order
                                    </button>
                                </div>

                            </div>
                    )
                }
            </div>
            <button className="flex mx-auto py-2 px-4 border my-10 rounded">Make Reservation</button>

        </div>
    )
}

export default Restaurant
