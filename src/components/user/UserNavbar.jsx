import { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { DarKMode } from '../shared/DarkMode';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';

const UserNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
        const response = await axiosInstance({
            method: "GET",
            url: "/user/logout",
        });
      toast.success("Logged Out Successfully")
        navigate("/login");
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

        {/* Search Bar */}
        <div className="flex flex-grow max-w-lg mx-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 dark:bg-white text-gray-500 focus:outline-none"
            placeholder="Search for Movies, Events..."
          />
        </div>

        {/* Navbar Links and Profile Dropdown */}
        <div className="flex items-center space-x-6">
          <DarKMode/>
          <Link to ="/user" className="font-semibold hover:text-red-500">Home</Link>
          <Link to ="/movies" className="font-semibold hover:text-red-500">Movies</Link>
          <Link to="/theatres" className="font-semibold hover:text-red-500">Theatres</Link>
          
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
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50">
                <Link
                  to="/user/profile" 
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  My Profile
                </Link>
                <Link to
                  ="/mybookings" 
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  Bookings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
