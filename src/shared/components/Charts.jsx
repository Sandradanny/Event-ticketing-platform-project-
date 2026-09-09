// src/components/Charts.jsx
import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { TrendingUp } from 'lucide-react'

const Charts = () => {
  // Sample data - replace with real data from your API
  const monthlyData = [
    { month: 'Jan', tickets: 120, revenue: 2400 },
    { month: 'Feb', tickets: 150, revenue: 3000 },
    { month: 'Mar', tickets: 180, revenue: 3600 },
    { month: 'Apr', tickets: 220, revenue: 4400 },
    { month: 'May', tickets: 280, revenue: 5600 },
    { month: 'Jun', tickets: 350, revenue: 7000 },
    { month: 'Jul', tickets: 400, revenue: 8000 },
    { month: 'Aug', tickets: 380, revenue: 7600 },
    { month: 'Sep', tickets: 320, revenue: 6400 },
    { month: 'Oct', tickets: 290, revenue: 5800 },
    { month: 'Nov', tickets: 410, revenue: 8200 },
    { month: 'Dec', tickets: 500, revenue: 10000 },
  ]

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-semibold text-white">Analytics</h2>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#252525] rounded-lg p-4">
          <p className="text-gray-400 text-xs">Total Tickets</p>
          <p className="text-2xl font-bold text-white">3,500</p>
          <span className="text-green-400 text-xs">↑ 12%</span>
        </div>
        <div className="bg-[#252525] rounded-lg p-4">
          <p className="text-gray-400 text-xs">Total Revenue</p>
          <p className="text-2xl font-bold text-white">$70,000</p>
          <span className="text-green-400 text-xs">↑ 8%</span>
        </div>
        <div className="bg-[#252525] rounded-lg p-4">
          <p className="text-gray-400 text-xs">Events</p>
          <p className="text-2xl font-bold text-white">24</p>
          <span className="text-green-400 text-xs">↑ 5%</span>
        </div>
        <div className="bg-[#252525] rounded-lg p-4">
          <p className="text-gray-400 text-xs">Categories</p>
          <p className="text-2xl font-bold text-white">8</p>
          <span className="text-green-400 text-xs">↑ 3%</span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                borderColor: '#333',
                color: '#fff'
              }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Bar dataKey="tickets" fill="#6366f1" name="Tickets" />
            <Bar dataKey="revenue" fill="#8b5cf6" name="Revenue ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Charts