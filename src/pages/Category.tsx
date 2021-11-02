import React, { useEffect, useState } from 'react'
import RestaurantService from '../services/RestaurantService'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import RestaurantListing from '../components/RestaurantListing'

const Category = () => {
    const value = queryString.parse(window.location.search)
    const cat = value.category

    const [restaurants, setRestaurants] = useState([])

    const changeRestaurants = (restaurantData: any) => {
        setRestaurants(restaurantData)
        console.log(restaurantData)
    }

    useEffect(() => {
        RestaurantService.getRestaurantsInCategory(cat).then((response) => {
            console.log(response)
            changeRestaurants(response.data)
        })
    }, [cat])

    return (
        <div className="min-h-screen">
            <div className="bg-yellow-standard">
                <img className="h-32 mx-auto pt-7" src="/images/burgers.png" alt="burger" />
                <h1 className="flex text-center justify-center text-4xl font-bold tracking-wide">Make reservations, reduce food waste <br /> and save money</h1>
                <div className="pb-8"></div>
            </div>

            <div className="pt-8 pl-40">
                <Link to="/restaurants" className="bg-white-creamWhite mt-4 pt-2 pb-3 px-5 text-center text-grey-dark-standard shadow-md hover:shadow-lg rounded-xl">← Back to marketplace</Link>
            </div>

            <h1 className="text-3xl md:pr-64 font-extrabold pl-40 pt-10">Restaurants Containing "{cat}"</h1>
            <div className="justify-items-center grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-y-16 mx-24 mt-10 pb-8 animate__animated animate__fadeIn">
                {
                (
                    (restaurants.length > 0) ? (
                        restaurants?.map(
                            (restaurant: any) => {
                                let priceRange = restaurant.restaurantPriceRange === null ? 0 : restaurant.restaurantPriceRange;
                                let imageUrl = restaurant.picture ? restaurant.picture.url : "/images/shop.jpg";
                                let maxDiscount = 0;
                                restaurant.discounts.map((discount: any) => {
                                    if (discount.discountPercentage > maxDiscount) {
                                        maxDiscount = discount.discountPercentage
                                    }
                                    return <></>
                                })
                                return <RestaurantListing {...{restaurant, imageUrl, maxDiscount, priceRange}} />
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

export default Category;
