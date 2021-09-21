import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../lib/contextLib'
import LogInService from '../services/LogInService'
import "animate.css"
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TrendingRestaurant from '../components/TrendingRestaurant'
import RestaurantService from '../services/RestaurantService'

const Home = () => {
    const { isAuthenticated } = useAppContext()
    const getUserName = () => {
        const userInfo = LogInService.getUserDetails();
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
        hidden: {
            x: "300px",
            opacity: 0
        },

        visible: {
            x: "0px",
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }

    }

    const fadeInLeft = {
        hidden: {
            x: "-300px",
            opacity: 0
        },

        visible: {
            x: "0px",
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }

    }

    const [restaurants, setRestaurants] = useState([])
    
    useEffect(() => {
        RestaurantService.getRestaurants().then((response) => {
            console.log(response)
            setRestaurants(response.data)
        })
    }, [])

    return (
        <div>
            {isAuthenticated ? (
                <>

                    <div className="grid md:grid-cols-7 gap-4 bg-yellow-standard h-screen">
                        <div className="border-1 md:col-span-4 md:pl-44">
                            <h1 className="text-2xl md:pt-52 text-green-standard pl-1 pb-1 animate__animated animate__fadeIn">Hello, {getUserName()} !</h1>
                            <h1 className="text-left text-6xl pb-2 animate__animated animate__fadeIn">Discover and book the best restaurants.</h1>
                            <div className="flex justify-left">
                                <Link to="/restaurants" className="bg-green-standard mt-4 pt-2 pb-3 px-5 text-center text-white-standard hover:shadow-lg rounded-3xl">Start browsing now !</Link>
                            </div>
                        </div>
                        <div className="md:col-span-3 md:my-24">
                            <img src="/images/landingPage.webp" alt="cooking illustration" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 md:pt-10 bg-white-standard md:pb-16">
                        <motion.div ref={ref} className="Box" initial="hidden" animate={controls} variants={fadeInLeft}>
                            <img className="transform scale-75" src="/images/landingPage2.webp" alt="cooking illustration" />
                        </motion.div>
                        <motion.div ref={ref} initial="hidden" animate={controls} variants={fadeInRight}>
                            <h1 className="text-4xl md:pt-32 md:pr-64 pl-1 font-bold">Reduce food waste and Save money</h1>
                            <h2 className="md:pt-4 md:pr-44 text-grey-light">Here at foodPrint, we encourage restaurant reservation to help F&B establishments reduce food waste. </h2>
                            <div className="flex justify-left">
                                <Link to="/restaurants" className="border border-gray-200 mt-4 pt-2 pb-3 px-5 text-center text-green-standard hover:shadow-lg rounded-3xl">Discover Restaurants</Link>
                            </div>
                        </motion.div>
                    </div>

                    <div className="md:pl-24 md:pt-10 bg-white-standard md:pb-32 ">
                        <h1 className="text-4xl md:pr-64 pl-1 font-bold pb-7" >What's Trending</h1>
                            <div className=" flex flex-row gap-x-10 w-11/12 h-96 overflow-x-scroll">
                                {/* <div>
                                    <img className="rounded-xl object-contain" width="240" height="330"  src="/images/restaurant.jpg" alt="restaurant" />
                                    <h2 className="text-grey-standard text-lg md:pt-3 pl-1">Bread Palace Cafe</h2>
                                    <h3 className="text-grey-light text-base md:pt-1 pl-1">Serangoon</h3>
                                </div> */}
                                {/* <TrendingRestaurant name="Bread Palace Cafe" location="Serangoon" src="/images/restaurant.jpg" /> */}
                                
                                {
                                    restaurants.map(restaurant => 
                                        <TrendingRestaurant  name={restaurant.restaurantName} location={restaurant.restaurantLocation} src="/images/restaurant.jpg" />
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
                                <Link to="/restaurants" className="bg-green-standard mt-4 pt-2 pb-3 px-5 text-center text-white-standard hover:shadow-lg rounded-3xl">Start browsing now !</Link>
                            </div>
                        </div>
                        <div className="md:col-span-3 md:my-24">
                            <img src="/images/landingPage.webp" alt="cooking illustration" />
                        </div>
                    </div>


                    <h1 className="text-center text-1xl">Log in to your account or Register to get started!</h1>
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
