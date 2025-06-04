import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (

    <nav className="bg-gray-900 px-6 py-3 flex items-center justify-between shadow-md">

      <div>
        <Link to="/home" className="text-2xl font-bold text-white tracking-wide">CinemaNow</Link>
      </div>

      <ul className="flex space-x-8">
        <li>
          <Link to="#" className="text-white hover:text-yellow-400 transition-colors">Home</Link>
        </li>
        <li>
          <Link to="#" className="text-white hover:text-yellow-400 transition-colors">About</Link>
        </li>
        <li>
          <Link to="#" className="text-white hover:text-yellow-400 transition-colors">Login</Link>
        </li>
        <li>
          <Link to="#" className="text-white hover:text-yellow-400 transition-colors">Logout</Link>
        </li>
      </ul>

    </nav>
  )
}

export default Navbar