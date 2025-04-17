import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../Nav';
import Foot from '../Footer';

export default function CompReg() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '', image: null });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formPayload = new FormData();
        formPayload.append('name', formData.name);
        formPayload.append('email', formData.email);
        formPayload.append('message', formData.message);
        if (formData.image) {
            formPayload.append('image', formData.image);
        }

        try {
            await axios.post('http://localhost:3000/api/complaints', formPayload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData({ name: '', email: '', message: '', image: null });
        } catch (error) {
            console.error('Error submitting complaint:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Navbar */}
            <Nav />

            {/* Main Content */}
            <main className="flex-grow p-4 grid md:grid-cols-1 gap-6">
                {/* Complaint Form */}
                <div className="bg-white p-6 rounded-2xl shadow-md w-1/2 m-auto">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Post a Complaint</h2>
                    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                        <div>
                            <label className="block text-gray-600 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1">Complaint</label>
                            <textarea
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full border border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Describe your complaint..."
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1">Upload Image (optional)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full border border-gray-500 rounded-lg px-4 py-2"
                            />
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
                            >
                                Submit Complaint
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            {/* Footer */}
            <Foot/>
        </div>
    );
}