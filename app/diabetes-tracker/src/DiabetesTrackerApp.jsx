// src/DiabetesTrackerApp.jsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HomeLoggedIn from './pages/HomeLoggedIn';
import DashboardPage from './pages/DashboardPage';

export default function DiabetesTrackerApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('User');

  // Auto-login on refresh if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');
    const userId = localStorage.getItem('user_id');
    
    if (token && savedUsername && userId) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    } else {
      // Clear invalid data
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('user_id');
    }
  }, []);

  // Persist or clear storage when login state changes
  useEffect(() => {
    if (isLoggedIn) {
      // assume token and username already set in localStorage on login
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('user_id');
    }
  }, [isLoggedIn]);

  // Enhanced scroll helper
  const handleScroll = (sectionId) => {
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? (
          <HomeLoggedIn
            isMenuOpen={isMenuOpen}
            toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
            activeSection={activeSection}
            scrollToSection={handleScroll}
            setIsLoginMode={setIsLoginMode}
            setIsLoginFormVisible={setIsLoginFormVisible}
            setIsForgotPasswordMode={setIsForgotPasswordMode}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={(flag) => {
              if (!flag) {
                // clear storage on logout
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('user_id');
              }
              setIsLoggedIn(flag);
            }}
            username={username}
          />
        ) : (
          <HomePage
            isMenuOpen={isMenuOpen}
            toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
            activeSection={activeSection}
            scrollToSection={handleScroll}
            setIsLoginMode={setIsLoginMode}
            setIsLoginFormVisible={setIsLoginFormVisible}
            setIsForgotPasswordMode={setIsForgotPasswordMode}
            isLoginFormVisible={isLoginFormVisible}
            isLoginMode={isLoginMode}
            isForgotPasswordMode={isForgotPasswordMode}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            age={age}
            setAge={setAge}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={(flag, token, user) => {
              if (flag) {
                // Persist token & user on login
                localStorage.setItem('token', token);
                localStorage.setItem('username', user);
                setUsername(user);
                setIsLoggedIn(true);
              }
            }}
            username={username}
            setUsername={setUsername}
          />
        )}
      />
      <Route
        path="/home-logged-in"
        element={<HomeLoggedIn
          isMenuOpen={isMenuOpen}
          toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          activeSection={activeSection}
          scrollToSection={handleScroll}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={(flag) => {
            if (!flag) {
              localStorage.removeItem('token');
              localStorage.removeItem('username');
              localStorage.removeItem('user_id');
            }
            setIsLoggedIn(flag);
          }}
          username={username}
        />}
      />
      <Route
        path="/dashboard"
        element={<DashboardPage username={username} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      />

    </Routes>
  );
}