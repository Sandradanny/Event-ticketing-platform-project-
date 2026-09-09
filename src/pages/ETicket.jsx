// src/pages/ETicket.jsx
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Ticket, QrCode, Calendar, MapPin, ArrowLeft, Download, Printer } from 'lucide-react'
import { bookingApi, eventApi } from '../core/services/api'
import Navbar from '../Navbar'

export default function ETicket() {
  const { bookingId } = useParams()
  const [booking, setBooking] = useState(null)
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTicketDetails()
  }, [bookingId])

  // ✅ GET /api/Booking/{id} and GET /api/Events/{id}
  const fetchTicketDetails = async () => {
    try {
      setLoading(true)
      
      // Get booking details
      const bookingData = await bookingApi.getById(bookingId)
      setBooking(bookingData)
      
      // Get event details
      if (bookingData.eventId) {
        const eventData = await eventApi.getById(bookingData.eventId)
        setEvent(eventData)
      }
      
    } catch (err) {
      console.error('Error fetching ticket:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    } catch {
      return 'Date TBD'
    }
  }

  // ... rest of your ETicket component
}