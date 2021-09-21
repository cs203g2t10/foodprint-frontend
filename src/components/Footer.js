import React from 'react'

const Footer = () => {
    return (
        <div>
            <div className="flex absolute z-30 mt-12 w-3/5">
                <div className = "md:pl-24 md:mt-10">
                    <h1 className = "text-green-standard font-bold text-4xl tracking-wide">foodPrint</h1>
                    <h2 className = "md:pt-2 md:pr-44 text-grey-light">Here at foodPrint, we encourage restaurant reservation to help F&B establishments reduce food waste. </h2>

                <div className="grid md:grid-cols-4 gap-12 md:pt-4 flex absolute z-30">
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
                            <img className = "transform scale-75 opacity-50" src="/images/instagram.png" alt="footer" />
                            <img className = "transform scale-75 opacity-50" src="/images/linkedIn.png" alt="footer" />
                            <img className = "transform scale-75 opacity-50" src="/images/twitter.png" alt="footer" />
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <img src="/images/Footer.jpeg" alt="footer" />
        </div>
    )
}

export default Footer
