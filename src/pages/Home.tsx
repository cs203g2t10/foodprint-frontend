import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "animate.css"
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { useAppContext } from '../lib/AppContext'
import LogInService from '../services/LogInService'
import type { UserDetails } from '../services/LogInService';
import TrendingRestaurant from '../components/TrendingRestaurant'
import RestaurantService from '../services/RestaurantService'



const Home = () => {
    const { isAuthenticated } = useAppContext() || {}
    const getUserName = () => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        return `${userInfo.userFname} ${userInfo.userLname}`;
    }

    const controls = useAnimation();
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
        if (!inView) {
            controls.start('hidden');
        }
    }, [controls, inView]);

    const fadeInRight = {
        hidden: { x: "150px" },

        visible: {
            x: "0px",
            transition: { duration: 0.8 }
        }
    }

    const fadeInLeft = {
        hidden: { x: "-150px" },

        visible: {
            x: "0px",
            transition: { duration: 0.8 }
        }
    }

    const [restaurants, setRestaurants] = useState<any[]>([])

    useEffect(() => {
        RestaurantService.getRestaurants().then((response) => {
            setRestaurants(response.data)
        })
    }, [])

    return (
        <div className="w-full">
            {isAuthenticated ? (
                <>
                    {/* <div className="bg-yellow-standard px-3 overflow-hidden">
                        <div className="grid md:grid-cols-7 gap-4 h-screen px-10 py-20 md:py-0">
                            <div className="border-1 md:col-span-4 md:pl-36">
                                <h1 className="text-2xl md:pt-52 text-green-standard pl-1 pb-1 animate__animated animate__fadeIn">Hello {getUserName()}!</h1>
                                <h1 className="text-left text-6xl pb-2 animate__animated animate__fadeIn">Discover and book the best restaurants.</h1>
                                <div className="flex justify-left">
                                    <Link to="/restaurants" className="bg-green-standard mt-4 pt-2 pb-3 px-5 text-center text-white-standard hover:shadow-lg rounded-xl">Start browsing now!</Link>
                                </div>
                            </div>
                            <div className="md:col-span-3 md:my-24 relative">
                                <img className="absolute top-0 bottom-0 m-auto" src="/images/landingPage.webp" alt="cooking illustration" />
                            </div>
                        </div>
                    </div> */}
                    <div className="grid grid-cols-6 absolute">
                        <img className="col-span-2 px-0 z-10 mt-28 -rotate-65 transform scale-110 " src="/images/aboutUs.png" alt="food" />
                        <div className="col-span-2"></div>
                        <img className="col-span-2 px-0 z-10 mt-56 -rotate-45 transform scale-90" src="/images/aboutUs2.png" alt="food" />

                    </div>
                    <div className="absolute z-10 grid grid-cols-8">
                        <div className="col-span-2"></div>
                        <div className="col-span-4 px-10">
                            <h1 className="sm:text-xs md:text-xl md:mt-24 lg:mt-52 text-center text-grey-standard animate__animated animate__fadeIn">Hello, {getUserName()}!</h1>
                            <h1 className="lg:text-6xl sm:text-4xl sm:leading-3 text-green-standard lg:leading-extra-tight text-center font-semibold tracking-wide">Discover and book the best restaurants.</h1>
                            <h1 className="text-center text-grey-standard text-base mt-5">Reserve a table, and save with deals.</h1>
                            <Link to="/restaurants" className="mx-auto grid w-52 bg-green-standard mt-4 py-1 pb-3 px-5 text-center text-white-standard hover:shadow-lg rounded-xl">Start browsing now!</Link>
                        </div>
                    </div>
                    <svg className="waves w-full transform -rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="145 0 120 60" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                            <use xlinkHref="#gentle-wave" x="100" y="-25" fill="rgba(243, 232, 201, 1)" />
                        </g>
                    </svg>

                    <div className="overflow-hidden mt-10 w-full px-3 bg-white-standard">
                        <div className="grid md:grid-cols-2 gap-4 bg-white-standard md:pb-16 md:pl-12">
                            <motion.div ref={ref} className="Box" initial="hidden" animate={controls} variants={fadeInLeft}>
                                <img className="transform scale-75" src="/images/landingPage2.webp" alt="cooking illustration" />
                            </motion.div>
                            <motion.div ref={ref} initial="hidden" animate={controls} variants={fadeInRight}>
                                <h1 className="text-4xl md:pt-32 md:pr-64 font-bold">Reduce food waste and Save money</h1>
                                <h2 className="md:pt-4 md:pr-44 text-grey-light">Here at foodPrint, we encourage restaurant reservation to help F&B establishments reduce food waste. </h2>
                                <div className="flex justify-left">
                                    <Link to="/restaurants" className="border border-green-standard mt-4 pt-2 pb-3 px-5 text-center text-green-standard hover:shadow-lg rounded-xl">Discover Restaurants</Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <div className="md:pl-24 md:pt-10 bg-white-standard md:pb-24 px-5">
                        <h1 className="text-4xl md:pr-64 pl-1 font-extrabold pb-7">What's Trending</h1>
                        <div className="overflow-hidden h-full w-full pr-24">
                            <div className="flex flex-row gap-x-10 w-full overflow-auto h-auto py-5">
                                {
                                    restaurants.map(restaurant =>
                                        <Link to={"/restaurant/" + restaurant.restaurantId} key={restaurant.restaurantId}>
                                            {
                                                (restaurant.picture !== null) ?
                                                    (
                                                        <TrendingRestaurant key={restaurant.restaurantId} name={restaurant.restaurantName} location={restaurant.restaurantLocation} src={restaurant.picture.url} />
                                                    ) : (
                                                        <TrendingRestaurant key={restaurant.restaurantId} name={restaurant.restaurantName} location={restaurant.restaurantLocation} src="/images/restaurant.jpg" />
                                                    )
                                            }
                                        </Link>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="md:pl-24 bg-white-standard md:pb-32  px-5">
                        <h1 className="text-4xl md:pr-64 pl-1 font-extrabold pb-7">Up to 50% off deals</h1>
                        <div className="overflow-hidden h-full w-full">
                            <div className="flex flex-row gap-x-10 w-full overflow-auto  h-auto py-5">
                                {
                                    restaurants.map(restaurant => {
                                        let discount = restaurant.discount ? restaurant.discount.discountPercentage : 0;
                                        let upTo50 = (discount >= 50);
                                        let imageUrl = "/images/restaurant.jpg";
                                        if (restaurant.picture) {
                                            imageUrl = restaurant.picture.url;
                                        }
                                        if (upTo50) {
                                            return <Link to={"/restaurant/" + restaurant.restaurantId} key={restaurant.restaurantId} >
                                                <TrendingRestaurant key={restaurant.restaurantId} name={restaurant.restaurantName} location={restaurant.restaurantLocation} src={imageUrl} />
                                            </Link>
                                        }
                                        return <></>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="grid md:grid-cols-7 gap-4 bg-yellow-standard h-screen">
                        <div className="border-1 md:col-span-4 md:pl-44">
                            <h1 className="text-2xl md:pt-52 text-green-standard pl-1 pb-1">Hello!</h1>
                            <h1 className="text-left text-6xl">Discover and book the best restaurants.</h1>

                            <div className="flex justify-left">
                                <Link to="/restaurants" className="bg-green-standard mt-4 pt-2 pb-3 px-5 text-center text-white-standard hover:shadow-lg rounded-xl">Start browsing now!</Link>
                            </div>
                        </div>
                        <div className="md:col-span-3 md:my-24">
                            <img src="/images/landingPage.webp" alt="cooking illustration" />
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}


export default Home
