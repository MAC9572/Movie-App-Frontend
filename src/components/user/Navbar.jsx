import { useState} from 'react';
import { Link} from 'react-router-dom';
import { DarKMode } from '../shared/DarkMode';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="w-full sm:w-auto bg-gray-900 text-white py-4 px-6 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img
            src="https://as2.ftcdn.net/jpg/01/16/10/79/1000_F_116107910_M2GjML6trp84n8a7F1SMPVGsYVzAhFhu.jpg" // Replace with your logo URL
            alt="Logo"
            className="h-10 w-auto sm:h-8 md:h-10"
          />
          <span className="text-red-500 text-xl sm:text-lg md:text-xl font-bold">MoviesBay</span>
        </div>

        {/* Search Bar */}
        <div className="flex flex-grow max-w-lg mx-4 sm:mx-2 sm:ml-12">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 dark:bg-white text-gray-500 focus:outline-none"
            placeholder="Search for Movies"
          />
        </div>

        {/* Navbar Links and Sign In Button */}
        <div className="flex items-center space-x-6">
          <DarKMode/>
          <Link to ="/" className="font-semibold hover:text-red-500">Home</Link>
          <Link to ="/movies" className="font-semibold hover:text-red-500">Movies</Link>
          <a href="#about" className="font-semibold hover:text-red-500">About</a>
          
          {/* Sign In Button
          <button onClick ={()=>navigate('/signup')}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            User Login
          </button> */}
          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={toggleDropdown} 
              className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300'
              // className="text-white hover:text-red-500 focus:outline-none"
            >
              <span className="text-lg"></span> Login
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50">
                <Link to="/login" 
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                  onClick={() => setDropdownOpen(false)}
                >
                  User Login
                </Link>
                 <Link to = "/admin/login"
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                  onClick={() => setDropdownOpen(false)}
                >
                  Admin Login
                </Link>
              </div>
            )}
          </div>
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;