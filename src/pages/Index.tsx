import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ArrowRight,
  Target,
  Building2,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  Award,
  Briefcase,
  GraduationCap,
  Zap,
  BarChart3,
  Shield,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const stats = [
    {
      number: "10,000+",
      label: "Active Jobs",
      color: "text-blue-600",
      icon: "💼",
    },
    { number: "500+", label: "Companies", color: "text-green-600", icon: "🏢" },
    {
      number: "50,000+",
      label: "Job Seekers",
      color: "text-purple-600",
      icon: "👥",
    },
  ];

  const features = [
    {
      icon: "🎯",
      title: "Smart Matching",
      description:
        "AI-powered job matching based on your skills and preferences",
    },
    {
      icon: "⚡",
      title: "Quick Apply",
      description:
        "Apply to multiple jobs with just one click using your profile",
    },
    {
      icon: "📊",
      title: "Career Insights",
      description: "Get detailed analytics about your job search progress",
    },
    {
      icon: "🔔",
      title: "Real-time Alerts",
      description: "Never miss an opportunity with instant job notifications",
    },
  ];

  const jobCategories = [
    { name: "Technology", count: 2500, icon: "💻" },
    { name: "Healthcare", count: 1800, icon: "🏥" },
    { name: "Finance", count: 1200, icon: "💰" },
    { name: "Education", count: 900, icon: "📚" },
    { name: "Marketing", count: 800, icon: "📢" },
    { name: "Design", count: 600, icon: "🎨" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white opacity-10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white opacity-10 rounded-full animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Find Your Dream Job
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Connect with top companies and discover opportunities that
                match your skills and ambitions
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 animate-fade-in-up delay-300">
              <Button
                size="lg"
                className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => navigate("/jobs")}
              >
                <span className="flex items-center justify-center">
                  🔍 Browse Jobs
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button
                size="lg"
                className="group bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => navigate("/signup")}
              >
                <span className="flex items-center justify-center">
                  🚀 Get Started
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up delay-500">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center transform transition-all duration-500"
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <h3 className={`text-4xl font-bold ${stat.color} mb-2`}>
                    {stat.number}
                  </h3>
                  <p className="text-blue-100 text-lg">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make job searching simple, efficient, and successful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Popular Job Categories
            </h2>
            <p className="text-xl text-gray-600">
              Explore opportunities in your field
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {jobCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => navigate("/jobs")}
                className="group bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center hover:from-blue-100 hover:to-purple-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">{category.count} jobs</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs
            through our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              size="lg"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => navigate("/signup")}
            >
              Create Free Account
            </Button>
            <Button
              size="lg"
              className="bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => navigate("/jobs")}
            >
              Browse All Jobs
            </Button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default Index;
