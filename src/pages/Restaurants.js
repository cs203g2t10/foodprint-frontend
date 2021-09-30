import React, { useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi"
import RestaurantService from '../services/RestaurantService'
import { Link } from 'react-router-dom'
import 'react-dropdown/style.css';

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
            <div className="bg-yellow-standard">
                <img className="h-32 mx-auto pt-7"  src="/images/burgers.png" alt="burger" />
                <h1 className="flex items-center justify-center text-4xl font-bold tracking-wide">Make reservations, reduce food waste</h1>
                <h1 className="flex items-center justify-center text-4xl font-bold tracking-wide">and save money</h1>

                <div className="bg-white-offWhite h-10 w-1/2 flex items-center rounded-xl shadow-lg mx-auto m-8">
                    <div className="px-5">
                        <FiSearch/>
                    </div>
                        <input className="bg-white-offWhite flex w-full h-10 focus:outline-none rounded-xl pr-5" placeholder="Find what you are looking for..." />
                </div>
                <div className="pb-5"></div>
            </div>

            <div>
                <div className="justify-items-center grid lg:grid-cols-4 gap-4 mx-14 mt-10 pb-8 animate__animated animate__fadeIn">
                        <div className="bg-white-creamWhite h-auto w-64 shadow-md hover:shadow-lg rounded-xl flex-none">
                            <img className="object-fill w-full h-40 rounded-xl "  src="/images/restaurant.jpg" alt="burger"/>
                            <div className = "my-4 mx-5">
                                <h2 className = "bg-yellow-standard w-4/12 text-center rounded-xl text-base py-1">-42%</h2>
                                <h1 className = " mt-2">Bread Palace Cafe</h1>
                                <h1 className = "text-base">Tampines</h1>
                            </div>
                        </div>
                    <div className="bg-white-creamWhite h-auto w-64 shadow-md hover:shadow-lg rounded-xl">
                        <img className="object-fill w-full h-40 rounded-xl "  src="/images/restaurant.jpg" alt="burger"/>
                        <div className = "my-4 mx-5">
                            <h2 className = "bg-yellow-standard w-4/12 text-center rounded-xl text-base py-1">-42%</h2>
                            <h1 className = " mt-2">Bread Palace Cafe</h1>
                            <h1 className = "text-base">Tampines</h1>
                        </div>
                    </div>
                    <div className="bg-white-creamWhite h-auto w-64 shadow-md hover:shadow-lg rounded-xl">
                        <img className="object-fill w-full h-40 rounded-xl "  src="/images/restaurant.jpg" alt="burger"/>
                        <div className = "my-4 mx-5">
                            <h2 className = "bg-yellow-standard w-4/12 text-center rounded-xl text-base py-1">-42%</h2>
                            <h1 className = " mt-2">Bread Palace Cafe</h1>
                            <h1 className = "text-base">Tampines</h1>
                        </div>
                    </div>
                    <div className="bg-white-creamWhite h-auto w-64 shadow-md hover:shadow-lg rounded-xl">
                        <img className="object-fill w-full h-40 rounded-xl "  src="/images/restaurant.jpg" alt="burger"/>
                        <div className = "my-4 mx-5">
                            <h2 className = "bg-yellow-standard w-4/12 text-center rounded-xl text-base py-1">-42%</h2>
                            <h1 className = " mt-2">Bread Palace Cafe</h1>
                            <h1 className = "text-base">Tampines</h1>
                        </div>
                    </div>
                </div>
            </div>

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
