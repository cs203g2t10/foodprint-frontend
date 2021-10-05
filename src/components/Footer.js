import React from 'react'

import "../css/waves.css"

const Footer = () => {
    return (
        <div className = "mt-8 h-48">
            <div className = "object-scale-down h-24 w-full">
                <div className="flex absolute mt-6 w-3/5">
                    <div className = "md:pl-24 md:mt-14">
                        <h1 className = "text-green-standard font-bold lg:text-4xl tracking-wide">foodPrint</h1>
                        <h2 className = "lg:pt-2 lg:pr-44 text-grey-light">Here at foodPrint, we encourage restaurant reservation to help F&B establishments reduce food waste. </h2>
                        <div className="grid grid-cols-4 gap-12 md:pt-4">
                            <div>
                                <h1 className = "lg:text-md text-grey-standard tracking-widest">LEGAL</h1>
                                <h2 className = "lg:text-sm text-grey-lighter text-xs">Terms and Conditions</h2>
                                <h2 className = "lg:text-sm text-grey-lighter text-xs">Privacy Policy</h2>
                            </div>
                            <div>
                                <h1 className = "lg:text-md text-grey-standard tracking-widest">ABOUT</h1>
                                <h2 className = "lg:text-sm text-grey-lighter text-xs">About Us Page</h2>
                                <h2 className = "lg:text-sm text-grey-lighter text-xs">Contact us</h2>
                            </div>
                            <div>
                                <h1 className = "lg:text-md text-grey-standard tracking-widest">COUNTRIES</h1>
                                <h2 className = "lg:text-sm text-grey-lighter text-xs">Singapore</h2>
                            </div><div>
                                <h1 className = "lg:text-md text-grey-standard tracking-widest">SOCIALS</h1>
                                <div className="grid lg:grid-cols-3 absolute">
                                    <img className = "transform scale-50 opacity-50" src="/images/instagram.png" alt="footer" />
                                    <img className = "transform scale-50 opacity-50" src="/images/linkedIn.png" alt="footer" />
                                    <img className = "transform scale-50 opacity-50" src="/images/twitter.png" alt="footer" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <svg className="waves w-screen h-72" xmlns="http://www.w3.org/2000/svg" viewBox="0 20 120 35" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                    <use xlinkHref="#gentle-wave" x="100" y="-2" fill="rgba(243, 232, 201, 1)" />
                    </g>
                </svg>

            </div>
        </div>
    )
}

export default Footer
