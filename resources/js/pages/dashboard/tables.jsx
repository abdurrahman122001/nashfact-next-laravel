// Tables.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rectange from '../../../img/Rectangle.png';
import Profile from '../../../img/profile.png';
import EditProfile from './EditProfile';

export function Tables() {
  const [admin, setAdmin] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/admins/2')
      .then(response => {
        setAdmin(response.data);
      })
      .catch(error => console.error("There was an error fetching the data:", error));
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedData) => {
    setAdmin(updatedData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isEditing ? (
        <EditProfile
          admin={admin}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
        />
      ) : (
        <><div className="profile-container w-full p-10 flex flex-col md:flex-row items-start justify-start space-x-8">
            {/* Left Column: Profile Image and Info */}
            <div className="rounded-lg mb-4 pb-8 shadow-md bg-white" style={{width: '20%'}}>
              <img
                src={Rectange}
                alt="Organization Logo"
                className="w-full rounded-t-lg mb-2 h-32 object-cover" />
              <div className="flex flex-col items-center">
                <div className="p-2 rounded-full -mt-8 z-10">
                  <img src={Profile} alt="Logo Icon" className="h-10 w-10" />
                </div>
                <p style={{fontFamily: 'Poppins'}} className="text-center font-semibold text-lg mt-2">{admin.name || 'Admin Name'}</p>
                <p style={{fontFamily: 'Poppins'}} className="text-center text-gray-500">{admin.designation || 'Designation'}</p>
              </div>
            </div>

            {/* Right Column: Profile Details */}
            <div className="profile-details flex-1 bg-white rounded-lg p-10 shadow-md" style={{width: '80%'}}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{fontFamily: 'Poppins'}} className="block font-semibold text-gray-600">Name</label>
                  <p style={{fontFamily: 'Poppins'}} className="mt-1">{admin.name}</p>
                </div>
                <div>
                  <label style={{fontFamily: 'Poppins'}} className="block font-semibold text-gray-600">Designation</label>
                  <p style={{fontFamily: 'Poppins'}} className="mt-1">{admin.designation}</p>
                </div>
                <div>
                  <label style={{fontFamily: 'Poppins'}} className="block font-semibold text-gray-600">Email</label>
                  <p style={{fontFamily: 'Poppins'}} className="mt-1">{admin.email}</p>
                </div>
                <div>
                  <label style={{fontFamily: 'Poppins'}} className="block font-semibold text-gray-600">Phone Number</label>
                  <p style={{fontFamily: 'Poppins'}} className="mt-1">{admin.phone_no}</p>
                </div>
                <div className="col-span-2">
                  <label style={{fontFamily: 'Poppins'}} className="block font-semibold text-gray-600">Address</label>
                  <p style={{fontFamily: 'Poppins'}} className="mt-1">{admin.address}</p>
                </div>
              </div>
            </div>

          </div><div className="text-right">
              <button
                className="text-white px-12 py-6 rounded-full hover:bg-yellow-600 transition mr-5"
                style={{backgroundColor: '#fc8c11'}}
                onClick={handleEdit}
              >
                Edit Profile
              </button>
            </div></>
      )}

    </div>

  );
}


export default Tables;
