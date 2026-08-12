import { Link } from 'react-router-dom'
import Navbar from '../shared/components/Navbar'
import './Home.css'

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <h1>Discover Amazing Events</h1>
        <p>
          Browse concerts, conferences, festivals and book tickets online.
        </p>

        <Link to="/events" className="hero-btn">
          Explore Events
        </Link>
      </section>
    </>
  )
}