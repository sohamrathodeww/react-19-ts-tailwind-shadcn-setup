import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { CodeComparePage } from "../../modules/code-compare";
import { DashboardPage } from "../../modules/dashboard";
import { JsonViewerPage } from "../../modules/json-viewer";

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
            {
                path:"tools/json-viewer",
                element: <JsonViewerPage />
            },
        ]
    }
])