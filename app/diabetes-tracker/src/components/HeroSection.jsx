// src/components/HeroSection.jsx
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import axiosInstance from '../api/axiosInstance'; // import Axios instance

export default function HeroSection({ scrollToSection }) {

  // Ping backend on component mount
  useEffect(() => {
    axiosInstance.get('/')
      .then(res => console.log("✅ Backend says:", res.data))
      .catch(err => console.error("❌ Backend error:", err));
  }, []);
  const registerUser = async () => {
    try {
      const res = await axiosInstance.post('/register', {
        username: "testuser",
        email: "testuser@example.com",
        password: "test123456",
        role: "doctor"
      });
      console.log("✅ User registered:", res.data);
    } catch (err) {
      console.error("❌ Error registering:", err.response?.data || err.message);
    }
  };
  return (
    <section 
      id="home" 
      className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 bg-gradient-to-br from-blue-50 to-indigo-50"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Smart Diabetes Management <span className="text-blue-600">Made Simple</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              Track, monitor, and manage Type 2 Diabetes with our comprehensive solution. Make data-driven decisions for better health outcomes.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => scrollToSection('dashboard')}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              >
                Start Tracking
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition duration-300"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center md:justify-end relative">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 bg-blue-500 rounded-full w-12 h-12 animate-pulse opacity-30"></div>
              <div className="absolute -bottom-4 -right-4 bg-indigo-500 rounded-full w-16 h-16 animate-pulse opacity-20"></div>
              <img 
                src="https://cdn.iconscout.com/icon/free/png-512/free-medical-report-icon-download-in-svg-png-gif-file-formats--health-pack-healthcare-icons-1821031.png?f=webp&w=512" 
                alt="Dashboard preview" 
                className="rounded-lg shadow-xl z-10 relative border-4 border-white"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}