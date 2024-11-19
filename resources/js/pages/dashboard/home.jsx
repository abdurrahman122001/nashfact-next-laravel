import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from "@material-tailwind/react";
import { UserGroupIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { FiTrendingUp } from 'react-icons/fi';

export function Home() {
  const [organizationCount, setOrganizationCount] = useState(0);
  const [organizations, setOrganizations] = useState([]);

  // Fetch organization count data
  useEffect(() => {
    axios.get('/api/organizations/count')
      .then(response => {
        setOrganizationCount(response.data.count);
      })
      .catch(error => console.error('Error fetching organization count:', error));
  }, []);

  useEffect(() => {
    axios.get('/api/organizations')
      .then(response => setOrganizations(response.data))
      .catch(error => console.error('Error fetching organizations:', error));
  }, []);

  // Custom card layout component
  const CustomCard = ({ icon, title, value, animationDelay }) => (
    <div
      className="flex justify-center items-center"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="relative flex flex-col items-center justify-center bg-white py-7 px-4 rounded-lg shadow-lg h-36 animate-fadeIn" style={{ borderRadius: '30px', height: '170px', width: '80%' }}>
        {/* Upper icon and title - positioned at the top-left */}
        <div className="absolute top-3 left-3 flex items-center space-x-3">
          <div className="p-3 rounded-md bg-yellow-100 flex items-center justify-center ml-4" style={{ color: 'black' }}>
            {React.createElement(icon, { className: "w-6 h-6 text-black-600" })}
          </div>
          <Typography className="font-medium text-gray-700 text-sm">{title}</Typography>
        </div>

        {/* Value section - centered vertically and horizontally */}
        <div className="flex items-center justify-center mt-auto">
          <FiTrendingUp className="w-5 h-5 text-green-500 mr-2" />
          <Typography style={{ fontSize: '30px', fontFamily: 'Poppins' }} className="text-xl font-bold text-black">
            {value}
          </Typography>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-12">
      {/* Custom Statistics Cards */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <CustomCard
          icon={UserGroupIcon}
          title="Total Organizations"
          value={organizationCount}
          animationDelay={0.1}
        />
        <CustomCard
          icon={UserPlusIcon}
          title="New Sign Ups"
          value={0} // Static value
          animationDelay={0.3}
        />
        <CustomCard
          icon={UserGroupIcon}
          title="Active Users"
          value={0} // Static value
          animationDelay={0.5}
        />
      </div>
      <h1>Hello world</h1>

      <div style={{ width: '80%', marginLeft: '60px' }}>
        <h2 className="text-lg animate-fadeInUp font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins' }}>Recent</h2>
      </div>
      <div className="flex justify-center items-center animate-fadeInUp">
        <div className="p-6 bg-white rounded-lg shadow-md mb-10" style={{ width: '92%' }}>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 rounded-lg shadow">
              <thead style={{ backgroundColor: '#f4f4f4', fontFamily: 'Poppins', fontSize: '12px', color: '#161616' }}>
                <tr>
                  <th className="py-3 px-6 border-b font-medium text-gray-600 text-left">Organization Name</th>
                  <th className="py-3 px-6 border-b font-medium text-gray-600 text-left">Date Signed Up</th>
                  <th className="py-3 px-6 border-b font-medium text-gray-600 text-left">Contact</th>
                  <th className="py-3 px-6 border-b font-medium text-gray-600 text-left">Monthly Plan</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: 'white', fontFamily: 'Poppins', fontSize: '14px', color: '#161616' }}>
                {organizations.map((org, index) => (
                  <tr key={index} className="text-gray-700 text-sm">
                    <td className="py-3 px-6 border-b">{org.company_name}</td>
                    <td className="py-3 px-6 border-b">{new Date(org.date_signed_up).toLocaleDateString()}</td>
                    <td className="py-3 px-6 border-b">{org.contact_email}</td>
                    <td className="py-3 px-6 border-b">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${org.monthly_plan === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                        org.monthly_plan === 'Active' ? 'bg-green-100 text-green-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                        {org.monthly_plan}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
