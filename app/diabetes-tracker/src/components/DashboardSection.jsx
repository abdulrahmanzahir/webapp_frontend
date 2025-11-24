// src/components/DashboardSection.jsx
import React, { useEffect, useState } from 'react';
import { ChevronDown, Droplet, BarChart2, Heart, FileText, Activity, RotateCcw } from 'lucide-react';

export default function DashboardSection({ scrollToSection }) {
  const [data, setData] = useState({});

  const fetchDashboardData = () => {
    const userId = localStorage.getItem('user_id');
    const url = userId 
      ? `https://webapp-diabtrack-rh8c.onrender.com/dashboard-latest?user_id=${userId}`
      : "https://webapp-diabtrack-rh8c.onrender.com/dashboard-latest";
      
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        console.error("Failed to fetch dashboard data", err);
        setData({});
      });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const {
    bloodGlucose = 0,
    glucoseUnit = 'mg/dL',
    glucoseChange = 'No recent entry',
    bmi = 0,
    bmiChange = 'No recent entry',
    riskStatus = 'Unknown',
    riskPercent = 0,
    statusText = 'No records yet',
    lastUpdated = '-'
  } = data;

  const showReport = () => {
    alert(
      `Latest Input Data:\n\n` +
      `Blood Glucose: ${bloodGlucose} ${glucoseUnit}\n` +
      `BMI: ${bmi}\n` +
      `Risk Status: ${riskStatus}\n` +
      `Confidence: ${riskPercent}%`
    );
  };

  return (
    <section id="interactiveDashboard" className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-semibold shadow-sm">
              📊 Your Health Hub
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Interactive <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get a comprehensive overview of your health status and recent assessments.
          </p>
        </div>

        <div className="glass-card rounded-3xl shadow-2xl p-8 border border-white/20 overflow-hidden animate-slide-up">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Health Overview</h3>
                  <p className="text-gray-500 flex items-center">
                    <span className="mr-2">📅</span>
                    Last updated: <span className="font-medium ml-1">{lastUpdated}</span>
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-3">
                  <button
                    onClick={fetchDashboardData}
                    className="btn-modern flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg font-semibold"
                    title="Refresh"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" /> Refresh
                  </button>
                  <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center shadow-sm">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    {statusText}
                  </span>
                </div>
              </div>
            </div>

            {/* Blood Glucose */}
            <div className="w-full md:w-1/3 px-4 mb-6">
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 h-full card-hover group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200 rounded-full -mr-12 -mt-12 opacity-50"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-2 rounded-xl shadow-lg">
                      <Droplet className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 ml-3">Blood Glucose</h4>
                  </div>
                  <div className="flex items-end mb-3">
                    <span className="text-4xl font-extrabold text-gray-900">{bloodGlucose}</span>
                    <span className="text-gray-600 ml-2 mb-1 font-semibold">{glucoseUnit}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-semibold flex items-center">
                      <ChevronDown className="h-4 w-4 mr-1" />
                      {glucoseChange}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BMI */}
            <div className="w-full md:w-1/3 px-4 mb-6">
              <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 h-full card-hover group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200 rounded-full -mr-12 -mt-12 opacity-50"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl shadow-lg">
                      <BarChart2 className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 ml-3">BMI</h4>
                  </div>
                  <div className="flex items-end mb-3">
                    <span className="text-4xl font-extrabold text-gray-900">{bmi}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-semibold flex items-center">
                      <ChevronDown className="h-4 w-4 mr-1" />
                      {bmiChange}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Score */}
            <div className="w-full md:w-1/3 px-4 mb-6">
              <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 h-full card-hover group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-200 rounded-full -mr-12 -mt-12 opacity-50"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-br from-red-500 to-orange-500 p-2 rounded-xl shadow-lg">
                      <Heart className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 ml-3">Risk Score</h4>
                  </div>
                  <div className="flex items-end mb-3">
                    <span className="text-4xl font-extrabold text-gray-900">{riskStatus}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/50 rounded-full h-3 overflow-hidden shadow-inner">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500" style={{ width: `${riskPercent}%` }}></div>
                    </div>
                    <span className="text-sm font-bold text-gray-700">{riskPercent}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="w-full px-4 mt-4">
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => scrollToSection('fusionInput')}
                  className="btn-modern px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg flex items-center justify-center group"
                >
                  <Activity className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Log New Reading
                </button>
                <button
                  onClick={showReport}
                  className="btn-modern px-8 py-4 glass-card border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:shadow-xl flex items-center justify-center group"
                >
                  <FileText className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  View Full Report
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


