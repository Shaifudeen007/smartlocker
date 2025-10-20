import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LockerCard from './LockerCard';

const LockerList = () => {
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, getAuthHeaders } = useAuth();

  // Add API base URL constant
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  // Fetch available lockers for users
  const fetchLockers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/lockers/`, {
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
      const response = await fetch(`${API_BASE_URL}/api/lockers/${lockerId}/reserve/`, {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-white/80">Loading available lockers...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Available <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Lockers</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Browse and reserve secure smart lockers in real-time. All lockers include 24/7 monitoring and instant access.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{lockers.length}</div>
            <div className="text-white/60 text-sm">Total Available</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-2">
              {lockers.filter(l => l.status === 'available').length}
            </div>
            <div className="text-white/60 text-sm">Ready to Reserve</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">
              {lockers.filter(l => l.status === 'occupied').length}
            </div>
            <div className="text-white/60 text-sm">Currently in Use</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
            <div className="text-white/60 text-sm">Access Available</div>
          </div>
        </div>

        {/* Lockers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lockers.map(locker => (
            <LockerCard 
              key={locker.id} 
              locker={locker} 
              onReserve={handleReserveLocker}
            />
          ))}
        </div>

        {/* Empty State */}
        {lockers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No lockers available</h3>
            <p className="text-white/60 mb-6">All lockers are currently occupied. Please check back later.</p>
            <button
              onClick={fetchLockers}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Now
            </button>
          </div>
        )}

        {/* Auto-refresh Notice */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-white/60 text-sm">Live updates every 10 seconds</span>
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockerList;