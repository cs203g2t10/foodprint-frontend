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
                        <h1 className="text-6xl font-bold pb-2 pt-10 text-center text-green-standard bg-yellow-standard">Hello, {getUserName()} </h1>
                        <h1 className="text-lg text text-center text-grey-dark pb-8 bg-yellow-standard">What would you like to do today?</h1>
                        <div className="gap-y-2 m-10 rounded-xxl lg:mx-32 pb-10">
                            <div className="grid lg:grid-cols-3 justify-center items-center gap-x-16 mx-10 pt-10 gap-y-7">
                                <Link to="/managerestaurant" className="bg-white-dirtyWhite rounded-xl shadow hover:shadow-md py-8">
                                    <img className="w-48 h-48 rounded-full md:m-auto border border-grey-lightest" src="/images/shop.jpg" alt="shop" />
                                    <h1 className="text-center pt-10">Manage Restaurant</h1>
                                </Link>
                                <Link to="/dashboard" className="bg-white-dirtyWhite rounded-xl shadow hover:shadow-md py-8">
                                    <img className="w-48 h-48 rounded-full m-auto border border-grey-lightest" src="/images/bacon.png" alt="profile" />
                                    <h1 className="text-center pt-10">Dashboard</h1>
                                </Link>
                                <Link to="/manageingredients" className="bg-white-dirtyWhite rounded-xl shadow hover:shadow-md py-8">
                                    <img className="w-48 h-48 rounded-full m-auto border border-grey-lightest" src="/images/ingredient.jpeg" alt="ingredient" />
                                    <h1 className="text-center pt-10">View Ingredients</h1>
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
