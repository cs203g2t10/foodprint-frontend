import "../css/waves.css"
import { Link } from 'react-router-dom'
import { AiFillInstagram, AiFillTwitterSquare, AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
    return (
        <div className="mt-8 md:h-48">
            <div className="w-full">
                <div className="flex absolute mt-6 w-full content-center pt-44 md:pt-0">
                    <div className="px-12 md:mt-14">
                        <h1 className="text-green-standard font-bold lg:text-4xl tracking-wide text-center md:text-left">foodprint</h1>
                        <h2 className="hidden md:block lg:pt-2 lg:pr-44 text-grey-light w-full text-center md:text-left pb-4 text-sm md:text-base">Here at foodprint, we encourage restaurant reservation to help F&B establishments reduce food waste. </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-4 gap-x-12 gap-y-4 md:pt-4 pb-3 text-center md:text-left">
                            <div>
                                <h1 className="lg:text-md text-grey-standard tracking-widest">LEGAL</h1>
                                <h2 className="lg:text-sm text-grey-lighter text-xs">Terms and Conditions</h2>
                                <h2 className="lg:text-sm text-grey-lighter text-xs">Privacy Policy</h2>
                            </div>
                            <div>
                                <h1 className="lg:text-md text-grey-standard tracking-widest">ABOUT</h1>
                                <h2 className="lg:text-sm text-grey-lighter text-xs"><Link to="/about">About foodprint</Link></h2>
                                <h2 className="lg:text-sm text-grey-lighter text-xs">Get in touch</h2>
                            </div>
                            <div className="sm:col-span-2 lg:col-span-1">
                                <h1 className="lg:text-md text-grey-standard tracking-widest">COUNTRIES</h1>
                                <h2 className="lg:text-sm text-grey-lighter text-xs">Singapore</h2>
                            </div>
                            <div className="sm:col-span-2 lg:col-span-1">
                                <h1 className="lg:text-md text-grey-standard tracking-widest">SOCIALS</h1>
                                <div className="flex flex-cols-3 justify-center md:justify-start w-full">
                                    <div className="col-span-3"></div>
                                    <AiFillInstagram className="opacity-50" fontSize="2em" />
                                    <AiFillLinkedin className="opacity-50" fontSize="2em" />
                                    <AiFillTwitterSquare className="opacity-50" fontSize="2em" />
                                    <div className="col-span-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:hidden lg:block">
                    <svg className="waves w-full md:h-72 h-96" xmlns="http://www.w3.org/2000/svg" viewBox="0 20 120 35" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                            <use xlinkHref="#gentle-wave" x="100" y="-2" fill="rgba(243, 232, 201, 1)" />
                        </g>
                    </svg>
                </div>
                {/* <div className="block lg:hidden bg-yellow-standard sm:hidden w-full h-90">

                </div> */}


            </div>
        </div>
    )
}

export default Footer
