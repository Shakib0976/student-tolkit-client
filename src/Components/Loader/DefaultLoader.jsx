import React from "react";

const DefaultLoader = () => {
    
    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 border-solid"></div>
        </div>
    );
};

export default DefaultLoader;
