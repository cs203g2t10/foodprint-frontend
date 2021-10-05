import React from 'react'

import { useAppContext } from '../lib/contextLib'
import LogInService from '../services/LogInService'
import type { UserDetails } from '../services/LogInService';

const Profile = () => {
    const { isAuthenticated } = useAppContext() || {}
    const getUserName = () => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        return `${userInfo.userFname} ${userInfo.userLname}`;
    }

    return (
        <div className="min-h-screen">
            {isAuthenticated ? (
                <>
                    <div className="">
                        <div className="absolute z-10">
                            <div className="grid grid-cols-7 gap-x-16 mx-32 my-10">
                                <div className="col-span-2">
                                    <img className="w-48 h-48 rounded-full"src="/images/shop.jpg" alt="shop" />
                                </div>
                                <div className="col-span-5">
                                    <h1 className="text-7xl  pb-4 pl-10 text-green-standard">Hello, {getUserName()} </h1>
                                </div>
                            </div>
                        </div>
                        <svg className="h-72 waves w-screen transform -rotate-180 " xmlns="http://www.w3.org/2000/svg" viewBox="100 20 130 70" preserveAspectRatio="none" shape-rendering="auto">
                            <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                            </defs>
                            <g className="parallax">
                            <use xlinkHref="#gentle-wave" x="100" y="2"  fill="rgba(243, 232, 201, 1)" />
                            </g>
                        </svg>
                    </div>

                    <div className="grid lg:grid-cols-9 gap-x-14 mx-32">
                        <div className="col-span-3 bg-white-dirtyWhite rounded-xxl h-auto shadow-md px-10 py-6">
                            <h1 className="text-green-standard text-2xl font-bold tracking-wide">Favourite Restaurants</h1>
                        </div>

                        <div className="col-span-6">
                            <div className="bg-white-dirtyWhite rounded-xxl h-96 shadow-md px-10 py-6 mb-8">
                                <h1 className="text-green-standard text-2xl font-bold tracking-wide pb-5">Upcoming Reservations</h1>
                                {/* <div className="grid grid-cols-6 mb-2">
                                    <h2 className="my-auto text-xl col-span-3 text-grey-standard text-sm">Restaurant</h2>
                                    <h2 className="my-auto text-xl col-span-1 text-grey-standard text-xs">Date</h2>
                                    <h2 className="my-auto text-xl col-span-1 text-grey-standard text-xs">Orders</h2>
                                </div> */}
                                <div className="overflow-y-auto h-64">
                                    <div className="grid grid-cols-6 bg-white-standard rounded-xl px-5 py-2 shadow-sm mb-3">
                                        <img src="/images/restaurant.jpg" className="w-16 h-16 shadow-md rounded-full col-span-1" alt="food pic" />
                                        <h1 className="my-auto text-xl">Sushi-ya</h1>
                                    </div>
                                    <div className="grid grid-cols-6 bg-white-standard rounded-xl px-5 py-2 shadow-sm mb-3">
                                        <img src="/images/restaurant.jpg" className="w-16 h-16 shadow-md rounded-full col-span-1" alt="food pic" />
                                        <h1 className="my-auto text-xl">Sushi-ya</h1>
                                    </div>
                                    <div className="grid grid-cols-6 bg-white-standard rounded-xl px-5 py-2 shadow-sm mb-3">
                                        <img src="/images/restaurant.jpg" className="w-16 h-16 shadow-md rounded-full col-span-1" alt="food pic" />
                                        <h1 className="my-auto text-xl">Sushi-ya</h1>
                                    </div>
                                    <div className="grid grid-cols-6 bg-white-standard rounded-xl px-5 py-2 shadow-sm mb-3">
                                        <img src="/images/restaurant.jpg" className="w-16 h-16 shadow-md rounded-full col-span-1" alt="food pic" />
                                        <h1 className="my-auto text-xl">Sushi-ya</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white-dirtyWhite rounded-xxl h-80 shadow-md px-10 py-6 ">
                                <h1 className="text-green-standard text-2xl font-bold tracking-wide">Past Reservations</h1>
                            </div>
                        </div>
                    </div>

                </>
            ) : (
                <>

                </>
            )}
        </div>
    )
}

export default Profile