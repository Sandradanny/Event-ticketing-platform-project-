
import React from 'react'
import { Zap, Ticket, LockKeyhole } from 'lucide-react'


const About = () => {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background Blob */}
      
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-4 md:px-0">
        <div >
          <div className="w-full md:w-1/2 m-2 ">
          <img 
            className="w-full max-w-sm mx-auto rounded-xl h-auto object-cover shadow-lg"
            src="/ticket-man.png"
            alt="Man excitedly holding event tickets"
          />
        </div>
        <div className="w-full h-full md:w-1/2">
          <img 
            className="w-full max-w-sm mx-auto rounded-xl h-auto object-cover shadow-lg"
            src="/Couples-ticket.jpg"
            alt="Man excitedly holding event tickets"
          />
        </div>


        </div>
        
        
        
        
        {/* Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Make Every Event an Experience
          </h2>

          <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto md:mx-0">
            Discover exciting events, secure your tickets in seconds, and
            get ready for experiences you will never forget.
          </p>

          <div className="flex flex-col gap-6 mt-8">

            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded-lg shrink-0 flex items-center justify-center mt-1">
                <Zap className="w-5 h-5 text-indigo-600" />
              </div>

              <div>
                <h3 className="text-base font-medium text-gray-700">
                  Fast & Easy Ticketing
                </h3>

                <p className="text-sm text-slate-500">
                  Find your event, choose your ticket, and check out with a
                  simple, seamless experience.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded-lg shrink-0 flex items-center justify-center mt-1">
                <Ticket className="w-5 h-5 text-indigo-600" />
              </div>

              <div>
                <h3 className="text-base font-medium text-gray-700">
                  Discover Events You'll Love
                </h3>

                <p className="text-sm text-slate-500">
                  Explore concerts, conferences, parties, festivals, and
                  more—all in one place.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded-lg shrink-0 flex items-center justify-center mt-1">
                <LockKeyhole className="w-5 h-5 text-indigo-600" />
              </div>

              <div>
                <h3 className="text-base font-medium text-gray-700">
                  Secure & Reliable Tickets
                </h3>

                <p className="text-sm text-slate-500">
                  Your tickets are securely generated and always available
                  when you need them, making event entry simple and stress-free.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default About

