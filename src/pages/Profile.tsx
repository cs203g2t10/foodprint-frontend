import React, { useState, useEffect } from 'react'

import { useAppContext } from '../lib/AppContext'
import LogInService from '../services/LogInService'
import type { UserDetails } from '../services/LogInService';
import ReservationService from '../services/ReservationService';
import UserService from '../services/UserService';
import Restricted from '../components/errors/Restricted';
import moment from 'moment'
import ReservationListing from '../components/ReservationListing';
import FavouriteRestaurant from '../components/FavouriteRestaurant';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const Profile = () => {

    const { isAuthenticated } = useAppContext() || {}

    const [favLoading, setfavLoading] = useState(false);
    const [upcomingLoading, setupcomingLoading] = useState(false);
    const [pastLoading, setPastLoading] = useState(false);

    const [favouriteRestaurants, setFavouriteRestaurants] = useState<any[]>([])
    const [upcomingReservation, setUpcomingReservation] = useState<any[]>([])
    const [pastReservation, setPastReservation] = useState<any[]>([])
    const [deletemessage, setDeleteMessage] = useState<string>("");
    const [vaccinated, setVaccinated] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        console.log(userInfo);
        if (userInfo.userFname !== null && userInfo.userLname !== null) {
            setUserName(userInfo.userFname + " " + userInfo.userLname);
        }
        if (userInfo.vaccinationName !== undefined) {
            setVaccinated(true);
        }
    }, [])


    useEffect(() => {
        setupcomingLoading(true);
        ReservationService.getUpcomingReservation().then((response) => {
            setUpcomingReservation(response.data)
            setupcomingLoading(false);
        })
    }, [])

    useEffect(() => {
        setPastLoading(true);
        ReservationService.getPastReservation().then((response) => {
            setPastReservation(response.data)
            setPastLoading(false);
        })
    }, [])

    useEffect(() => {
        setfavLoading(true);
        UserService.getFavRestaurant().then((response) => {
            console.log(response)
            setFavouriteRestaurants(response.data)
            setfavLoading(false);
        })
    }, [])

    return (
        <div className="min-h-screen">
            {isAuthenticated ? (
                <>
                    <div className="">
                        <div className="absolute z-10">
                            <div className="grid grid-cols-7 gap-x-16 mx-32 my-10">
                                <div className="col-span-2">
                                    <img className="h-48" src="/images/user.png" alt="user" />
                                </div>
                                <div className="col-span-5">
                                    <h1 className="text-6xl text-green-standard">Hello {userName}!</h1>
                                    {
                                        vaccinated ? <h1 className="text text-gray-600">Vaccination Status: Verified</h1>
                                            : <>
                                                <h1 className="text text-gray-600 mb-4">Vaccination Status: Unverified</h1>
                                                <Link to="/vaccinationcheck" className="px-6 py-1 bg-green-standard text-white-standard rounded-full ">Get Verified</Link></>
                                    }
                                </div>
                            </div>
                        </div>
                        <svg className="h-72 waves w-full transform -rotate-180 " xmlns="http://www.w3.org/2000/svg" viewBox="100 20 130 70" preserveAspectRatio="none" shapeRendering="auto">
                            <defs>
                                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                            </defs>
                            <g className="parallax">
                                <use xlinkHref="#gentle-wave" x="100" y="2" fill="rgba(243, 232, 201, 1)" />
                            </g>
                        </svg>
                    </div>

                    {
                        (deletemessage ? <h1 className="text-red-standard text-right mr-40 mb-3">{deletemessage}</h1> : <></>)
                    }

                    <div className="grid lg:grid-cols-11 gap-x-10 mx-20">
                        <div className="col-span-4 bg-white-dirtyWhite rounded-xxl shadow-md px-10 py-6 h-auto">
                            <h1 className="text-green-standard text-2xl font-bold tracking-wide ml-3 mb-8">Favourite Restaurants</h1>
                            {
                                favLoading ?
                                    <div className="flex bg-white-standard justify-center items-center rounded-lg">
                                        <Loading />
                                    </div>
                                    :
                                    (
                                        (favouriteRestaurants.length === 0) &&
                                        <div className="">
                                            <img className="h-48 mx-auto mt-10" src="/images/noFavRestaurant.png" alt="no fav restaurant" />
                                            <h1 className="text-green-standard text-center">No saved restaurants.</h1>
                                        </div>
                                    )
                            }
                            <div className="mx-3 overflow-y-auto h-5/6">
                                {
                                    favouriteRestaurants.map((favouriteRestaurant: any) => {
                                        return (
                                            <FavouriteRestaurant
                                                key={favouriteRestaurant.restaurantId}
                                                restaurantId={favouriteRestaurant.restaurantId}
                                                name={favouriteRestaurant.restaurantName}
                                                url={favouriteRestaurant.picture?.url} />
                                        )
                                    })
                                }
                            </div>
                        </div>


                        <div className="col-span-7 h-full">
                            <div className="bg-white-dirtyWhite rounded-xxl shadow-md h-96 px-10 py-6 mb-14">
                                <h1 className="text-green-standard text-2xl font-bold tracking-wide pb-3">Upcoming Reservations</h1>
                                {
                                    upcomingLoading ?
                                        <div className="flex bg-white-standard justify-center items-center rounded-lg">
                                            <Loading />
                                        </div> :
                                        (
                                            (upcomingReservation.length > 0) ?
                                                <div className="grid grid-cols-12 mb-2 gap-x-3">
                                                    <h2 className="col-span-1 ml-2">&nbsp;</h2>
                                                    <h2 className="col-span-3 text-grey-lighter text-md px-5">Restaurant</h2>
                                                    <h2 className="col-span-3 text-grey-lighter text-md">Date / Time</h2>
                                                    <h2 className="col-span-2 text-grey-lighter text-md mx-auto">Status</h2>
                                                    <h2 className="col-span-2 text-grey-lighter text-md mx-auto">Orders</h2>
                                                    <h2 className="col-span-1">&nbsp;</h2>
                                                </div>
                                                :
                                                <>
                                                    <img className="h-52 mx-auto" src="/images/noUpcomingReservation.png" alt="no past reservations" />
                                                    <h1 className="text-green-standard text-center">No Upcoming Reservations Book a Table.</h1>
                                                </>
                                        )
                                }
                                <div className="overflow-y-auto h-60 mb-4">
                                    {
                                        upcomingReservation.map((upcomingReservation) => {
                                            var dateTime = upcomingReservation.date;
                                            return (
                                                <ReservationListing key={upcomingReservation.reservationId} dateTime={moment(dateTime).format('MMM Do YYYY, h:mm a')} reservationId={upcomingReservation.reservationId} restaurantName={upcomingReservation.restaurantName} status={upcomingReservation.status} imageUrl={upcomingReservation.imageUrl} {...{ setDeleteMessage }} past={false} />
                                            )
                                        })
                                    }

                                </div>
                            </div>
                            <div className="bg-white-dirtyWhite rounded-xxl h-96 shadow-md px-10 py-6">
                                <h1 className="text-green-standard text-2xl font-bold tracking-wide pb-3">Past Reservations</h1>
                                {
                                    pastLoading ?
                                        <div className="flex bg-white-standard justify-center items-center rounded-lg">
                                            <Loading />
                                        </div> :
                                        (
                                            (pastReservation.length > 0) ?
                                                <div className="grid grid-cols-12 mb-2 gap-x-3">
                                                    <h2 className="col-span-1 ml-2">&nbsp;</h2>
                                                    <h2 className="col-span-3 text-grey-lighter text-md px-5">Restaurant</h2>
                                                    <h2 className="col-span-3 text-grey-lighter text-md">Date / Time</h2>
                                                    <h2 className="col-span-2 text-grey-lighter text-md mx-auto">Status</h2>
                                                    <h2 className="col-span-2 text-grey-lighter text-md mx-auto">Orders</h2>
                                                    <h2 className="col-span-1">&nbsp;</h2>
                                                </div>
                                                :
                                                <>
                                                    <img className="h-52 mx-auto" src="/images/noPastReservation.png" alt="no past reservations" />
                                                    <h1 className="text-green-standard text-center">No Past Reservations</h1>
                                                </>
                                        )
                                }

                                <div className="overflow-y-auto h-60 mb-4">
                                    {
                                        pastReservation.map(pastReservation => {
                                            var dateTime = pastReservation.date;
                                            return (
                                                <ReservationListing key={pastReservation.reservationId} dateTime={moment(dateTime).format('MMM Do YYYY, h:mm a')} reservationId={pastReservation.reservationId} restaurantName={pastReservation.restaurantName} status={pastReservation.status} imageUrl={pastReservation.imageUrl} past={true} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            ) : (<Restricted />)}
        </div>
    )
}

export default Profile