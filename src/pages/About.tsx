import { useEffect } from 'react'
import "animate.css"
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AboutUsTeam from '../components/AboutUsTeam';

const About = () => {

    const controls = useAnimation();
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
        if (!inView) {
            controls.start('hidden');
        }
    }, [controls, inView]);

    const fadeInRight = {
        hidden: { x: "150px" },

        visible: {
            x: "0px",
            transition: { duration: 0.6 }
        }
    }

    const fadeInLeft = {
        hidden: { x: "-150px" },

        visible: {
            x: "0px",
            transition: { duration: 0.6 }
        }
    }


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
            <div className="grid grid-cols-2 mt-10 mb-16">
                <motion.div ref={ref} className="Box" initial="hidden" animate={controls} variants={fadeInLeft}>
                    <img className="transform scale-60" src="/images/story.png" alt="our story" />
                </motion.div>
                <motion.div className="my-auto mr-52" ref={ref} initial="hidden" animate={controls} variants={fadeInRight}>
                    <h1 className="text-green-standard tracking-widest font-semibold text-xl mb-5">OUR STORY</h1>
                    <h1 className="text-grey-standard text-base">FoodPrint was started in 2021 by a group of SMU undergraduates who are passionate about using technology to solve persisting problems within our community.</h1>
                    <h1 className="text-grey-standard text-base mt-3">Especially during trying times when COVID-19 hit, we saw that F&B establishments face huge difficulty in managing their inventories, worsening the issue of food wastage.</h1>
                    <h1 className="text-grey-standard text-base mt-3">    With this, we embarked on a journey to solve this problem and after months of hardwork, we present to you the FoodPrint you see today. </h1>
                </motion.div>
            </div>
            <div className="mb-44">
                <h1 className="text-green-standard tracking-widest font-semibold text-xl mb-10 text-center">MEET THE TEAM</h1>
                <div className="grid grid-cols-6 mx-28">
                    <AboutUsTeam linkedIn="https://www.linkedin.com/in/cherie-lim-hui-ting/" name="Cherie Lim" role="Developer" imgUrl="/images/cherie.png"/>
                    <AboutUsTeam linkedIn="https://www.linkedin.com/in/michelle-tan-2a124a1b9/" name="Michelle Tan" role="Developer" imgUrl="/images/michelle.jpg"/>
                    <AboutUsTeam linkedIn="https://www.linkedin.com/in/yvonnelhs/" name="Yvonne Lim" role="Developer" imgUrl="/images/von.jpg"/>
                    <AboutUsTeam linkedIn="https://www.linkedin.com/in/wongrenyidaryl/" name="Daryl Wong" role="Developer" imgUrl="/images/daryl.jpg"/>
                    <AboutUsTeam linkedIn="https://www.linkedin.com/in/wenlianggoh/" name="Goh Wen Liang" role="Developer" imgUrl="/images/boss.jpg"/>
                    <AboutUsTeam linkedIn="https://www.linkedin.com/in/yixuan-leow/" name="Leow Yi Xuan" role="Developer" imgUrl="/images/yixuan.jpg"/>
                </div>
            </div>
        </div>
    )
}

export default About
