import React from 'react'
import RestaurantList from '../components/RestaurantList'
import { FiSearch } from "react-icons/fi"

const Restaurants = () => {
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
            <RestaurantList />
        </div>
    )
}

export default Restaurants
