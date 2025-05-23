// src/components/HeroSectionIN.jsx
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import axiosInstance from '../api/axiosInstance'; 

export default function HeroSectionIN({ scrollToSection, username }) {

  // Ping backend on component mount
  useEffect(() => {
    axiosInstance.get('/')
      .then(res => console.log('✅ Backend says:', res.data))
      .catch(err => console.error('❌ Backend error:', err));
  }, []);

  return (
    <section
      id="dashboard"
      className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 bg-gradient-to-br from-teal-200 to-teal-50"
    >
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4">
          👩‍⚕️ Welcome back, Doctor
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Ready to input new patient data or view your analytics? Let's keep your patients on track.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => scrollToSection('fusionInput')}
            className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition duration-300 flex items-center justify-center"
          >
            Enter Patient Data
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button
            onClick={() => scrollToSection('interactiveDashboard')}
            className="px-6 py-3 border border-teal-600 text-teal-600 font-medium rounded-lg hover:bg-teal-50 transition duration-300"
          >
            View Dashboard
          </button>
        </div>
      </div>
    </section>
  );
}