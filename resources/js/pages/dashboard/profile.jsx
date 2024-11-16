import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import img from '../../../img/vector.png';
import axios from 'axios';
import EditOrganization from './EditOrganization';
import OrganizationDetails from './OrganizationDetails';

export function Profile() {
  const [organizations, setOrganizations] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [formData, setFormData] = useState({
    date_signed_up: '',
  });

  useEffect(() => {
    axios
      .get('/api/organizations')
      .then((response) => setOrganizations(response.data))
      .catch((error) => console.error('Error fetching organizations:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/organizations', formData);
      alert(response.data.message);
      setFormData({
        date_signed_up: '',
      });
      setIsOpen(false);
      axios
        .get('/api/organizations')
        .then((response) => setOrganizations(response.data));
    } catch (error) {
      console.error('Error adding organization:', error);
      alert('Failed to add organization');
    }
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
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center px-8 py-4 rounded-full hover:bg-yellow-300"
          style={{ backgroundColor: '#fff2d4', color: '#fc8c11' }}
        >
          <PlusIcon className="h-5 w-5 mr-2 text-orange-500" />
          Add New
        </button>
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
                  <p className="text-gray-500 text-sm mt-3">{org.location || 'Location not specified'}</p>
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

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Add Organization
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                      <label className="block text-gray-700">Date Signed Up</label>
                      <input
                        type="date"
                        name="date_signed_up"
                        value={formData.date_signed_up}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Company Name</label>
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Contact Email</label>
                      <input
                        type="email"
                        name="contact_email"
                        value={formData.contact_email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Contact Phone</label>
                      <input
                        type="text"
                        name="contact_phone"
                        value={formData.contact_phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Monthly Plan</label>
                      <select
                        name="monthly_plan"
                        value={formData.monthly_plan}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Active">Active</option>
                        <option value="Expired">Expired</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 px-4 text-white font-semibold rounded-lg bg-orange-500 hover:bg-orange-600"
                    >
                      Submit
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default Profile;
