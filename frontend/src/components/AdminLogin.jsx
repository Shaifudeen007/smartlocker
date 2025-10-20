import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// ===== Icon set =====
const Icon = {
  User: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  ),
  Lock: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
    </svg>
  ),
  Login: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
    </svg>
  ),
  Admin: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
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
  Shield: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
    </svg>
  )
};

// ===== UI helpers =====
const Accent = ({ children }) => (
  <span className="text-red-300/90 drop-shadow-[0_0_6px_rgba(239,68,68,.25)]">{children}</span>
);

const Card = ({ children, className = "" }) => (
  <div className={`group rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-7 backdrop-blur transition shadow-[0_10px_30px_rgba(0,0,0,.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,.35)] hover:border-red-300/40 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80">
    {children}
  </span>
);

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userData = await login(credentials);
      
      // Check if the logged-in user is admin
      if (userData.user && userData.user.is_admin) {
        navigate('/admin/lockers');
      } else {
        setError('Access denied. Admin privileges required.');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleRegularLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen font-sans antialiased bg-[#080b1a] text-white selection:bg-red-300/30">
      {/* Background gradient + glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_10%,rgba(239,68,68,0.08),transparent),radial-gradient(40%_40%_at_10%_90%,rgba(147,51,234,0.18),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b102b] via-[#1a0b2e] to-[#2d0b1a] opacity-90" />
      </div>

      {/* Skip link for a11y */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-red-300 focus:text-black focus:px-3 focus:py-2 focus:rounded">
        Skip to content
      </a>

      {/* Sticky Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-red-500 to-purple-600 shadow-lg shadow-red-500/20" aria-hidden />
            <div className="leading-tight">
              <p className="text-white font-bold tracking-wide">SmartLockers</p>
              <p className="text-xs text-white/60">Admin System</p>
            </div>
          </div>
          <nav aria-label="Primary" className="hidden md:flex items-center gap-7 text-sm">
            <a className="text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 rounded" href="#features">Management</a>
            <a className="text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 rounded" href="#security">Security</a>
            <a className="text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 rounded" href="#analytics">Analytics</a>
          </nav>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleRegularLoginRedirect}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 text-white px-4 py-2 hover:border-red-300/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 text-sm"
            >
              User Login
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Hero Admin Login Section */}
        <section aria-labelledby="admin-login-heading" className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="text-center lg:text-left">
                <Badge>
                  <Icon.Shield className="w-4 h-4" /> Admin Access Only
                </Badge>
                <h1 id="admin-login-heading" className="mt-5 text-3xl sm:text-5xl/tight font-extrabold text-center lg:text-left">
                  Admin <Accent>Control Panel</Accent>
                </h1>
                <p className="mt-4 text-white/80 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                  Access the complete facility management dashboard with advanced controls and real-time analytics.
                  Built for <strong className="text-white">system administrators</strong> and <strong className="text-white">facility managers</strong>.
                </p>
                <div className="mt-6 flex items-center gap-6 justify-center lg:justify-start">
                  <span className="text-white/60 text-sm">Admin Features</span>
                  <div className="flex items-center gap-4 text-white/70">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-sm">Full Control</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-sm">Real-time Analytics</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Login Form Card */}
              <Card className="lg:ml-auto">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-white/70 text-sm">Admin Authentication</p>
                    <p className="text-white font-semibold">System Control Panel</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-red-300/40 bg-red-300/10 px-3 py-1 text-xs font-semibold text-red-200">
                    <span className="h-2 w-2 rounded-full bg-red-400 inline-block" aria-hidden></span>
                    Restricted
                  </span>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {error && (
                    <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl flex items-center gap-3">
                      <Icon.Error className="w-5 h-5 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Admin Username
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all pl-11"
                          placeholder="Enter admin username"
                          value={credentials.username}
                          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                        />
                        <Icon.User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Admin Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all pl-11"
                          placeholder="Enter admin password"
                          value={credentials.password}
                          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        />
                        <Icon.Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-400 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <Icon.Loading className="animate-spin w-5 h-5 text-white" />
                        Authenticating...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Icon.Shield className="w-5 h-5" />
                        Access Admin Panel
                      </span>
                    )}
                  </button>
                </form>

                {/* Links Section */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="text-center space-y-4">
                    <p className="text-white/60 text-sm">
                      Regular user?{" "}
                      <button
                        onClick={handleRegularLoginRedirect}
                        className="text-red-400 hover:text-red-300 font-medium transition-colors"
                      >
                        Switch to user login
                      </button>
                    </p>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-transparent text-white/40">System Access</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-white/40 text-sm flex items-center justify-center gap-2">
                        <Icon.Shield className="w-4 h-4" />
                        Restricted access - Authorized personnel only
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500 to-purple-600" aria-hidden />
            <p className="text-white/70 text-sm">© {new Date().getFullYear()} SmartLockers Admin. All rights reserved.</p>
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

export default AdminLogin;