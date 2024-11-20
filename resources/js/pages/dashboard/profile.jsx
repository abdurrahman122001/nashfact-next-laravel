import React, { useState, useEffect } from 'react';
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import img from '../../../img/vector.png';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // For navigation

import EditOrganization from './EditOrganization';
import OrganizationDetails from './OrganizationDetails';

export function Profile() {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = () => {
    axios
      .get('/api/organizations')
      .then((response) => setOrganizations(response.data))
      .catch((error) => console.error('Error fetching organizations:', error));
  };

  const handleEditClick = (e, org) => {
    e.stopPropagation(); // Prevent organization click
    setSelectedOrg({ ...org, mode: 'edit' }); // Set selected org with edit mode
  };

  const handleDetailsClick = (org) => {
    setSelectedOrg({ ...org, mode: 'details' }); // Set selected org with details mode
  };

  const handleSave = async (updatedOrg) => {
    try {
      await axios.put(`/api/organizations/${updatedOrg.id}`, updatedOrg);
      setOrganizations((prevOrgs) =>
        prevOrgs.map((org) => (org.id === updatedOrg.id ? updatedOrg : org))
      );
      setSelectedOrg(null);
    } catch (error) {
      console.error('Error updating organization:', error);
      alert('Failed to update organization');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Organizations</h2>
        <Link to="/dashboard/AddOrganization">
          <button
            className="flex items-center px-8 py-4 rounded-full hover:bg-yellow-300"
            style={{ backgroundColor: '#fff2d4', color: '#fc8c11' }}
          >
            <PlusIcon className="h-5 w-5 mr-2 text-orange-500" />
            Add New
          </button>
        </Link>
      </div>
      <p className="text-gray-500 mb-6">Manage all organization details and organization hierarchy</p>

      {selectedOrg ? (
        selectedOrg.mode === 'edit' ? (
          <EditOrganization
            organization={selectedOrg}
            onBack={() => setSelectedOrg(null)}
            onSave={handleSave}
          />
        ) : (
          <OrganizationDetails
            organization={selectedOrg}
            onBack={() => setSelectedOrg(null)}
          />
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {organizations.map((org, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-lg relative border border-gray-200 cursor-pointer"
              style={{ height: '180px' }}
              onClick={() => handleDetailsClick(org)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2 mb-1">
                    <img src={img} style={{ height: '25px' }} alt="Organization Icon" />
                    <h3 className="text-xl font-semibold text-gray-800">{org.company_name}</h3>
                  </div>
                  <p className="text-gray-500 text-sm mt-3">{org.address || 'Location not specified'}</p>
                </div>
                <PencilSquareIcon
                  className="h-6 w-6 text-orange-500 cursor-pointer"
                  onClick={(e) => handleEditClick(e, org)}
                />
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-2 mt-10">
                <div>
                  Date Signed Up:{' '}
                  <span className="font-medium">
                    {new Date(org.date_signed_up).toLocaleDateString('en-CA')}
                  </span>
                </div>
                <div>
                  Monthly Plan:{' '}
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-white ${org.monthly_plan === 'Active' ? 'bg-green-500' : 'bg-red-400'
                      }`}
                  >
                    {org.monthly_plan}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
