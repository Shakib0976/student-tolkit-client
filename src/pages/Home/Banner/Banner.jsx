import { Quote, Rocket } from 'lucide-react';
import React from 'react';
import { motion } from "framer-motion";
import bannerImg from '../../../assets/portrait-young-boy-with-book-education-day-removebg-preview.png';
import OrbitingCirclesDemo from '../../../Components/MagicUi/OribitibgCirlePage';
import AvatarCirclesDemo from '../../../Components/MagicUi/AvatarCircleDemo';
import { Link } from 'react-router';

const Banner = () => {

    return (
        <section className="relative 
  bg-gradient-to-b from-[#e7f0fd10] to-[#e7f0fd] 
  dark:bg-gradient-to-b dark:from-slate-950 dark:to-slate-900
  overflow-hidden">
            <div className="max-w-7xl px-5 md:px-10 lg:px-15 py-10 md:py-20  mx-auto lg:grid lg:grid-cols-2 lg:gap-12">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center space-y-3 "
                >
                    <span className="text-sm font-semibold flex text-center gap-2 text-indigo-600 uppercase tracking-wide">
                        <span className='flex gap-2 items-center'><span className='w-12 border-b-2'></span> <span className='text-gray-700 dark:text-gray-400'>Student Life Toolkit </span></span>
                    </span>

                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-3xl font-extrabold dark:text-gray-200 text-gray-900 sm:text-4xl leading-tight"
                    >
                        Your <span className="text-indigo-600">All-in-One</span> Student Life Companion
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-sm md:text-lg dark:text-gray-300 text-gray-600"
                    >
                        Stay on top of your <strong>classes</strong>, track your
                        <strong> budget</strong>, plan your <strong>studies</strong>,
                        and prepare for <strong>exams</strong> — all in one place.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex gap-4 mt-6"
                    >
                        <Link to={'/schedule'} className="md:px-6 md:py-3 px-3 py-2 flex items-center gap-2 rounded-2xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-800 transition">
                            <Rocket /> Get Started
                        </Link>
                        <button className="md:px-6 md:py-3 px-3 py-2 rounded-2xl bg-white border text-gray-700 font-semibold shadow hover:bg-gray-200 transition">
                            👀 Watch Demo
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-sm text-gray-500 -ml-5 mt-4 italic"
                    >
                        {/* image and rating  */}
                        <div className=' hidden md:flex items-center gap-3'>

                            <AvatarCirclesDemo></AvatarCirclesDemo>
                            <div className='flex gap-3'>
                                <div>
                                    <Quote />
                                </div>
                                <div className='text-lg'>
                                    <h1>Smarter tools for brighter students.</h1>
                                    <h1 className='mt-3'>Level up your student journey today.</h1>

                                </div>
                            </div>
                        </div>
                    </motion.div>



                </motion.div>

                {/* Right Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative hidden lg:flex justify-center items-center w-full"
                >
                    {/* Center Image */}
                    <motion.img
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        src={bannerImg}
                        alt="Student illustration"
                        className="w-full max-w-md drop-shadow-xl z-10"
                    />

                    {/* Orbiting Circles */}
                    <div className="absolute top-50 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]">
                        <OrbitingCirclesDemo />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Banner;
