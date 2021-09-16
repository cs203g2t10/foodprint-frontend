import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../lib/contextLib'


const Home = () => {
    const { isAuthenticated } = useAppContext()

    return (
        <div>
            <h1 className="text-center text-7xl py-12">FoodPrint</h1>

            {isAuthenticated ? (
                <>
                    <h1 className="text-center text-1xl">Hello, Bobby!</h1>
                    <div className="flex justify-center">
                        <Link to="/restaurants" className="mt-4 py-3 border border-gray-200 w-1/5 text-center hover:shadow rounded-xl">Start browsing now!</Link>
                    </div>

                </>
            ) : (
                <>
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
