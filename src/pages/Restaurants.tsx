import React, { useEffect, useState } from 'react'
import RestaurantService from '../services/RestaurantService'
import { Link } from 'react-router-dom'
import { SearchBar } from '../components/SearchBar'
import RestaurantListing from '../components/RestaurantListing'
import Loading from '../components/Loading'

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(false);

    const changeRestaurants = (restaurantData: any) => {
        setRestaurants(restaurantData)
    }

    const changeCategories = (categoryData: any) => {
        setCategories(categoryData)
    }

    useEffect(() => {
        setLoading(true);
        RestaurantService.getRestaurants().then((response) => {
            changeRestaurants(response.data)
            setLoading(false);
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
                <img className="md:h-28 h-20 mx-auto pt-3" src="/images/burgers.png" alt="burger" />
                <h1 className="flex text-center justify-center md:text-3xl text-2xl font-bold tracking-wide text-grey-dark">
                    Make reservations, reduce food waste and save money
                </h1>
                <SearchBar {...{ changeRestaurants, setLoading }} />
                <div className="pb-3"></div>
            </div>

            <div className="h-full w-full md:px-32 px-4 pt-4">
                <div className="flex flex-row gap-x-6 w-full overflow-x-auto  pb-6 overflow-hidden mt-6">
                    {
                        categories?.map(
                            category => {
                                return <Link to={"/categories?category=" + category} key={category}>
                                    <div className="h-8 text-green-standard border border-green-standard shadow-md hover:shadow-lg rounded-lg w-28 text-center">
                                        <h1 className="px-2 my-auto text-base text-green-standard">{category}</h1>
                                    </div>
                                </Link>
                            }
                        )
                    }
                </div>
            </div>

            <div className="justify-items-center grid 3xl:grid-cols-6 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-y-16 md:px-24 mt-10 pb-8 animate__animated animate__fadeIn">
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
                loading &&
                <div className="flex justify-center">
                    <Loading />
                </div>
            }
        </div>
    )
}

export default Restaurants

