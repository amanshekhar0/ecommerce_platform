import React from 'react';
import { assets } from '../assets/assets';

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-4 px-6 sm:px-[4%] justify-between bg-white shadow-md">
      {/* Logo */}
      <img className="w-[max(12%,90px)] sm:w-[max(10%,80px)]" src={assets.logo} alt="Logo" />

      {/* Logout Button */}
      <button
        onClick={() => setToken('')}
        className="bg-blue-600 text-white px-6 py-2 sm:px-8 sm:py-2 rounded-2xl font-semibold hover:bg-indigo-700 active:scale-95 transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
