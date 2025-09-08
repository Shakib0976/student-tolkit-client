import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import Schedule from "../pages/Schedule/Schedule";
import ErrorPage from "../Components/Error/ErrorPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Budget from "../pages/Budget/Budget";
import StudyPlanner from "../pages/StudyPlanner/StudyPlanner";
import Quiz from "../pages/Quiz/Quiz";
import FocusTimer from "../pages/FocusTimer/FocusTimer";


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
      },
      {
        path: "register", Component: Register,
      },
      {
        path: "budget", Component: Budget
      },
      {
        path: 'planner', Component: StudyPlanner,
      },
      {
        path: 'quiz', Component: Quiz
      },
      {
        path: 'timer', Component: FocusTimer
      }
    ]
  },
]);

export default router;




