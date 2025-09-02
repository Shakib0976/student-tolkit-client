import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import Schedule from "../pages/Schedule/Schedule";


const router = createBrowserRouter([
  {
    path: "/",
   Component : RootLayouts,
   children: [

    {
      index: true , Component : Home
    },
    {
      path:"schedule", Component: Schedule
    }
   ]
  },
]);

export default router;