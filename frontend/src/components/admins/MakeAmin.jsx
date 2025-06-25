import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { use } from 'react';

const MakeAmin = () => {
    const urls = import.meta.env.VITE_API_URL;
    const [users, setUsers] = useState([]);

    const isAdmin =(data)=>{
        if( data.includes(2)){
            return "Admin"
        }
        else{
            return "Users"
        }
    }

    useEffect(()=>{
       
        const fetchuser = async()=>{

            try {
                const resposne = await axios.get(`${urls}/addgroup/`,{
                    withCredentials: true
                })
    
                console.log(resposne.data.data)
                setUsers(resposne.data.data)

            } catch (error) {
                console.log(error)
            }
        }
        
        fetchuser()


    },[urls])

    const makeadmin = async(username)=>{
        try {
            const response = await axios.post(`${urls}/addgroup/admins/${username}/`,null,{
                withCredentials: true
            })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
   



  return (
    <div className='min-h-screen bg-[#213448] '>
       
       <div className='flex flex-col items-center justify-center pt-10'>
        
        {users.map((user)=>(

          <div 
            key={user.id} 
            className="bg-gray-600 text-gray-100 m-2 p-4 rounded-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
            >
            <p className="text-lg font-semibold">Name: {user.username}</p>

            <div className="flex flex-col sm:flex-row sm:justify-between mt-2">
                <p>Email: {user.email}</p>
                <p className="mt-2 sm:mt-0 sm:ml-3">Group: {isAdmin(user.groups)}</p>
            </div>

            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mt-4 w-full sm:w-auto"
                onClick={()=>makeadmin(user.username)}
            >
            {isAdmin(user.groups)=='Admin'? "Remove permission":"give permission"}
            </button>
            </div>
                        
            ))}

        </div>
      
    </div>
  )
}

export default MakeAmin
