// src/pages/Login.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { userApi } from '../core/services/api'
import Navbar from '../Navbar'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const result = await userApi.login({
        email: formData.email,
        password: formData.password,
      })
      
      console.log('🔍 Login result:', result)
      
      // Store token
      if (result.token) {
        localStorage.setItem('token', result.token)
      }
      
      // ✅ Store user data
      const userData = {
        id: result.id || result.userId || result.user?.id,
        email: result.email || result.user?.email || formData.email,
        fullName: result.fullName || result.user?.fullName || result.user?.firstName + ' ' + result.user?.lastName || 'User',
        firstName: result.firstName || result.user?.firstName || 'User',
        lastName: result.lastName || result.user?.lastName || '',
        role: result.role ?? result.user?.role ?? 1
      }
      
      localStorage.setItem('user', JSON.stringify(userData))
      
      console.log('📦 Stored user data:', userData)
      console.log('👤 User role:', userData.role)
      
      // ✅ Check if user is admin (role 0)
      const userRole = userData.role
      
      // Check for admin role (0 = Admin)
      if (userRole === 0 || userRole === '0') {
        console.log('✅ Redirecting to Dashboard (Admin)')
        navigate('/dashboard')
      } else {
        console.log('✅ Redirecting to Events (User)')
        navigate('/events')
      }
      
    } catch (error) {
      console.error('❌ Login error:', error)
      setError(error.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div 
        className="pt-20 min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('/Business.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-2xl shadow-2xl p-8">
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
              <p className="text-white/80 text-sm mt-2">Sign in to your account</p>
            </div>

            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm text-white p-3 rounded-lg mb-4 text-sm border border-red-500/30">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white/80 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-white/50"
                    placeholder="you@email.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm pl-10 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder:text-white/50"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 rounded-lg font-medium transition ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="text-center mt-6 text-sm text-white/70">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-300 hover:text-indigo-200 hover:underline font-medium transition">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}