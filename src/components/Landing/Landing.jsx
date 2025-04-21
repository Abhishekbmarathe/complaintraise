import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../Nav';
import Foot from '../Footer';
import api from '../Modules/Api';

const statusColor = {
  'Created': 'text-blue-500',
  'Open': 'text-red-500',
  'Resolved': 'text-green-600',
  'In Progress': 'text-yellow-500',
};

const Landing = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(api + 'complain', {
          params: { page: 0 },
        });
        console.log(response.data);
        if (response.data && response.data.status) {
          setComplaints(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className='min-h-screen flex flex-col'>
      <Nav />

      <div className="w-4/5 m-auto py-10 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-8">All Registered Complaints</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {complaints.length > 0 ? (
            complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="border border-gray-300 p-5 rounded-xl shadow hover:shadow-md transition duration-300 flex gap-6 items-start"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={complaint.image1 || 'https://via.placeholder.com/100'}
                    alt="complaint"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">{complaint.title}</h2>
                  <p className="text-gray-700 mb-1">{complaint.description}</p>
                  <p className="text-sm text-gray-500 mb-1">Location: {complaint.location}</p>
                  <p className="text-sm text-gray-500 mb-2">By: {complaint.username}</p>
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className={statusColor[complaint.progress] || 'text-gray-400'}>
                      {complaint.progress}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-2">No complaints found.</p>
          )}
        </div>
      </div>

      <Foot/>
    </div>
    
  
  );
};

export default Landing;
