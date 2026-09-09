import React from 'react'
import EventCard from './EventCard'

const SuccessfulEvents = () => {
  const events = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1657560566744-06d0b69f6647?q=80&w=600&auto=format&fit=crop',
      price: '29.00',
      title: 'Chris Jordan Live',
      description: 'Looks amazing out of the box. I barely had to customize anything.',
      date: 'Dec 15, 2024',
      location: 'New York, NY',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop',
      price: '45.00',
      title: 'Tech Conference 2024',
      description: 'Join the biggest tech event of the year with industry leaders.',
      date: 'Jan 20, 2025',
      location: 'San Francisco, CA',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=600&auto=format&fit=crop',
      price: '35.00',
      title: 'Summer Music Festival',
      description: 'An unforgettable weekend of music, food, and fun in the sun.',
      date: 'Apr 10, 2025',
      location: 'Miami, FL',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=600&auto=format&fit=crop',
      price: '50.00',
      title: 'Art & Design Expo',
      description: 'Explore the latest trends in art, design, and creative technology.',
      date: 'May 5, 2024',
      location: 'National musuem,Ibadan',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=600&auto=format&fit=crop',
      price: '20.00',
      title: 'Foodie Festival',
      description: 'Taste the best cuisines from around the world in one place.',
      date: 'Nov 12, 2025',
      location: 'National Park',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop',
      price: '60.00',
      title: 'Wellness Retreat',
      description: 'Recharge your mind, body, and soul with expert-led sessions.',
      date: 'Dec 8, 2025',
      location: 'Eko hotel',
    },
  ]

  const handleAddToCart = (eventTitle) => {
    console.log(`Added ${eventTitle} to cart`)
    alert(`Added "${eventTitle}" to cart!`)
  }

  const handleBookNow = (eventTitle) => {
    console.log(`Booking ${eventTitle} now`)
    alert(`Proceeding to checkout for "${eventTitle}"`)
  }

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Successful Events
          </h2>
          <p className="text-gray-500 mt-2">
            Join thousands of satisfied attendees at our top-rated events
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              image={event.image}
              price={event.price}
              title={event.title}
              description={event.description}
              date={event.date}
              location={event.location}
              onAddToCart={() => handleAddToCart(event.title)}
              onBuyNow={() => handleBookNow(event.title)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SuccessfulEvents