import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-teal-600 tracking-tight"
        >
          Complaint Portal
        </Link>

        {/* Hamburger Button for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-teal-600"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <NavLinks />
        </div>
      </div>

      {/* Mobile Menu with slight transition */}
      <div
        className={`md:hidden ${
          isOpen ? 'block opacity-100 translate-x-0' : 'hidden opacity-0 translate-x-10'
        } transition-all duration-300 ease-in-out`}
      >
        <div className="px-6 pb-4 flex flex-col gap-3">
          <NavLinks onClick={() => setIsOpen(false)} />
        </div>
      </div>
    </nav>
  );
};

const NavLinks = ({ onClick = () => {} }) => (
  <>
    <Link
      to="/"
      onClick={onClick}
      className="text-slate-700 hover:text-teal-600 font-medium"
    >
      Home
    </Link>
    <Link
      to="/"
      onClick={onClick}
      className="text-slate-700 hover:text-teal-600 font-medium"
    >
      About
    </Link>
    <Link
      to="/"
      onClick={onClick}
      className="text-slate-700 hover:text-teal-600 font-medium"
    >
      Contact
    </Link>
    <Link
      to="/Compreg"
      onClick={onClick}
      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium"
    >
      Register Complaint
    </Link>
    <Link
      to="/login"
      onClick={onClick}
      className="border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-4 py-2 rounded-lg font-medium"
    >
      Login / Signup
    </Link>
  </>
);

export default Nav;
