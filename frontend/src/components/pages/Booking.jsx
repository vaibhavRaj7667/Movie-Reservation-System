import React, { useEffect, useState } from 'react'
import Navbar from '../custom/Navbar'
import PaymetCard from '../custom/PaymetCard';
import RefreshToken from '../custom/RefreshToken';


const Booking = () => {

  const [booking, setBooking] = useState()

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/booking/`, {
        method: "GET",
        credentials: 'include',
      });

      if(response.status === 401){
        RefreshToken()
      }
      

      const data = await response.json();
      console.log(data.data);
      setBooking(data.data)
    } catch (error) {
      console.log(`Error ->> ${error}`);
    }
  };

  fetchData(); // Call the async function
}, []);





  return (
    <div className="min-h-screen bg-gray-800">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-5 py-8 px-4">

       

        {booking && booking.map((item, index) => (

           <PaymetCard
           movie={item.movie}
           show_time={item.show_time}
           seats ={item.seat_number.join(', ')}
           total={item.price}
           indexs ={index}
           />
      
        ))}
        

      </div>
    </div>
  )
}

export default Booking