import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

// ===== Icon set =====
const Icon = {
  Loading: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  ),
  Success: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  ),
  Error: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  ),
  Close: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2} d="M6 18L18 6M6 6l12 12"/>
    </svg>
  ),
  Add: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2} d="M12 4v16m8-8H4"/>
    </svg>
  ),
  Delete: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
    </svg>
  ),
  Locker: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
    </svg>
  ),
  Check: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2} d="M5 13l4 4L19 7"/>
    </svg>
  ),
  Warning: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
    </svg>
  )
};

// ===== UI helpers =====
const Accent = ({ children }) => (
  <span className="text-cyan-300/90 drop-shadow-[0_0_6px_rgba(34,211,238,.25)]">{children}</span>
);

const Card = ({ children, className = "" }) => (
  <div className={`group rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-7 backdrop-blur transition shadow-[0_10px_30px_rgba(0,0,0,.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,.35)] hover:border-cyan-300/40 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, status = 'available' }) => {
  const statusColors = {
    available: 'border-emerald-300/40 bg-emerald-300/10 text-emerald-200',
    occupied: 'border-rose-300/40 bg-rose-300/10 text-rose-200',
    maintenance: 'border-amber-300/40 bg-amber-300/10 text-amber-200'
  };

  const statusIcons = {
    available: <Icon.Check className="w-4 h-4" />,
    occupied: <Icon.Close className="w-4 h-4" />,
    maintenance: <Icon.Warning className="w-4 h-4" />
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${statusColors[status]} text-sm font-medium`}>
      {statusIcons[status]}
      {children}
    </span>
  );
};

const AdminLockerManagement = () => {
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const { user } = useAuth();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const [newLocker, setNewLocker] = useState({
    locker_number: '',
    location: '',
    price_per_hour: '',
    status: 'available'
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchLockers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/lockers/`, {
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

  const updateLockerStatus = async (lockerId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/lockers/${lockerId}/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update locker status');
      }

      const updatedLocker = await response.json();
      
      setLockers(prevLockers =>
        prevLockers.map(locker =>
          locker.id === lockerId ? updatedLocker : locker
        )
      );

      setSuccessMessage(`Locker ${updatedLocker.locker_number} status updated to ${newStatus}`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
    } catch (err) {
      setError('Failed to update locker: ' + err.message);
    }
  };

  const addLocker = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/lockers/`, {
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
      
      setSuccessMessage(`Locker ${addedLocker.locker_number} added successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
      setError('');
    } catch (err) {
      setError('Failed to add locker: ' + err.message);
    }
  };

  const deleteLocker = async (lockerId) => {
    if (!window.confirm('Are you sure you want to delete this locker?')) {
      return;
    }

    try {
      const lockerToDelete = lockers.find(locker => locker.id === lockerId);
      
      const response = await fetch(`${API_BASE_URL}/api/admin/lockers/${lockerId}/`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to delete locker');
      }

      setLockers(prevLockers => prevLockers.filter(locker => locker.id !== lockerId));
      
      setSuccessMessage(`Locker ${lockerToDelete.locker_number} deleted successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to delete locker: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen font-sans antialiased bg-[#080b1a] text-white selection:bg-cyan-300/30">
        {/* Background gradient + glow */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_10%,rgba(56,189,248,0.08),transparent),radial-gradient(40%_40%_at_10%_90%,rgba(147,51,234,0.18),transparent)]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b102b] via-[#14124d] to-[#1a0b2e] opacity-90" />
        </div>
        
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-lg text-white/80">Loading lockers...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans antialiased bg-[#080b1a] text-white selection:bg-cyan-300/30">
      {/* Background gradient + glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_10%,rgba(56,189,248,0.08),transparent),radial-gradient(40%_40%_at_10%_90%,rgba(147,51,234,0.18),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b102b] via-[#14124d] to-[#1a0b2e] opacity-90" />
      </div>

      <main>
        {/* Hero Section */}
        <section aria-labelledby="management-heading" className="relative overflow-hidden py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
              <div>
                <h1 id="management-heading" className="text-3xl sm:text-5xl/tight font-extrabold text-center sm:text-left">
                  Locker <Accent>Management</Accent>
                </h1>
                <p className="mt-4 text-white/80 text-base sm:text-lg max-w-xl text-center sm:text-left">
                  Manage and monitor all smart lockers in your system with real-time controls and analytics.
                </p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
              >
                <span className="flex items-center gap-2">
                  <Icon.Add className="w-5 h-5" />
                  Add New Locker
                </span>
              </button>
            </div>

            {/* Messages */}
            {successMessage && (
              <Card className="mb-6 bg-emerald-500/20 border-emerald-500/30 text-emerald-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon.Success className="w-5 h-5" />
                    {successMessage}
                  </div>
                  <button 
                    onClick={() => setSuccessMessage('')}
                    className="text-emerald-300 hover:text-white transition-colors"
                  >
                    <Icon.Close className="w-5 h-5" />
                  </button>
                </div>
              </Card>
            )}

            {error && (
              <Card className="mb-6 bg-rose-500/20 border-rose-500/30 text-rose-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon.Error className="w-5 h-5" />
                    {error}
                  </div>
                  <button 
                    onClick={() => setError('')}
                    className="text-rose-300 hover:text-white transition-colors"
                  >
                    <Icon.Close className="w-5 h-5" />
                  </button>
                </div>
              </Card>
            )}

            {/* Add Locker Form Modal */}
            {showAddForm && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <Card className="max-w-md w-full">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-white/70 text-sm">Create New Locker</p>
                      <p className="text-white font-semibold">Add to System</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" aria-hidden></span>
                      Admin Access
                    </span>
                  </div>
                  
                  <form onSubmit={addLocker} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Locker Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={newLocker.locker_number}
                        onChange={(e) => setNewLocker({...newLocker, locker_number: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="e.g., A101"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={newLocker.location}
                        onChange={(e) => setNewLocker({...newLocker, location: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="e.g., Building A, Floor 1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Price per Hour ($) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        value={newLocker.price_per_hour}
                        onChange={(e) => setNewLocker({...newLocker, price_per_hour: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Status
                      </label>
                      <select
                        value={newLocker.status}
                        onChange={(e) => setNewLocker({...newLocker, status: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
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
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 border border-white/10"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Add Locker
                      </button>
                    </div>
                  </form>
                </Card>
              </div>
            )}

            {/* Lockers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {lockers.map((locker) => (
                <Card key={locker.id}>
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{locker.locker_number}</h3>
                      <p className="text-white/60 text-sm mt-1">{locker.location}</p>
                    </div>
                    <Badge status={locker.status}>
                      {locker.status.charAt(0).toUpperCase() + locker.status.slice(1)}
                    </Badge>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <p className="text-white/60 text-sm">Price per hour</p>
                    <p className="text-2xl font-bold text-cyan-400">${locker.price_per_hour}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <select
                      value={locker.status}
                      onChange={(e) => updateLockerStatus(locker.id, e.target.value)}
                      className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      <option value="available">Available</option>
                      <option value="occupied">Occupied</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                    
                    <button
                      onClick={() => deleteLocker(locker.id)}
                      className="text-rose-400 hover:text-rose-300 p-2 rounded-lg hover:bg-rose-500/20 transition-colors"
                      title="Delete locker"
                    >
                      <Icon.Delete className="w-5 h-5" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {lockers.length === 0 && (
              <Card className="text-center py-16">
                <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon.Locker className="w-12 h-12 text-white/40" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No lockers found</h3>
                <p className="text-white/60 mb-6">Add your first locker to get started with SmartLockers</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Create First Locker
                </button>
              </Card>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminLockerManagement;