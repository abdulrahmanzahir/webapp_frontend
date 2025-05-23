import { useState } from 'react';
import { Menu, X, ChevronRight, ChevronDown, ArrowRight, User, Lock, Activity, FileText, BarChart2, Heart, LogIn, PieChart, Coffee, Droplet, Brain, AlertCircle, CheckCircle } from 'lucide-react';

export default function DiabetesTrackerApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [token, setToken] = useState(null);
  const [aiPrediction, setAiPrediction] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionError, setPredictionError] = useState('');
  const [healthFormData, setHealthFormData] = useState({
    age: '',
    gender: '',
    weight: '',
    height: '',
    family_history: null,
    glucose_level: '',
    blood_pressure: '',
    additional_notes: ''
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleLoginForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  const handleHealthFormChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'radio' && name === 'family_history') {
      setHealthFormData({
        ...healthFormData,
        family_history: value === 'yes'
      });
    } else {
      setHealthFormData({
        ...healthFormData,
        [name]: value
      });
    }
  };

  const submitHealthForm = async (e) => {
    e.preventDefault();
    
    // Reset states
    setIsPredicting(true);
    setPredictionError('');
    setAiPrediction(null);
    
    try {
      // For demo purposes - in production use the token from login
      // Comment this out if you implement real authentication
      if (!token) {
        // Simple login to get token for testing
        const loginResponse = await fetch('http://localhost:8000/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            'username': 'demo_user', // Use a demo account
            'password': 'demo_password',
          }),
        });
        
        if (loginResponse.ok) {
          const tokenData = await loginResponse.json();
          setToken(tokenData.access_token);
        } else {
          setPredictionError('Authentication failed. Please log in first.');
          setIsPredicting(false);
          return;
        }
      }
      
      const apiToken = token;
      
      // Format request data
      const requestData = {
        age: healthFormData.age ? parseInt(healthFormData.age) : null,
        gender: healthFormData.gender || null,
        weight: healthFormData.weight ? parseFloat(healthFormData.weight) : null,
        height: healthFormData.height ? parseFloat(healthFormData.height) : null,
        family_history: healthFormData.family_history,
        glucose_level: healthFormData.glucose_level ? parseFloat(healthFormData.glucose_level) : null,
        blood_pressure: healthFormData.blood_pressure || null,
        additional_notes: healthFormData.additional_notes || null
      };
      
      // Make API request
      const response = await fetch('http://localhost:8000/chatgpt-predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to get prediction');
      }
      
      const predictionData = await response.json();
      setAiPrediction(predictionData);
      
    } catch (error) {
      setPredictionError(error.message || 'An error occurred while getting the prediction');
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <Droplet className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-xl font-bold text-gray-800">DiabTrack</span>
                </div>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => scrollToSection('home')}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition duration-300 ${activeSection === 'home' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => scrollToSection('features')}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition duration-300 ${activeSection === 'features' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
                  >
                    Features
                  </button>
                  <button 
                    onClick={() => scrollToSection('dashboard')}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition duration-300 ${activeSection === 'dashboard' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={() => scrollToSection('dataInput')}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition duration-300 ${activeSection === 'dataInput' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
                  >
                    Health Data
                  </button>
                  <button 
                    onClick={() => scrollToSection('aiPredictor')}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition duration-300 ${activeSection === 'aiPredictor' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
                  >
                    AI Predictor
                  </button>
                  <button 
                    onClick={() => scrollToSection('testimonials')}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition duration-300 ${activeSection === 'testimonials' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
                  >
                    Testimonials
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center">
                <button 
                  onClick={toggleLoginForm}
                  className="ml-4 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition duration-300"
                >
                  Log In
                </button>
                <button 
                  onClick={toggleLoginForm}
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
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('home')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeSection === 'home' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeSection === 'features' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('dashboard')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeSection === 'dashboard' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => scrollToSection('dataInput')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeSection === 'dataInput' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
              >
                Health Data
              </button>
              <button 
                onClick={() => scrollToSection('aiPredictor')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeSection === 'aiPredictor' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
              >
                AI Predictor
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeSection === 'testimonials' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
              >
                Testimonials
              </button>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-3">
                  <button 
                    onClick={toggleLoginForm}
                    className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 w-full"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={toggleLoginForm}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 w-full"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Login/Signup Form Modal */}
      {isLoginFormVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Account Access</h2>
              <button onClick={toggleLoginForm} className="text-gray-500 hover:text-gray-800">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="password" 
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your password"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  Log In
                </button>
                <button className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition duration-300">
                  Create Account
                </button>
                <div className="text-center mt-4">
                  <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-500 text-center">By continuing, you agree to our Terms of Service and Privacy Policy</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section - Home */}
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
                    src="/api/placeholder/600/400" 
                    alt="Dashboard preview" 
                    className="rounded-lg shadow-xl z-10 relative border-4 border-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section 
          id="features" 
          className="py-16 px-4 bg-white"
        >
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Diabetes Management</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform provides everything you need to effectively monitor and manage Type 2 Diabetes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Monitoring</h3>
                <p className="text-gray-600">
                  Track glucose levels, medications, and health metrics in real-time with easy data visualization.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <PieChart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Trend Analysis</h3>
                <p className="text-gray-600">
                  Identify patterns and trends in your health data to make informed lifestyle adjustments.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Coffee className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lifestyle Tracking</h3>
                <p className="text-gray-600">
                  Log diet, exercise, and lifestyle factors that impact your diabetes management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section 
          id="dashboard" 
          className="py-16 px-4 bg-gray-50"
        >
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Dashboard</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get a comprehensive overview of your health status and recent assessments.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 overflow-hidden">
              <div className="flex flex-wrap -mx-4">
                {/* Dashboard Header */}
                <div className="w-full px-4 mb-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Health Overview</h3>
                      <p className="text-gray-500">Last updated: April 23, 2025</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center">
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mr-3 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Well Managed
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        Export Report
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Metrics */}
                <div className="w-full md:w-1/3 px-4 mb-6">
                  <div className="border border-gray-200 rounded-lg p-5 h-full">
                    <div className="flex items-center mb-4">
                      <Droplet className="h-5 w-5 text-blue-600 mr-2" />
                      <h4 className="text-lg font-medium text-gray-700">Blood Glucose</h4>
                    </div>
                    <div className="flex items-end mb-2">
                      <span className="text-3xl font-bold text-gray-900">114</span>
                      <span className="text-gray-500 ml-2 mb-1">mg/dL</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 text-sm font-medium flex items-center">
                        <ChevronDown className="h-4 w-4 mr-1" />
                        5% from last week
                      </span>
                    </div>
                    <div className="mt-4 h-24 bg-gray-50 rounded"></div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/3 px-4 mb-6">
                  <div className="border border-gray-200 rounded-lg p-5 h-full">
                    <div className="flex items-center mb-4">
                      <BarChart2 className="h-5 w-5 text-purple-600 mr-2" />
                      <h4 className="text-lg font-medium text-gray-700">A1C Level</h4>
                    </div>
                    <div className="flex items-end mb-2">
                      <span className="text-3xl font-bold text-gray-900">6.2</span>
                      <span className="text-gray-500 ml-2 mb-1">%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 text-sm font-medium flex items-center">
                        <ChevronDown className="h-4 w-4 mr-1" />
                        0.3% from last quarter
                      </span>
                    </div>
                    <div className="mt-4 h-24 bg-gray-50 rounded"></div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/3 px-4 mb-6">
                  <div className="border border-gray-200 rounded-lg p-5 h-full">
                    <div className="flex items-center mb-4">
                      <Heart className="h-5 w-5 text-red-600 mr-2" />
                      <h4 className="text-lg font-medium text-gray-700">Risk Score</h4>
                    </div>
                    <div className="flex items-end mb-2">
                      <span className="text-3xl font-bold text-gray-900">Low</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{width: '25%'}}></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-500">25%</span>
                    </div>
                    <div className="mt-4 h-24 bg-gray-50 rounded"></div>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="w-full px-4 mt-2">
                  <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center">
                      <Activity className="h-4 w-4 mr-2" />
                      Log New Reading
                    </button>
                    <button className="px-5 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition duration-300 flex items-center justify-center">
                      <FileText className="h-4 w-4 mr-2" />
                      View Full Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Health Data Input Section */}
        <section 
          id="dataInput" 
          className="py-16 px-4 bg-white"
        >
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Health Data Input</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Easily record and track all relevant health information to manage your diabetes effectively.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-blue-600 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">Health Information</h3>
                  <div className="flex items-center">
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm text-white">
                      Step 1 of 4
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Age
                    </label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your age"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Gender
                    </label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option>Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Non-binary</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Weight (kg)
                    </label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your weight"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Height (cm)
                    </label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your height"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Family History of Diabetes
                  </label>
                  <div className="flex items-center">
                    <div className="mr-6">
                      <input type="radio" id="yes" name="familyHistory" className="mr-2" />
                      <label htmlFor="yes">Yes</label>
                    </div>
                    <div>
                      <input type="radio" id="no" name="familyHistory" className="mr-2" />
                      <label htmlFor="no">No</label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button className="px-5 py-2 text-gray-600 bg-gray-100 font-medium rounded-lg hover:bg-gray-200 transition duration-300">
                    Back
                  </button>
                  <button className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 flex items-center">
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <p className="text-sm text-gray-600">
                      Your data is protected and secured with end-to-end encryption
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                    <FileText className="h-4 w-4 mr-1" />
                    Upload medical records
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Predictor Section */}
        <section 
          id="aiPredictor" 
          className="py-16 px-4 bg-gradient-to-br from-indigo-50 to-blue-50"
        >
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Diabetes Risk Predictor</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get personalized diabetes risk assessment and insights using our AI-powered prediction tool.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-indigo-600 px-6 py-4">
                  <div className="flex items-center">
                    <Brain className="h-6 w-6 text-white mr-2" />
                    <h3 className="text-xl font-bold text-white">AI Health Assessment</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  {!aiPrediction ? (
                    <form onSubmit={submitHealthForm}>
                      <div className="mb-6">
                        <p className="text-gray-700 mb-4">
                          Enter your health information below for a personalized diabetes risk assessment.
                          Our AI will analyze your data and provide insights.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Age
                          </label>
                          <input 
                            type="number" 
                            name="age"
                            value={healthFormData.age}
                            onChange={handleHealthFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Your age"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Gender
                          </label>
                          <select 
                            name="gender"
                            value={healthFormData.gender}
                            onChange={handleHealthFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Weight (kg)
                          </label>
                          <input 
                            type="number" 
                            name="weight"
                            value={healthFormData.weight}
                            onChange={handleHealthFormChange}
                            step="0.1"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Your weight in kg"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Height (cm)
                          </label>
                          <input 
                            type="number" 
                            name="height"
                            value={healthFormData.height}
                            onChange={handleHealthFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Your height in cm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Blood Glucose Level (mg/dL)
                          </label>
                          <input 
                            type="number" 
                            name="glucose_level"
                            value={healthFormData.glucose_level}
                            onChange={handleHealthFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Recent glucose reading"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Blood Pressure
                          </label>
                          <input 
                            type="text" 
                            name="blood_pressure"
                            value={healthFormData.blood_pressure}
                            onChange={handleHealthFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="e.g., 120/80"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Family History of Diabetes
                        </label>
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              id="family_history_yes" 
                              name="family_history" 
                              value="yes"
                              onChange={handleHealthFormChange}
                              className="mr-2" 
                            />
                            <label htmlFor="family_history_yes">Yes</label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              id="family_history_no" 
                              name="family_history" 
                              value="no"
                              onChange={handleHealthFormChange}
                              className="mr-2" 
                            />
                            <label htmlFor="family_history_no">No</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Additional Notes
                        </label>
                        <textarea 
                          name="additional_notes"
                          value={healthFormData.additional_notes}
                          onChange={handleHealthFormChange}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Any other health information you'd like to share"
                        ></textarea>
                      </div>
                      
                      {predictionError && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
                          <div className="flex items-center text-red-600">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            <p>{predictionError}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-end">
                        <button 
                          type="submit"
                          disabled={isPredicting}
                          className={`px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center ${isPredicting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          {isPredicting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              <Brain className="mr-2 h-5 w-5" />
                              Get AI Assessment
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="prediction-results">
                      <div className="mb-6 flex justify-between items-center">
                        <h4 className="text-xl font-semibold text-gray-900">Assessment Results</h4>
                        <button 
                          onClick={() => setAiPrediction(null)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                        >
                          Start New Assessment
                        </button>
                      </div>
                      
                      <div className="mb-8">
                        <div className={`p-4 rounded-lg ${aiPrediction.prediction ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                          <div className="flex items-center">
                            {aiPrediction.prediction ? (
                              <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
                            ) : (
                              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                            )}
                            <div>
                              <h5 className={`font-bold text-lg ${aiPrediction.prediction ? 'text-red-700' : 'text-green-700'}`}>
                                {aiPrediction.prediction ? 'Higher Risk of Diabetes' : 'Lower Risk of Diabetes'}
                              </h5>
                              {aiPrediction.confidence && (
                                <p className="text-sm text-gray-600">Confidence: {Math.round(aiPrediction.confidence * 100)}%</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h5 className="font-semibold text-gray-900 mb-3">AI Insights:</h5>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-700 whitespace-pre-line">{aiPrediction.insights}</p>
                        </div>
                      </div>
                      
                      {aiPrediction.recommendations && aiPrediction.recommendations.length > 0 && (
                        <div className="mb-6">
                          <h5 className="font-semibold text-gray-900 mb-3">Recommendations:</h5>
                          <ul className="list-disc pl-5 space-y-2">
                            {aiPrediction.recommendations.map((rec, index) => (
                              <li key={index} className="text-gray-700">{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="mt-8 border-t border-gray-200 pt-6">
                        <p className="text-sm text-gray-500">
                          <strong>Note:</strong> This assessment is based on AI analysis and should not replace professional medical advice. 
                          Please consult with a healthcare provider for accurate diagnosis and treatment.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section 
          id="testimonials" 
          className="py-16 px-4 bg-gradient-to-br from-indigo-50 to-blue-50"
        >
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See how our platform has helped people effectively manage their diabetes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">JD</div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">John D.</h4>
                    <p className="text-sm text-gray-500">Type 2 Patient, 3 years</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-gray-600 italic">
                    "This app completely changed how I manage my diabetes. My A1C dropped from 7.8 to 6.3 in just six months by following the insights and recommendations."
                  </p>
                </div>
                <div className="mt-4 flex">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">SM</div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Sarah M.</h4>
                    <p className="text-sm text-gray-500">Pre-diabetic, 1 year</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-gray-600 italic">
                    "The lifestyle tracking features helped me identify which foods were spiking my blood sugar. Now I'm no longer pre-diabetic and feel in control of my health."
                  </p>
                </div>
                <div className="mt-4 flex">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">RJ</div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Robert J.</h4>
                    <p className="text-sm text-gray-500">Type 2 Patient, 5 years</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-gray-600 italic">
                    "Being able to share my data directly with my healthcare provider has transformed my doctor visits. We can make informed decisions based on comprehensive data."
                  </p>
                </div>
                <div className="mt-4 flex">
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current text-gray-300" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 flex items-center mx-auto">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
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
    </div>
  );
}