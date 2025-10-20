import React, { useState } from 'react';

const LockerCard = ({ locker, onReserve }) => {
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const [reservationDuration, setReservationDuration] = useState(1); // hours

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
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
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Locker {locker.locker_number}
          </h3>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(locker.status)}`}>
            {locker.status.charAt(0).toUpperCase() + locker.status.slice(1)}
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          <p className="text-gray-600">Location: {locker.location}</p>
          <p className="text-lg font-semibold text-blue-600">
            ${locker.price_per_hour}/hour
          </p>
        </div>
        
        {locker.status === 'available' && (
          <button 
            onClick={handleReserveClick}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Reserve Now
          </button>
        )}
      </div>

      {/* Reservation Popup */}
      {showReservationPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Reserve Locker {locker.locker_number}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reservation Duration (hours)
                </label>
                <select
                  value={reservationDuration}
                  onChange={(e) => setReservationDuration(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(hours => (
                    <option key={hours} value={hours}>
                      {hours} hour{hours > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Price per hour:</span>
                  <span>${locker.price_per_hour}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Duration:</span>
                  <span>{reservationDuration} hour{reservationDuration > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg text-gray-900 mt-2 pt-2 border-t border-gray-200">
                  <span>Total:</span>
                  <span>${calculatePrice()}</span>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleCancelReservation}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReservation}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
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