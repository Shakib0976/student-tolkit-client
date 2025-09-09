import React, { useEffect } from "react";
import {
    FaCalendarAlt,
    FaWallet,
    FaQuestionCircle,
    FaBook,
    FaLightbulb,
    FaClock,
} from "react-icons/fa";
import { Link } from "react-router";
import AOS from 'aos';
import 'aos/dist/aos.css';

// this is feature highlight section card 

const features = [
    {
        icon: <FaCalendarAlt className="text-3xl text-white" />,
        title: "Class Schedule Tracker",
        description:
            "Add, edit, or delete classes. Color-code subjects and view daily or weekly schedules. Never miss a lecture!",
        color: "bg-blue-500",
        link: "/schedule",
    },
    {
        icon: <FaWallet className="text-3xl text-white" />,
        title: "Budget Tracker",
        description:
            "Track income, expenses, and savings. Categorize spending and view visual charts for financial insights.",
        color: "bg-green-500",
        link: "/budget",
    },
    {
        icon: <FaQuestionCircle className="text-3xl text-white" />,
        title: "Exam Q&A Generator",
        description:
            "Generate practice questions (MCQs, short answers, true/false). Set difficulty levels for effective exam prep.",
        color: "bg-purple-500",
        link: "/quiz",
    },
    {
        icon: <FaBook className="text-3xl text-white" />,
        title: "Study Planner",
        description:
            "Break big study goals into smaller tasks. Assign subjects, priority, deadlines, and schedule study slots efficiently.",
        color: "bg-yellow-500",
        link: "/planner",
    },
    {
        icon: <FaLightbulb className="text-3xl text-white" />,
        title: "Smart Study Recommendations",
        description:
            "Get personalized study schedules, tips, and adaptive reminders based on your classes and upcoming exams.",
        color: "bg-pink-500",
        link: "/planner",
    },
    {
        icon: <FaClock className="text-4xl text-red-500" />,
        title: "Focus Timer",
        description:
            "Stay productive with a built-in Pomodoro-style timer. Track your study sessions and break times effectively.",
        link: "/timer",
    },
];

// FeatureHighlights Card Component

const FeatureHighlights = () => {

    // aos annimation   

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false, // if true, animation happens only once
        });
    }, []);

    return (
        <section className="py-16  mt-10 bg-gradient-to-r  from-purple-50 to-blue-50 dark:bg-slate-950 dark:bg-none">
            <div className="container max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-4 text-center">
                    🏆 Feature Highlights
                </h2>
                <p className="text-gray-600 dark:text-gray-400 md:mb-20 mb-12 text-center">
                    Make your student life organized, stress-free, and productive!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div
                            data-aos="fade-up"
                            key={index}
                            className="relative bg-white dark:bg-slate-900 py-6 px-6 rounded-3xl shadow-lg hover:shadow-2xl transition"
                        >
                            {/* card icon */}
                            <div
                                className={`absolute -top-6 left-6 rounded-full p-4 shadow-xl ${feature.color}`}
                            >
                                {feature.icon}
                            </div>

                            <div className="mt-8">
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
                                <div className="border-t-2 my-4"></div>


                                {/* learn more button  */}


                                <Link to={feature.link}>
                                    <button class="animated-button">
                                        <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                            ></path>
                                        </svg>
                                        <span class="text mx-2">Learn More</span>
                                        <span class="circle"></span>
                                        <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                            ></path>
                                        </svg>
                                    </button>
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureHighlights;
