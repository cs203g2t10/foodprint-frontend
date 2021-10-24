import React from 'react'
import { Link } from 'react-router-dom'

const Restricted = () => {
    return (
        <div className="min-h-screen">
            <div className="m-10 mt-24 lg:mx-64 pb-10 ">
                <img className = "my-0 flex mx-auto"style = {{height:300}}src="/images/restricted.png" alt="403" />
                <h1 className="text-5xl pt-12 text-green-standard font-bold text-center">Restricted access</h1>
                <h1 className="text-md mb-2 text-grey-standard font-light text-center">You are not authenticated or not authorized to access this resource</h1>
                <Link className="mt-3 text-center text-white-standard bg-green-standard py-1 px-5 flex mx-auto rounded-large shadow-sm hover:shadow-md w-max bg-opacity-80 hover:bg-opacity-100" to="/">Return to Home</Link>
            </div>
        </div>
    )
}

export default Restricted
