import React from 'react'
import { Navigate, Link } from 'react-router-dom'
// import {  } from 'react-router-dom';

const Nav = () => {
// const navigator = Navigate();

  return (
    // <div>
      <nav className="text-purple-700 shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="text-xl font-bold text-purple-700">Complaint Portal</Link>
        <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-purple-700">Home</Link>
          <Link to="/" className="text-gray-700 hover:text-purple-700">About</Link>
          <Link to="/" className="text-gray-700 hover:text-purple-700">Contact</Link>
          {/* <Link to="/Compreg" className="text-gray-700 hover:text-blue-500">Login / Signup</Link>
           */}
          <Link to="/login" className="text-gray-700 hover:text-purple-700">Login / Signup</Link>

        </div>
      </nav>
    // </div>
  )
}

export default Nav
