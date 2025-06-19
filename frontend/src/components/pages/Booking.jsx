import React, { useEffect, useState } from 'react'
import Navbar from '../custom/Navbar'
import Footer from '../custom/Footer';
import PaymetCard from '../custom/PaymetCard';
import RefreshToken from '../custom/RefreshToken';
import { ToastContainer, toast } from 'react-toastify'

const Booking = () => {
  const urls = import.meta.env.VITE_API_URL;
  const [booking, setBooking] = useState()
  const [isLoading, setIsLoading] = useState(false)
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


  const HandelBooking= async(id)=>{
    try {
      console.log("HandelBooking called with id:", id)
      const resposne = await fetch(`${urls}/conformBooking/`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        credentials: 'include',
        body:JSON.stringify({
          id : id
        })
      })
  
      const Resposne = await resposne.json()
  
      console.log(Resposne.id)
      setBooking(booking.filter(booking=> booking.id !== Resposne.id))
      
      toast.success('booking conform',
        {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
      )
    } catch (error) {
      console.log(`Errors---> ${error}`)
    }
  }



  return (
    <div className="min-h-screen bg-gray-800">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-5 py-8 px-4">
        <p
        className="font-bold text-amber-50 text-2xl"
        >Draft Booking</p>
       

        {booking && booking.map((item, index) => (

           <PaymetCard
           movie={item.movie}
           show_time={item.show_time.show_time}
           seats ={item.seat_number.join(', ')}
           total={item.price}
           id ={item.id}
           indexs ={index}
           handelBooking={HandelBooking}
           />
      
        ))}
        
         <ToastContainer
         />
      </div>
      <Footer/>
    </div>
  )
}

export default Booking