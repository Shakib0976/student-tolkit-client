import React from "react";

// Example icons
import { FaWhatsapp, FaGithub, FaGoogleDrive } from "react-icons/fa";
import { SiNotion, SiOpenai } from "react-icons/si";
import OrbitingCircle from "./OribitingCircle";
import calender from '../../assets/calendar.png'
import budget from '../../assets/budget.png'
import quiz from '../../assets/questionary.png'
import writing from '../../assets/content-writing.png'
import time from '../../assets/time-passing.png'

const OrbitingCirclesDemo = () => {
    return (
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-gray-50">
            {/* Outer Orbit */}
            <OrbitingCircle iconSize={40} radius={190} speed={40}>
                <img className="h-5" src={calender} alt="" />
                <img className="h-5" src={budget} alt="" />
                <img className="h-6" src={quiz} alt="" />
                <img className="h-5"src={writing} alt="" />
                <img className="h-6"src={time} alt="" />
            </OrbitingCircle>

            {/* Inner Orbit */}
            <OrbitingCircle iconSize={30} radius={150} reverse speed={10}>
                <FaWhatsapp className="text-green-500" />
                <SiNotion className="text-black" />
                <SiOpenai className="text-purple-600" />
                <FaGoogleDrive className="text-yellow-500" />
            </OrbitingCircle>
        </div>
    );
};

export default OrbitingCirclesDemo;
