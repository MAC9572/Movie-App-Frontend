import { Link, useNavigate } from "react-router-dom"
import { DarKMode } from "../shared/DarkMode"
import { axiosInstance } from "../../config/axiosInstance";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminNavbar =()=>{
    const [dropdownOpen, setDropdownOpen] = useState(false);


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        const response = await axiosInstance({
            method: "GET",
            url: "/admin/logout",
        });
        toast.success("Logged Out Successfully")
        navigate("/");
        console.log("response=", response, "Logged out");
    } catch (error) {
        console.log(error);
    }
};


    return (
        <header className="bg-gray-800 text-white">
  <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
    {/* <!-- Logo Section --> */}
    <div className="flex items-center space-x-4">
      <img src="https://as2.ftcdn.net/jpg/01/16/10/79/1000_F_116107910_M2GjML6trp84n8a7F1SMPVGsYVzAhFhu.jpg" 
      alt="Logo" 
      className="h-10 w-auto sm:h-8 md:h-10"/>
    <span className="text-red-500 text-xl sm:text-lg md:text-xl font-bold">MovieBay</span>

    </div>

    
    {/* <!-- Navigation Links --> */}
    <nav className="flex items-center space-x-6">
      <Link to ="/admin" class="hover:bg-gray-700 px-4 py-2 rounded-md">Home</Link>
      <Link to="/admin/movies" class="hover:bg-gray-700 px-4 py-2 rounded-md">Movies</Link>
      <a href="/admin/showtimes" class="hover:bg-gray-700 px-4 py-2 rounded-md">Showtimes</a>
      <a href="/admin/users" class="hover:bg-gray-700 px-4 py-2 rounded-md">Users</a>
         {/* Profile Dropdown */}
         <div className="relative">
            <button 
              onClick={toggleDropdown} 
              className="font-semibold hover:text-red-500 focus:outline-none"
            >
              <span className="text-lg">👤
                </span> Profile
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50 sm:w-auto">
                <Link
                  to="/admin/profile" 
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  My Profile
                </Link>
                <Link to
                  ="/admin/dashboard" 
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
      <DarKMode/>
    </nav>

    {/* <!-- Admin Profile Section --> */}
    <div className="flex items-center space-x-4">
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
        Log Out
      </button>
    </div>
  </div>
</header>
    )
}

export default AdminNavbar