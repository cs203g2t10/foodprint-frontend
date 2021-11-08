import React, { useEffect, useState } from 'react'
import RestaurantService from '../services/RestaurantService'
import { Link } from 'react-router-dom'
import { SearchBar } from '../components/SearchBar'
import RestaurantListing from '../components/RestaurantListing'
import Loading from '../components/Loading'

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
                <img className="h-28 mx-auto pt-3" src="/images/burgers.png" alt="burger" />
                <h1 className="flex text-center justify-center text-3xl font-bold tracking-wide text-grey-dark">Make reservations, reduce food waste and save money</h1>
                <SearchBar changeRestaurants={changeRestaurants} />
                <div className="pb-3"></div>
            </div>

            <h1 className="text-xl md:pr-40 font-semibold text-grey-dark pl-32 pt-10 text-grey">Categories</h1>
            <div className="overflow-hidden h-full w-full px-24 pt-4">
                <div className="flex flex-row gap-x-6 w-full overflow-x-auto px-12 pb-4">
                    {
                        (
                            (categories.length > 0) ? (
                                categories?.map(
                                    category => {
                                        return <Link to={"/categories?category=" + category} key={category}>
                                            <div className="bg-white-offWhite hover:bg-white-dirtyWhite text-green-standard shadow-md hover:shadow-lg rounded-xl w-28 text-center">
                                                <h1 className="px-2 py-2 text-base text-grey-dark">{category}</h1>
                                            </div>
                                        </Link>
                                    }
                                )
                            ) : (
                                <Loading />
                            )
                        )
                    }
                </div>
            </div>

            {/* <h1 className="text-3xl md:pr-64 font-extrabold pl-40">Restaurants</h1> */}
            <div className="justify-items-center grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-y-16 px-24 mt-10 pb-8 animate__animated animate__fadeIn">
                {
                    (
                        (restaurants.length > 0) ? (
                            restaurants?.map(
                                restaurant => {
                                    let priceRange = restaurant.restaurantPriceRange === null ? 0 : restaurant.restaurantPriceRange;
                                    let imageUrl = restaurant.picture ? restaurant.picture.url : "/images/shop.jpg";
                                    let discount = restaurant.discount ? restaurant.discount.discountPercentage : 0;
                                    return <RestaurantListing {...{ restaurant, imageUrl, discount, priceRange }} />
                                })
                        ) : (
                            <Loading />
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Restaurants

