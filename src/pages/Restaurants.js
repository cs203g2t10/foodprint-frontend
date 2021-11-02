import React, { useEffect, useState } from 'react'
import RestaurantService from '../services/RestaurantService'
import { Link } from 'react-router-dom'
import { SearchBar } from '../components/SearchBar'

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([])
    const [categories, setCategories] = useState([])

    const changeRestaurants = (restaurantData) => {
        setRestaurants(restaurantData)
        console.log(restaurantData)
    }

    const changeCategories = (categoryData) => {
        setCategories(categoryData)
        console.log(categoryData)
    }

    useEffect(() => {
        RestaurantService.getRestaurants().then((response) => {
            console.log(response)
            changeRestaurants(response.data)
        })
    }, [])

    useEffect(() => {
        RestaurantService.getCategories().then((response) => {
            console.log(response)
            changeCategories(response.data)
        })
    }, [])

    return (
        <div className="min-h-screen">
            <div className="bg-yellow-standard">
                <img className="h-32 mx-auto pt-7" src="/images/burgers.png" alt="burger" />
                <h1 className="flex text-center justify-center text-4xl font-bold tracking-wide">Make reservations, reduce food waste <br /> and save money</h1>
                <SearchBar changeRestaurants={changeRestaurants} />
                <div className="pb-8"></div>
            </div>

            <h1 className="text-3xl md:pr-40 font-extrabold pb-4 pl-40 pt-10">Categories</h1>
            <div className="overflow-hidden h-full w-full pl-24 pr-24 pb-14">
                <div className="flex flex-row gap-x-14 w-full overflow-auto pl-6 pr-6 pb-6">
                {
                (
                    (categories.length > 0) ? (
                        categories?.map(
                            category => {
                                return <Link to={"/categories?category=" + category} key={category}>
                                    <div className="bg-white-creamWhite h-24 w-64 shadow-md hover:shadow-lg rounded-xl flex-none pb-4">
                                        <div className="my-5 mx-5 pt-6">
                                            <h1 className="mt-2 text-xl text-grey-dark">{category}</h1>
                                        </div>
                                    </div>
                                </Link>
                            }
                        )
                    ) : (
                        <div className="md:pr-40 pb-4 pl-14 pt-8">
                            No categories found
                        </div>
                    )
                )
                }
                </div>
            </div>

            <h1 className="text-3xl md:pr-64 pl-1 font-extrabold pl-40">Restaurants</h1>
            <div className="justify-items-center grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-y-16 mx-24 mt-10 pb-8 animate__animated animate__fadeIn">
                {
                (
                    (restaurants.length > 0) ? (
                        restaurants?.map(
                            restaurant => {
                                let imageUrl = "/images/shop.jpg";
                                if (restaurant.pictures.length > 0) {
                                    imageUrl = restaurant.pictures[0].url;
                                }
                                return <Link to={"/restaurant/" + restaurant.restaurantId} key={restaurant.restaurantId}>
                                    <div className="bg-white-creamWhite h-auto w-64 shadow-md hover:shadow-lg rounded-xl flex-none pb-1">
                                        <img className="object-cover w-full h-40 rounded-xl " src={imageUrl} alt="food" />
                                        <div className="my-4 mx-5">
                                            {
                                                (restaurant.discounts.length > 0) ? (
                                                    <h2 className="text-green-standard w-4/12 text-center rounded-xl text-2xl font-semibold">-{restaurant.discounts[0].discountPercentage}%</h2>
                                                ) : (<h2 className="text-white-creamWhite w-4/12 text-center rounded-xl text-2xl font-semibold">-0%</h2>)
                                            }
                                            <h1 className="text-xl text-grey-dark">{restaurant.restaurantName}</h1>
                                            <h1 className="text-base text-grey-light">{restaurant.restaurantLocation}</h1>
                                        </div>
                                    </div>
                                </Link>
                            })
                    ) : (
                        <>
                            No restaurants found
                        </>
                    )
                )
                }
            </div>
        </div>
    )
}

export default Restaurants
