// src/pages/TicketCheckout.jsx
import React, { useState, useEffect } from 'react'
import { 
  User, Phone, Mail, DollarSign, 
  ShieldCheck, RefreshCcw, 
  CreditCard, ClipboardCheck, Check 
} from 'lucide-react'
import Navbar from '../Navbar'

export default function TicketCheckout() {
  const [time, setTime] = useState({ min: 7, sec: 7 })

  useEffect(() => {
    let seconds = 7 * 60 + 7
    const interval = setInterval(() => {
      seconds--
      if (seconds <= 0) {
        clearInterval(interval)
        setTime({ min: 0, sec: 0 })
        return
      }
      setTime({
        min: Math.floor(seconds / 60),
        sec: seconds % 60,
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = (n) => String(n).padStart(2, '0')

  const steps = [
    { label: 'Tickets', icon: CreditCard },
    { label: 'Payment', icon: ClipboardCheck },
    { label: 'Review', icon: Check },
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0b0b0b] text-white px-4 py-6 pt-24">
        
        {/* Stepper */}
        <div className="flex items-center justify-center max-w-md mx-auto mb-8">
          {steps.map((step, i) => {
            const Icon = step.icon
            const active = i === 2
            const done = i < 2
            return (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    active || done ? 'bg-purple-600' : 'bg-gray-800 border-2 border-gray-600'
                  }`}>
                    <Icon size={16} color="white" />
                  </div>
                  <span className={`text-xs mt-1 ${
                    active ? 'text-purple-400 font-bold' : done ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${done ? 'bg-purple-600' : 'bg-gray-700'}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          
          {/* Event Card */}
          <div className="bg-[#161616] rounded-2xl overflow-hidden border border-gray-800">
            <img
              src="https://images.unsplash.com/photo-1511671782780-372b3c0b5f51?w=600&h=360&fit=crop"
              alt="Event"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-2xl font-bold">Adele</h2>
              <p className="text-sm text-gray-400">Dec 20, 2025 • 8:00 PM</p>
              <p className="text-sm text-gray-400">Las Vegas, NV</p>
              <div className="bg-gray-800 rounded-lg px-3 py-2 my-3">
                <span className="text-sm text-gray-300">Section VIP • Row 7 • Seats 07-08</span>
              </div>
              <p className="text-sm text-green-400">✅ 2 tickets • Seated together</p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-4">
            
            {/* Timer */}
            <div className="bg-[#161616] rounded-2xl border border-gray-800 p-5 text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-4xl font-bold bg-gray-800 px-4 py-2 rounded-lg">{pad(time.min)}</span>
                <span className="text-4xl font-bold text-purple-500">:</span>
                <span className="text-4xl font-bold bg-gray-800 px-4 py-2 rounded-lg">{pad(time.sec)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">left to complete receive ticket</p>
            </div>

            {/* User Info */}
            <div className="bg-[#161616] rounded-2xl border border-gray-800 p-5 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <User size={16} className="text-gray-400" />
                <span>Negar khosravi</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-gray-400" />
                <span>785423349</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-gray-400" />
                <span>negarkhosravi1995@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm border-t border-gray-800 pt-3">
                <DollarSign size={16} className="text-gray-400" />
                <span className="font-semibold">Total: $260</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 py-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition">
                Back
              </button>
              <button className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition font-semibold">
                Pay
              </button>
            </div>

            {/* Guarantees */}
            <div className="bg-[#161616] rounded-2xl border border-gray-800 p-4 space-y-3">
              <div className="flex gap-3">
                <ShieldCheck size={18} className="text-purple-400 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">FanProtect Guarantee</p>
                  <p className="text-xs text-gray-500">Full refund if event is cancelled.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <RefreshCcw size={18} className="text-purple-400 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">Easy Refund</p>
                  <p className="text-xs text-gray-500">Refunds available up to 48 hours before.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}