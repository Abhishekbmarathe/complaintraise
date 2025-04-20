import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Nav from '../Nav';
import { useNavigate } from 'react-router-dom';

export default function CompReg() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // loader state

  // Initialize React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Check token on mount
  useEffect(() => {
    const token = sessionStorage.getItem('TOKEN');
    if (!token) {
      navigate('/login');
    } else {
      setIsLoading(false); // render page after verification
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    const formPayload = new FormData();
    formPayload.append('name', data.name);
    formPayload.append('email', data.email);
    formPayload.append('phone', data.phone);
    formPayload.append('message', data.message);
    if (data.image?.[0]) {
      formPayload.append('image', data.image[0]);
    }

    try {
      await axios.post('http://localhost:3000/api/complaints', formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Complaint submitted successfully!');
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Failed to submit complaint. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-teal-700 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-100 flex flex-col">
      <Nav />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-center text-teal-700 mb-6">
            Register a Complaint
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" encType="multipart/form-data">
            {/* Full Name */}
            <div>
              <label className="block text-teal-600 mb-1">Full Name</label>
              <input
                type="text"
                {...register('name', { required: 'Full name is required' })}
                placeholder="Enter your name"
                className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 outline-none`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-teal-600 mb-1">Username (Email)</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Username (Email) is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: 'Please enter a valid email address',
                  }
                })}
                placeholder="Enter your email"
                className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 outline-none`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-teal-600 mb-1">Phone Number</label>
              <input
                type="tel"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Please enter a valid 10-digit phone number',
                  },
                })}
                placeholder="Enter your phone number"
                className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 outline-none`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            {/* Complaint Message */}
            <div>
              <label className="block text-teal-600 mb-1">Complaint</label>
              <textarea
                {...register('message', { required: 'Complaint message is required' })}
                rows="4"
                placeholder="Describe your complaint..."
                className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 outline-none`}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-teal-600 mb-1">Attach Image (Optional)</label>
              <input
                type="file"
                accept="image/*"
                {...register('image')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Submit */}
            <div className="text-center pt-2">
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                Submit Complaint
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-white text-center py-4 text-gray-500 text-sm border-t">
        &copy; 2025 Complaint Portal. All rights reserved.
      </footer>
    </div>
  );
}
