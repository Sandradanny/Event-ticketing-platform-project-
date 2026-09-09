import React from 'react'
import { Link } from 'react-router-dom'
import { Ticket } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="flex flex-wrap justify-center lg:justify-between gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 bg-black">
      {/* Left Section - Logo & Links */}
      <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Ticket className="h-8 w-8 text-indigo-500" />
          <span className="text-xl font-bold text-white">
            Event<span className="text-indigo-500">Hub</span>
          </span>
        </Link>

        {/* Product Links */}
        <div>
          <p className="text-slate-100 font-semibold">Product</p>
          <ul className="mt-2 space-y-2">
            <li><Link to="/" className="hover:text-indigo-600 transition">Home</Link></li>
            <li><Link to="/events" className="hover:text-indigo-600 transition">Events</Link></li>
            <li><Link to="/create-event" className="hover:text-indigo-600 transition">Create Event</Link></li>
            <li><Link to="/dashboard" className="hover:text-indigo-600 transition">Dashboard</Link></li>
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <p className="text-slate-100 font-semibold">Resources</p>
          <ul className="mt-2 space-y-2">
            <li><Link to="/about" className="hover:text-indigo-600 transition">About Us</Link></li>
            <li><Link to="/my-tickets" className="hover:text-indigo-600 transition">My Tickets</Link></li>
            <li><Link to="/events" className="hover:text-indigo-600 transition">Browse Events</Link></li>
            <li>
              <Link to="/careers" className="hover:text-indigo-600 transition">
                Careers
              
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <p className="text-slate-100 font-semibold">Legal</p>
          <ul className="mt-2 space-y-2">
            <li><Link to="/privacy" className="hover:text-indigo-600 transition">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-indigo-600 transition">Terms</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link></li>
          </ul>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
        <p className="max-w-60 text-gray-400">
          Making every event memorable — from discovery to the final encore.
        </p>
        
        {/* Social Icon*/}
        <div className="flex items-center gap-4 mt-3">
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-500 transition text-sm">
            Twitter
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-500 transition text-sm">
            LinkedIn
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-500 transition text-sm">
            GitHub
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-500 transition text-sm">
            YouTube
          </a>
        </div>
        
        <p className="mt-3 text-center text-gray-500 text-xs">
          © 2025 <span className="text-white font-medium">EventHub</span>. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer