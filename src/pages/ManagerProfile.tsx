import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Restricted from '../components/errors/Restricted';
import { useAppContext } from '../lib/AppContext';
import LogInService, { UserDetails } from '../services/LogInService';

const ManagerProfile = () => {
    const { isAuthenticated } = useAppContext() || {}
    const [isAuthorized, setAuthorized] = useState(false);

    useEffect(() => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        if (userInfo.userAuthorities.includes("FP_MANAGER")) {
            setAuthorized(true);
        }
    }, [])

    const getUserName = () => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        return `${userInfo.userFname}`;
    }


    return (
        <div className="min-h-screen">
            {isAuthenticated && isAuthorized ? (
                <>
                    <div className="">
                        <h1 className="text-5xl font-bold pt-4 text-center text-green-standard bg-yellow-standard">Manage Restaurant</h1>
                        <h1 className="text-lg text text-center text-grey-standard pb-8 bg-yellow-standard">Hello, {getUserName()}, what would you like to do today?</h1>
                        <div className="gap-y-2 m-10 rounded-xxl lg:mx-32 pb-10">
                            <div className="grid lg:grid-cols-3 justify-center items-center gap-x-20 mx-10 pt-10 gap-y-7">
                                <Link to="/managerestaurant" className="bg-white-dirtyWhite rounded-xxl shadow hover:shadow-md py-8">
                                    <img className=" md:m-auto h-44" src="/images/ManageRestaurant.png" alt="shop" />
                                    <h1 className="text-center text-md pt-10 text-green-standard">Manage Restaurant</h1>
                                    <h1 className="text-center text-base text-grey-standard px-8">Edit restaurant details, photo, and menu here.</h1>
                                </Link>
                                <Link to="/dashboard" className="bg-white-dirtyWhite rounded-xxl shadow hover:shadow-md py-8">
                                    <img className=" md:m-auto h-44" src="/images/Dashboard.png" alt="shop" />
                                    <h1 className="text-center text-md pt-10 text-green-standard">Dashboard</h1>
                                    <h1 className="text-center text-base text-grey-standard px-2">View ingredients and food breakdown, view upcoming reservations here.</h1>
                                </Link>
                                <Link to="/manageingredients" className="bg-white-dirtyWhite rounded-xxl shadow hover:shadow-md py-8">
                                    <img className=" md:m-auto h-44" src="/images/ManageIngredients.png" alt="shop" />
                                    <h1 className="text-center text-md pt-10 text-green-standard">Manage Ingredients</h1>
                                    <h1 className="text-center text-base text-grey-standard px-8">Edit restaurant ingredients detail here.</h1>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            ) : (<Restricted />)}
        </div>
    )
}

export default ManagerProfile
