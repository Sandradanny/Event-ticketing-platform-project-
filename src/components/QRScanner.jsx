// src/components/QRScanner.jsx
import React, { useState } from 'react'
import { X } from 'lucide-react'

const QRScanner = ({ onScanSuccess, onClose }) => {
  const [error, setError] = useState('')

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Scan QR Code</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="w-full aspect-square bg-gray-200 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">📷</div>
            <p className="text-gray-500 text-sm">Position QR code in frame</p>
            <p className="text-gray-400 text-xs mt-1">Camera access required</p>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="mt-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onScanSuccess && onScanSuccess('Ticket-12345-Scanned')
            }}
            className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Simulate Scan
          </button>
        </div>

        <p className="mt-4 text-xs text-gray-400 text-center">
          Allow camera access when prompted by your browser
        </p>
      </div>
    </div>
  )
}

export default QRScanner