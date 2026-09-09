// src/pages/Ticket.jsx
import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  Calendar, 
  MapPin, 
  QrCode, 
  ArrowLeft, 
  Download, 
  Printer, 
  CheckCircle, 
  Clock, 
  Shield,
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  Eye
} from 'lucide-react'
import { bookingApi, eventApi } from '../core/services/api'
import Navbar from '../Navbar'

// ✅ Use a different name or make sure it's not duplicated
const TicketPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ticketData, setTicketData] = useState(null)
  const [eventData, setEventData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    fetchTicketDetails()
  }, [id])

  const fetchTicketDetails = async () => {
    try {
      setLoading(true)
      
      // Get booking details
      const bookingData = await bookingApi.getById(id)
      setTicketData(bookingData)
      
      // Get event details
      if (bookingData.eventId) {
        const eventDetails = await eventApi.getById(bookingData.eventId)
        setEventData(eventDetails)
      }
      
    } catch (err) {
      console.error('Error fetching ticket:', err)
      setError('Failed to load ticket')
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = () => {
    setIsVerified(!isVerified)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    } catch {
      return 'Date TBD'
    }
  }

  const formatTime = (dateString) => {
    if (!dateString) return 'TBD'
    try {
      const date = new Date(dateString)
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    } catch {
      return 'TBD'
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      'Confirmed': 'bg-green-100 text-green-700 border-green-200',
      'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Cancelled': 'bg-red-100 text-red-700 border-red-200',
      'Completed': 'bg-blue-100 text-blue-700 border-blue-200'
    }
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
            <p className="text-gray-500 text-sm">Loading your ticket...</p>
          </div>
        </div>
      </>
    )
  }

  if (error || !ticketData) {
    return (
      <>
        <Navbar />
        <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎫</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Ticket Not Found</h2>
            <p className="text-gray-500 text-sm mt-2">{error || 'This ticket does not exist'}</p>
            <Link to="/my-tickets" className="inline-block mt-6 text-indigo-600 hover:underline">
              Back to My Tickets →
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          
          {/* Back Button */}
          <Link to="/my-tickets" className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to My Tickets
          </Link>

          {/* Ticket Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎟️</span>
                <span className="text-white font-semibold text-lg">E-TICKET</span>
                <span className="text-white/60 text-sm ml-2 font-mono">
                  #{ticketData.id?.slice(0, 8) || 'N/A'}
                </span>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(ticketData.status)}`}>
                {ticketData.status || 'Confirmed'}
              </span>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Event Name */}
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {eventData?.eventName || eventData?.title || 'Event'}
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                {eventData?.category || 'General'} • {eventData?.eventvenue || eventData?.venue || 'Venue TBD'}
              </p>

              {/* Event Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{formatDate(eventData?.eventDate || eventData?.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{formatTime(eventData?.eventDate || eventData?.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{eventData?.eventvenue || eventData?.venue || 'TBD'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{ticketData.userName || 'Ticket Holder'}</span>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between mb-6 border border-gray-200">
                <div>
                  <p className="text-xs text-gray-400 font-medium">SCAN TO VERIFY</p>
                  <p className="text-sm font-mono text-gray-700 mt-1">
                    {ticketData.id?.slice(0, 12) || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {isVerified ? '✅ Verified' : '⏳ Not verified'}
                  </p>
                </div>
                <div className="w-24 h-24 bg-white rounded-xl border-2 border-dashed border-indigo-300 flex items-center justify-center">
                  {isVerified ? (
                    <CheckCircle className="w-14 h-14 text-green-500" />
                  ) : (
                    <QrCode className="w-14 h-14 text-indigo-600" />
                  )}
                </div>
              </div>

              {/* Ticket Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400">Quantity</p>
                  <p className="text-lg font-bold text-gray-800">{ticketData.quantity || 1}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400">Price</p>
                  <p className="text-lg font-bold text-green-600">${ticketData.totalPrice || 0}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400">Section</p>
                  <p className="text-lg font-bold text-gray-800">VIP</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400">Seats</p>
                  <p className="text-lg font-bold text-gray-800">07-08</p>
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200 mb-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-700">FanProtect Guarantee</p>
                    <p className="text-xs text-green-600">Your ticket is 100% guaranteed. If the event is cancelled, you'll receive a full refund.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleVerify}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition text-sm font-medium ${
                    isVerified 
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  {isVerified ? 'Verified ✓' : 'Verify Ticket'}
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700">
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                <Link 
                  to={`/scan-ticket/${ticketData.id}`}
                  className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium ml-auto"
                >
                  <QrCode className="w-4 h-4" />
                  Scan Now
                </Link>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-gray-400">
                Issued: {formatDate(ticketData.createdAt || ticketData.purchaseDate)}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <CreditCard className="w-3 h-3" />
                  {ticketData.paymentMethod || 'Card'}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {ticketData.email || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ✅ Export with a different name
export default TicketPage