import { Star } from "lucide-react";
import React from "react";
import Marquee from "react-fast-marquee";

const Marque = () => {
    const images = [
        "https://i.ibb.co.com/GvDFQDgW/sand-watches-with-colorful-sand-inside.jpg",
        "https://i.ibb.co.com/27H2Wmqh/closeup-dollar-bills-male-hands-concept-making-money-working.jpg",
        "https://i.ibb.co.com/7t2gyddY/calendar-planner-organization-management-remind-concept.jpg",
        "https://i.ibb.co.com/sJWX74zZ/closeup-aerial-view-hands-open-organize-book-with-planning-word.jpg",
        "https://i.ibb.co.com/27H2Wmqh/closeup-dollar-bills-male-hands-concept-making-money-working.jpg",
        "https://i.ibb.co.com/7t2gyddY/calendar-planner-organization-management-remind-concept.jpg",
        "https://i.ibb.co.com/sJWX74zZ/closeup-aerial-view-hands-open-organize-book-with-planning-word.jpg",


    ];

    return (
        <div className="bg-gray-50 py-8 rounded-2xl shadow-md max-w-7xl mx-auto">
            {/* page title */}
            <div className="flex mt-15 items-center justify-center gap-2 mb-4">
                <Star className="w-8 h-8 text-yellow-500" />
                <h1 className="text-3xl font-bold text-gray-800">
                    Explore Our Featured Highlights
                </h1>
            </div>
            {/* Page Description */}
            <p className="text-gray-600 md:mb-20 mb-12 text-center">
                Discover some of the most inspiring visuals and concepts we’ve handpicked
                for you.
            </p>

            {/* use react marquee for feature show  */}
            <Marquee pauseOnHover={true} speed={50} gradient={false}>
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="mx-6 flex items-center justify-center"
                    >
                        <img
                            src={src}
                            alt={`marquee-${index}`}
                            className="w-40 h-40 object-cover rounded-xl shadow hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default Marque;
