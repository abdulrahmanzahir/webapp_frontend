// src/components/TestimonialsSection.jsx

export default function TestimonialsSection() {
    const testimonials = [
      {
        name: "John D.",
        initials: "JD",
        description: "Type 2 Patient, 3 years",
        quote: "This app completely changed how I manage my diabetes. My A1C dropped from 7.8 to 6.3 in just six months by following the insights and recommendations.",
        stars: 5,
        color: "blue"
      },
      {
        name: "Sarah M.",
        initials: "SM",
        description: "Pre-diabetic, 1 year",
        quote: "The lifestyle tracking features helped me identify which foods were spiking my blood sugar. Now I'm no longer pre-diabetic and feel in control of my health.",
        stars: 5,
        color: "purple"
      },
      {
        name: "Robert J.",
        initials: "RJ",
        description: "Type 2 Patient, 5 years",
        quote: "Being able to share my data directly with my healthcare provider has transformed my doctor visits. We can make informed decisions based on comprehensive data.",
        stars: 4,
        color: "green"
      }
    ];
  
    return (
      <section id="testimonials" className="py-16 px-4 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our platform has helped people effectively manage their diabetes.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className={`h-12 w-12 rounded-full bg-${testimonial.color}-100 flex items-center justify-center text-${testimonial.color}-600 font-bold`}>
                    {testimonial.initials}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.description}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </div>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${i < testimonial.stars ? 'fill-current' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
  
          <div className="mt-12 text-center">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 flex items-center mx-auto">
              Start Your Journey
              <svg className="ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    );
  }  