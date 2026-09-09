// src/pages/NotFound.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-red-600">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
          <p className="text-gray-500 mt-2">Sorry, we couldn't find that page.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </>
  )
}

export default NotFound