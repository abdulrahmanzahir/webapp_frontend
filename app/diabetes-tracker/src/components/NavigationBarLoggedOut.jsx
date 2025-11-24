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
                  { key: 'home', label: 'Home' },
                  { key: 'features', label: 'Services' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className={`px-5 py-2.5 text-base font-semibold rounded-xl transition-all duration-300 ${
                      activeSection === key
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-white/50 hover:text-blue-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:block">
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
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition-all"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}