// RouterWrapper.jsx
import React, { useState, useEffect } from "react";
import router from './Router/Router.jsx';
import DefaultLoader from "./Components/Loader/DefaultLoader.jsx";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./Context/ThemeContext.jsx";


const RouterWrapper = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading, replace with real loading logic like auth check
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);
    
    // 1 . theme provider 

    return loading ? <DefaultLoader /> : <ThemeProvider>
                                               <RouterProvider router={router} />
                                         </ThemeProvider>;
};

export default RouterWrapper;
