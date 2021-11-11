import React, { useEffect, useState } from 'react'
import RestaurantService from '../services/RestaurantService'
import { Link } from 'react-router-dom'
import { SearchBar } from '../components/SearchBar'
import RestaurantListing from '../components/RestaurantListing'
import Loading from '../components/Loading'

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])

    const changeRestaurants = (restaurantData: any) => {
        setRestaurants(restaurantData)
    }

    const changeCategories = (categoryData: any) => {
        setCategories(categoryData)
    }

    useEffect(() => {
        RestaurantService.getRestaurants().then((response) => {
            changeRestaurants(response.data)
        })
    }, [])

    useEffect(() => {
        RestaurantService.getCategories().then((response) => {
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

            {/* <h1 className="text-xl md:pr-40 font-semibold text-grey-dark pl-32 pt-10 text-grey">Categories</h1> */}
            <div className="h-full w-full px-24 pt-4">
                <div className="flex flex-row gap-x-6 w-full overflow-x-auto  pb-6 overflow-hidden mt-6">
                    {
                        categories?.map(
                            category => {
                                return <Link to={"/categories?category=" + category} key={category}>
                                    <div className="h-8 text-green-standard border border-green-standard shadow-md hover:shadow-lg rounded-xl w-28 text-center">
                                        <h1 className="px-2 my-auto text-base text-green-standard">{category}</h1>
                                    </div>
                                </Link>
                            }
                        )
                    }
                </div>
            </div>

            {/* <h1 className="text-3xl md:pr-64 font-extrabold pl-40">Restaurants</h1> */}
            <div className="justify-items-center grid 3xl:grid-cols-6 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-y-16 px-24 mt-10 pb-8 animate__animated animate__fadeIn">
                {
                    restaurants?.map(
                        restaurant => {
                            let priceRange = restaurant.restaurantPriceRange === null ? 0 : restaurant.restaurantPriceRange;
                            let imageUrl = restaurant.picture ? restaurant.picture.url : "/images/shop.jpg";
                            let discount = restaurant.discount ? restaurant.discount.discountPercentage : 0;
                            return <RestaurantListing key={restaurant.restaurantId} {...{ restaurant, imageUrl, discount, priceRange }} />
                        })
                }
            </div>
            {
                restaurants.length === 0 &&
                <div className="flex justify-center">
                    <Loading />
                </div>
            }
        </div>
    )
}

export default Restaurants

