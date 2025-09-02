import React from "react";


const OrbitingCircle = ({
    children,
    iconSize = 40,
    radius = 150,
    reverse = false,
    speed = 6,
}) => {
    const totalChildren = React.Children.count(children);

    return (
        <div
            className="absolute rounded-full animate-spin"
            style={{
                width: radius * 2,
                height: radius * 2,
                animationDuration: `${speed}s`,
                animationDirection: reverse ? "reverse" : "normal",
            }}
        >
            <div className="relative w-full h-full flex items-center justify-center">
                {React.Children.map(children, (child, i) => (
                    <div
                        key={i}
                        className="absolute flex items-center justify-center"
                        style={{
                            transform: `rotate(${(360 / totalChildren) * i}deg) 
                          translate(${radius}px) 
                          rotate(-${(360 / totalChildren) * i}deg)`,
                            width: iconSize,
                            height: iconSize,
                        }}
                    >
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrbitingCircle;
