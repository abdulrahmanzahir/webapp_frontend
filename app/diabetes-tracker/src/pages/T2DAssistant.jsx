import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';  
import HomeLoggedIn from './pages/HomeLoggedIn';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import T2DAssistant from './components/T2DAssistant'; // Import the new component

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

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <HomeLoggedIn
                isMenuOpen={isMenuOpen}
                toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
                activeSection={activeSection}
                scrollToSection={(sectionId) => {
                  setActiveSection(sectionId);
                  const section = document.getElementById(sectionId);
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                setIsLoginMode={setIsLoginMode}
                setIsLoginFormVisible={setIsLoginFormVisible}
                setIsForgotPasswordMode={setIsForgotPasswordMode}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                username={username}
              />
            ) : (
              <HomePage
                isMenuOpen={isMenuOpen}
                toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
                activeSection={activeSection}
                scrollToSection={(sectionId) => {
                  setActiveSection(sectionId);
                  const section = document.getElementById(sectionId);
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
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
                setIsLoggedIn={setIsLoggedIn}
                username={username}
                setUsername={setUsername}
              />
            )
          }
        />

        <Route
          path="/home-logged-in"
          element={
            <HomeLoggedIn
              isMenuOpen={isMenuOpen}
              toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
              activeSection={activeSection}
              scrollToSection={(sectionId) => {
                setActiveSection(sectionId);
                const section = document.getElementById(sectionId);
                if (section) section.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              isLoggedIn={isLoggedIn}
              username={username}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <DashboardPage
              username={username}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        <Route
          path="/profile"
          element={
            <ProfilePage
              isLoggedIn={isLoggedIn}
              username={username}
            />
          }
        />

        {/* New route for T2D Assistant */}
        <Route
          path="/t2d-assistant"
          element={
            <T2DAssistant 
              isLoggedIn={isLoggedIn}
              username={username}
            />
          }
        />
      </Routes>
    </>
  );
}