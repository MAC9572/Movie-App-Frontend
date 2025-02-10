import { createBrowserRouter } from "react-router-dom";
import Cart from "../pages/user/cart";
import HomePage from "../pages/user/HomePage";
import Signup from "../pages/shared/Signup";
import Login from "../pages/shared/Login";
import Profile from "../pages/user/Profile";
import Movies from "../pages/user/Movies";
import MovieDetails from "../pages/user/MovieDetails";
import ErrorPage from "../pages/shared/ErrorPage";
import { AdminLayout } from "../layout/AdminLayout";
import { UserLayout } from "../layout/userLayout";
import Screen from "../pages/user/screen";
import TheaterList from "../pages/shared/TheatreList";
import AdminProfile from "../pages/admin/Profile";
import AdminDashboard from "../components/admin/AdminDashboard";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProtectedRouteAdmin } from "./ProtectedRouteAdmin";

export const router = createBrowserRouter([
    {
        path: "",
        element: <UserLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "",
                element: <HomePage/>,
            },
            {
                path: "signup",
                element: <Signup/>,
            },
            {
                path: "login",
                element: <Login/>,
            },
            {
                path: "cart",
                element: <Cart/>,
            },
            {
                path: "movies",
                element: <Movies/>,
            },
            {
                path: "movieDetails/:movieId",
                element: <MovieDetails/>,
            },
            {
                path: "screens",
                element: <Screen/>,
            },
            {
                path: "theatres",
                element: <TheaterList/>,
            },
            {
                element: <ProtectedRoute/>,
                path: "user",
                children: [ 
                    {
                        path: "",
                        element: <HomePage/>,
                    },
                    {
                        path: "profile",
                        element: <Profile/>,
                    },
                    {
                        path: "screens",
                        element: <Screen/>,
                    },
                    {
                        path: "theatres",
                        element: <TheaterList/>,
                    },
                    {
                        path: "cart",
                        // element: <Cart />,
                    },
                    {
                        path: "bookings",
                        // element: <h1> orders page</h1>,
                    },
                    {
                        path: "payment/success",
                        // element: <h2>Payment success</h2>,
                    },
                ],
            },
        ],
    },
    {
        path: "admin",
        element: <AdminLayout />,
        errorElement: <ErrorPage role="admin" />,
        children: [
            {
                path: "",
                element: <HomePage/>,
            },
          {
            path: "signup",
            element: <Signup role="admin" />,
          },
          {
            path: "login",
            element: <Login role="admin" />,
          },
          {
            element: <ProtectedRouteAdmin />,
            children: [
              {
                path: "profile",
                element: <AdminProfile role="admin" />,
              },
              {
                path: "movies",
                element: <Movies role="admin" />,
              },
              {
                path: "dashboard",
                element: <AdminDashboard role="admin" />,
              },
            ],
          },
        ],
      },
  ]);