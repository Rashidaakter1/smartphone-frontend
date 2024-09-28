import { createBrowserRouter } from "react-router-dom";


import App from "../App";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/product/Product";
import SalesManagement from "../pages/SalesManagement/SalesManagement";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "/product",
                element: <Product />,
            },
            {
                path: "/sales-management",
                element: <SalesManagement />,
            },
        ]
    },
    {
        path: "/auth/signin",
        element: <Login />,
    },
    {
        path: "/auth/signup",
        element: <Register />,
    },
])

export default router