import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <nav>
                <div className="flex gap-2 bg-green-100 ">
                    <div className="grid grid-cols-2 mx-20 my-3 w-full h-full">
                        <div className=""><Link to='/home'>FoodPrint</Link></div>
                        <div className="justify-self-end ">
                            <Link to='/about' className="mx-2">About Us</Link>
                            <Link to='/login' className="mx-2">Log In</Link>
                            <Link to='/register' className="mx-2">Register</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
