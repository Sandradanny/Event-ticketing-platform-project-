import React from "react";

const TestimonyCard = () => {
  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Sandra",
      message: "This is an amazing service! I've never experienced anything like it before. The team was professional and delivered beyond my expectations.",
      
    },
    {
      id: 2,
      name: "Joseph",
      message: "Absolutely fantastic! The attention to detail and customer service was outstanding. I highly recommend their services to everyone.",
      
    },
    {
      id: 3,
      name: "Brownson",
      message: "Great experience from start to finish. The team was responsive, knowledgeable, and truly cared about my satisfaction.",
      
    }
  ];

  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          <span className="text-blue-600">Our Clients</span> Testimonies
        </h1>
        <p className="text-gray-600 mt-2">What our clients say about us</p>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            {/* User Info */}
            <div className="flex items-center mb-4">
              
              <h2 className="font-bold text-xl text-gray-700">
                {testimonial.name}
              </h2>
            </div>

            {/* Message */}
            <p className="text-gray-600 flex-grow">
              {testimonial.message}
            </p>

            {/* Read More Link */}
            <a 
              href="#" 
              className="text-blue-600 hover:text-blue-800 hover:underline mt-3 inline-block transition-colors duration-200"
            >
              Read more...
            </a>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-10">
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          View More Testimonials
        </button>
      </div>
    </div>
  );
};

export default TestimonyCard;