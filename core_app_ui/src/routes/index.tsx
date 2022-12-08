import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const About = React.lazy(() => import("../pages/About"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "about",
                element: <About />,
            },
        ],
    },
]);

export default router;
