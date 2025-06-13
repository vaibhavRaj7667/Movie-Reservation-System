import React from 'react'
import Navbar from '../custom/Navbar'


const Booking = () => {
  return (
    <div className="min-h-screen bg-gray-800">
      <Navbar />
      <div className="flex justify-center py-8 px-4">
        <div className="w-full max-w-2xl">
          {/* Movie Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Avengers: Endgame</h1>
            <p className="text-gray-300">Screen 2 • 7:30 PM • Today</p>
          </div>

          {/* Payment Summary Card */}
          <div className="bg-gray-200 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">
              Payment Summary
            </h2>
            
            <div className="space-y-4">
              {/* Selected Seats */}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Selected Seats:</span>
                <span className="font-medium text-gray-800">A12, A13, A14</span>
              </div>
              
              {/* Ticket Cost */}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Ticket Cost:</span>
                <span className="font-medium text-gray-800">₹750</span>
              </div>
              
              {/* Total Cost */}
              <div className="flex justify-between items-center py-3 border-t border-gray-200">
                <span className="text-lg font-semibold text-gray-800">Total Cost:</span>
                <span className="text-lg font-bold text-green-600">₹795</span>
              </div>
              
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button className="flex-1 bg-gray-500 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-400 transition-colors">
                Back
              </button>
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking