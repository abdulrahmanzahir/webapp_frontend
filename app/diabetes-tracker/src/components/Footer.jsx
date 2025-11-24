// src/components/Footer.jsx
import { Droplet, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white py-16 px-4 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg">
                <Droplet className="h-7 w-7 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">DiabTrack</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Making diabetes management simple, effective, and data-driven with AI-powered insights.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: <Facebook className="h-5 w-5" />, href: "#" },
                { icon: <Twitter className="h-5 w-5" />, href: "#" },
                { icon: <Instagram className="h-5 w-5" />, href: "#" },
                { icon: <Linkedin className="h-5 w-5" />, href: "#" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-gradient-to-br hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Dashboard', 'Health Tracking', 'Risk Assessment', 'Resources'].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-300 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                    → {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">Support</h3>
            <ul className="space-y-3">
              {['FAQs', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Help Center'].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-300 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                    → {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">Stay Updated</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">Get the latest diabetes management tips and features.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                className="px-4 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-all"
                placeholder="Your email"
              />
              <button className="btn-modern px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Mail className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-gray-300">support@diabtrack.com</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Phone className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-gray-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-gray-300">San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 <span className="font-semibold text-white">DiabTrack</span>. All rights reserved. Made with ❤️ for better health.
          </p>
        </div>
      </div>
    </footer>
  );
}