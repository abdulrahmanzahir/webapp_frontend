// src/components/AuthModal.jsx
import { X, User, Lock, LogIn } from 'lucide-react';

export default function AuthModal({
  isVisible,
  toggleLoginForm,
  isLoginMode,
  setIsLoginMode,
  email,
  setEmail,
  password,
  setPassword,
  age,
  setAge,
  isForgotPasswordMode,
  setIsForgotPasswordMode,
  showPassword,
  setShowPassword
}) {
  if (!isVisible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email in the format something@gmail.com");
      return;
    }
    if (isForgotPasswordMode) {
      alert(`OTP sent to ${email} (simulation)`);
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    if (!isLoginMode && (age < 1 || age > 99)) {
      alert("Please enter a valid age between 1 and 99.");
      return;
    }
    alert(`${isLoginMode ? 'Logged in' : 'Account created'} successfully!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {isForgotPasswordMode ? 'Reset Password' : isLoginMode ? 'Log In' : 'Create Account'}
          </h2>
          <button onClick={toggleLoginForm} className="text-gray-500 hover:text-gray-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {!isForgotPasswordMode && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="pl-10 pr-16 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-600 text-sm font-medium hover:underline focus:outline-none"
                  >
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </div>

              {!isLoginMode && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="^(?:[1-9]|[1-9][0-9])$"
                    maxLength="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your age (1–99)"
                    value={age}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d{0,2}$/.test(val)) {
                        if (val === '' || /^[1-9][0-9]?$/.test(val)) {
                          setAge(val);
                        }
                      }
                    }}
                    required
                  />
                </div>
              )}
            </>
          )}

          <div className="flex flex-col space-y-3">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            >
              <LogIn className="h-4 w-4 mr-2" />
              {isForgotPasswordMode ? 'Send OTP' : isLoginMode ? 'Log In' : 'Create Account'}
            </button>

            {!isForgotPasswordMode && (
              <button
                type="button"
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition duration-300"
              >
                {isLoginMode ? 'Create Account' : 'Back to Login'}
              </button>
            )}

            {!isForgotPasswordMode && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => {
                    setIsForgotPasswordMode(true);
                    setIsLoginMode(true);
                  }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {isForgotPasswordMode && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => setIsForgotPasswordMode(false)}
                >
                  ← Back to Log In
                </button>
              </div>
            )}
          </div>

          {!isForgotPasswordMode && (
            <div className="border-t border-gray-200 pt-4 mt-6 text-sm text-gray-500 text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </div>
          )}
        </form>
      </div>
    </div>
  );
}