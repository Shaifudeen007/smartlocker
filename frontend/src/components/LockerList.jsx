import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LockerCard from './LockerCard';

// ===== Icon set =====
const Icon = {
  Refresh: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
    </svg>
  ),
  Error: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  ),
  Loading: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  ),
  Locker: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
    </svg>
  ),
  Lightning: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
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

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80">
    {children}
  </span>
);

const LockerList = () => {
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, getAuthHeaders } = useAuth();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

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

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLockers();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

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

      await fetchLockers();
      alert('Locker reserved successfully!');
    } catch (err) {
      alert('Reservation failed: ' + err.message);
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
            <div className="text-lg text-white/80">Loading available lockers...</div>
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

      {/* Skip link for a11y */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-cyan-300 focus:text-black focus:px-3 focus:py-2 focus:rounded">
        Skip to content
      </a>

      {/* Sticky Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/20" aria-hidden />
            <div className="leading-tight">
              <p className="text-white font-bold tracking-wide">SmartLockers</p>
              <p className="text-xs text-white/60">Available Lockers</p>
            </div>
          </div>
          <nav aria-label="Primary" className="hidden md:flex items-center gap-7 text-sm">
            <a className="text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded" href="#features">Features</a>
            <a className="text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded" href="#security">Security</a>
            <a className="text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded" href="#support">Support</a>
          </nav>
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchLockers}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 text-white px-4 py-2 hover:border-cyan-300/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 text-sm"
            >
              <Icon.Refresh className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Hero Section */}
        <section aria-labelledby="lockers-heading" className="relative overflow-hidden py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge>
                <Icon.Lightning className="w-4 h-4" /> Real-time Availability
              </Badge>
              <h1 id="lockers-heading" className="mt-5 text-3xl sm:text-5xl/tight font-extrabold text-center">
                Available <Accent>SmartLockers</Accent>
              </h1>
              <p className="mt-4 text-white/80 text-base sm:text-lg max-w-2xl mx-auto text-center">
                Browse and reserve secure smart lockers with real-time monitoring and instant access.
                Built for <strong className="text-white">modern users</strong> and <strong className="text-white">business professionals</strong>.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-8 bg-rose-500/20 border border-rose-500/30 text-rose-300 px-4 py-3 rounded-xl flex items-center gap-3">
                <Icon.Error className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">{lockers.length}</div>
                <div className="text-white/60 text-sm">Total Lockers</div>
              </Card>
              <Card className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {lockers.filter(l => l.status === 'available').length}
                </div>
                <div className="text-white/60 text-sm">Ready to Reserve</div>
              </Card>
              <Card className="text-center">
                <div className="text-3xl font-bold text-amber-400 mb-2">
                  {lockers.filter(l => l.status === 'occupied').length}
                </div>
                <div className="text-white/60 text-sm">Currently in Use</div>
              </Card>
              <Card className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                <div className="text-white/60 text-sm">Access Available</div>
              </Card>
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
              <Card className="text-center py-16">
                <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon.Locker className="w-12 h-12 text-white/40" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No lockers available</h3>
                <p className="text-white/60 mb-6">All lockers are currently occupied. Please check back later.</p>
                <button
                  onClick={fetchLockers}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  <Icon.Refresh className="w-5 h-5" />
                  Refresh Now
                </button>
              </Card>
            )}

            {/* Auto-refresh Notice */}
            <div className="text-center mt-12">
              <Badge>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                Live updates every 10 seconds
                <Icon.Lightning className="w-4 h-4 text-emerald-400" />
              </Badge>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500" aria-hidden />
            <p className="text-white/70 text-sm">© {new Date().getFullYear()} SmartLockers. All rights reserved.</p>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <a className="text-white/70 hover:text-white" href="#">Terms</a>
            <a className="text-white/70 hover:text-white" href="#">Privacy</a>
            <a className="text-white/70 hover:text-white" href="#">Support</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LockerList;