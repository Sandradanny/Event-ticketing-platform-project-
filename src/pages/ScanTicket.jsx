// src/pages/ScanTicket.jsx
import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { QrCode, CheckCircle, ArrowLeft, X, Camera, Upload } from 'lucide-react'
import Navbar from '../Navbar'
import QRScanner from '../shared/components/QRScanner'  
import Footer from '../shared/components/Footer'

export default function ScanTicket() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isScanning, setIsScanning] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [showScanner, setShowScanner] = useState(false)
  const [ticketData, setTicketData] = useState(null)
  const [error, setError] = useState('')

  const handleScan = () => {
    setIsScanning(true)
    setError('')
    setTimeout(() => {
      setIsScanning(false)
      setIsVerified(true)
    }, 2000)
  }

  const handleQRScanSuccess = (decodedText) => {
    console.log('QR Code scanned:', decodedText)
    setTicketData(decodedText)
    setIsVerified(true)
    setShowScanner(false)
    setError('')
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <Link 
            to="/my-tickets" 
            className="text-gray-400 hover:text-gray-200 text-sm flex items-center gap-1 mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to My Tickets
          </Link>

          <div className="bg-[#1a1a1a] rounded-2xl shadow-xl border border-gray-800 p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Scan Ticket</h2>
            <p className="text-gray-400 text-sm mb-6">
              {id ? `Ticket #${id.slice(0, 8)}` : 'Scan your ticket QR code'}
            </p>

            {/* QR Code Display */}
            <div className="flex justify-center mb-6">
              <div className="w-48 h-48 bg-[#252525] rounded-2xl border-2 border-dashed border-indigo-500/50 flex items-center justify-center">
                {isVerified ? (
                  <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <p className="text-xs text-green-400 mt-2">Verified</p>
                  </div>
                ) : isScanning ? (
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent"></div>
                ) : (
                  <QrCode className="w-24 h-24 text-indigo-400" />
                )}
              </div>
            </div>

            {/* Status Message */}
            {isVerified ? (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl mb-6">
                <p className="text-green-400 font-semibold">✅ Ticket Verified!</p>
                <p className="text-sm text-green-400/80">
                  {ticketData ? `Ticket: ${ticketData}` : 'This ticket is valid and ready for entry.'}
                </p>
              </div>
            ) : isScanning ? (
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6">
                <p className="text-blue-400 font-semibold">🔄 Scanning...</p>
                <p className="text-sm text-blue-400/80">Please wait while we verify your ticket.</p>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-6">
                <p className="text-red-400 font-semibold">❌ {error}</p>
              </div>
            ) : (
              <div className="p-4 bg-[#252525] border border-gray-700 rounded-xl mb-6">
                <p className="text-gray-400">
                  {id ? 'Click the button below to scan your ticket' : 'Scan a ticket to verify its authenticity'}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {!isVerified && !isScanning && (
                <>
                  <button
                    onClick={() => setShowScanner(true)}
                    className="py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Camera className="w-5 h-5" />
                    Open Camera
                  </button>
                  <button
                    onClick={handleScan}
                    className="py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <Upload className="w-5 h-5" />
                    Upload QR Code Image
                  </button>
                </>
              )}
              
              {isVerified && (
                <button
                  onClick={() => {
                    setIsVerified(false)
                    setIsScanning(false)
                    setTicketData(null)
                    setError('')
                  }}
                  className="py-3 bg-[#252525] border border-gray-700 text-gray-300 rounded-xl hover:bg-[#333333] transition"
                >
                  Scan Another Ticket
                </button>
              )}
            </div>

            {/* Ticket Info */}
            <div className="mt-6 pt-6 border-t border-gray-800 text-left text-sm">
              <p className="text-gray-500">Ticket Information:</p>
              <p className="text-gray-400 font-mono text-xs mt-1 break-all">
                ID: {id || 'N/A'}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Status: {isVerified ? '✅ Verified' : '⏳ Pending'}
              </p>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="mt-4 text-gray-500 hover:text-gray-300 text-sm flex items-center justify-center gap-1 transition"
            >
              <X className="w-4 h-4" /> Close
            </button>
          </div>
        </div>
      </div>

      {/* QR Scanner Modal */}
      {showScanner && (
        <QRScanner
          onScanSuccess={handleQRScanSuccess}
          onClose={() => setShowScanner(false)}
        />
      )}
      <Footer />
    </>
  )
}