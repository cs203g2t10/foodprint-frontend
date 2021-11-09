import React, { useEffect, useState } from 'react'
import AdminRestaurantListing from '../components/AdminRestaurantListing'
import Restricted from '../components/errors/Restricted'
import Loading from '../components/Loading'
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
                        <h1 className="text-lg text text-center text-grey-standard pb-8 bg-yellow-standard">Hello {getUserName()}, which restaurants / ingredients would you like to edit?</h1>
                        <div className="mx-14 bg-white-offWhite pt-6 pb-8 rounded-xxl shadow">
                            <div className="grid grid-cols-1 gap-y-9 items-center">
                                <div className="grid grid-cols-11 gap-x-6 mx-6">
                                    <div className="col-span-1"></div>
                                    <p className="col-span-1 text-lg text-grey-dark">ID</p>
                                    <p className="col-span-3 text-lg text-grey-dark">Restaurant Name</p>
                                    <p className="col-span-6 text-lg text-grey-dark text-center">Manage options</p>
                                </div>
                                {
                                    restaurants.length === 0 ? <Loading /> :
                                        restaurants?.map(
                                            (restaurant: any) => {
                                                return (
                                                    <AdminRestaurantListing {...{ restaurant }} />
                                                )
                                            }
                                        )
                                }

                            </div>
                        </div>
                    </div>
                </>
            ) : (<Restricted />)}
        </div>
    )
}

export default AdminManageRestaurants
