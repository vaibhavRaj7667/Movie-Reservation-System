import React, { useEffect, useState } from 'react'
import Navbar from '../custom/Navbar'
import Footer from '../custom/Footer'
import TicketsCard from '../custom/TicketsCard'
import { data } from 'react-router-dom'

const Profile = () => {

  const urls = import.meta.env.VITE_API_URL;
  const[ myData, setMydata] = useState()

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(()=>{
    
    const HandelFetching = async () => {
      try {
        const resposne = await fetch(`${urls}/profile`,{
          method:'GET',
          credentials: 'include',
        })
  
        const Data = await resposne.json()
        console.log(Data.data)
        setMydata(Data.data)
      } catch (error) {
        console.log(error)
      }


    }

    HandelFetching()

  },[])




  return (
    <div className='min-h-screen bg-[#213448] '>
        <Navbar/>
        <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-amber-50 p-1">Your Profile</p>

            <div className="w-full max-w-150 p-6 bg-gray-700 rounded-md shadow-md text-white">
                <h2 className="text-lg font-semibold mb-4 border-b border-gray-500 pb-2">
                    Account Details
                </h2>
                <div className="space-y-2">
                    <p>
                    <span className="font-medium">Name:</span> {myData ? myData[0].user__username : "Loading..."}
                    </p>
                    
                </div>
            </div>

              <p className="text-2xl font-bold text-amber-50 p-1">Tickets</p>

            <div>

              {myData ? myData.map((data, index) => (
                <TicketsCard
                  key={index}
                  movieTitle={data.movie__title}
                  bookingId={data.id}
                  showTime={ formatDate(data.show_time__show_time)}
                  seats={data.seat_number.join(', ')}
                  totalPaid={data.price}
                />
              )) : (
                <p className="text-white">Loading...</p>
              )}
      
            </div>

                
        </div>
      <Footer/>
    </div>
  )
}

export default Profile
