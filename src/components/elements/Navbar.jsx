import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = ({ handleSearch, navOnly }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-white text-2xl font-bold mb-4 md:mb-0">
          Movie Portal
        </Link>
        {!navOnly && (
          <div className="flex items-center mx-auto space-x-4 b-2 font-bold">
            <span className='hidden md:flex'>
              <SearchBar handleSearch={handleSearch} />
            </span>
            <Link
              to="/favorites"
              className="text-white transition duration-300 ease-in-out  hover:bg-black bg-opacity-30 px-3 py-1 rounded-md"
            >
              Favorites
            </Link>
          </div>

        )}
        {!navOnly && (
          <span className='md:hidden'>
            <SearchBar handleSearch={handleSearch} />
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
