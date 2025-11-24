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
    <nav className="glass-card fixed w-full z-50 border-b border-white/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg">
              <Droplet className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-2xl font-bold gradient-text">DiabTrack</span>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-2">
                {[
                  { id: 'interactiveDashboard', name: 'Dashboard', icon: <BarChart2 className="h-4 w-4 mr-1" /> },
                  { id: 'fusionInput', name: 'Patient Data', icon: <Activity className="h-4 w-4 mr-1" /> },
                  { id: 'chatbot', name: 'Chatbot', icon: <MessageCircle className="h-4 w-4 mr-1" /> }
                ].map(section => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-white/50 hover:text-blue-600'
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
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsLoginMode(true);
                    setIsForgotPasswordMode(false);
                    setIsLoginFormVisible(true);
                  }}
                  className="btn-modern px-5 py-2.5 text-sm font-semibold text-blue-600 bg-white/50 border-2 border-blue-600 rounded-xl hover:bg-blue-50 shadow-sm"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setIsLoginMode(false);
                    setIsForgotPasswordMode(false);
                    setIsLoginFormVisible(true);
                  }}
                  className="btn-modern px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  {username.charAt(0).toUpperCase()}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 glass-card rounded-xl shadow-2xl z-50 overflow-hidden animate-slide-up">
                    <button
                      className="block w-full text-left px-5 py-3 text-gray-700 hover:bg-blue-50 transition-colors font-medium"
                      onClick={() => {
                        navigate('/profile');
                        setIsDropdownOpen(false);
                      }}
                    >
                      Profile
                    </button>
                    <button
                      className="block w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition-colors font-medium border-t border-gray-100"
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