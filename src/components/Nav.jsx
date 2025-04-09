import React from 'react'
import { Navigate, Link } from 'react-router-dom'
// import {  } from 'react-router-dom';

const Nav = () => {
// const navigator = Navigate();

  return (
    // <div>
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="text-xl font-bold text-blue-600">Complaint Portal</div>
        <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
          <Link to="/" className="text-gray-700 hover:text-blue-500">About</Link>
          <Link to="/" className="text-gray-700 hover:text-blue-500">Contact</Link>
          <Link to="/Compreg" className="text-gray-700 hover:text-blue-500">Login / Signup</Link>
        </div>
      </nav>
    // </div>
  )
}

export default Nav
