import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import Schedule from "../pages/Schedule/Schedule";
import ErrorPage from "../Components/Error/ErrorPage";
import Login from "../pages/Login/Login";


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    errorElement: <ErrorPage></ErrorPage>,
    children: [

      {
        index: true, Component: Home
      },
      {
        path: "schedule", Component: Schedule
      },
      {
        path: 'login', Component: Login
      }
    ]
  },
]);

export default router;