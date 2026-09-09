// src/pages/SignUp.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, Shield, Users, UserCheck } from 'lucide-react'
import { userApi } from '../core/services/api'
import Navbar from '../Navbar'

const SignUp = () => {
  const navigate = useNavigate()
  
  // ✅ Use numbers for the backend
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 1 // 1 = Customer (default)
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.firstName.trim()) return setError('First name is required')
    if (!formData.lastName.trim()) return setError('Last name is required')
    if (!formData.email.trim()) return setError('Email is required')
    if (formData.password.length < 6) return setError('Password must be at least 6 characters')
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match')

    setLoading(true)
    
    try {
      // ✅ Send role as number (0, 1, or 2)
      const registerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: parseInt(formData.role) // Convert to number
      }
      
      console.log('📤 Sending:', registerData)
      console.log('📤 Role being sent:', registerData.role, typeof registerData.role)
      
      const result = await userApi.register(registerData)
      
      console.log('📥 Response:', result)
      
      navigate('/login')
    } catch (error) {
      console.error('❌ Registration error:', error)
      setError(error.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const getRoleInfo = (role) => {
    const roleNum = parseInt(role)
    switch(roleNum) {
      case 0:
        return { label: 'Admin', icon: Shield, color: 'text-purple-400' }
      case 1:
        return { label: 'Regular User', icon: UserCheck, color: 'text-blue-400' }
      case 2:
        return { label: 'Event Organizer', icon: Users, color: 'text-green-400' }
      default:
        return { label: 'User', icon: User, color: 'text-gray-400' }
    }
  }

  const roleInfo = getRoleInfo(formData.role)
  const RoleIcon = roleInfo.icon

  return (
    <>
      <Navbar />
      
      <div 
        className="pt-20 min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat relative"
        style={{ 
          backgroundImage: `url('/Concert.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8">
            
            <h2 className="text-3xl font-bold text-center text-white mb-2">
              Create Account
            </h2>
            <p className="text-center text-white/70 text-sm mb-8">
              Join EventHub and discover amazing events
            </p>

            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm text-white p-3 rounded-lg mb-4 text-sm border border-red-500/30">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div className="flex-1 mb-4">
                  <label className="block text-sm font-medium text-white/80 mb-1">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-white/50"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="flex-1 mb-4">
                  <label className="block text-sm font-medium text-white/80 mb-1">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-white/50"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-white/80 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-white/50"
                  placeholder="you@email.com"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-white/80 mb-1">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-white/50"
                    placeholder="Min 6 characters"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-white/80 mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-white/50"
                    placeholder="Confirm password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* ✅ Use number values for the select */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Account Type
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <RoleIcon className={`w-4 h-4 ${roleInfo.color}`} />
                  </div>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 text-white appearance-none cursor-pointer"
                  >
                    <option value="1" className="text-gray-900">👤 Regular User</option>
                    <option value="0" className="text-gray-900">🛡️ Admin</option>
                    <option value="2" className="text-gray-900">👥 Event Organizer</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
                    ▼
                  </div>
                </div>
                <p className="text-xs text-white/50 mt-1">
                  {parseInt(formData.role) === 0 ? '🔑 Full access to all features' : 
                   parseInt(formData.role) === 2 ? '📋 Create and manage events' : 
                   '🎫 Browse and book tickets'}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 rounded-lg font-medium transition ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-white/60">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-300 hover:text-indigo-200 hover:underline font-medium transition">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp