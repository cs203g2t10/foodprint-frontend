import React, { useEffect, useState } from 'react'
import Restricted from '../components/errors/Restricted'
import { useAppContext } from '../lib/AppContext'
import LogInService, { UserDetails } from '../services/LogInService'
import RestaurantService from '../services/RestaurantService'

const AdminManageRestaurants = () => {

    const [restaurants, setRestaurants] = useState([])

    const { isAuthenticated } = useAppContext() || {}
    const [isAuthorized, setAuthorized] = useState(false);

    useEffect(() => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        if (userInfo.userAuthorities.includes("FP_ADMIN")) {
            setAuthorized(true);
        }
    }, [])

    const getUserName = () => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        return `${userInfo.userFname}`;
    }

    useEffect(() => {
        RestaurantService.getRestaurants().then((response) => {
            console.log(response)
            setRestaurants(response.data)
        })
    }, [])

    return (
        <div className="min-h-screen">
            {isAuthenticated && isAuthorized ? (
                <>
                    <div className="">
                        <h1 className="text-5xl font-bold pt-4 text-center text-green-standard bg-yellow-standard">Admin Restaurants Menu</h1>
                        <h1 className="text-lg text text-center text-grey-standard pb-8 bg-yellow-standard">Hello, {getUserName()}, which restaurants would you like to edit?</h1>
                        <div className="grid">
                            {
                                restaurants?.map((restaurant: any) => {
                                    return (
                                        <div>
                                            {restaurant.restaurantName}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
            ) : (<Restricted />)}
        </div>
    )
}

export default AdminManageRestaurants
