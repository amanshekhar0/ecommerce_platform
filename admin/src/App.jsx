import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'

import Login from './components/Login'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const backendUrl=import.meta.env.VITE_BACKEND_URL
export const currency ='₹'

const App = () => {
  const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'') // Consider using localStorage for real authentication
  useEffect(() => {
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer/>
      {token === '' ? (
        <Login  setToken={setToken}/>
      ) : (
        <div className="flex w-full">
          <Sidebar />
          
          <div className="flex-grow px-6 py-8">
            <Navbar setToken={setToken} />
            <Routes>
              <Route path="/add" element={<Add  token={token} />} />
              <Route path="/list" element={<List  token={token}/>} />
              <Route path="/orders" element={<Orders token={token} />} />
            </Routes>
          </div>
          
        </div>
      )}
    </div>
  )
}

export default App
