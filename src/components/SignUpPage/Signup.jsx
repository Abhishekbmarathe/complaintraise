import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // Import React Hook Form
import axios from 'axios';
import Nav from '../Nav';
import Foot from '../Footer';
import { Link, useNavigate } from 'react-router-dom';
import api from '../Modules/Api';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // Initialize React Hook Form
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(api + 'user', data);
      console.log('Signup successful:', response.data);
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup min-h-screen bg-gradient-to-br from-green-100 to-teal-100 flex flex-col">
      <Nav />
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-teal-700">Create Account</h2>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name Input */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                {...register('name', { required: 'Full Name is required' })}
                className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Username Input */}
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                {...register('username', { required: 'Username is required' })}
                className={`w-full p-3 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400`}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Phone Number Input */}
            <div>
              <input
                type="tel"
                name="phno"
                placeholder="Phone Number"
                {...register('phno', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Please enter a valid 10-digit phone number'
                  }
                })}
                className={`w-full p-3 border ${errors.phno ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400`}
              />
              {errors.phno && (
                <p className="text-red-500 text-xs mt-1">{errors.phno.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
                className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-teal-700 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </main>
      <Foot />
    </div>
  );
};

export default Signup;
