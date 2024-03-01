import Login from "./Login"
import Browse from "./Browse"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
])

const Body = () => {
  console.log("body", process.env.REACT_APP_OPENAI_API_KEY)
  console.log("key", process.env.REACT_APP_TMDB_READ_ACCESS_TOKEN)
  console.log("random", process.env.REACT_APP_FIREBASE_API_KEY)
  return (
    <div className=''>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
