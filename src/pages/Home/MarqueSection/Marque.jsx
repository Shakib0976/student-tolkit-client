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
        <div className="max-w-7xl mx-auto md:px-10 px-5 lg:px-0 ">
            <div className="bg-gray-100 dark:bg-slate-900 py-10  md:py-20 mt-10 mb-20 rounded-2xl text-center shadow-md ">
                {/* page title */}
                <h1 className="text-2xl sm:text-3xl md:text-3xl  font-bold mb-4 flex items-center gap-2 justify-center">
                    <Star className="w-8 h-8 mb-8 md:mb-0 text-yellow-500  " />  Explore Our Featured <br className="md:hidden" />Highlights
                </h1>
                {/* Page Description */}
                <p className="text-gray-600 dark:text-gray-400 text-center  text-base  md:text-lg mb-10 md:mb-20 px-4 md:px-0 max-w-3xl  mx-auto">
                    Discover some of the most inspiring visuals and concepts we’ve handpicked for you.
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
                                className="lg:w-50 lg:h-50 md:w-40 md:h-40  h-30 w-30 object-cover rounded-xl shadow hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default Marque;
