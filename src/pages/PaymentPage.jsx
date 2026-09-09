// src/pages/PaymentPage.jsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { bookingApi } from '../core/services/api'
import { CreditCard, Lock, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react'
import Navbar from '../Navbar'
import Footer from '../shared/components/Footer'

const PaymentPage = () => {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('CreditCard')
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails()
    }
  }, [bookingId])

  const fetchBookingDetails = async () => {
    try {
      setLoading(true)
      const data = await bookingApi.getById(bookingId)
      setBookingDetails(data)
    } catch (error) {
      console.error('Failed to fetch booking:', error)
      setError('Failed to load booking details')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCardDetails(prev => ({ ...prev, [name]: value }))
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    setCardDetails(prev => ({ ...prev, cardNumber: formatted }))
  }

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4)
    }
    setCardDetails(prev => ({ ...prev, expiryDate: value }))
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setError('')
    
    // Validate card details
    if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length < 16) {
      setError('Please enter a valid card number')
      return
    }
    if (!cardDetails.cardHolder) {
      setError('Please enter card holder name')
      return
    }
    if (!cardDetails.expiryDate || cardDetails.expiryDate.length < 5) {
      setError('Please enter valid expiry date (MM/YY)')
      return
    }
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      setError('Please enter valid CVV')
      return
    }

    try {
      setProcessing(true)
      
      const paymentData = {
        bookingId: bookingId,
        paymentMethod: paymentMethod,
        transactionReference: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`
      }
      
      const response = await bookingApi.processPayment(bookingId, paymentData)
      
      console.log('✅ Payment successful:', response)
      setSuccess(true)
      
      setTimeout(() => {
        navigate('/my-tickets')
      }, 2000)
      
    } catch (error) {
      console.error('Payment failed:', error)
      setError(error.message || 'Payment failed. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen bg-[#0f0f0f] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        </div>
        <Footer />
      </>
    )
  }

  if (success) {
    return (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full border border-gray-800 text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
            <p className="text-gray-400 mb-6">Your tickets have been confirmed.</p>
            <p className="text-gray-500 text-sm">Redirecting to your tickets...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // ✅ If no bookingId is provided, show a message
  if (!bookingId) {
    return (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full border border-gray-800 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Payment</h1>
            <p className="text-gray-400 mb-4">No booking selected for payment.</p>
            <p className="text-gray-500 text-sm">Please select a booking to pay for.</p>
            <button
              onClick={() => navigate('/my-tickets')}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
            >
              Go to My Tickets
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-[#0f0f0f] py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Payment Form */}
            <div className="md:col-span-2">
              <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
                <h1 className="text-2xl font-bold text-white mb-6">Payment Details</h1>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4">
                    {error}
                  </div>
                )}

                <form onSubmit={handlePayment}>
                  {/* Payment Method */}
                  <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('CreditCard')}
                        className={`p-3 rounded-lg border-2 transition ${
                          paymentMethod === 'CreditCard'
                            ? 'border-indigo-500 bg-indigo-500/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <CreditCard className="w-6 h-6 text-gray-300 mx-auto" />
                        <span className="text-gray-300 text-sm mt-1 block">Credit Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('PayPal')}
                        className={`p-3 rounded-lg border-2 transition ${
                          paymentMethod === 'PayPal'
                            ? 'border-indigo-500 bg-indigo-500/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <span className="text-lg font-bold text-gray-300">PayPal</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Number */}
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength="19"
                      className="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>

                  {/* Card Holder */}
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      name="cardHolder"
                      placeholder="John Doe"
                      value={cardDetails.cardHolder}
                      onChange={handleInputChange}
                      className="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Expiry Date */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={cardDetails.expiryDate}
                        onChange={handleExpiryChange}
                        maxLength="5"
                        className="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
                      />
                    </div>

                    {/* CVV */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        CVV
                      </label>
                      <input
                        type="password"
                        name="cvv"
                        placeholder="***"
                        value={cardDetails.cvv}
                        onChange={handleInputChange}
                        maxLength="4"
                        className="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Pay Now
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 sticky top-20">
                <h2 className="text-lg font-bold text-white mb-4">Order Summary</h2>
                
                {bookingDetails && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-400">
                      <span>Booking ID</span>
                      <span className="text-white font-mono text-sm">
                        #{bookingId?.substring(0, 8)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-gray-400">
                      <span>Tickets</span>
                      <span className="text-white">{bookingDetails.items?.length || 0}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span className="text-white">${bookingDetails.totalAmount || 0}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-400">
                      <span>Tax</span>
                      <span className="text-white">$0.00</span>
                    </div>
                    
                    <div className="border-t border-gray-700 pt-3 mt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-white">Total</span>
                        <span className="text-indigo-400">
                          ${bookingDetails.totalAmount || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PaymentPage