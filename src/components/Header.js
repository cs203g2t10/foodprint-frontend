import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <nav>
                <div className="flex gap-2 align-middle bg-green-100 ">
                    <div className="grid grid-cols-2 gap-x-4 ml-12 my-3">
                        <div className=""><Link to='/home'>FoodPrint</Link></div>
                        <div className="justify-right"><Link to='/about'>About Us</Link></div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
