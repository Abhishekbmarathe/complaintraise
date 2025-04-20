import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      {/* Brand/Logo */}
      <Link
        to="/"
        className="text-2xl font-extrabold text-teal-600 tracking-tight hover:scale-105 transition-transform duration-200"
      >
        Complaint Portal
      </Link>

      {/* Nav Links */}
      <div className="space-x-4 hidden/ md:flex items-center">
        <Link
          to="/"
          className="text-slate-700 hover:text-teal-600 transition-colors duration-200 font-medium"
        >
          Home
        </Link>
        <Link
          to="/"
          className="text-slate-700 hover:text-teal-600 transition-colors duration-200 font-medium"
        >
          About
        </Link>
        <Link
          to="/"
          className="text-slate-700 hover:text-teal-600 transition-colors duration-200 font-medium"
        >
          Contact
        </Link>
        <Link
          to="/Compreg"
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition duration-300 font-medium"
        >
          Register Complaint
        </Link>
        <Link
          to="/login"
          className="border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-4 py-2 rounded-lg transition duration-300 font-medium"
        >
          Login / Signup
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
