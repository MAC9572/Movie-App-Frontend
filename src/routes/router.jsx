import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/user/HomePage";
import Signup from "../pages/shared/Signup";
import Login from "../pages/shared/Login";
import Profile from "../pages/user/Profile";
import Movies from "../pages/user/Movies";
import MovieDetails from "../pages/user/MovieDetails";
import ErrorPage from "../pages/shared/ErrorPage";
import { AdminLayout } from "../layout/AdminLayout";
import { UserLayout } from "../layout/UserLayout";
import Screen from "../pages/user/Screen";
import TheaterList from "../pages/shared/TheatreList";
import AdminProfile from "../pages/admin/Profile";
import AdminDashboard from "../components/admin/AdminDashboard";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProtectedRouteAdmin } from "./ProtectedRouteAdmin";
import About from "../pages/shared/About";
import UserList from "../pages/admin/UsersList";
import MovieSchedule from "../pages/shared/MovieSchedule";
import Cart from "../pages/user/Cart";
import PaymentSuccess from "../pages/user/PaymentSuccess";
import PaymentFailure from "../pages/user/PaymentFailure";
import Showtime from "../pages/admin/Showtime";
import Bookings from "../pages/user/Bookings";


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
            path: "aboutus",
            element: <About/>,
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
                path: "screens/",
                element: <Screen/>,
            },
            {
                path: "theatres",
                element: <TheaterList/>,
            },
            {
                path: "showtime/:screenId",
                element: <MovieSchedule/>,
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
                        element: <Cart/>,
                    },
                    {
                        path: "mybookings",
                        element: <Bookings/>
                    },
                    {
                        path: "payment/success",
                        element: <PaymentSuccess/>
                    },
                    {
                        path: "payment/cancel",
                        element: <PaymentFailure/>
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
                path: "dashboard",
                element: <AdminDashboard role="admin" />,
              },
              {
                path :"registeredusers",
                element :<UserList role ="admin"/>
              },
              {
                path: "movies",
                element: <Movies role ="admin"/>,
            },
            {
                path : "showtimes",
                element :<Showtime/>
            },
            ],
          },
        ],
      },
  ]);