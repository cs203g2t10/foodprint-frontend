import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../lib/contextLib'
import LogInService from '../services/LogInService'
import "animate.css"

const Home = () => {
    const { isAuthenticated } = useAppContext()
    const getUserName = () => {
        const userInfo = LogInService.getUserDetails();
        return `${userInfo.userFname} ${userInfo.userLname}`;
    }

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
                            <img src="/images/landingPage.webp" alt="cooking illustration"/>
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
                            <img src="/images/landingPage.webp" alt="cooking illustration"/>
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
