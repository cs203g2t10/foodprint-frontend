const About = () => {
    return (
        <div className="min-h-screen">
            <div className="absolute z-10 px-3 overflow-hidden">
                <div className="grid md:grid-cols-7 gap-4 h-screen px-10 py-20 md:py-0">
                    <div className="border-1 md:col-span-4 md:pl-36">
                        <h1 className="text-left md:pt-36 text-7xl font-semibold tracking-wide text-green-standard leading-12 pb-2 animate__animated animate__fadeIn">Reducing <br /> Food Wastage</h1>
                        <h1 className="text-base text-grey-standard pr-10 pt-2">Here at foodprint, we support F&B establishments in their journey towards reducing food wastage. We provide an innovative solution to better manage food inventories, based on the level of demand. This is especially helpful during such unpredictable times, in light of the current pandemic.</h1>
                    </div>
                    <div className="md:col-span-3 pt-24">
                        <img className="transform scale-90" src="/images/landingPage.webp" alt="cooking illustration" />
                    </div>
                </div>
            </div>
            <svg className="waves w-full transform -rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="145 0 120 60" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                    <use xlinkHref="#gentle-wave" x="100" y="-25" fill="rgba(243, 232, 201, 1)" />
                </g>
            </svg>
        </div>
    )
}

export default About
