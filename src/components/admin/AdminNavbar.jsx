import { Link, useNavigate } from "react-router-dom"
import { DarKMode } from "../shared/DarkMode"
import { axiosInstance } from "../../config/axiosInstance";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminNavbar =()=>{
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen,setMobileMenuOpen] =useState(false);



  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu=()=>{
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        const response = await axiosInstance({
            method: "GET",
            url: "/admin/logout",
        });
        toast.success("Logged Out Successfully")
        navigate("/admin/login");
        console.log("response=", response, "Logged out");
    } catch (error) {
        console.log(error);
    }
};


    return (
      <nav className="w-full sm:w-auto bg-gray-900 text-white py-4 px-6 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img
            src="https://as2.ftcdn.net/jpg/01/16/10/79/1000_F_116107910_M2GjML6trp84n8a7F1SMPVGsYVzAhFhu.jpg" // Replace with your logo URL
            alt="Logo"
            className="h-10 w-auto"
          />
          <span className="text-red-500 text-xl font-bold">MoviesBay</span>
        </div>
     
       {/* Mobile Menu Button */}
 <button className="sm:hidden ml-5 text-white focus:outline-none" onClick={toggleMobileMenu}>
          ☰
        </button>

    
    {/* <!-- Navigation Links --> */}
    <div className="hidden sm:flex items-center space-x-6">
      <Link to ="/admin" class="hover:bg-gray-700 px-4 py-2 rounded-md">Home</Link>
      <Link to="/admin/movies" class="hover:bg-gray-700 px-4 py-2 rounded-md">Movies</Link>
      <Link to="/admin/showtimes" class="hover:bg-gray-700 px-4 py-2 rounded-md">Showtimes</Link>
      <Link to="/admin/registeredusers" class="hover:bg-gray-700 px-4 py-2 rounded-md">Users</Link>
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
                <Link to
                  ="/admin/bookings" 
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  Bookings
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
    </div>
<DarKMode/>
    
    {/* <!-- Admin Profile Section --> */}
    <div className="flex items-center space-x-4">
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
        Log Out
      </button>
    </div>
  </div>


  {/* Mobile Menu (Shown when toggled) */}
  {mobileMenuOpen && (
        <div className="sm:hidden bg-gray-800 text-white p-4">
          <Link to ="/admin" className="block hover:bg-gray-700 px-4 py-2 rounded-md">Home</Link>
         <Link to="/admin/movies" className="block hover:bg-gray-700 px-4 py-2 rounded-md">Movies</Link>
         <Link to="/admin/showtimes" className="block hover:bg-gray-700 px-4 py-2 rounded-md">Showtimes</Link>
         <Link to="/admin/registeredusers" className="block hover:bg-gray-700 px-4 py-2 rounded-md">Users</Link>
          <button 
            onClick={toggleDropdown} 
            className=" w-full text-left ml-4 py-2 text-red-500 hover:text-white"
          >
            Profile
          </button>
          {dropdownOpen && (
              <div className="absolute left mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50 sm:w-auto">
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
                <Link to
                  ="/admin/bookings" 
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  Bookings
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
      )}
</nav>
    )
}

export default AdminNavbar