// RouterWrapper.jsx
import React, { useState, useEffect } from "react";
import router from './Router/Router.jsx';
import DefaultLoader from "./Components/Loader/DefaultLoader.jsx";
import { RouterProvider } from "react-router";


const RouterWrapper = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading, replace with real loading logic like auth check
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return loading ? <DefaultLoader /> : <RouterProvider router={router} />;
};

export default RouterWrapper;
