const AboutUs = () => {
  const testimonials = [
    {
      name: "Victor A",
      role: "Event Attendee",
      message:
        "EventHub made finding and booking events so easy. The whole process was smooth and straightforward!",
    },
    {
      name: "Stella Michael",
      role: "Event Organizer",
      message:
        "As an event organizer, EventHub has made it much easier to reach people and manage my events.",
    },
    {
      name: "Olalekan Abioye",
      role: "Event Attendee",
      message:
        "I found an amazing event through EventHub and the booking process was quick and stress-free. I definitely recommend it!",
    },
  ];

  return (
    <div className="py-12 px-6">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          About<span className="text-blue-600">Us</span>
        </h1>

        <p className="text-gray-600 mt-2">
          What our clients say about us
        </p>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300"
          >
            {/* Stars */}
            <div className="text-yellow-400 text-xl mb-4">
              ★★★★★
            </div>

            {/* Testimonial */}
            <p className="text-gray-600 leading-relaxed mb-6">
              "{testimonial.message}"
            </p>

            {/* Customer */}
            <div>
              <h3 className="font-bold text-gray-800">
                {testimonial.name}
              </h3>

              <p className="text-sm text-gray-500">
                {testimonial.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;