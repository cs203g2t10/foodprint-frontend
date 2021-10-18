import React from 'react'

import "../css/waves.css"

import { AiFillInstagram, AiFillTwitterSquare, AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
    return (
        <div className = "mt-8 h-48">
            <div className = "object-contain object-scale-down w-full">
                <div className="flex absolute mt-6 w-full content-center">
                    <div className = "px-12 md:mt-14">
                        <h1 className = "text-green-standard font-bold lg:text-4xl tracking-wide text-center md:text-left">foodPrint</h1>
                        <h2 className = "lg:pt-2 lg:pr-44 text-grey-light w-full text-center md:text-left pb-4">Here at foodprint, we encourage restaurant reservation to help F&B establishments reduce food waste. </h2>
                        <div className="grid sm:grid-cols-6 lg:grid-cols-4 gap-x-12 gap-y-4 md:pt-4 pb-3 text-center md:text-left">
                            <div>
                                <h1 className = "lg:text-md text-grey-standard tracking-widest">LEGAL</h1>
                                <h2 className = "lg:text-sm text-grey-lighter text-xs">Terms and Conditions</h2>
                                <h2 className = "lg:text-sm text-grey-lighter text-xs">Privacy Policy</h2>
                            </div>
                            <div>
                                <h1 className = "lg:text-md text-grey-standard tracking-widest">ABOUT</h1>
                                <h2 className = "lg:text-sm text-grey-lighter text-xs">About foodprint</h2>
                                <h2 className = "lg:text-sm text-grey-lighter text-xs">Get in touch</h2>
                            </div>
                            <div className="sm:col-span-2 lg:col-span-1">
                                <h1 className = "lg:text-md text-grey-standard tracking-widest">COUNTRIES</h1>
                                <h2 className = "lg:text-sm text-grey-lighter text-xs">Singapore</h2>
                            </div>
                            <div className="sm:col-span-2 lg:col-span-1">
                                <h1 className = "lg:text-md text-grey-standard tracking-widest">SOCIALS</h1>
                                <div className="flex flex-cols-3 justify-center md:justify-start w-full">
                                    <div className="col-span-3"></div>
                                    <AiFillInstagram className = "opacity-50" fontSize="3em"/>
                                    <AiFillLinkedin className = "opacity-50" fontSize="3em" />
                                    <AiFillTwitterSquare className = "opacity-50" fontSize="3em" />
                                    <div className="col-span-3"></div>
                                    {
                                    /* <img className = "transform scale-50 opacity-50" src="/images/instagram.png" alt="footer" />
                                    <img className = "transform scale-50 opacity-50" src="/images/linkedIn.png" alt="footer" />
                                    <img className = "transform scale-50 opacity-50" src="/images/twitter.png" alt="footer" /> */
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <svg className="waves w-full h-72" xmlns="http://www.w3.org/2000/svg" viewBox="0 20 120 35" preserveAspectRatio="none" shape-rendering="auto">
                        <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="100" y="-2" fill="rgba(243, 232, 201, 1)" />
                        </g>
                    </svg>
                </div>
                <div className="bg-yellow-standard sm:hidden w-full h-90">

                </div>


            </div>
        </div>
    )
}

export default Footer
