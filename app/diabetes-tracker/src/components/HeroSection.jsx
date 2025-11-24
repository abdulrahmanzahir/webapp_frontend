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
      className="relative pt-24 pb-20 md:pt-32 md:pb-32 px-4 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 mb-10 md:mb-0 animate-slide-up">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold shadow-sm">
                ✨ AI-Powered Health Insights
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Smart Diabetes Management{' '}
              <span className="gradient-text">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
              Track, monitor, and manage Type 2 Diabetes with our comprehensive AI-powered solution. Make data-driven decisions for better health outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('dashboard')}
                className="btn-modern px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl flex items-center justify-center group"
              >
                Start Tracking
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="btn-modern px-8 py-4 glass-card text-blue-600 font-semibold rounded-xl hover:shadow-xl"
              >
                Learn More
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex gap-8 mt-12">
              <div>
                <div className="text-3xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Monitoring</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">1000+</div>
                <div className="text-sm text-gray-600">Users</div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center md:justify-end relative animate-fade-in">
            <div className="relative w-full max-w-md">
              {/* Floating elements */}
              <div className="absolute -top-8 -left-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl w-16 h-16 animate-float opacity-60 shadow-lg"></div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl w-20 h-20 animate-float opacity-60 shadow-lg" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/4 -right-4 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full w-12 h-12 animate-float opacity-40" style={{animationDelay: '2s'}}></div>
              
              {/* Main image */}
              <div className="relative glass-card p-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img 
                  src="https://cdn.iconscout.com/icon/free/png-512/free-medical-report-icon-download-in-svg-png-gif-file-formats--health-pack-healthcare-icons-1821031.png?f=webp&w=512" 
                  alt="Dashboard preview" 
                  className="rounded-xl w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}