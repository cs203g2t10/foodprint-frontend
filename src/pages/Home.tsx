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
            transition: { duration: 0.5 }
        }
    }

    const fadeInLeft = {
        hidden: { x: "-150px" },

        visible: {
            x: "0px",
            transition: { duration: 0.5 }
        }
    }

    const [restaurants, setRestaurants] = useState<any[]>([])

    useEffect(() => {
        RestaurantService.getRestaurants().then((response) => {
            console.log(response)
            setRestaurants(response.data)
        })
    }, [])

    return (
        <div className="w-full">
            {isAuthenticated ? (
                <>
                    <div className="bg-yellow-standard px-3 overflow-hidden">
                        <div className="grid md:grid-cols-7 gap-4 h-screen px-10 py-20 md:py-0">
                            <div className="border-1 md:col-span-4 md:pl-36">
                                <h1 className="text-2xl md:pt-52 text-green-standard pl-1 pb-1 animate__animated animate__fadeIn">Hello, {getUserName()}!</h1>
                                <h1 className="text-left text-6xl pb-2 animate__animated animate__fadeIn">Discover and book the best restaurants.</h1>
                                <div className="flex justify-left">
                                    <Link to="/restaurants" className="bg-green-standard mt-4 pt-2 pb-3 px-5 text-center text-white-standard hover:shadow-lg rounded-xl">Start browsing now!</Link>
                                </div>
                            </div>
                            <div className="md:col-span-3 md:my-24 relative">
                                <img className="absolute top-0 bottom-0 m-auto"src="/images/landingPage.webp" alt="cooking illustration" />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden h-full w-full px-3 bg-white-standard">
                        <div className="grid md:grid-cols-2 gap-4 md:pt-10 bg-white-standard md:pb-16 md:pl-12">
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
                        <div className="overflow-hidden h-full w-full">
                            <div className="flex flex-row gap-x-10 w-full overflow-auto">
                                {
                                    restaurants.map(restaurant =>
                                        (restaurant.picture) ?
                                        (
                                        <Link to={"/restaurant/" + restaurant.restaurantId} key={restaurant.restaurantId} >
                                            <TrendingRestaurant name={restaurant.restaurantName} location={restaurant.restaurantLocation} src={restaurant.picture.url} />
                                        </Link>
                                        ) : (
                                        <Link to={"/restaurant/" + restaurant.restaurantId} key={restaurant.restaurantId} >
                                            <TrendingRestaurant name={restaurant.restaurantName} location={restaurant.restaurantLocation} src="/images/restaurant.jpg" />
                                        </Link>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="md:pl-24 bg-white-standard md:pb-32  px-5">
                        <h1 className="text-4xl md:pr-64 pl-1 font-extrabold pb-7">Up to 50% off deals</h1>
                        <div className="overflow-hidden h-full w-full">
                            <div className="flex flex-row gap-x-10 w-full overflow-auto">
                                {
                                    restaurants.map(restaurant => {
                                        let upTo50 = false;
                                        restaurant.discounts.map((discount: any) => {
                                            if (discount.discountPercentage >= 50) {
                                                upTo50 = true;
                                            }
                                            return <></>
                                        })
                                        let imageUrl = "/images/restaurant.jpg";
                                        if (restaurant.picture) {
                                            imageUrl = restaurant.picture.url;
                                        }
                                        if (upTo50) {
                                            return <Link to={"/restaurant/" + restaurant.restaurantId} key={restaurant.restaurantId} >
                                                <TrendingRestaurant name={restaurant.restaurantName} location={restaurant.restaurantLocation} src={imageUrl} />
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
                            <h1 className="text-left text-6xl pb-2">Discover and book the best restaurants.</h1>

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
