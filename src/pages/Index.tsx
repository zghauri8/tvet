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
      icon: Briefcase,
    },
    { number: "500+", label: "Companies", color: "text-green-600", icon: Building2 },
    {
      number: "50,000+",
      label: "Job Seekers",
      color: "text-purple-600",
      icon: Users,
    },
  ];

  const features = [
    {
      icon: Target,
      title: "Smart Matching",
      description:
        "AI-powered job matching based on your skills and preferences",
    },
    {
      icon: Zap,
      title: "Quick Apply",
      description:
        "Apply to multiple jobs with just one click using your profile",
    },
    {
      icon: BarChart3,
      title: "Career Insights",
      description: "Get detailed analytics about your job search progress",
    },
    {
      icon: Award,
      title: "Real-time Alerts",
      description: "Never miss an opportunity with instant job notifications",
    },
  ];

  const jobCategories = [
    { name: "Technology", count: 2500, icon: Target },
    { name: "Healthcare", count: 1800, icon: Users },
    { name: "Finance", count: 1200, icon: BarChart3 },
    { name: "Education", count: 900, icon: Award },
    { name: "Marketing", count: 800, icon: TrendingUp },
    { name: "Design", count: 600, icon: Star },
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
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center transform transition-all duration-500"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`text-4xl font-bold ${stat.color} mb-2`}>
                      {stat.number}
                    </h3>
                    <p className="text-blue-100 text-lg">{stat.label}</p>
                  </div>
                );
              })}
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
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
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
            {jobCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate("/jobs")}
                  className="group bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center hover:from-blue-100 hover:to-purple-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">{category.count} jobs</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real people, real results. See how FitFind has transformed careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Engineer",
                company: "TechCorp",
                image: "SJ",
                story: "Found my dream job in just 2 weeks using FitFind's AI matching system."
              },
              {
                name: "Michael Chen",
                role: "Product Manager",
                company: "InnovateLab",
                image: "MC",
                story: "The personality assessment helped me discover my true career path."
              },
              {
                name: "Emily Rodriguez",
                role: "Data Analyst",
                company: "DataFlow Inc",
                image: "ER",
                story: "From TVET student to data analyst - FitFind made it possible."
              }
            ].map((story, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {story.image}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{story.name}</h4>
                    <p className="text-sm text-gray-600">{story.role} at {story.company}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{story.story}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How FitFind Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Sign up and complete your profile with your skills, experience, and career goals.",
                icon: User
              },
              {
                step: "02",
                title: "Take Assessment",
                description: "Complete our AI-powered personality and skills assessment to understand your strengths.",
                icon: Brain
              },
              {
                step: "03",
                title: "Get Matched",
                description: "Receive personalized job recommendations and career guidance based on your profile.",
                icon: Target
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-blue-600 mb-4">{step.step}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
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
