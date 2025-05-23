// src/components/Footer.jsx
import { Droplet } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Droplet className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">DiabTrack</span>
            </div>
            <p className="text-gray-400 mb-4">
              Making diabetes management simple, effective, and data-driven.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-facebook h-6 w-6"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-twitter h-6 w-6"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-instagram h-6 w-6"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Dashboard</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Health Tracking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Risk Assessment</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Resources</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Stay updated with the latest diabetes management tips and features.</p>
            <div className="flex">
              <input 
                type="email" 
                className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                placeholder="Your email"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center">
          <p className="text-gray-400">
            © 2025 DiabTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}