import React from 'react'
import {CalendarDays, MapPin} from 'lucide-react'

const EventCard = ({ 
  image, 
  price, 
  title, 
  description, 
  date, 
  location, 
   
  onBookNow 
}) => {
  return (
    <div className="flex flex-col bg-white shadow-md w-72 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img 
        className='w-72 h-48 object-cover' 
        src={image} 
        alt={title} 
      />
      
      <div className="p-4 text-sm">
        <p className="text-indigo-600 font-semibold">${price}</p>
        <p className="text-slate-800 text-base font-medium my-1.5">{title}</p>
        <p className="text-slate-500 text-xs">{description}</p>
        
        {/* Date and Location */}
        <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
          <span><CalendarDays/>{date}</span>
          <span><MapPin /> {location}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-3">
          
          <button 
          disabled
            onClick={onBookNow}
            className="bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-900 transition" 
          >
            Past Event
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventCard