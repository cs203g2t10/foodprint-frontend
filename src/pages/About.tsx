import React from 'react'

const About = () => {
    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-6 absolute">
                <img className="col-span-2 px-0 z-10 mt-28 -rotate-65 transform scale-110 " src="/images/aboutUs.png" alt="food" />
                <div className="col-span-2"></div>
                <img className="col-span-2 px-0 z-10 mt-64 -rotate-45 transform scale-90" src="/images/aboutUs2.png" alt="food" />

            </div>
            <div className="absolute z-10 grid grid-cols-7">
                <div className="col-span-2"></div>
                <div className="col-span-3 mx-5">
                    <h1 className="text-7xl text-green-standard leading-12 text-center mt-52 font-semibold tracking-wide">Reducing Food Wastage</h1>
                    <h1 className="text-center text-grey-standard text-base mt-5">Here at FoodPrint, we support to F&B establishments in their journey towards food wastage reduction. We provide an innovative solution to help better manage food inventories, which would be especially helping during this challenging times.</h1>
                </div>
            </div>
            <svg className="waves w-full transform -rotate-180 " xmlns="http://www.w3.org/2000/svg" viewBox="145 0 120 89" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                    <use xlinkHref="#gentle-wave" x="100" y="2" fill="rgba(243, 232, 201, 1)" />
                </g>
            </svg>
            {/* <h1 className="text-center text-7xl py-12">About Us</h1>
            <div className="flex justify-center">
                <div className="mx-24 ">
                    <p>Hallo, welcome to the About us page, these are our names</p>
                    <li>Daryl</li>
                    <li>Yvonne</li>
                    <li>Wen Liang</li>
                    <li>Michelle</li>
                    <li>Yixuan</li>
                    <li>Cherie</li>
                </div>
            </div> */}

        </div>
    )
}

export default About
