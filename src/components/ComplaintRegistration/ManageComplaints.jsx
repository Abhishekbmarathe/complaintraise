import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../Modules/Api';

const statusOptions = ['Created', 'Open', 'In Progress', 'Resolved'];

const statusColor = {
    'Created': 'text-blue-500',
    'Open': 'text-red-500',
    'Resolved': 'text-green-600',
    'In Progress': 'text-yellow-500',
};

const ManageComplaints = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get(api + 'complain', {
                    params: { page: 0 },
                });
                if (response.data && response.data.status) {
                    console.log("complaints== ", response.data.result)
                    setComplaints(response.data.result);
                }
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };

        fetchComplaints();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`${api}complain/${id}`, { progress: newStatus });
            setComplaints((prev) =>
                prev.map((c) =>
                    c.id === id ? { ...c, progress: newStatus } : c
                )
            );
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    const handleDelete = async (id, image1, image2, image3) => {
        const cnf = confirm("Are you sure to delete?");
        const token = sessionStorage.getItem('TOKEN');
        const user = JSON.parse(sessionStorage.getItem('USER'));
        const username = user?.username;
      
        const requestData = {
          id,
          image1,
          image2,
          image3,
        };
      
        const requestHeaders = {
          "Content-Type": "application/json", // ✅ Add this!
          TOKEN: token,
          USERNAME: username,
        };
      
        console.log("🛰️ API Endpoint:", `${api}complain`);
        console.log("📦 Data being sent:", requestData);
        console.log("🧾 Headers being sent:", requestHeaders);
      
        if (cnf) {
          try {
            const response = await axios.delete(`${api}complain`, {
              headers: requestHeaders,
              data: requestData,
            });
      
            if (response.data.status === true) {
              setComplaints((prev) => prev.filter((c) => c.id !== id));
            } else {
              console.warn('Failed to delete complaint:', response.data.message || 'Unknown error');
            }
          } catch (err) {
            console.error('❌ Error deleting complaint:', err);
          }
        }
      };
      
      
      

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">Manage Complaints</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {complaints.map((complaint) => (
                    <div
                        key={complaint.id}
                        className="bg-white border rounded-xl p-5 shadow-sm relative"
                    >
                        <div className="flex gap-4">
                            <div className="flex gap-2 overflow-x-auto">
                                {[complaint.image1, complaint.image2, complaint.image3]
                                    .filter(Boolean)
                                    .map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`complaint-img-${index}`}
                                            className="w-24 h-24 object-cover rounded-md border"
                                        />
                                    ))}
                            </div>

                            <div className="flex-1">
                                <h2 className="text-xl font-semibold">{complaint.title}</h2>
                                <p className="text-sm text-gray-600">{complaint.description}</p>
                                <p className="text-sm text-gray-500 mt-2">Location: {complaint.location}</p>
                                <p className="text-sm text-gray-500">By: {complaint.username}</p>

                                <div className="mt-4 flex justify-between items-center">
                                    <select
                                        value={complaint.progress || 'Created'}
                                        onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                                        className={`px-2 py-1 border rounded-md text-sm ${statusColor[complaint.progress] || 'text-gray-500'}`}
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() =>
                                            handleDelete(complaint.id, complaint.image1, complaint.image2, complaint.image3)
                                        }
                                        className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {complaints.length === 0 && (
                    <p className="text-center text-gray-500 col-span-2">
                        No complaints available.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ManageComplaints;
