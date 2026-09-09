import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true)

  // Optional: Hide after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="relative w-full py-2.5 font-medium text-sm text-white text-center bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
      <p className="px-8">
        🎉 Special Deal: Free Shipping on Orders Above $50! | 20% OFF on First Purchase
      </p>
      
      {/* Close Button */}
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition"
        aria-label="Close announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export default Banner