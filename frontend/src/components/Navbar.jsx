import React from 'react';
import { useAuth } from '../contexts/AuthContext';

// ===== Icon set =====
const Icon = {
  Locker: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
    </svg>
  ),
  Logout: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
    </svg>
  ),
  User: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  )
};

// ===== UI helpers =====
const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 ${className}`}>
    {children}
  </span>
);

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/20" aria-hidden>
            <Icon.Locker className="w-5 h-5 text-white m-2" />
          </div>
          <div className="leading-tight">
            <p className="text-white font-bold tracking-wide">SmartLockers</p>
            <p className="text-xs text-white/60">Secure Storage Solutions</p>
          </div>
        </div>
        
        {/* User Info & Actions */}
        <div className="flex items-center space-x-4">
          {user && (
            <div className="flex items-center gap-4">
              {/* User Info */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <div className="text-right">
                  <p className="text-white font-medium text-sm">{user.username}</p>
                  <p className="text-white/60 text-xs">
                    {user.is_admin ? 'Administrator' : 'User'}
                  </p>
                </div>
              </div>

              {/* Admin Badge */}
              {user?.is_admin && (
                <Badge className="border-cyan-300/40 bg-cyan-300/10 text-cyan-200">
                  <Icon.User className="w-3 h-3" />
                  Admin Mode
                </Badge>
              )}

              {/* Logout Button */}
              <button
                onClick={logout}
                className="group relative bg-white/10 hover:bg-rose-500/20 border border-white/20 hover:border-rose-500/30 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
              >
                <Icon.Logout className="w-4 h-4" />
                <span>Logout</span>
                <div className="absolute inset-0 bg-rose-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;