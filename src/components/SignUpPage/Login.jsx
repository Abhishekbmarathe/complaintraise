import { React } from 'react';
import { useForm } from 'react-hook-form'; // Import React Hook Form
import Nav from '../Nav';
import Foot from '../Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import api from '../Modules/Api';

const Login = () => {
  const navigate = useNavigate();
  // Initialize React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log('Login data:', data);

    try {
      const response = await axios.post(api + 'login', {
        username: data.username,
        password: data.password,
      });

      // Handle response from the server (e.g., save token or navigate to a different page)
      console.log('Login successful:', response.data);
      alert('Login successful!');

      // Optionally, store token in localStorage or sessionStorage
      sessionStorage.setItem('TOKEN', response.data.TOKEN);

      // Redirect user to another page after successful login
      // For example, navigate to the dashboard page
      // window.location.href = '/dashboard';
      navigate('/Compreg')

    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-page min-h-screen bg-gradient-to-br from-green-100 to-teal-100 flex flex-col">
      <Nav />
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center text-teal-700">Log In</h2>
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              Log In
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
