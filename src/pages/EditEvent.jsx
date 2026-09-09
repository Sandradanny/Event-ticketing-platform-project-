// src/pages/EditEvent.jsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Calendar, MapPin, Ticket, Clock, Save, ArrowLeft } from 'lucide-react'
import { eventApi } from '../core/services/api'
import Navbar from '../Navbar'

const EditEvent = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    eventName: '',
    eventDescription: '',
    eventvenue: '',
    eventDate: '',
    price: '',
    totalTickets: '',
    category: '',
    location: '',
    isFree: false,
    isVirtual: false,
  })

  const categories = ['Concert', 'Conference', 'Festival', 'Workshop', 'Sports', 'Art', 'Food', 'Tech', 'Music', 'Other']

  useEffect(() => {
    fetchEvent()
  }, [eventId])

  const fetchEvent = async () => {
    try {
      setLoading(true)
      const data = await eventApi.getById(eventId)
      
      if (data) {
        setFormData({
          eventName: data.eventName || data.title || '',
          eventDescription: data.eventDescription || data.description || '',
          eventvenue: data.eventvenue || data.venue || '',
          eventDate: data.eventDate || data.date || '',
          price: data.price || '',
          totalTickets: data.totalTickets || '',
          category: data.category || '',
          location: data.location || '',
          isFree: data.isFree || false,
          isVirtual: data.isVirtual || false,
        })
      }
    } catch (err) {
      console.error('Error fetching event:', err)
      setError('Failed to load event')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }))
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)

    // Validation
    if (!formData.eventName.trim()) return setError('Title is required')
    if (!formData.eventDescription.trim()) return setError('Description is required')
    if (!formData.eventDate) return setError('Date is required')
    if (!formData.eventvenue.trim()) return setError('Venue is required')

    try {
      const eventDate = new Date(formData.eventDate).toISOString()
      
      const eventData = {
        eventName: formData.eventName,
        eventDescription: formData.eventDescription,
        eventvenue: formData.eventvenue,
        eventDate: eventDate,
        category: formData.category,
        location: formData.location,
        price: formData.isFree ? 0 : parseFloat(formData.price) || 0,
        totalTickets: parseInt(formData.totalTickets) || 0,
        isVirtual: formData.isVirtual,
        isFree: formData.isFree,
      }
      
      await eventApi.update(eventId, eventData)
      setSuccess('✅ Event updated successfully!')
      
      setTimeout(() => {
        navigate(`/event/${eventId}`)
      }, 1500)
      
    } catch (err) {
      console.error('Error updating event:', err)
      setError(err.message || 'Failed to update event')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-8">
          
          <Link to={`/event/${eventId}`} className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1 mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Event
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Event</h1>
          <p className="text-gray-500 mb-6">Update your event details</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-200">
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 text-sm border border-green-200">
              ✅ {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
            {/* Event Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Name *</label>
              <input
                id="eventName"
                type="text"
                value={formData.eventName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter event name"
              />
            </div>

            {/* Category & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  id="eventDate"
                  type="datetime-local"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Venue & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Venue *</label>
                <input
                  id="eventvenue"
                  type="text"
                  value={formData.eventvenue}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Venue name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="City, State"
                />
              </div>
            </div>

            {/* Price & Tickets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Tickets</label>
                <input
                  id="totalTickets"
                  type="number"
                  min="0"
                  value={formData.totalTickets}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Number of tickets"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                id="eventDescription"
                rows="4"
                value={formData.eventDescription}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="Describe your event..."
              />
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  id="isVirtual"
                  type="checkbox"
                  checked={formData.isVirtual}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                Virtual Event
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  id="isFree"
                  type="checkbox"
                  checked={formData.isFree}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                Free Event
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={saving}
              className={`w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium transition ${
                saving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
              }`}
            >
              {saving ? 'Saving...' : 'Update Event'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditEvent