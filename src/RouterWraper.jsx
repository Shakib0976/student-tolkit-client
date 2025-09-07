// RouterWrapper.jsx
import React, { useState, useEffect } from "react";
import router from './Router/Router.jsx';
import DefaultLoader from "./Components/Loader/DefaultLoader.jsx";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
// import AuthProvider from "./Context/AuthProvider.jsx";


const RouterWrapper = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading, replace with real loading logic like auth check
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // 1 . theme provider 
    // 2. auth provider
    // 3. router provider
    // 4. loader

    return loading ? <DefaultLoader /> : <AuthProvider>
        <ThemeProvider>
            <Toaster position="top-right" />
            <RouterProvider router={router} />
        </ThemeProvider>
    </AuthProvider>;
};

export default RouterWrapper;
