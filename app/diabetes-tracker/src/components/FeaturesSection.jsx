// src/components/FeaturesSection.jsx
import { Activity, PieChart, ClipboardList } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Diabetes Risk Assessment</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform helps healthcare professionals evaluate the risk of Type 2 Diabetes using AI-powered predictions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Prediction</h3>
            <p className="text-gray-600">
              Enter clinical and genetic data to instantly receive a Type 2 Diabetes risk prediction with confidence scoring.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
            <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <PieChart className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Dashboard Logging</h3>
            <p className="text-gray-600">
              Automatically log glucose, BMI, and risk status to the dashboard for quick review and patient monitoring.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
            <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <ClipboardList className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Assistant Insight Tool</h3>
            <p className="text-gray-600">
              Quickly copy prediction results and ask our integrated assistant to suggest treatment or prevention plans.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}