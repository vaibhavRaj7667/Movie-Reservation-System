import { useState } from 'react'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Movies from './components/pages/Movies'
import TheaterSeatingChart from './components/pages/TheaterSeatingChart'
import Booking from './components/pages/Booking'

function App() {
  

  return (
    <>

        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/home' element={<Home/>}  />
          <Route path='/movies/:pk' element={<Movies/>}/>
          <Route path='booking/' element={<TheaterSeatingChart/>} />
          <Route path='payment/' element={<Booking/>}/>
        </Routes>
    
    </>
  )
}

export default App
