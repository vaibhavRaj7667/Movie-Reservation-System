import React from 'react'

const PaymetCard = ({movie, show_time, seats, total, indexs}) => {
  return (
    <div>
        <div  className="w-xl max-w-2xl">
          

          {/* Payment Summary Card */}
          <div className="bg-gray-200 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">
              Payment Summary
            </h2>
            
            <div className="space-y-4">
              
              {/* movie: name */}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Movie:</span>
                <span className="font-medium text-gray-800">{movie}</span>
              </div>

              {/* show timing */}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Show Time:</span>
                <span className="font-medium text-gray-800">{show_time}</span>
              </div>

              {/* Selected Seats */}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Selected Seats:</span>
                <span className="font-medium text-gray-800">{seats}</span>
              </div>
              
              
              {/* Total Cost */}
              <div className="flex justify-between items-center py-3 border-t border-gray-200">
                <span className="text-lg font-semibold text-gray-800">Total Cost:</span>
                <span className="text-lg font-bold text-green-600">{total}</span>
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
  )
}

export default PaymetCard
