// src/components/QRScanner.jsx
import React, { useState, useRef, useEffect } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Camera, X, CheckCircle, AlertCircle } from 'lucide-react'

const QRScanner = ({ onScanSuccess, onClose }) => {
  const [scanning, setScanning] = useState(true)
  const [error, setError] = useState('')
  const [permission, setPermission] = useState(null)
  const scannerRef = useRef(null)
  const html5QrCodeRef = useRef(null)

  useEffect(() => {
    // Check if camera permission is granted
    const checkPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        stream.getTracks().forEach(track => track.stop())
        setPermission(true)
        startScanner()
      } catch (err) {
        console.error('Camera permission denied:', err)
        setPermission(false)
        setError('Camera access is required to scan tickets. Please allow camera access.')
      }
    }

    checkPermission()

    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(err => console.log('Stop error:', err))
        html5QrCodeRef.current = null
      }
    }
  }, [])

  const startScanner = () => {
    if (!scannerRef.current) return

    try {
      const html5QrCode = new Html5Qrcode('qr-reader')
      html5QrCodeRef.current = html5QrCode

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      }

      html5QrCode.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        (errorMessage) => {
          // This is called on every frame - ignore errors
          // console.log('Scanning...')
        }
      )
    } catch (err) {
      console.error('Error starting scanner:', err)
      setError('Failed to start camera. Please refresh and try again.')
    }
  }

  const handleRetry = () => {
    setError('')
    setPermission(null)
    startScanner()
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Camera className="w-5 h-5 text-indigo-600" />
            Scan QR Code
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Scanner Area */}
        <div className="relative">
          <div
            id="qr-reader"
            ref={scannerRef}
            className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden"
          />
          
          {/* Scanner Overlay */}
          {scanning && permission !== false && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 border-2 border-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-indigo-500 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-indigo-500 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-indigo-500 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-indigo-500 rounded-br-lg"></div>
              </div>
            </div>
          )}

          {/* Loading Overlay */}
          {!permission && !error && (
            <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-xl">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mb-4"></div>
              <p className="text-gray-600">Requesting camera access...</p>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-600">{error}</p>
                {permission === false && (
                  <button
                    onClick={handleRetry}
                    className="mt-2 text-sm text-indigo-600 hover:underline font-medium"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-4 text-sm text-gray-500 text-center">
          <p>Position the QR code within the frame to scan</p>
          <p className="text-xs text-gray-400 mt-1">Make sure the QR code is well-lit and clear</p>
        </div>

        {/* Permission Guide */}
        {permission === false && (
          <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-700">
              To enable camera access:
            </p>
            <ol className="text-xs text-yellow-600 mt-1 list-decimal list-inside">
              <li>Click the camera icon in your browser's address bar</li>
              <li>Select "Allow" for camera access</li>
              <li>Refresh the page</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}

export default QRScanner