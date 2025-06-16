import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../custom/Navbar';
import { useLocation , useNavigate} from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify'


const TheaterSeatingChart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { total, show_id, movie_name } = location.state || {};
  const urls = import.meta.env.VITE_API_URL;
  const Show_id = show_id;
  const Movie_name = movie_name;
  const totalSeats = total || 50; // Default fallback

  const [bookedSeats, setBookedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingData, setBookingData] = useState({
    seatNumbers: [],
    totalPrice: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  // Memoized function to initialize seats
  const initializeSeats = useCallback(() => {
    if (!totalSeats || totalSeats <= 0) return [];
    
    const seats = [];
    
    // Calculate optimal rows and distribution based on total seats
    const calculateLayout = (total) => {
      if (total <= 50) {
        return { rows: 6, distribution: [0.15, 0.15, 0.20, 0.20, 0.15, 0.15] };
      } else if (total <= 100) {
        return { rows: 8, distribution: [0.14, 0.14, 0.14, 0.14, 0.11, 0.11, 0.11, 0.11] };
      } else if (total <= 200) {
        return { rows: 10, distribution: [0.12, 0.11, 0.11, 0.10, 0.10, 0.10, 0.10, 0.09, 0.09, 0.08] };
      } else {
        return { rows: 12, distribution: [0.10, 0.09, 0.09, 0.09, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.07, 0.07] };
      }
    };
    
    const layout = calculateLayout(total);
    const rowCounts = layout.distribution.map(percent => Math.round(total * percent));
    
    // Adjust to match exact total
    const currentTotal = rowCounts.reduce((sum, count) => sum + count, 0);
    const difference = total - currentTotal;
    
    // Distribute the difference across middle rows
    for (let i = 0; i < Math.abs(difference); i++) {
      const middleIndex = Math.floor(layout.rows / 2) + (i % 3) - 1;
      if (difference > 0) {
        rowCounts[middleIndex]++;
      } else if (rowCounts[middleIndex] > 1) {
        rowCounts[middleIndex]--;
      }
    }
    
    // Define seat types based on row position
    const getSeatType = (rowIndex, totalRows) => {
      const frontThird = Math.floor(totalRows / 3);
      const backThird = totalRows - Math.floor(totalRows / 3);
      
      if (rowIndex < frontThird) {
        return { type: 'silver', price: 150, color: 'bg-gray-400' };
      } else if (rowIndex >= backThird) {
        return { type: 'premium', price: 250, color: 'bg-red-800' };
      } else {
        return { type: 'gold', price: 200, color: 'bg-yellow-500' };
      }
    };
    
    rowCounts.forEach((seatCount, rowIndex) => {
      const rowSeats = [];
      const rowLetter = String.fromCharCode(65 + rowIndex);
      const seatTypeInfo = getSeatType(rowIndex, layout.rows);
      
      for (let seatIndex = 0; seatIndex < seatCount; seatIndex++) {
        const seatNumber = seatIndex + 1;
        const seatId = `${rowLetter}${seatNumber}`;
        
        // Check if seat is booked
        const isUnavailable = bookedSeats.includes(seatId);
        
        rowSeats.push({
          id: seatId,
          row: rowLetter,
          number: seatNumber,
          type: seatTypeInfo.type,
          price: seatTypeInfo.price,
          color: seatTypeInfo.color,
          isSelected: false,
          isUnavailable,
        });
      }
      seats.push(rowSeats);
    });
    
    return seats;
  }, [totalSeats, bookedSeats]);

  // Fetch booked seats
  useEffect(() => {
    if (!urls || !show_id) return;
    
    const fetchSeats = async () => {
      try {
        const response = await fetch(`${urls}/bookseats/`, {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            ticketId: show_id
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Booked seats:', data.seat_numbers);
          setBookedSeats(Array.isArray(data.seat_numbers) ? data.seat_numbers : []);
        } else {
          console.error('Failed to fetch booked seats');
          setBookedSeats([]);
        }
      } catch (error) {
        console.error('Error fetching seats:', error);
        setBookedSeats([]);
      }
    };

    fetchSeats();
  }, [urls, show_id]);

  // Initialize seats when booked seats are loaded
  useEffect(() => {
    const newSeats = initializeSeats();
    setSeats(newSeats);
  }, [initializeSeats]);

  const handleSeatClick = (rowIndex, seatIndex) => {
    const seat = seats[rowIndex][seatIndex];
    
    if (seat.isUnavailable) return;

    setSeats(prevSeats => {
      const newSeats = [...prevSeats];
      newSeats[rowIndex] = [...newSeats[rowIndex]];
      newSeats[rowIndex][seatIndex] = {
        ...newSeats[rowIndex][seatIndex],
        isSelected: !newSeats[rowIndex][seatIndex].isSelected
      };
      return newSeats;
    });

    setSelectedSeats(prev => {
      const isCurrentlySelected = seat.isSelected;
      const updatedSeats = isCurrentlySelected 
        ? prev.filter(s => s !== seat.id)
        : [...prev, seat.id];
      
      return updatedSeats;
    });
  };

  // Update booking data when selected seats change
  useEffect(() => {
    const selectedSeatsData = seats.flat().filter(seat => 
      selectedSeats.includes(seat.id)
    );
    
    const totalPrice = selectedSeatsData.reduce((total, seat) => total + seat.price, 0);
    
    setBookingData({
      seatNumbers: selectedSeats,
      totalPrice: totalPrice
    });
  }, [selectedSeats, seats]);

  const getSeatClassName = (seat) => {
    let baseClass = "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-t-lg border-2 cursor-pointer transition-all duration-200 flex items-center justify-center text-xs font-medium";
    
    if (seat.isUnavailable) {
      return `${baseClass} bg-gray-300 border-gray-400 cursor-not-allowed opacity-50`;
    }
    
    if (seat.isSelected) {
      return `${baseClass} bg-green-500 border-green-600 text-white shadow-lg transform scale-105`;
    }
    
    return `${baseClass} ${seat.color} border-gray-600 text-white hover:transform hover:scale-110 hover:shadow-md`;
  };

  const getTotalPrice = () => {
    return seats.flat()
      .filter(seat => seat.isSelected)
      .reduce((total, seat) => total + seat.price, 0);
  };

  const getSelectedSeatsInfo = () => {
    return seats.flat()
      .filter(seat => seat.isSelected)
      .map(seat => ({ id: seat.id, price: seat.price }));
  };

  // Checkout function with POST request
  const handleCheckout = async () => {
    if (bookingData.seatNumbers.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    // if (!urls || !Movie_name || !Show_id) {
    //   alert('Missing booking information. Please try again.');
    //   return;
    // }

    setIsLoading(true);
    
    try {
      const response = await fetch(`${urls}/booking/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movie: Movie_name,
          show_time: Show_id,
          seat_number: bookingData.seatNumbers,
          price: bookingData.totalPrice,
          is_booked: false
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Booking successful:', result);
        alert(`Booking confirmed! Seats: ${bookingData.seatNumbers.join(', ')} | Total: ₹${bookingData.totalPrice}`);
        
        // Add booked seats to the booked seats list
        setBookedSeats(prev => [...prev, ...bookingData.seatNumbers]);
        
        // Reset the selection
        setSelectedSeats([]);
        setBookingData({ seatNumbers: [], totalPrice: 0 });
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to process booking');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process booking. Please try again.');
    } finally {
      setIsLoading(false);

      if(!isLoading){
        navigate('/payment')
      }

    }
  };

  // Loading state
  if (!totalSeats || seats.length === 0) {
    return (
      <div className="mx-auto p-4 bg-gray-800 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl">Loading seating chart...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 bg-gray-800 text-white min-h-screen">
      <Navbar/>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">Select Your Seats</h1>
        <p className="text-gray-300 mb-4">Theater Capacity: {totalSeats} seats</p>
        <div className="bg-gray-700 py-3 px-6 rounded-lg inline-block">
          <div className="text-lg font-semibold">🎬 SCREEN</div>
          <div className="w-32 sm:w-48 md:w-64 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded mt-2"></div>
        </div>
      </div>

      {/* Seating Chart */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex flex-col items-center space-y-2 sm:space-y-3 min-w-max px-4">
          {seats.map((row, rowIndex) => (
            <div key={rowIndex} className="flex items-center space-x-1 sm:space-x-2">
              {/* Row Label */}
              <div className="w-6 sm:w-8 text-center font-bold text-sm sm:text-base">
                {String.fromCharCode(65 + rowIndex)}
              </div>
              
              {/* Seats */}
              <div className="flex space-x-1 sm:space-x-2">
                {row.map((seat, seatIndex) => (
                  <button
                    key={seat.id}
                    className={getSeatClassName(seat)}
                    onClick={() => handleSeatClick(rowIndex, seatIndex)}
                    disabled={seat.isUnavailable}
                    title={seat.isUnavailable ? 'Already Booked' : `${seat.id} - ₹${seat.price}`}
                  >
                    <span className="hidden sm:inline text-xs">
                      {seat.number}
                    </span>
                  </button>
                ))}
              </div>
              
              {/* Row Label (Right) */}
              <div className="w-6 sm:w-8 text-center font-bold text-sm sm:text-base">
                {String.fromCharCode(65 + rowIndex)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-700 rounded-lg p-4 sm:p-6 mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">Seat Types & Pricing</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-800 rounded-t-lg border-2 border-gray-600"></div>
            <div>
              <div className="font-semibold">Premium</div>
              <div className="text-sm text-gray-300">₹250</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-t-lg border-2 border-gray-600"></div>
            <div>
              <div className="font-semibold">Gold</div>
              <div className="text-sm text-gray-300">₹200</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-400 rounded-t-lg border-2 border-gray-600"></div>
            <div>
              <div className="font-semibold">Silver</div>
              <div className="text-sm text-gray-300">₹150</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-t-lg border-2 border-gray-400 opacity-50"></div>
            <div>
              <div className="font-semibold">Already Booked</div>
              <div className="text-sm text-gray-300">N/A</div>
            </div>
          </div>
        </div>
        
        {/* Selection Status */}
        <div className="mt-6 pt-4 border-t border-gray-600">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-green-500 rounded-t-lg border-2 border-green-600"></div>
            <div>
              <div className="font-semibold">Selected</div>
              <div className="text-sm text-gray-300">Your choice</div>
            </div>
          </div>
        </div>
      </div>

      {/* Selection Summary */}
      {selectedSeats.length > 0 && (
        <div className="bg-green-800 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold mb-3">Your Selection</h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-3 sm:mb-0">
              <div className="font-semibold">
                Seats: {getSelectedSeatsInfo().map(seat => seat.id).join(', ')}
              </div>
              <div className="text-sm text-green-200">
                {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''} selected
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                Total: ₹{getTotalPrice()}
              </div>
              <button 
                className="mt-2 bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Continue to Checkout'}
              </button>
            </div>
          </div>
        </div>
      )}
       
    </div>
  );
};

export default TheaterSeatingChart;