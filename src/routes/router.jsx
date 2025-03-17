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
import AdminMovies from "../pages/admin/AdminMovies.jsx";
import BookingDetails from "../pages/admin/BookingDetails.jsx";
import EditMovies from "../pages/admin/EditMovies.jsx";
import TicketDetails from "../pages/user/TicketDetails.jsx";
import AddScreen from "../pages/admin/AddScreen.jsx";
import ScreenDetails from "../pages/admin/ScreenDetails.jsx";


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
                path: "theatres",
                element: <TheaterList/>,
            },
            {
                path: "showtime/:screenId",
                element: <MovieSchedule/>,
            },
            {
                path: "screens/:screenId",
                element: <Screen/>,
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
                        path: "theatres",
                        element: <TheaterList/>,
                    },
                    {
                        path: "screens/:screenId",
                        element: <Screen/>,
                    },
                    {
                        path: "cart",
                        element: <Cart/>,
                    },
                    {
                        path: "mybookings",
                        element: <TicketDetails/>
                    },
                    {
                        path: "showtime/:screenId",
                        element: <MovieSchedule/>,
                    },
                    {
                        path: "payments",
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
            path: "movieDetails/:movieId",
            element: <EditMovies/>,
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
                element: <AdminMovies role ="admin"/>,
            },
            {
                path: "bookings",
                element: <BookingDetails/>,
            },
           {
            path: "theatres",
            element: <AddScreen role ="admin"/>,
        },
         {
            path: "screens",
             element: <ScreenDetails/>,
             },
            {
                path : "showtimes",
                element :<Showtime role ="admin"/>
            },
            ],
          },
        ],
      },
  ]);