import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
  Building2,
  Briefcase,
  BarChart3,
  Brain,
  Globe,
  Heart,
  Lightbulb,
  Shield,
  Zap,
  BookOpen,
  GraduationCap,
  UserCheck
} from "lucide-react";

const AboutPage = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "We continuously push the boundaries of career matching technology to deliver cutting-edge solutions."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in the power of teamwork and building strong partnerships with our users and clients."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from our technology to our customer service."
    },
    {
      icon: Heart,
      title: "Empathy",
      description: "We understand the challenges of career transitions and approach every interaction with compassion."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "SJ",
      bio: "Former HR executive with 15+ years of experience in talent acquisition and career development.",
      linkedin: "#"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "MC",
      bio: "AI and machine learning expert with a passion for building technology that makes a difference.",
      linkedin: "#"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      image: "ER",
      bio: "Product strategist focused on creating intuitive user experiences that drive career success.",
      linkedin: "#"
    },
    {
      name: "David Kim",
      role: "Head of Engineering",
      image: "DK",
      bio: "Full-stack engineer with expertise in scalable systems and modern web technologies.",
      linkedin: "#"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "FitFind was born from a vision to revolutionize career matching through AI technology."
    },
    {
      year: "2021",
      title: "First 1,000 Users",
      description: "Reached our first milestone of 1,000 registered users and successful job matches."
    },
    {
      year: "2022",
      title: "Series A Funding",
      description: "Secured $5M in Series A funding to accelerate product development and market expansion."
    },
    {
      year: "2023",
      title: "50,000+ Users",
      description: "Grew to over 50,000 active users with a 95% satisfaction rate and 10,000+ successful placements."
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Expanded to 15 countries with partnerships with leading universities and corporations."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Active Users", icon: Users },
    { number: "10,000+", label: "Successful Placements", icon: UserCheck },
    { number: "500+", label: "Partner Companies", icon: Building2 },
    { number: "95%", label: "Success Rate", icon: Star },
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Our advanced algorithms analyze personality, skills, and preferences to find the perfect career match."
    },
    {
      icon: BarChart3,
      title: "Data-Driven Insights",
      description: "Get detailed analytics and insights about your career path and growth opportunities."
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Your data is protected with enterprise-grade security and privacy controls."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access opportunities from companies worldwide with our global network of partners."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              About FitFind
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              We're revolutionizing career matching through AI-powered technology, 
              helping people find their perfect career path and companies discover exceptional talent.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button
                size="lg"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={() => navigate("/signup")}
              >
                Join Our Mission
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate("/jobs")}
              >
                Explore Opportunities
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                To empower individuals to discover their true potential and find meaningful careers 
                that align with their skills, values, and aspirations. We believe everyone deserves 
                to love what they do and contribute to something greater than themselves.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">AI-powered career matching</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Personalized career guidance</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Global opportunity network</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                To become the world's leading career matching platform, connecting millions of 
                talented individuals with opportunities that fuel their growth and enable them 
                to make a positive impact in their communities and beyond.
              </p>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Our Impact</h3>
                <p className="text-blue-100">
                  Every successful match we make contributes to building a more connected, 
                  productive, and fulfilled global workforce.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at FitFind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose FitFind?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes us the leading career matching platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind FitFind's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {member.image}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {member.bio}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Connect on LinkedIn
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in FitFind's growth and development
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Join thousands of professionals who have discovered their perfect career path with FitFind. 
            Start your journey today and unlock your true potential.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              size="lg"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => navigate("/signup")}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate("/jobs")}
            >
              Explore Jobs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
