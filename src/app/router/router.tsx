import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { CodeComparePage } from "../../modules/code-compare";
import { DashboardPage } from "../../modules/dashboard";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <MainLayout />,

        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path:"tools/code-compare",
                element: <CodeComparePage />
            },
        ]
    }
])