import { useState, useEffect } from "react";
import { Menu, User } from "lucide-react";
import Login from "../components/auth/LoginForm"; // Import Login component
import SignUp from "../components/register/RegisterForm"; // Import SignUp component
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false); // State for Login modal
  const [isSignUpOpen, setIsSignUpOpen] = useState(false); // State for SignUp modal
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const navigate = useNavigate();

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Update login state based on token presence
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token
    setIsLoggedIn(false); // Update login status
    navigate("/");
  };

  const closeAllModals = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(false);
  };

  return (
    <header className="bg-gray-800 fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={"/"}>
            <h1 className="text-xl font-bold text-white cursor-pointer">AnimeSearch</h1>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8"></nav>

          {/* Auth Buttons or Logout - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
              <>
                {/* User Icon */}
                <button
                  className="p-2 rounded-lg hover:bg-gray-700 text-white"
                  onClick={() => navigate("/profile")}
                >
                  <User size={24} />
                </button>
                {/* Logout Button */}
                <button
                  className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login Button */}
                <button
                  className="px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-white"
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsSignUpOpen(false);
                  }}
                >
                  Login
                </button>
                {/* SignUp Button */}
                <button
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-white"
                  onClick={() => {
                    setIsSignUpOpen(true);
                    setIsLoginOpen(false);
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg hover:bg-gray-700 text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Login */}
      {isLoginOpen && <Login setIsVisible={closeAllModals} />}

      {/* Modal SignUp */}
      {isSignUpOpen && <SignUp setIsVisible={closeAllModals} />}
    </header>
  );
};

export default Header;
