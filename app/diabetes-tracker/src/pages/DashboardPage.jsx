// src/pages/DashboardPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSection from '../components/DashboardSection';
import DataInputSection from '../components/DataInputSection';
import Footer from '../components/Footer';
import axiosInstance from '../api/axiosInstance';

export default function DashboardPage({ isLoggedIn, username, setIsLoggedIn }) {
  const [userInfo, setUserInfo] = useState(null);

  // New states for prediction form
  const [feature1, setFeature1] = useState('');
  const [feature2, setFeature2] = useState('');
  const [feature3, setFeature3] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);
  const [loadingPrediction, setLoadingPrediction] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get('/user/me');
        setUserInfo(res.data);
      } catch (err) {
        console.error('Error fetching user info:', err);
        setIsLoggedIn(false); // Token might be invalid
        localStorage.removeItem('token');
      }
    };

    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn]);

  // Predict handler
  const handlePrediction = async (e) => {
    e.preventDefault();
    setLoadingPrediction(true);
    setPredictionResult(null);

    try {
      const res = await axiosInstance.post('/predict', {
        feature1: parseFloat(feature1),
        feature2: parseFloat(feature2),
        feature3: parseFloat(feature3),
      });

      const result = res.data.prediction;
      setPredictionResult(result === 1 ? 'Yes (T2D Detected)' : 'No (Healthy)');
    } catch (err) {
      console.error('Prediction error:', err.response?.data || err.message);
      setPredictionResult('Prediction failed.');
    } finally {
      setLoadingPrediction(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      {userInfo ? (
        <p className="mb-6">Welcome back, {userInfo.username}!</p>
      ) : (
        <p className="mb-6">Loading your information...</p>
      )}

      {/* ✅ Prediction Form */}
      <form onSubmit={handlePrediction} className="bg-white shadow-md rounded-lg p-6 max-w-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Predict T2D Risk</h2>

        <label className="block text-sm font-medium text-gray-700 mb-1">Feature 1</label>
        <input
          type="number"
          step="any"
          value={feature1}
          onChange={(e) => setFeature1(e.target.value)}
          className="mb-3 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Feature 2</label>
        <input
          type="number"
          step="any"
          value={feature2}
          onChange={(e) => setFeature2(e.target.value)}
          className="mb-3 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Feature 3</label>
        <input
          type="number"
          step="any"
          value={feature3}
          onChange={(e) => setFeature3(e.target.value)}
          className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 w-full"
          disabled={loadingPrediction}
        >
          {loadingPrediction ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      {/* ✅ Prediction Result */}
      {predictionResult && (
        <div className="text-center text-lg font-semibold text-blue-700">
          Result: {predictionResult}
        </div>
      )}
    </div>
  );
}