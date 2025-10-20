import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AdminLockerManagement = () => {
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // ADD THIS LINE
  const [editingLocker, setEditingLocker] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { user } = useAuth();

  const [newLocker, setNewLocker] = useState({
    locker_number: '',
    location: '',
    price_per_hour: '',
    status: 'available'
  });

  // Get auth headers for API calls
  const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  // Fetch all lockers
  const fetchLockers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/admin/lockers/', {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch lockers');
      }

      const data = await response.json();
      setLockers(data);
    } catch (err) {
      setError('Failed to load lockers: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLockers();
  }, []);

  // Update locker status - MODIFIED FUNCTION
  const updateLockerStatus = async (lockerId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/lockers/${lockerId}/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update locker status');
      }

      const updatedLocker = await response.json();
      
      // Update local state with the response from backend
      setLockers(prevLockers =>
        prevLockers.map(locker =>
          locker.id === lockerId ? updatedLocker : locker
        )
      );

      // ADD SUCCESS MESSAGE
      setSuccessMessage(`Locker ${updatedLocker.locker_number} status updated to ${newStatus}`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
    } catch (err) {
      setError('Failed to update locker: ' + err.message);
    }
  };

  // Add new locker - ALSO ADD SUCCESS MESSAGE HERE
  const addLocker = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/admin/lockers/', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          locker_number: newLocker.locker_number,
          location: newLocker.location,
          price_per_hour: parseFloat(newLocker.price_per_hour),
          status: newLocker.status
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add locker');
      }

      const addedLocker = await response.json();
      setLockers(prev => [...prev, addedLocker]);
      setShowAddForm(false);
      setNewLocker({
        locker_number: '',
        location: '',
        price_per_hour: '',
        status: 'available'
      });
      
      // ADD SUCCESS MESSAGE FOR ADDING LOCKER
      setSuccessMessage(`Locker ${addedLocker.locker_number} added successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
      setError('');
    } catch (err) {
      setError('Failed to add locker: ' + err.message);
    }
  };

  // Delete locker - ALSO ADD SUCCESS MESSAGE HERE
  const deleteLocker = async (lockerId) => {
    if (!window.confirm('Are you sure you want to delete this locker?')) {
      return;
    }

    try {
      const lockerToDelete = lockers.find(locker => locker.id === lockerId);
      
      const response = await fetch(`http://localhost:8000/api/admin/lockers/${lockerId}/`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to delete locker');
      }

      setLockers(prevLockers => prevLockers.filter(locker => locker.id !== lockerId));
      
      // ADD SUCCESS MESSAGE FOR DELETION
      setSuccessMessage(`Locker ${lockerToDelete.locker_number} deleted successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to delete locker: ' + err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading lockers...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Locker Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Add New Locker
        </button>
      </div>

      {/* ADD SUCCESS MESSAGE DISPLAY HERE */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
          <button 
            onClick={() => setSuccessMessage('')}
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button 
            onClick={() => setError('')}
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Add Locker Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Locker</h3>
            <form onSubmit={addLocker} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Locker Number *
                </label>
                <input
                  type="text"
                  required
                  value={newLocker.locker_number}
                  onChange={(e) => setNewLocker({...newLocker, locker_number: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., A101"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={newLocker.location}
                  onChange={(e) => setNewLocker({...newLocker, location: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Building A, Floor 1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Hour ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={newLocker.price_per_hour}
                  onChange={(e) => setNewLocker({...newLocker, price_per_hour: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={newLocker.status}
                  onChange={(e) => setNewLocker({...newLocker, status: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Add Locker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lockers Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Locker Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price/Hour
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lockers.map((locker) => (
              <tr key={locker.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {locker.locker_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {locker.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${locker.price_per_hour}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={locker.status}
                    onChange={(e) => updateLockerStatus(locker.id, e.target.value)}
                    className={`text-sm font-medium rounded-full px-3 py-1 ${getStatusColor(locker.status)} border-0 focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => deleteLocker(locker.id)}
                    className="text-red-600 hover:text-red-900 ml-4"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {lockers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No lockers found. Add your first locker to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLockerManagement;