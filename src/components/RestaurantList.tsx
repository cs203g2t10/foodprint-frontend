import React, { useState, useEffect } from 'react'
import RestaurantService from "../services/RestaurantService";
import { Link } from 'react-router-dom';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([])
    
    useEffect(() => {
        RestaurantService.getRestaurants().then((response) => {
            console.log(response)
            setRestaurants(response.data)
        })
    }, [])


    return (
        <div>
            <div className="justify-center grid grid-cols-1 mx-64">
                {
                    restaurants?.map(
                        (restaurant: any) =>
                            <Link to={"/restaurant/" + restaurant.restaurantId} className="flex gap-x-48 text-center border p-5 my-2 rounded-lg" key={restaurant.restaurantId}>
                                <div> {restaurant.restaurantId} </div>
                                <div> {restaurant.restaurantName} </div>
                                <div> {restaurant.restaurantDesc} </div>
                                <div> {restaurant.restaurantLocation}</div>
                            </Link>
                    )
                }
            </div>
        </div>
    )
}

export default RestaurantList
