// src/pages/CreateEvent.jsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Ticket, Clock, ArrowLeft, Upload, X, DollarSign, Image as ImageIcon } from 'lucide-react'
import { eventApi } from '../core/services/api'
import Navbar from '../Navbar'
import Footer from '../shared/components/Footer'

const CreateEvent = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
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
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }))
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB')
        return
      }
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file')
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.eventName.trim()) return setError('Event name is required')
    if (!formData.eventDescription.trim()) return setError('Description is required')
    if (!formData.eventvenue.trim()) return setError('Venue is required')
    if (!formData.eventDate) return setError('Date is required')
    if (!formData.isFree && (!formData.price || parseFloat(formData.price) < 0)) {
      return setError('Please enter a valid price')
    }
    if (!formData.totalTickets || parseInt(formData.totalTickets) < 1) {
      return setError('At least 1 ticket is required')
    }

    setLoading(true)
    
    try {
      const eventDate = new Date(formData.eventDate).toISOString()
      
      const eventData = {
        eventName: formData.eventName,
        eventDescription: formData.eventDescription,
        eventvenue: formData.eventvenue,
        eventDate: eventDate,
        category: formData.category || 'General',
        location: formData.location || formData.eventvenue,
        price: formData.isFree ? 0 : parseFloat(formData.price) || 0,
        totalTickets: parseInt(formData.totalTickets),
        isVirtual: formData.isVirtual,
        isFree: formData.isFree,
        image: imagePreview || 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400'
      }
      
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Please login first')
      }
      
      await eventApi.create(eventData)
      setSuccess('✅ Event created successfully!')
      
      setFormData({
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
      removeImage()
      
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
      
    } catch (err) {
      console.error('Error creating event:', err)
      
      if (err.message && err.message.includes('401')) {
        localStorage.removeItem('token')
        navigate('/login')
        return
      }
      
      setError(err.message || 'Failed to create event')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      
      <div 
        className="pt-20 min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat relative m-4"
        style={{ 
          backgroundImage: `url('/Business.jpg')`,
          backgroundColor: '#1a1a2e',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative z-10 max-w-2xl w-full">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6">
            
            <h2 className="text-2xl font-bold text-center text-white mb-1">
              Create Event
            </h2>
            <p className="text-center text-white/60 text-sm mb-5">
              Fill in the details to create a new event
            </p>

            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm text-white p-2.5 rounded-lg mb-3 text-sm border border-red-500/30">
                ⚠️ {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/20 backdrop-blur-sm text-white p-2.5 rounded-lg mb-3 text-sm border border-green-500/30">
                ✅ {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Row 1: Event Name + Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Event Name *</label>
                  <input
                    id="eventName"
                    type="text"
                    value={formData.eventName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-white/40 text-sm"
                    placeholder="Enter event name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Category</label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 text-white text-sm"
                  >
                    <option value="" className="text-gray-900">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="text-gray-900">{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Venue + Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Venue *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      id="eventvenue"
                      type="text"
                      value={formData.eventvenue}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-white/40 text-sm"
                      placeholder="Venue name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Location</label>
                  <input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-white/40 text-sm"
                    placeholder="City, State"
                  />
                </div>
              </div>

              {/* Row 3: Date + Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Date & Time *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      id="eventDate"
                      type="datetime-local"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 text-white text-sm [color-scheme:dark]"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Price</label>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 text-sm text-white/70 cursor-pointer whitespace-nowrap">
                      <input
                        id="isFree"
                        type="checkbox"
                        checked={formData.isFree}
                        onChange={handleChange}
                        className="rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-400"
                      />
                      Free
                    </label>
                    {!formData.isFree && (
                      <div className="flex-1 relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          id="price"
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.price}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-white/40 text-sm"
                          placeholder="0.00"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Row 4: Total Tickets + Virtual Event */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Total Tickets *</label>
                  <div className="relative">
                    <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      id="totalTickets"
                      type="number"
                      min="1"
                      value={formData.totalTickets}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-white/40 text-sm"
                      placeholder="Number of tickets"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <div className="flex items-center gap-2 mb-0.5">
                    <input
                      id="isVirtual"
                      type="checkbox"
                      checked={formData.isVirtual}
                      onChange={handleChange}
                      className="rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-400"
                    />
                    <label htmlFor="isVirtual" className="text-sm text-white/80 cursor-pointer">
                      Virtual Event
                    </label>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-white/80 mb-1">Event Image</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer">
                    <div className="flex items-center gap-2 px-3 py-1.5 border border-white/20 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-300">
                      <Upload className="w-4 h-4 text-white/60" />
                      <span className="text-sm text-white/70">Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 transition"
                    >
                      <X className="w-4 h-4" /> Remove
                    </button>
                  )}
                </div>
                
                {imagePreview && (
                  <div className="mt-2 relative w-24 h-24">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-24 h-24 object-cover rounded-lg border border-white/20"
                    />
                    <div className="absolute top-1 right-1 bg-black/50 rounded-full p-1">
                      <ImageIcon className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
                <p className="text-xs text-white/40 mt-1">Upload JPG, PNG or GIF (Max 5MB)</p>
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-white/80 mb-1">Description *</label>
                <textarea
                  id="eventDescription"
                  rows="3"
                  value={formData.eventDescription}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-white/40 text-sm resize-none"
                  placeholder="Describe your event..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-2 rounded-lg font-medium transition-all duration-300 ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {loading ? 'Creating Event...' : 'Create Event'}
              </button>
            </form>

            <p className="text-center mt-4 text-sm text-white/60">
              Return to{' '}
              <Link to="/dashboard" className="text-indigo-300 hover:text-indigo-200 hover:underline font-medium transition">
                Dashboard
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default CreateEvent