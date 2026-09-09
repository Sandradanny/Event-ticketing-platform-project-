// src/pages/BrowseEvents.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Ticket, Search } from 'lucide-react'
import { eventApi } from '../core/services/api'
import Navbar from '../Navbar'

export default function BrowseEvents() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    filterEvents()
  }, [searchTerm, events])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const data = await eventApi.getAll()
      setEvents(data)
      setFilteredEvents(data)
      setError('')
    } catch (err) {
      console.error('Error fetching events:', err)
      setError('Failed to load events. Please try again.')
      setEvents([])
      setFilteredEvents([])
    } finally {
      setLoading(false)
    }
  }

  const filterEvents = () => {
    let filtered = [...events]

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(event => 
        event.title?.toLowerCase().includes(term) ||
        event.description?.toLowerCase().includes(term) ||
        event.location?.toLowerCase().includes(term) ||
        event.category?.toLowerCase().includes(term)
      )
    }

    setFilteredEvents(filtered)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    filterEvents()
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Browse Events</h1>
            <p className="text-gray-500 mt-1">Discover and book amazing events happening near you</p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
            <form 
              onSubmit={handleSearch}
              className="flex items-center gap-3"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search events by title, location, or category..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
              <button 
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition whitespace-nowrap"
              >
                Search
              </button>
            </form>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
            </p>
            {loading && <span className="text-sm text-gray-400">Loading...</span>}
          </div>

          {/* Events Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <p className="text-red-500">{error}</p>
              <button
                onClick={fetchEvents}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Try Again
              </button>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <p className="text-gray-400 text-lg">No events found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Link
                  key={event.id}
                  to={`/event/${event.id}`}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                        <Ticket className="w-12 h-12 text-indigo-300" />
                      </div>
                    )}
                    {event.category && (
                      <span className="absolute top-3 right-3 px-2 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
                        {event.category}
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">
                      {event.title || 'Untitled Event'}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {event.description || 'No description available'}
                    </p>
                    
                    <div className="space-y-1.5 text-sm text-gray-500">
                      {event.date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.price !== undefined && (
                        <div className="flex items-center gap-2 text-indigo-600 font-medium">
                          <Ticket className="w-4 h-4" />
                          <span>{event.price === 0 ? 'Free' : `$${event.price}`}</span>
                        </div>
                      )}
                    </div>

                    {event.totalTickets && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {event.totalTickets} tickets available
                          </span>
                          <span className="text-xs text-indigo-600 font-medium">
                            Book Now →
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}