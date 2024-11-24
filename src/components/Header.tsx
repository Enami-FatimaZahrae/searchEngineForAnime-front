// src/components/Header.jsx
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import Login from '../components/auth/LoginForm'; // Importer le composant Login
import SignUp from '../components/register/RegisterForm'; // Importer le composant SignUp

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false); // État pour afficher le modal Login
  const [isSignUpOpen, setIsSignUpOpen] = useState(false); // État pour afficher le modal SignUp

  return (
    <header className="bg-gray-800 fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">AnimeSearch</h1>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#discover"  className="hover:text-blue-400 transition-colors">Discover</a>
            <a  href="#categories" className="hover:text-blue-400 transition-colors">Categories</a>
            <a href="#top-anime" className="hover:text-blue-400 transition-colors">Top Anime</a>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Login Button */}
            <button
              className="px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-white"
              onClick={() => {
                setIsLoginOpen(true);
                setIsSignUpOpen(false); // Assurez-vous que le modal SignUp est fermé
              }}
            >
              Login
            </button>
            {/* SignUp Button */}
            <button
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-white"
              onClick={() => {
                setIsSignUpOpen(true);
                setIsLoginOpen(false); // Assurez-vous que le modal Login est fermé
              }}
            >
              Sign Up
            </button>
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
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Login /> 
        </div>
      )}

      {/* Modal SignUp */}
      {isSignUpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <SignUp />
        </div>
      )}
    </header>
  );
};

export default Header;
