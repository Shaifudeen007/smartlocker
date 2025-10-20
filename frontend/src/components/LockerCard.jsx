import React, { useState } from 'react';

const LockerCard = ({ locker, onReserve }) => {
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const [reservationDuration, setReservationDuration] = useState(1); // hours

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30';
      case 'occupied': return 'bg-rose-500/20 text-rose-600 border-rose-500/30';
      case 'maintenance': return 'bg-amber-500/20 text-amber-600 border-amber-500/30';
      default: return 'bg-slate-500/20 text-slate-600 border-slate-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'occupied':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'maintenance':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleReserveClick = () => {
    setShowReservationPopup(true);
  };

  const handleConfirmReservation = () => {
    if (onReserve) {
      onReserve(locker.id, reservationDuration);
    }
    setShowReservationPopup(false);
  };

  const handleCancelReservation = () => {
    setShowReservationPopup(false);
    setReservationDuration(1);
  };

  const calculatePrice = () => {
    return (locker.price_per_hour * reservationDuration).toFixed(2);
  };

  return (
    <>
      <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:scale-105">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white">{locker.locker_number}</h3>
            <p className="text-white/60 text-sm mt-1">{locker.location}</p>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${getStatusColor(locker.status)} text-sm font-medium`}>
            {getStatusIcon(locker.status)}
            {locker.status.charAt(0).toUpperCase() + locker.status.slice(1)}
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <p className="text-white/60 text-sm">Price per hour</p>
          <p className="text-2xl font-bold text-cyan-400">${locker.price_per_hour}</p>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            24/7 Security Monitoring
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Instant Digital Access
          </div>
        </div>
        
        {locker.status === 'available' && (
          <button 
            onClick={handleReserveClick}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
          >
            Reserve Now
          </button>
        )}

        {locker.status !== 'available' && (
          <div className="text-center py-2">
            <span className="text-white/40 text-sm">
              {locker.status === 'occupied' ? 'Currently in use' : 'Under maintenance'}
            </span>
          </div>
        )}
      </div>

      {/* Reservation Popup */}
      {showReservationPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full border border-white/10">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-semibold text-white">
                Reserve Locker {locker.locker_number}
              </h3>
              <p className="text-white/60 text-sm mt-1">Secure your storage space</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-3">
                  Reservation Duration
                </label>
                <select
                  value={reservationDuration}
                  onChange={(e) => setReservationDuration(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(hours => (
                    <option key={hours} value={hours}>
                      {hours} hour{hours > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Summary */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60">Price per hour:</span>
                  <span className="text-white font-medium">${locker.price_per_hour}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60">Duration:</span>
                  <span className="text-white font-medium">
                    {reservationDuration} hour{reservationDuration > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-semibold pt-3 border-t border-white/10">
                  <span className="text-white">Total Amount:</span>
                  <span className="text-cyan-400">${calculatePrice()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleCancelReservation}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 border border-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReservation}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Confirm Reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LockerCard;