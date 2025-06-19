import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const urls = import.meta.env.VITE_API_URL;

  const handelLogout = async()=>{
    try {
      const resposne = await axios.post(`${urls}/logout/`,null,
         {
            withCredentials: true
          }
      )

      toast.success("logout succesfull")

      console.log(`${resposne.data} success`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className="bg-gray-900 px-6 py-3 flex items-center justify-between shadow-md z-50">
      {/* Logo */}
      <div>
        <Link to="/home" className="text-2xl font-bold text-white tracking-wide">
          CinemaNow
        </Link>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            ></path>
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <ul
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } sm:flex sm:space-x-8 absolute sm:static top-14 left-0 w-full sm:w-auto bg-gray-900 sm:bg-transparent sm:shadow-none shadow-md`}
      >
        <li className="border-b sm:border-none border-gray-700 sm:py-0 py-2">
          <Link
            to="#"
            className="block text-white hover:text-yellow-400 transition-colors px-6 sm:px-0"
          >
            Home
          </Link>
        </li>
        <li className="border-b sm:border-none border-gray-700 sm:py-0 py-2">
          <Link
            to="#"
            className="block text-white hover:text-yellow-400 transition-colors px-6 sm:px-0"
          >
            About
          </Link>
        </li>
        <li className="border-b sm:border-none border-gray-700 sm:py-0 py-2">
          <Link
            to="#"
            className="block text-white hover:text-yellow-400 transition-colors px-6 sm:px-0"
          >
            Profile
          </Link>
        </li>
        <li className="sm:py-0 py-2">
          <Link
            to="#"
            onClick={()=>handelLogout()}
            className="block text-white hover:text-yellow-400 transition-colors px-6 sm:px-0"
          >
            Logout
          </Link>
        </li>
         <ToastContainer/>
      </ul>
     
    </nav>
  );
};

export default Navbar;