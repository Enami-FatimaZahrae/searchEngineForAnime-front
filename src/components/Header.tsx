// src/components/Header.jsx
import React from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="bg-gray-800 fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold">AnimeSearch</h1>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#discover"  className="hover:text-blue-400 transition-colors">Discover</a>
            <a  href="#categories" className="hover:text-blue-400 transition-colors">Categories</a>
            <a href="#top-anime" className="hover:text-blue-400 transition-colors">Top Anime</a>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
             <Link to="/login">Login</Link>

            </button>
            <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              <Link to="/register">Sign Up</Link>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg hover:bg-gray-700">
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation & Auth (Initially Hidden) */}
        <div className="md:hidden hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 rounded-lg hover:bg-gray-700">Discover</a>
            <a href="#" className="block px-3 py-2 rounded-lg hover:bg-gray-700">Categories</a>
            <a href="#" className="block px-3 py-2 rounded-lg hover:bg-gray-700">Top Anime</a>
            <a href="#" className="block px-3 py-2 rounded-lg hover:bg-gray-700">Login</a>
            <a href="#" className="block px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700">Sign Up</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
