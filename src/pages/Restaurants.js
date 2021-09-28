import React, { useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi"
import RestaurantService from '../services/RestaurantService'
import { Link } from 'react-router-dom'

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([])
    
    useEffect(() => {
        RestaurantService.getRestaurants().then((response) => {
            console.log(response)
            setRestaurants(response.data)
        })
    }, [])

    return (
        <div>
            <h1 className="text-center text-7xl py-12">Restaurants</h1>

            <div className="bg-white-standard h-10 w-1/2 flex items-center rounded-3xl shadow-lg mx-auto">
                <div className="px-5">
                    <FiSearch/>
                </div>
                <input className="flex w-full h-10 focus:outline-none rounded-3xl pr-5" placeholder="Find what you are looking for..." />
            </div>
            <div className="pt-4"/>
            <div className="flex justify-center grid grid-cols-1 mx-64">
                {
                    restaurants?.map(
                        restaurant =>
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

export default Restaurants
