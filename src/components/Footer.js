import React from 'react'

import "../css/waves.css"

const Footer = () => {
    return (
        <div className = "h-72 mt-8">
            <div className="flex absolute mt-12 w-3/5">
                <div className = "md:pl-24 md:mt-10">
                    <h1 className = "text-green-standard font-bold text-4xl tracking-wide">foodPrint</h1>
                    <h2 className = "md:pt-2 md:pr-44 text-grey-light">Here at foodPrint, we encourage restaurant reservation to help F&B establishments reduce food waste. </h2>
                <div className="grid md:grid-cols-4 gap-12 md:pt-4 flex">
                    <div>
                        <h1 className = "text-grey-standard tracking-widest">LEGAL</h1>
                        <h2 className = "text-grey-lighter text-xs">Terms and Conditions</h2>
                        <h2 className = "text-grey-lighter text-xs">Privacy Policy</h2>
                    </div>
                    <div>
                        <h1 className = "text-grey-standard tracking-widest">ABOUT</h1>
                        <h2 className = "text-grey-lighter text-xs">About Us Page</h2>
                        <h2 className = "text-grey-lighter text-xs">Contact us</h2>
                    </div>
                    <div>
                        <h1 className = "text-grey-standard tracking-widest">COUNTRIES</h1>
                        <h2 className = "text-grey-lighter text-xs">Singapore</h2>
                    </div><div>
                        <h1 className = "text-grey-standard tracking-widest">SOCIALS</h1>
                        <div className="grid md:grid-cols-3 flex absolute z-30">
                            <img className = "transform scale-50 opacity-50" src="/images/instagram.png" alt="footer" />
                            <img className = "transform scale-50 opacity-50" src="/images/linkedIn.png" alt="footer" />
                            <img className = "transform scale-50 opacity-50" src="/images/twitter.png" alt="footer" />
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 35" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                <use xlinkHref="#gentle-wave" x="100" y="-2" fill="rgba(243, 232, 201, 1)" />
                {/* <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(243, 232, 201, 0.7)" /> */}
                {/* <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(243, 232, 201, 0.5)" /> */}
                {/* <use xlinkHref="#gentle-wave" x="48" y="4" fill="rgba(243, 232, 201, 0.3)" /> */}
                {/* <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(243, 232, 201, 0.2)" /> */}
                </g>
            </svg>
            {/* <svg className="padding xl:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 75" preserveAspectRatio="none" shape-rendering="auto">
                <rect width="300" height="75" fill="rgba(243, 232, 201, 1)" />
            </svg> */}
            {/* <div className = "absolute z-20 mt-8 w-full h-24 bg-yellow-standard top-36 h-64"></div> */}
            {/* <div className = "absolute z-20 mt-8 w-full h-24 bg-yellow-standard bottom-0">
                
            </div> */}
            {/* <img src="/images/Footer.jpeg" alt="footer" /> */}
        </div>
    )
}

export default Footer
