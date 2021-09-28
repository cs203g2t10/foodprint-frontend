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
            <div className="flex justify-center grid grid-cols-1 mx-64">
                {/* <figure className="md:flex bg-gray-100 rounded-xl p-8 md:p-0 justify-center">
                    <img className="w-32 h-32 rounded-full ml-32 my-6" src="/images/macs.jpeg" alt="" width="384" height="512" />
                    <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                        <blockquote>
                            <p className="text-lg font-semibold">
                                Maccies by Mr Ronald
                            </p>
                        </blockquote>
                        <figcaption className="font-medium">
                            <div className="text-cyan-600">
                                This is the bestest maccies eat my burgers
                            </div>
                            <div className="text-gray-500">
                                Bedok Mall, 69
                            </div>
                        </figcaption>
                    </div>
                </figure> */}

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

export default RestaurantList
