import { lazy } from "react";
import { Navigate } from "react-router-dom";

/**** Layouts *****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const AppLayout = lazy(() => import("../layouts/AppLayout.js"));

/***** Pages *****/
const LogIn = lazy(() => import("../views/Login.js"));
const Home = lazy(() => import("../views/Home.js"));
const MyWorklog = lazy(() => import("../views/MyWorklog.js"));
const Locations = lazy(() => import("../views/Locations.js"));
const LocationDetails = lazy(() => import("../views/LocationDetails.js"));
const Tickets = lazy(() => import("../views/Tickets.js"));
const TicketDetails = lazy(() => import("../views/TicketDetails.js"));
const WorkLogs = lazy(() => import("../views/Worklogs.js"));
const Users = lazy(() => import("../views/Users.js"));
const Solutions = lazy(() => import("../views/Solutions.js"));
const Settings = lazy(() => import("../views/Settings.js"));

/***** Routes *****/
const ThemeRoutes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <Navigate to="/login" /> },
      { path: "/login", exact: true, element: <LogIn /> },
      { path: "*", exact: true, element: <LogIn /> },
    ],
  },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/admin", exact: true, element: <Home /> },
      { path: "/admin/my_worklog", exact: true, element: <MyWorklog /> },
      { path: "/admin/locations", exact: true, element: <Locations /> },
      {
        path: "/admin/locations/:id",
        exact: true,
        element: <LocationDetails />,
      },
      { path: "/admin/tickets", exact: true, element: <Tickets /> },
      { path: "/admin/tickets/:id", exact: true, element: <TicketDetails /> },
      { path: "/admin/solutions/:id", exact: true, element: <Solutions /> },
      { path: "/admin/worklogs", exact: true, element: <WorkLogs /> },
      { path: "/admin/users", exact: true, element: <Users /> },
      { path: "/admin/settings", exact: true, element: <Settings /> },
      { path: "/admin/*", element: <Home /> },
    ],
  },
];

export default ThemeRoutes;
