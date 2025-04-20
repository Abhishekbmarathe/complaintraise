import React from 'react';
import Nav from '../Nav';
import Foot from '../Footer';

const complaints = [
  {
    id: 1,
    title: 'Water Leakage',
    description: 'There is a water leakage in the bathroom on the 3rd floor.',
    time: '10:30 AM',
    day: 'Monday',
    status: 'Open',
  },
  {
    id: 2,
    title: 'Broken Window',
    description: 'A window in room 204 is broken and needs immediate attention.',
    time: '02:45 PM',
    day: 'Tuesday',
    status: 'Resolved',
  },
  {
    id: 3,
    title: 'Internet Not Working',
    description: 'WiFi has been down since morning in Block A.',
    time: '09:00 AM',
    day: 'Wednesday',
    status: 'In Progress',
  },
  {
    id: 4,
    title: 'AC Not Cooling',
    description: 'The AC in the conference room is not cooling properly.',
    time: '11:15 AM',
    day: 'Thursday',
    status: 'Open',
  },
];

const statusColor = {
  Open: 'text-red-500',
  Resolved: 'text-green-600',
  'In Progress': 'text-yellow-500',
};

const Landing = () => {
  return (
    <div className='h-screen'>
      <Nav />

      <div className="w-4/5 m-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">All Registered Complaints</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="border border-gray-300 p-5 rounded-xl shadow hover:shadow-md transition duration-300 flex gap-6 items-start"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                IMG
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{complaint.title}</h2>
                <p className="text-gray-700">{complaint.description}</p>
                <div className="flex justify-between items-center mt-4 text-sm text-gray-600 font-medium">
                  <span>{complaint.time}</span>
                  <span>{complaint.day}</span>
                  <span className={statusColor[complaint.status]}>{complaint.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Foot />
    </div>
  );
};

export default Landing;
