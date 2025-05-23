// src/pages/HomePage.jsx
import NavigationBarLoggedOut from '../components/NavigationBarLoggedOut';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';

import Footer from '../components/Footer';
import LoginSignupModal from '../components/LoginSignupModal';

export default function HomePage(props) {
  const {
    isMenuOpen,
    toggleMenu,
    activeSection,
    scrollToSection,
    setIsLoginMode,
    setIsLoginFormVisible,
    setIsForgotPasswordMode,
    isLoginFormVisible,
    isLoginMode,
    isForgotPasswordMode,
    email,
    setEmail,
    password,
    setPassword,
    age,
    setAge,
    showPassword,
    setShowPassword,
    isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
  } = props;

  return (
    <>
      <NavigationBarLoggedOut
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        setIsLoginMode={setIsLoginMode}
        setIsLoginFormVisible={setIsLoginFormVisible}
        setIsForgotPasswordMode={setIsForgotPasswordMode}
        isLoggedIn={isLoggedIn}
        username={username}
        setIsLoggedIn={setIsLoggedIn}
      />

      <main>
        <HeroSection scrollToSection={scrollToSection} />
        <FeaturesSection />
        {isLoggedIn && (
  <div className="text-center mt-8">
    <a
      href="/dashboard"
      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
    >
      Go to Interactive Dashboard
    </a>
  </div>
)}
      </main>

      <Footer />

      {isLoginFormVisible && (
        <LoginSignupModal
          isLoginFormVisible={isLoginFormVisible}
          toggleLoginForm={() => setIsLoginFormVisible(false)}
          isLoginMode={isLoginMode}
          setIsLoginMode={setIsLoginMode}
          isForgotPasswordMode={isForgotPasswordMode}
          setIsForgotPasswordMode={setIsForgotPasswordMode}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          age={age}
          setAge={setAge}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername}
        />
      )}
    </>
  );
}