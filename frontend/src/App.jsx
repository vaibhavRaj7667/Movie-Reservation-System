import { useState } from 'react'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'


function App() {
  

  return (
    <>

        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/home' element={<Home/>}  />
          
        </Routes>
    
    </>
  )
}

export default App
