import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../Nav';
import Foot from '../Footer';
import api from '../Modules/Api';
import Loader from '../../assets/Loader';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const statusColor = {
  'Created': 'text-cyan-500 border-cyan-500',
  'Open': 'text-red-500 border-red-500',
  'Resolved': 'text-green-600 border-green-600',
  'In Progress': 'text-yellow-500 border-yellow-500',
};

const statuses = ['All', 'Created', 'Open', 'In Progress', 'Resolved'];

const Landing = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [imageIndices, setImageIndices] = useState({});

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(api + 'complain', {
          params: { page: 0 },
        });
        if (response.data && response.data.status) {
          setComplaints(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const filteredComplaints =
    selectedStatus === 'All'
      ? complaints
      : complaints.filter((c) => c.progress === selectedStatus);

  const handleImageToggle = (id, direction, imagesLength) => {
    setImageIndices((prev) => {
      const currentIndex = prev[id] || 0;
      const newIndex =
        direction === 'next'
          ? (currentIndex + 1) % imagesLength
          : (currentIndex - 1 + imagesLength) % imagesLength;
      return { ...prev, [id]: newIndex };
    });
  };

  return (
    <div className='min-h-screen flex flex-col bg-gray-200'>
      <Nav />

      <div className="w-4/5 m-auto py-10 flex-grow">
        <h1 className="text-3xl font-bold text-left mb-8">All Registered Complaints</h1>

        <div className="flex items-center gap-1 mt-4 mb-6 flex-wrap">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1 rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-400 transition ${
                selectedStatus === status
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint) => {
                const images = [complaint.image1, complaint.image2, complaint.image3].filter(Boolean);
                const currentImage = images[imageIndices[complaint.id] || 0] || 'https://via.placeholder.com/100';

                return (
                  <div
                    key={complaint.id}
                    className="bg-white p-0 rounded-3xl shadow overflow-hidden flex flex-col md:flex-row"
                  >
                    <div className="md:w-72 h-72 relative flex items-center justify-center bg-black/10">
                      <img
                        src={currentImage}
                        alt="complaint"
                        className="w-full aspect-square object-cover rounded-l-2xl"
                      />
                      {images.length > 1 && (
                        <div className="absolute bottom-2 flex items-center gap-4 bg-white/80 px-3 py-1 rounded-full">
                          <button onClick={() => handleImageToggle(complaint.id, 'prev', images.length)}>
                            <ChevronLeft size={20} />
                          </button>
                          <button onClick={() => handleImageToggle(complaint.id, 'next', images.length)}>
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">{complaint.title}</h2>
                        <p className="text-gray-600 mb-4 whitespace-pre-wrap">{complaint.description}</p>
                        <p className="text-sm text-gray-700 mb-1 flex items-center gap-1">
                          <span className="inline-block">📍</span>
                          {complaint.location}
                        </p>
                        <p className="text-sm text-gray-700 mb-4">By : {complaint.username}</p>
                      </div>
                      <div className={`text-base font-semibold mt-auto pt-2  ${
                        statusColor[complaint.progress]?.split(' ').pop()
                      } ${statusColor[complaint.progress]?.split(' ')[0]}`}>{complaint.progress}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500 col-span-2">No complaints found.</p>
            )}
          </div>
        )}
      </div>

      <Foot />
    </div>
  );
};

export default Landing;
