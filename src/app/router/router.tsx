import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { CodeComparePage } from "../../modules/code-compare";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <MainLayout />,

        children: [
            {
                index: true,
                element: <CodeComparePage />
            }
        ]
    }
])