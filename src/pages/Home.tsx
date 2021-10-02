import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "animate.css"
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { useAppContext } from '../lib/contextLib'
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
        hidden: { x: "300px" },

        visible: {
            x: "0px",
            transition: { duration: 0.5 }
        }
    }

    const fadeInLeft = {
        hidden: { x: "-300px" },

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
        <div className="w-screen">
            {isAuthenticated ? (
                <>
                    <div className="grid md:grid-cols-7 gap-4 bg-yellow-standard h-screen">
                        <div className="border-1 md:col-span-4 md:pl-44">
                            <h1 className="text-2xl md:pt-52 text-green-standard pl-1 pb-1 animate__animated animate__fadeIn">Hello, {getUserName()} !</h1>
                            <h1 className="text-left text-6xl pb-2 animate__animated animate__fadeIn">Discover and book the best restaurants.</h1>
                            <div className="flex justify-left">
                                <Link to="/restaurants" className="bg-green-standard mt-4 pt-2 pb-3 px-5 text-center text-white-standard hover:shadow-lg rounded-xl">Start browsing now !</Link>
                            </div>
                        </div>
                        <div className="md:col-span-3 md:my-24">
                            <img src="/images/landingPage.webp" alt="cooking illustration" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 md:pt-10 bg-white-standard md:pb-16 md:pl-12">
                        <motion.div ref={ref} className="Box" initial="hidden" animate={controls} variants={fadeInLeft}>
                            <img className="transform scale-75" src="/images/landingPage2.webp" alt="cooking illustration" />
                        </motion.div>
                        <motion.div ref={ref} initial="hidden" animate={controls} variants={fadeInRight}>
                            <h1 className="text-4xl md:pt-32 md:pr-64 font-bold">Reduce food waste and Save money</h1>
                            <h2 className="md:pt-4 md:pr-44 text-grey-light">Here at foodPrint, we encourage restaurant reservation to help F&B establishments reduce food waste. </h2>
                            <div className="flex justify-left">
                                <Link to="/restaurants" className="border border-gray-200 mt-4 pt-2 pb-3 px-5 text-center text-green-standard hover:shadow-lg rounded-xl">Discover Restaurants</Link>
                            </div>
                        </motion.div>
                    </div>

                    <div className="md:pl-24 md:pt-10 bg-white-standard md:pb-24 ">
                        <h1 className="text-4xl md:pr-64 pl-1 font-extrabold pb-7" >What's Trending</h1>
                        <div className="flex flex-row gap-x-10 w-11/12 overflow-x-scroll">
                            {
                                restaurants.map(restaurant =>
                                    <Link to={"/restaurant/" + restaurant.restaurantId} key={restaurant.restaurantId} >
                                        <TrendingRestaurant name={restaurant.restaurantName} location={restaurant.restaurantLocation} src="/images/restaurant.jpg" />
                                    </Link>
                                )
                            }

                        </div>
                    </div>

                    <div className="md:pl-24 bg-white-standard md:pb-32 ">
                        <h1 className="text-4xl md:pr-64 pl-1 font-extrabold pb-7" >Up to 50% off deals</h1>
                        <div className="flex flex-row gap-x-10 w-11/12 overflow-x-scroll">
                            {
                                restaurants.map(restaurant =>
                                    <Link to={"/restaurant/" + restaurant.restaurantId} key={restaurant.restaurantId} >
                                        <TrendingRestaurant name={restaurant.restaurantName} location={restaurant.restaurantLocation} src="/images/restaurant.jpg" />
                                    </Link>
                                )
                            }

                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="grid md:grid-cols-7 gap-4 bg-yellow-standard h-screen">
                        <div className="border-1 md:col-span-4 md:pl-44">
                            <h1 className="text-2xl md:pt-52 text-green-standard pl-1 pb-1">Hello !</h1>
                            <h1 className="text-left text-6xl pb-2">Discover and book the best restaurants.</h1>

                            <div className="flex justify-left">
                                <Link to="/restaurants" className="bg-green-standard mt-4 pt-2 pb-3 px-5 text-center text-white-standard hover:shadow-lg rounded-xl">Start browsing now !</Link>
                            </div>
                        </div>
                        <div className="md:col-span-3 md:my-24">
                            <img src="/images/landingPage.webp" alt="cooking illustration" />
                        </div>
                    </div>


                    <h1 className="text-center mt-10 text-1xl">Log in to your account or Register to get started!</h1>
                    <div className="flex justify-center gap-x-3">
                        <Link to="/login" className="mt-4 py-3 border border-gray-200 w-1/6 text-center hover:shadow rounded-xl">Log In </Link>
                        <Link to="/register" className="mt-4 py-3 border border-gray-200 w-1/6 text-center hover:shadow rounded-xl">Register</Link>
                    </div>
                </>
            )}

        </div>
    )
}
  

export default Home
