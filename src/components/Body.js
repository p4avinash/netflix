import Login from "./Login"
import Browse from "./Browse"
import Error from "./Error"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/browse",
    element: <Browse />,
    errorElement: <Error />,
  },
])

const Body = () => {
  return (
    <div className=''>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
