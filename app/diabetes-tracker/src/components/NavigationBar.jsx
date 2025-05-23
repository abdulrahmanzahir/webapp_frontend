// src/components/NavigationBar.jsx
import { Menu, X, Droplet, BarChart2, Activity, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

export default function NavigationBar({
  isMenuOpen,
  toggleMenu,
  activeSection,
  scrollToSection,
  setIsLoginMode,
  setIsLoginFormVisible,
  setIsForgotPasswordMode,
  isLoggedIn,
  username,
  setIsLoggedIn,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/')
      .then(res => console.log('[Backend Test] ✅', res.data))
      .catch(err => console.error('[Backend Test] ❌', err));
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Droplet className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">DiabTrack</span>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                {[
                  { id: 'interactiveDashboard', name: 'Dashboard', icon: <BarChart2 className="h-4 w-4 mr-1" /> },
                  { id: 'fusionInput', name: 'Patient Data', icon: <Activity className="h-4 w-4 mr-1" /> },
                  { id: 'chatbot', name: 'Chatbot', icon: <MessageCircle className="h-4 w-4 mr-1" /> }
                ].map(section => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition duration-300 flex items-center ${
                      activeSection === section.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {section.icon}
                    {section.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            {!isLoggedIn ? (
              <div className="flex items-center">
                <button
                  onClick={() => {
                    setIsLoginMode(true);
                    setIsForgotPasswordMode(false);
                    setIsLoginFormVisible(true);
                  }}
                  className="ml-4 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition duration-300"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setIsLoginMode(false);
                    setIsForgotPasswordMode(false);
                    setIsLoginFormVisible(true);
                  }}
                  className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center"
                >
                  {username.charAt(0).toUpperCase()}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        navigate('/profile');
                        setIsDropdownOpen(false);
                      }}
                    >
                      Profile
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      onClick={() => {
                        setIsLoggedIn(false);
                        navigate('/');
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}