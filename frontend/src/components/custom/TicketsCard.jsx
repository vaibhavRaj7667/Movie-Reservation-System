import React from 'react'

const TicketsCard = ({movieTitle, bookingId, showTime, seats, totalPaid}) => {
  return (
    
    <div className="w-150 bg-gray-600 rounded-md shadow-md text-white p-4 mt-2">
    <h2 className="text-lg font-bold mb-2">{movieTitle}</h2>
    <p className="text-sm mb-2">
        <strong>Booking ID:</strong> {bookingId}
    </p>
    <p className="text-sm mb-2">
        <strong>Show Time:</strong> {showTime}
    </p>
    <p className="text-sm mb-2">
        <strong>Seats:</strong> {seats}
    </p>
    <p className="text-sm">
        <strong>Total Paid: </strong>{totalPaid}
    </p>
</div>
  )
}

export default TicketsCard
