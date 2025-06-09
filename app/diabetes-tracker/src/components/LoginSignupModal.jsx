import { X } from 'lucide-react';
import { LogIn, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useState } from 'react';

export default function LoginSignupModal({
  isLoginFormVisible,
  toggleLoginForm,
  isLoginMode,
  setIsLoginMode,
  isForgotPasswordMode,
  setIsForgotPasswordMode,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  setIsLoggedIn,
  setUsername,
}) {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmEmailError, setConfirmEmailError] = useState('');
  const [otpSentMessage, setOtpSentMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setEmailError('');
    setPasswordError('');
    setConfirmEmailError('');
    setOtpSentMessage('');
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
      setEmailError('Must be a valid @gmail.com address.');
      return;
    }

    if (!isLoginMode && confirmEmail !== email) {
      setConfirmEmailError('Emails do not match.');
      return;
    }

    if (password.length < 8 && !isForgotPasswordMode) {
      setPasswordError('Password must be at least 8 characters.');
      return;
    }

    try {
      if (isForgotPasswordMode) {
        setOtpSentMessage(`OTP has been sent to ${email}`);
        return;
      }

      if (isLoginMode) {
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        const res = await axiosInstance.post('/token', formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
 
        const token = res.data.access_token;
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        setUsername(email.split("@")[0]);
        toggleLoginForm();
      } else {
        await axiosInstance.post('/register', {
          username: email,
          email,
          password,
          role: 'doctor'
        });
        alert('Account created. Please log in.');
        setIsLoginMode(true);
      }
    } catch (err) {
      const error = err.response?.data?.detail || "Something went wrong.";
      if (error === "Email is not registered.") {
        setEmailError(error);
      } else if (error === "Incorrect password.") {
        setPasswordError(error);
      } else if (error === "Email already registered.") {
        setEmailError(error);
      } else {
        alert(error);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-xl p-10 max-w-2xl w-full mx-4 shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {isForgotPasswordMode
              ? "Reset Password"
              : isLoginMode
              ? "Log In"
              : "Create Account"}
          </h2>
          <button onClick={toggleLoginForm} className="text-gray-500 hover:text-gray-800">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="text-lg">
          {/* Email */}
          <div className="relative mb-6">
            <label className="block text-base font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                className={`pl-10 w-full px-4 py-3 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${emailError ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-blue-500 text-lg`}
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <p className="text-sm text-red-500 mt-1 min-h-[1rem]">{emailError || ''}</p>
          </div>

          {/* Confirm Email (Only in SignUp) */}
          {!isLoginMode && !isForgotPasswordMode && (
            <div className="relative mb-6">
              <label className="block text-base font-medium text-gray-700 mb-2">Confirm Email</label>
              <input
                type="email"
                className={`w-full px-4 py-3 border ${confirmEmailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${confirmEmailError ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-blue-500 text-lg`}
                placeholder="Confirm your email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                required
              />
              <p className="text-sm text-red-500 mt-1 min-h-[1rem]">{confirmEmailError || ''}</p>
            </div>
          )}

          {/* Password */}
          {!isForgotPasswordMode && (
            <div className="relative mb-6">
              <label className="block text-base font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`pl-10 pr-16 w-full px-4 py-3 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${passwordError ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-blue-500 text-lg`}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-600 text-base font-medium hover:underline focus:outline-none"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
              <p className="text-sm text-red-500 mt-1 min-h-[1rem]">{passwordError || ''}</p>
            </div>
          )}

          {/* OTP Message */}
          {isForgotPasswordMode && otpSentMessage && (
            <p className="text-green-600 text-center text-base font-medium mt-4">{otpSentMessage}</p>
          )}

          {/* Buttons */}
          <div className="flex flex-col space-y-4 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md text-lg font-medium hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            >
              <LogIn className="h-5 w-5 mr-2" />
              {isForgotPasswordMode ? "Send OTP" : isLoginMode ? "Log In" : "Create Account"}
            </button>

            {!isForgotPasswordMode && (
              <button
                type="button"
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-md text-lg font-medium hover:bg-blue-50 transition duration-300"
              >
                {isLoginMode ? "Create Account" : "Back to Login"}
              </button>
            )}

            {!isForgotPasswordMode ? (
              <div className="text-center mt-4">
                <button
                  type="button"
                  className="text-base text-blue-600 hover:underline"
                  onClick={() => {
                    setIsForgotPasswordMode(true);
                    setIsLoginMode(true);
                  }}
                >
                  Forgot password?
                </button>
              </div>
            ) : (
              <div className="text-center mt-4">
                <button
                  type="button"
                  className="text-base text-blue-600 hover:underline"
                  onClick={() => setIsForgotPasswordMode(false)}
                >
                  ← Back to Log In
                </button>
              </div>
            )}
          </div>

          {!isForgotPasswordMode && (
            <div className="border-t border-gray-200 pt-4 mt-6 text-base text-gray-500 text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
