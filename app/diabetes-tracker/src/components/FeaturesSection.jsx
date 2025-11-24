// src/components/FeaturesSection.jsx
import { Activity, PieChart, ClipboardList } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Activity className="h-7 w-7" />,
      title: "Real-Time Prediction",
      description: "Enter clinical and genetic data to instantly receive a Type 2 Diabetes risk prediction with confidence scoring.",
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50",
    },
    {
      icon: <PieChart className="h-7 w-7" />,
      title: "Dashboard Logging",
      description: "Automatically log glucose, BMI, and risk status to the dashboard for quick review and patient monitoring.",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      icon: <ClipboardList className="h-7 w-7" />,
      title: "Assistant Insight Tool",
      description: "Quickly copy prediction results and ask our integrated assistant to suggest treatment or prevention plans.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-semibold shadow-sm">
              ✨ Powerful Features
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Comprehensive <span className="gradient-text">Diabetes Risk</span> Assessment
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our platform helps healthcare professionals evaluate the risk of Type 2 Diabetes using AI-powered predictions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-hover glass-card p-8 rounded-2xl group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon container with gradient */}
              <div className={`bg-gradient-to-br ${feature.gradient} rounded-2xl w-16 h-16 flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Decorative gradient bar */}
              <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.gradient} rounded-full transition-all duration-500`}></div>
            </div>
          ))}
        </div>
        
        {/* Additional info section */}
        <div className="mt-16 text-center">
          <div className="glass-card inline-block px-8 py-4 rounded-2xl">
            <p className="text-gray-700 font-medium">
              <span className="gradient-text font-bold">Trusted by 1000+ healthcare professionals</span> worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}