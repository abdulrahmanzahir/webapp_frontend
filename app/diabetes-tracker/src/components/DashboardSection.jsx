// src/components/DashboardSection.jsx
import React, { useEffect, useState } from 'react';
import { ChevronDown, Droplet, BarChart2, Heart, FileText, Activity, RotateCcw } from 'lucide-react';

export default function DashboardSection({ scrollToSection }) {
  const [data, setData] = useState({});

  const fetchDashboardData = () => {
    fetch("https://webapp-diabtrack-1-dpxw.onrender.com/dashboard-latest")
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
    <section id="interactiveDashboard" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Dashboard</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get a comprehensive overview of your health status and recent assessments.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 overflow-hidden">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Health Overview</h3>
                  <p className="text-gray-500">Last updated: {lastUpdated}</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center space-x-2">
                  <button
                    onClick={fetchDashboardData}
                    className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                    title="Refresh"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" /> Refresh
                  </button>
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    {statusText}
                  </span>
                </div>
              </div>
            </div>

            {/* Blood Glucose */}
            <div className="w-full md:w-1/3 px-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-5 h-full">
                <div className="flex items-center mb-4">
                  <Droplet className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="text-lg font-medium text-gray-700">Blood Glucose</h4>
                </div>
                <div className="flex items-end mb-2">
                  <span className="text-3xl font-bold text-gray-900">{bloodGlucose}</span>
                  <span className="text-gray-500 ml-2 mb-1">{glucoseUnit}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    <ChevronDown className="h-4 w-4 mr-1" />
                    {glucoseChange}
                  </span>
                </div>
              </div>
            </div>

            {/* BMI */}
            <div className="w-full md:w-1/3 px-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-5 h-full">
                <div className="flex items-center mb-4">
                  <BarChart2 className="h-5 w-5 text-purple-600 mr-2" />
                  <h4 className="text-lg font-medium text-gray-700">BMI</h4>
                </div>
                <div className="flex items-end mb-2">
                  <span className="text-3xl font-bold text-gray-900">{bmi}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    <ChevronDown className="h-4 w-4 mr-1" />
                    {bmiChange}
                  </span>
                </div>
              </div>
            </div>

            {/* Risk Score */}
            <div className="w-full md:w-1/3 px-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-5 h-full">
                <div className="flex items-center mb-4">
                  <Heart className="h-5 w-5 text-red-600 mr-2" />
                  <h4 className="text-lg font-medium text-gray-700">Risk Score</h4>
                </div>
                <div className="flex items-end mb-2">
                  <span className="text-3xl font-bold text-gray-900">{riskStatus}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${riskPercent}%` }}></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-500">{riskPercent}%</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="w-full px-4 mt-2">
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => scrollToSection('fusionInput')}
                  className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Log New Reading
                </button>
                <button
                  onClick={showReport}
                  className="px-5 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition duration-300 flex items-center justify-center"
                >
                  <FileText className="h-4 w-4 mr-2" />
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
