import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/router";
import { Toaster } from "sonner";
function App() {

  return (
    <>
    <Toaster position="top-right" richColors />
    <RouterProvider router={router} />
    </>
  )
}

export default App
