import React from 'react'
import { Link } from 'react-router-dom'

const RestaurantListing = (props: any) => {

    const { restaurant, imageUrl, maxDiscount, priceRange } = props;

    return (
        <Link to={"/restaurant/" + restaurant.restaurantId} key={restaurant.restaurantId}>
            <div className="bg-white-creamWhite h-full w-64 shadow-md hover:shadow-lg rounded-xl flex-none pb-1">
                <img className="object-cover w-full h-40 rounded-t-xl" src={imageUrl} alt="food" />
                <div className="my-4 mx-5">
                    <div className="flex justify-between">
                        <div className="flex text-center">
                            {
                                [...Array(5)].map((value, index) => {
                                    console.log(index)
                                    if (index < priceRange) {
                                        return <p className="text-green-standard ">$</p>
                                    } else {
                                        return <p className="text-green-standard opacity-25 ">$</p>
                                    }
                                })
                            }
                        </div>
                        {
                            maxDiscount !== 0 &&
                            <h2 className="text-green-standard text-lg font-semibold">{maxDiscount}% off!</h2>
                        }
                    </div>
                    <h1 className="text-xl text-grey-dark">{restaurant.restaurantName}</h1>
                    <h1 className="text-base text-grey-light">{restaurant.restaurantLocation}</h1>
                </div>
            </div>
        </Link>
    )
}

export default RestaurantListing
