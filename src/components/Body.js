import Login from "./Login"
import Browse from "./Browse"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useDispatch } from "react-redux"
import {
  setLoggedInUserData,
  removeLoggedInUserData,
} from "../utils/slices/userSlice"

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
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user from authStateChanged")
        // User is signed in, see docs for a list of available properties
        const { uid, email, displayName, photoURL } = user
        dispatch(setLoggedInUserData({ uid, email, displayName, photoURL }))
        // ...
      } else {
        // User is signed out
        dispatch(removeLoggedInUserData())
      }
    })
  }, [])

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default Body
