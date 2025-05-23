// src/components/NavigationBarLoggedOut.jsx
import { Menu, X, Droplet } from 'lucide-react';

export default function NavigationBarLoggedOut({
  isMenuOpen,
  toggleMenu,
  activeSection,
  scrollToSection,
  setIsLoginMode,
  setIsLoginFormVisible,
  setIsForgotPasswordMode,
}) {
  return (
    <nav className="bg-white shadow-md fixed w-full z-50 py-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Droplet className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">DiabTrack</span>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                {[
                  { key: 'home', label: 'Home' },
                  { key: 'features', label: 'Services' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className={`px-3 py-2 text-lg font-medium rounded-md transition duration-300 ${
                      activeSection === key
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:block">
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