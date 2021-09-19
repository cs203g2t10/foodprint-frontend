import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { useAppContext } from '../lib/contextLib';
import LogInService from "../services/LogInService";


const Header = () => {
    const { isAuthenticated, userHasAuthenticated } = useAppContext();

    const handleLogout = () => {
        userHasAuthenticated(false)
        window.sessionStorage.removeItem("token")
    }

    const getUserName = () => {
        const userInfo = LogInService.getUserDetails();
        return `${userInfo.userFname} ${userInfo.userLname}`;
    }

    return (
        <header>
            <nav>
                <div className="flex gap-2 bg-yellow-standard ">
                    <div className="grid grid-cols-2 mx-20 my-4 w-full h-full">
                        <div className="flex gap-x-8">
                            <Link to='/' className="font-bold tracking-widest">FOODPRINT</Link>
                            <Link to='/restaurants' className="inline-block align-middle">Marketplace</Link>
                            </div>
                        <div className="justify-self-end ">
                            <Link to='/about' className="mx-2">About Us</Link>
                            {isAuthenticated ? (
                                <>
                                    <span>{getUserName()}</span>
                                    <Link onClick={handleLogout} to="/login" className="mx-2">Logout</Link>
                                </>
                            ) : (
                                <>
                                    <Link to='/login' className="mx-2">Log In</Link>
                                    <Link to='/register' className="mx-2">Register</Link>
                                </>
                            )
                            }

                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default withRouter(Header)
