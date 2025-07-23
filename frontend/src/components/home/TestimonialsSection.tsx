
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "This platform has completely transformed how I manage my health. The AI recommendations are incredibly accurate and the doctors are responsive!",
      name: "Sarah Johnson",
      title: "Patient",
      image: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    {
      quote: "As a healthcare provider, I've seen firsthand how this technology helps patients get better preliminary assessments and streamlines our workflow.",
      name: "Dr. Michael Chen",
      title: "Cardiologist",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The mental health resources available here helped me through a difficult time. I'm grateful for the personalized support this platform offers.",
      name: "Alex Rodriguez",
      title: "Mental Health Advocate",
      image: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

  const partnerLogos = [
    { name: "Memorial Hospital", logo: "https://via.placeholder.com/150x50?text=Memorial+Hospital" },
    { name: "HealthPlus", logo: "https://via.placeholder.com/150x50?text=HealthPlus" },
    { name: "MedTech Solutions", logo: "https://via.placeholder.com/150x50?text=MedTech" },
    { name: "Wellness Partners", logo: "https://via.placeholder.com/150x50?text=Wellness" }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="bg-healthcare-primary/10 text-healthcare-primary rounded-full px-4 py-1.5 text-sm font-medium">Testimonials</span>
          <h2 className="text-3xl font-bold text-healthcare-dark mt-4 mb-4">What Our Users Say</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Hear from people who have experienced the benefits of our healthcare platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="h-12 w-12 rounded-full mr-4 object-cover border-2 border-healthcare-primary/20"
                />
                <div>
                  <h4 className="font-semibold text-healthcare-dark">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20">
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium text-gray-700">Trusted By Leading Healthcare Providers</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
                <img src={partner.logo} alt={partner.name} className="h-10 md:h-12" />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12 gap-6">
            <div className="flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-sm font-medium">256-bit Encryption</span>
            </div>
            <div className="flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-sm font-medium">SOC 2 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
