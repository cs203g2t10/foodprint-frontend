import React from 'react'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
    return (
        <div className="grid justify-center items-center gap-y-2 m-10 rounded-xxl shadow lg:mx-64 pb-10 bg-white-dirtyWhite">
            <h1 className=" flex text-5xl pt-12 text-green-standard font-bold mx-auto">Unauthorized access</h1>
            <h1 className=" flex text-md mb-2 text-grey-standard font-light mx-auto">You are not authorized to access this resource</h1>
            <Link className="text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg text-center w-48 mx-auto" to="/">Return to Home</Link>
        </div>
    )
}

export default Unauthorized
