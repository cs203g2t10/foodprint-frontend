import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { useAppContext } from '../lib/AppContext';
import LogInService from "../services/LogInService";
import { Transition } from "@headlessui/react";


const Header = () => {
    const { isAuthenticated, setIsAuthenticated } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        setIsAuthenticated(false);
        window.localStorage.removeItem("token");
    }

    const getUserName = () => {
        const userInfo = LogInService.getUserDetails();
        return `${userInfo.userFname} ${userInfo.userLname}`;
    }

    const isUserAdmin = () => {
        const userInfo = LogInService.getUserDetails();
        return userInfo.userAuthorities.includes("FP_ADMIN");
    }

    const isUserManager = () => {
        const userInfo = LogInService.getUserDetails();
        return userInfo.userAuthorities.includes("FP_MANAGER");
    }

    return (
        <div>
            <nav className="bg-yellow-standard">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to='/' className=" text-black px-1 py-2 rounded-md text-md font-medium">
                            foodPrint
                        </Link>
                        <div className="flex items-center justify-between w-full">

                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">

                                    <Link to='/restaurants' className=" text-gray-700 hover:text-gray-900 px-1 py-2 rounded-md text-md font-medium">
                                        Marketplace
                                    </Link>

                                    <Link to='/about' className="text-gray-700 hover:text-gray-900 px-1 py-2 rounded-md text-md font-medium">About Us</Link>
                                </div>
                            </div>
                            <div className="hidden md:block self-end">
                                <div className="flex items-baseline space-x-4">
                                    {isUserAdmin() &&
                                        <Link to='/ManageUser' className="text-gray-700 hover:text-gray-900 px-1 py-2 rounded-md text-md font-medium">Management Console</Link>
                                    }
                                    {isUserManager() &&
                                        <Link to='/manager' className="text-gray-700 hover:text-gray-900 px-1 py-2 rounded-md text-md font-medium">Manage Restaurant</Link>
                                    }
                                    {isAuthenticated ? (
                                        <>
                                            <Link to='/profile' className="text-gray-700 hover:text-gray-900 px-1 py-2 rounded-md text-md font-medium">{getUserName()}</Link>
                                            <Link onClick={handleLogout} to="/login" className="text-gray-700 hover:text-gray-900 px-1 py-2 rounded-md text-md font-medium">Logout</Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to='/login' className="text-gray-700 hover:text-gray-900 px-1 py-2 rounded-md text-md font-medium">Log In</Link>
                                            <Link to='/register' className="text-gray-700 hover:text-gray-900 px-1 py-2 rounded-md text-md font-medium">Register</Link>
                                        </>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >

                    {(ref) => (
                        <>
                            <div className="md:hidden" id="mobile-menu">
                                <div ref={ref} className="px-1 pt-2 pb-3 space-y-1 sm:px-1">
                                    <Link to="/restaurants" className="text-gray-700 hover:text-gray-900 px-1 py-2 rounded-md text-md font-medium">
                                        Marketplace
                                    </Link>
                                    <Link to='/about' className="text-gray-700 hover:text-gray-900 px-1 py-2 rounded-md text-md font-medium">
                                        About Us
                                    </Link>
                                    {isUserAdmin() ? (
                                        <>
                                            <Link to='/ManageUser' className="text-gray-700 hover:text-gray-900 px-1 py-2 rounded-md text-md font-medium">
                                                Management Console
                                            </Link>
                                        </>
                                    ) : (
                                        <>

                                        </>
                                    )
                                    }
                                    {isUserManager() ? (
                                        <>
                                            <Link to='/manager' className="text-gray-700 hover:text-gray-900 px-1 py-2 rounded-md text-md font-medium">
                                                Manage Restaurant
                                            </Link>
                                        </>
                                    ) : (
                                        <>

                                        </>
                                    )
                                    }
                                    {isAuthenticated ? (
                                        <>
                                            <Link to='/profile' className="text-gray-700 hover:text-gray-900 px-1 py-2 rounded-md text-md font-medium">
                                                {getUserName()}
                                            </Link>
                                            <Link onClick={handleLogout} to="/login" className="text-gray-700 hover:text-gray-900 px-1 py-2 rounded-md text-md font-medium">
                                                Logout
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to='/login' className="text-gray-700 hover:text-gray-900 px-1 py-2 rounded-md text-md font-medium">
                                                Log In
                                            </Link>
                                            <Link to='/register' className="text-gray-700 hover:text-gray-900 px-1 py-2 rounded-md text-md font-medium">
                                                Register
                                            </Link>
                                        </>
                                    )
                                    }
                                </div>
                            </div>
                        </>
                    )}

                </Transition>
            </nav>
        </div>

        // <header>
        //     <nav>
        //         <div className="flex gap-2 bg-yellow-standard">
        //             <div className="grid grid-cols-2 mx-4 sm:mx-20 my-4 w-full h-full">
        //                 <div className="flex flex-wrap gap-x-8">
        //                     <Link to='/' className="font-bold tracking-widest">FOODPRINT</Link>
        //                     <Link to='/restaurants' className="inline-block align-middle">Marketplace</Link>
        //                     </div>
        //                 <div className="flex flex-wrap justify-self-end">


        //                 </div>
        //             </div>
        //         </div>
        //     </nav>
        // </header>
    )
}

export default withRouter(Header)
