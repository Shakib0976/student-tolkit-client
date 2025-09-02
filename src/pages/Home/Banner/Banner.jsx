import { Rocket } from 'lucide-react';
import React from 'react';
import bannerImg from '../../../assets/portrait-young-boy-with-book-education-day-removebg-preview.png'
import OrbitingCirclesDemo from '../../../Components/MagicUi/OribitibgCirlePage';
const Banner = () => {
    return (
        <div>
            <section className="relative  overflow-hidden">
                <div className="max-w-11/12 h-screen  py-10  mx-auto  lg:grid lg:grid-cols-2 lg:gap-12">

                    {/* Left Content */}
                    <div className="flex flex-col justify-center space-y-3 md:space-y-6">
                        <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                            🧑‍🎓 Student Life Toolkit
                        </span>
                        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-5xl leading-tight">
                            Your <span className="text-indigo-600">All-in-One</span> Student Life Companion
                        </h1>
                        <p className=" text-sm md:text-lg text-gray-600">
                            Stay on top of your <strong>classes</strong>, track your
                            <strong>budget</strong>, plan your <strong>studies</strong>,
                            and prepare for <strong>exams</strong> — all in one place.
                        </p>

                        <div className="flex gap-4 mt-6">
                            <button className="md:px-6 md:py-3 px-3 py-2 flex items-center gap-2 rounded-2xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-800 transition">
                                <Rocket /> Get Started
                            </button>
                            <button className="md:px-6 md:py-3 px-3 py-2 rounded-2xl bg-white border text-gray-700 font-semibold shadow hover:bg-gray-200 transition">
                                👀 Watch Demo
                            </button>
                        </div>

                        <p className="text-sm text-gray-500 mt-4 italic">
                            Boost productivity. Reduce stress. Study smarter.
                        </p>
                    </div>

                    {/* Right Content (Illustration / Mockup) */}
                    <div className="relative  hidden lg:flex justify-center items-center w-full ">
                        {/* Center Image */}
                        <div className="z-10">
                            <img
                                src={bannerImg}
                                alt="Student illustration"
                                className="w-full  max-w-md drop-shadow-xl"
                            />
                        </div>

                        {/* Orbiting Circles */}
                        <div className="absolute top-50 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]" >
                            <OrbitingCirclesDemo />
                        </div>
                    </div>


                </div>
            </section>
        </div>
    );
};

export default Banner;