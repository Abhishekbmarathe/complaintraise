import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // Import React Hook Form
import Nav from '../Nav';
import Foot from '../Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import api from '../Modules/Api';
import Loader from '../../assets/Loader';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loader state

  // Initialize React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log('Login data:', data);
    setLoading(true); // Start loader
  
    try {
      const response = await axios.post(api + 'login', {
        username: data.username,
        password: data.password,
      });
  
      const { TOKEN, result, status, message } = response.data;
  
      if (status === true && TOKEN && result) {
        alert('Login successful!');
  
        // Store token and user details in session storage
        sessionStorage.setItem('TOKEN', TOKEN);
        sessionStorage.setItem('USER', JSON.stringify(result));
  
        // Redirect user to complaint registration page
        navigate('/Compreg');
      } else {
        // Handle failed login attempt
        alert(message || 'Login failed. Invalid username or password.');
        // navigate('/login');
      }
  
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false); // Stop loader
    }
  };
  
  

  return (
    <div className="login-page min-h-screen bg-gradient-to-br from-green-100 to-teal-100 flex flex-col">
      <Nav />
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center text-teal-700">Log In</h2>
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" disabled={loading}>
            {/* Username Input */}
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                {...register('username', { required: 'Username is required' })}
                className={`w-full p-3 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400`}
                disabled={loading}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
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
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader />
                </div>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-teal-700 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </main>
      <Foot />
    </div>
  );
};

export default Login;
