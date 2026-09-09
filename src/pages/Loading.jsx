// src/pages/Loading.jsx
import React from 'react'
import Navbar from '../Navbar'

const Loading = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading...</p>
        </div>
      </div>
    </>
  )
}

export default Loading