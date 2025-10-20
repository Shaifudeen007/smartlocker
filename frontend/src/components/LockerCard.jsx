import React, { useState } from 'react';

// ===== Icon set =====
const Icon = {
  Check: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M5 13l4 4L19 7"/>
    </svg>
  ),
  Close: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  ),
  Warning: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
    </svg>
  ),
  Security: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
    </svg>
  ),
  Lightning: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>
  ),
  Reserve: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
    </svg>
  )
};

// ===== UI helpers =====
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

const LockerCard = ({ locker, onReserve }) => {
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const [reservationDuration, setReservationDuration] = useState(1);

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
      <Card>
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
        <div className="mb-6">
          <p className="text-white/60 text-sm">Price per hour</p>
          <p className="text-2xl font-bold text-cyan-400">${locker.price_per_hour}</p>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Icon.Security className="w-4 h-4 text-cyan-400" />
            24/7 Security Monitoring
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Icon.Lightning className="w-4 h-4 text-cyan-400" />
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
      </Card>

      {/* Reservation Popup */}
      {showReservationPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white/70 text-sm">Reserve Locker</p>
                <p className="text-white font-semibold">{locker.locker_number} • {locker.location}</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" aria-hidden></span>
                Available
              </span>
            </div>
            
            <div className="space-y-6">
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
              <Card className="p-4">
                <div className="space-y-3">
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
              </Card>

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
                  <Icon.Reserve className="w-5 h-5" />
                  Confirm Reservation
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default LockerCard;