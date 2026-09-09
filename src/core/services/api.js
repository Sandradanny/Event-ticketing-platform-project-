// src/core/services/api.js

const API_BASE_URL = '/api'

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `Request failed: ${response.status}`)
  }
  return response.json()
}

const getToken = () => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('Please login first')
  return token
}

// ============ USER API ============
export const userApi = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/User/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        role: 1
      }),
    })
    return handleResponse(response)
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/User/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })
    return handleResponse(response)
  }
}

// ============ EVENTS API ============
export const eventApi = {
  getAll: async (pageNumber = 1, pageSize = 10) => {
    const response = await fetch(`${API_BASE_URL}/Events?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    return handleResponse(response)
  },

  getById: async (eventId) => {
    const response = await fetch(`${API_BASE_URL}/Events/${eventId}`)
    return handleResponse(response)
  },

  create: async (eventData) => {
    const token = getToken()
    const response = await fetch(`${API_BASE_URL}/Events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        eventName: eventData.eventName,
        eventDescription: eventData.eventDescription,
        eventvenue: eventData.eventvenue,
        eventDate: eventData.eventDate,
        price: eventData.price || 0,
        image: eventData.image || '',
        totalTickets: eventData.totalTickets || 0,
        category: eventData.category || '',
        isVirtual: eventData.isVirtual || false,
        isFree: eventData.isFree || false
      }),
    })
    return handleResponse(response)
  },

  update: async (eventId, eventData) => {
    const token = getToken()
    const response = await fetch(`${API_BASE_URL}/Events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        eventName: eventData.eventName,
        eventDescription: eventData.eventDescription,
        eventvenue: eventData.eventvenue,
        eventDate: eventData.eventDate,
        price: eventData.price || 0,
        image: eventData.image || '',
        totalTickets: eventData.totalTickets || 0,
        category: eventData.category || '',
        isVirtual: eventData.isVirtual || false,
        isFree: eventData.isFree || false
      }),
    })
    return handleResponse(response)
  },

  delete: async (eventId) => {
    const token = getToken()
    const response = await fetch(`${API_BASE_URL}/Events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return handleResponse(response)
  },

  search: async (searchTerm, venue, eventDate) => {
    let url = `${API_BASE_URL}/Events/search?`
    if (searchTerm) url += `SearchTerm=${encodeURIComponent(searchTerm)}&`
    if (venue) url += `Venue=${encodeURIComponent(venue)}&`
    if (eventDate) url += `EventDate=${new Date(eventDate).toISOString()}`
    
    if (url.endsWith('&')) {
      url = url.slice(0, -1)
    }
    
    const response = await fetch(url)
    return handleResponse(response)
  }
}

// ============ BOOKING API ============
export const bookingApi = {
  // GET /api/Booking/my-bookings - Get all bookings for current user
  getMyBookings: async () => {
    const token = getToken()
    const response = await fetch(`${API_BASE_URL}/Booking/my-bookings`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return handleResponse(response)
  },

  // GET /api/Booking/{id} - Get booking by ID
  getById: async (bookingId) => {
    const token = getToken()
    const response = await fetch(`${API_BASE_URL}/Booking/${bookingId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return handleResponse(response)
  },

  // GET /api/Booking/event/{eventId} - Get bookings by event
  getByEventId: async (eventId) => {
    const token = getToken()
    const response = await fetch(`${API_BASE_URL}/Booking/event/${eventId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return handleResponse(response)
  },

  //  POST /api/Booking/reserve - Create a new booking with createdBy
  reserve: async (bookingData) => {
    const token = getToken()
    
    //  Get user info from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    
    //  Send the user ID
    const createdBy = user.id || user.userId || user.sub
    
    //  If no user ID is found, throw an error
    if (!createdBy) {
      console.error(' No user ID found in localStorage:', user)
      throw new Error('User not authenticated. Please login again.')
    }
    
    console.log(' Creating booking with data:', {
      ...bookingData,
      createdBy: createdBy
    })
    
    const response = await fetch(`${API_BASE_URL}/Booking/reserve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        eventId: bookingData.eventId,
        items: bookingData.items,
        createdBy: createdBy  
      }),
    })
    return handleResponse(response)
  },

  //  POST /api/Booking/{bookingId}/payment - Process payment
  processPayment: async (bookingId, paymentData) => {
    const token = getToken()
    
    console.log(' Processing payment for booking:', bookingId)
    console.log('Payment data:', paymentData)
    
    const response = await fetch(`${API_BASE_URL}/Booking/${bookingId}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        bookingId: bookingId,
        paymentMethod: paymentData.paymentMethod || 'CreditCard',
        transactionReference: paymentData.transactionReference || `TXN-${Date.now()}`
      }),
    })
    return handleResponse(response)
  },

  // POST /api/Booking/{bookingId}/cancel - Cancel a booking
  cancel: async (bookingId) => {
    const token = getToken()
    const response = await fetch(`${API_BASE_URL}/Booking/${bookingId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return handleResponse(response)
  },

  // GET /api/Booking/{bookingId}/tickets - Get tickets for a booking
  getTickets: async (bookingId) => {
    const token = getToken()
    const response = await fetch(`${API_BASE_URL}/Booking/${bookingId}/tickets`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return handleResponse(response)
  },

  // GET /api/Booking/{bookingId}/status - Get booking status
  getStatus: async (bookingId) => {
    const token = getToken()
    const response = await fetch(`${API_BASE_URL}/Booking/${bookingId}/status`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return handleResponse(response)
  }
}

// ============ TICKETS API ============
export const ticketApi = {
  getAll: async () => {
    const token = getToken()
    const response = await fetch(`${API_BASE_URL}/Booking/my-tickets`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return handleResponse(response)
  },

  getByBookingId: async (bookingId) => {
    const token = getToken()
    const response = await fetch(`${API_BASE_URL}/Booking/${bookingId}/tickets`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return handleResponse(response)
  }
}