import { Link, useLocation } from 'react-router-dom'
import Navbar from '../Navbar'
import Hero from '../shared/Hero'
import Footer from '../shared/components/Footer'
import SuccessfulEvents from '../shared/components/SuccessfulEvent'  
import About from '../shared/components/About'  
import TestimonyCard from '../shared/components/TestimonyCard'

export default function Home() {
  const location = useLocation()
  const isAdminPath = location.pathname.includes("admin")
  
  return (
    <>
      {!isAdminPath && <Navbar />}
      <Hero />
      
      {/* Upcoming Events Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-gray-600 mb-6">
            Discover the best events happening near you
          </p>
          <Link 
            to="/events" 
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            Browse All Events
          </Link>
        </div>
      </section>

      <About />
      <SuccessfulEvents />
      <TestimonyCard/>
      <Footer />
    </>
  )
}