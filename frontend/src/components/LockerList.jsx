import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LockerCard from './LockerCard';

const LockerList = () => {
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, getAuthHeaders } = useAuth();

  // Fetch available lockers for users
  const fetchLockers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/lockers/', {
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

  // Add auto-refresh to see real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLockers();
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle locker reservation
  const handleReserveLocker = async (lockerId, duration) => {
    try {
      const response = await fetch('http://localhost:8000/api/lockers/${lockerId}/reserve/', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ duration: duration })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to reserve locker');
      }

      // Refresh the locker list to show updated status
      await fetchLockers();
      alert('Locker reserved successfully!');
    } catch (err) {
      alert('Reservation failed: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading available lockers...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Lockers</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lockers.map(locker => (
          <LockerCard 
            key={locker.id} 
            locker={locker} 
            onReserve={handleReserveLocker}
          />
        ))}
      </div>

      {lockers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No lockers available at the moment. Please check back later.
        </div>
      )}

      <div className="text-center mt-8 text-sm text-gray-500">
        <p>Lockers update automatically every 10 seconds</p>
      </div>
    </div>
  );
};

export default LockerList;