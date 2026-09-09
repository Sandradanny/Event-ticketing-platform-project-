// src/pages/BookingPage.jsx
import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Ticket, ArrowLeft, Minus, Plus, CreditCard, Loader2 } from 'lucide-react'
import { eventApi, bookingApi } from '../core/services/api'
import Navbar from '../Navbar'
import Footer from '../shared/components/Footer'

export default function BookingPage() {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1) 
  const [error, setError] = useState('')
  const [isBooking, setIsBooking] = useState(false)

  useEffect(() => {
    fetchEvent()
    const token = localStorage.getItem('token')
    if (!token) {
      setError('Please login to book tickets')
      setTimeout(() => navigate('/login'), 2000)
    }
  }, [eventId])

  const fetchEvent = async () => {
    try {
      const data = await eventApi.getById(eventId)
      setEvent(data)
    } catch (err) {
      console.error('Error fetching event:', err)
      setError('Event not found')
    } finally {
      setLoading(false)
    }
  }

  const handleQuantityChange = (type) => {
    if (type === 'increase' && quantity < 10) {
      setQuantity(prev => prev + 1)
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }


  const handleBooking = async () => {
    setIsBooking(true)
    setError('')
    
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Please login to book tickets')
        setTimeout(() => navigate('/login'), 2000)
        setIsBooking(false)
        return
      }
      
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      
      if (!user.id && !user.userId) {
        setError('User not properly authenticated. Please login again.')
        setTimeout(() => navigate('/login'), 2000)
        setIsBooking(false)
        return
      }
      
      
      const bookingData = {
        eventId: eventId,
        items: [
          {
            ticketTypeId: event?.ticketTypeId || event?.id || eventId, // Use the ticket type ID
            quantity: quantity
          }
        ]
      }
      
      console.log('📤 Sending booking request:', JSON.stringify(bookingData, null, 2))
      console.log('👤 User ID:', user.id || user.userId)
      
      const result = await bookingApi.reserve(bookingData)
      console.log('✅ Booking created:', result)
      
      
      const bookingId = result.id || result.bookingId
      if (bookingId) {
        navigate(`/payment/${bookingId}`)
      } else {
        setError('Booking created but no ID returned. Please contact support.')
      }
      
    } catch (err) {
      console.error('❌ Booking error:', err)
      
      if (err.message.includes('403')) {
        setError('You don\'t have permission to book tickets. Please login again.')
        localStorage.removeItem('token')
        setTimeout(() => navigate('/login'), 2000)
      } else if (err.message.includes('401')) {
        setError('Please login again to book tickets')
        localStorage.removeItem('token')
        setTimeout(() => navigate('/login'), 2000)
      } else if (err.message.includes('400')) {
        setError('Invalid booking request. Please check your details.')
      } else {
        setError(err.message || 'Failed to create booking')
      }
    } finally {
      setIsBooking(false)
    }
  }

  const getTotalPrice = () => {
    return (event?.price || 0) * quantity
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen bg-[#0f0f0f] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto px-4 py-8">
          
          <Link 
            to={`/event/${eventId}`} 
            className="text-gray-400 hover:text-gray-200 text-sm flex items-center gap-1 mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Event
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-6 shadow-xl">
                <h1 className="text-2xl font-bold text-white mb-2">Book Tickets</h1>
                <p className="text-gray-400 mb-6">Select your tickets and quantity</p>

                {/* Event Summary */}
                <div className="flex items-center gap-4 p-4 bg-[#252525] rounded-xl mb-6 border border-gray-800">
                  <div className="w-16 h-16 bg-indigo-900/50 rounded-xl flex items-center justify-center">
                    <Ticket className="w-8 h-8 text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-white truncate">
                      {event?.eventName || event?.title || 'Event'}
                    </h2>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {event?.eventDate ? new Date(event.eventDate).toLocaleDateString() : 'Date TBD'}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event?.eventvenue || event?.venue || 'Location TBD'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Tickets
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleQuantityChange('decrease')}
                      disabled={quantity <= 1}
                      className="w-10 h-10 border border-gray-700 rounded-xl flex items-center justify-center hover:bg-[#252525] transition text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-2xl font-bold text-white w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      disabled={quantity >= 10}
                      className="w-10 h-10 border border-gray-700 rounded-xl flex items-center justify-center hover:bg-[#252525] transition text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-gray-500">Max 10 per booking</span>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl mb-4 text-sm">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleBooking}
                  disabled={isBooking}
                  className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-medium transition flex items-center justify-center gap-2 ${
                    isBooking ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isBooking ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Proceed to Payment
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-6 shadow-xl sticky top-24">
                <h2 className="font-semibold text-white mb-4">Order Summary</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Event</span>
                    <span className="font-medium text-gray-200 truncate max-w-[140px]">
                      {event?.eventName || event?.title || 'Event'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tickets</span>
                    <span className="font-medium text-gray-200">{quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price per ticket</span>
                    <span className="font-medium text-gray-200">${event?.price || 0}</span>
                  </div>
                  <div className="border-t border-gray-800 pt-3 flex justify-between text-lg font-bold">
                    <span className="text-gray-300">Total</span>
                    <span className="text-indigo-400">${getTotalPrice()}</span>
                  </div>
                </div>

              
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}