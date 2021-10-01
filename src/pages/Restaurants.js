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
        <div className="min-h-screen">
            <div className="bg-yellow-standard">
                <img className="h-32 mx-auto pt-7" src="/images/burgers.png" alt="burger" />
                <h1 className="flex items-center justify-center text-4xl font-bold tracking-wide">Make reservations, reduce food waste</h1>
                <h1 className="flex items-center justify-center text-4xl font-bold tracking-wide">and save money</h1>

                <div className="bg-white-offWhite h-10 w-1/2 flex items-center rounded-xl shadow-lg mx-auto m-8">
                    <div className="px-5">
                        <FiSearch />
                    </div>
                    <input className="bg-white-offWhite flex w-full h-10 focus:outline-none rounded-xl pr-5" placeholder="Find what you are looking for..." />
                </div>
                <div className="pb-8"></div>
            </div>

            <div className="justify-items-center grid lg:grid-cols-4 gap-y-16 mx-24 mt-10 pb-8 animate__animated animate__fadeIn">
                {
                    restaurants?.map(
                        restaurant =>
                            <Link to={"/restaurant/" + restaurant.restaurantId} key={restaurant.restaurantId}>
                                <div className="bg-white-creamWhite h-auto w-64 shadow-md hover:shadow-lg rounded-xl flex-none pb-1">
                                    <img className="object-fill w-full h-40 rounded-xl " src="/images/restaurant.jpg" alt="burger" />
                                    <div className="my-4 mx-5">
                                        <h2 className="bg-yellow-standard w-4/12 text-center rounded-xl text-base py-1">-42%</h2>
                                        <h1 className=" mt-2">{restaurant.restaurantName}</h1>
                                        <h1 className="text-base">{restaurant.restaurantLocation}</h1>
                                    </div>
                                </div>
                            </Link>
                    )
                }
            </div>
        </div>
    )
}

export default Restaurants
