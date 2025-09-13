import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-image.jpg";
import {
  Brain,
  Users,
  BarChart3,
  Star,
  Award,
  Zap,
  Target,
  Shield,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Briefcase,
  GraduationCap,
  CreditCard,
  PlayCircle,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Assessments",
      description:
        "Advanced personality testing with detailed strengths and weaknesses analysis",
      color: "text-primary",
    },
    {
      icon: Award,
      title: "TVET Career Matching",
      description:
        "Specialized recommendations for technical and vocational education paths",
      color: "text-accent",
    },
    {
      icon: BarChart3,
      title: "Comprehensive Reporting",
      description:
        "Detailed analytics and insights for personal and professional development",
      color: "text-success",
    },
    {
      icon: Users,
      title: "Coaching Services",
      description:
        "Personalized coaching to address weaknesses and enhance strengths",
      color: "text-warning",
    },
    {
      icon: Target,
      title: "Career Recommendations",
      description:
        "AI-driven suggestions for optimal career paths based on personality profile",
      color: "text-primary",
    },
    {
      icon: Briefcase,
      title: "Employer Dashboard",
      description:
        "Advanced candidate screening and matching for recruitment teams",
      color: "text-accent",
    },
  ];

  const stats = [
    { number: "10K+", label: "Students Assessed", icon: GraduationCap },
    { number: "94%", label: "Match Accuracy", icon: Target },
    { number: "500+", label: "Career Paths", icon: Briefcase },
    { number: "98%", label: "Satisfaction Rate", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-gradient-primary text-white">
                <Zap className="w-4 h-4 mr-2" />
                AI-Powered Career Intelligence
              </Badge>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Discover Your
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {" "}
                  Perfect Career{" "}
                </span>
                with AI
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Revolutionary career assessment platform combining personality
                testing, AI recommendations, and personalized coaching for
                students and professionals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:shadow-hover text-lg px-8 py-6"
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6"
                  onClick={() => navigate("/login")}
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Sign In
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full"></div>
              <img
                src={heroImage}
                alt="Career Assessment Platform"
                className="relative z-10 w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-primary text-white">
              Platform Features
            </Badge>
            <h2 className="text-4xl font-bold mb-6">
              Everything You Need for Career Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From AI-powered assessments to personalized coaching, our platform
              provides comprehensive career development tools for students and
              professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-8 shadow-card hover:shadow-hover transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-6`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section id="students" className="py-20 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8 shadow-card">
              <div className="flex items-center mb-6">
                <GraduationCap className="w-10 h-10 text-accent mr-4" />
                <div>
                  <h3 className="text-2xl font-bold">For TVET Students</h3>
                  <p className="text-muted-foreground">
                    Technical & Vocational Education
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {[
                  "Free personality assessments",
                  "NOSS-based career recommendations",
                  "Skills gap analysis",
                  "Educational pathway guidance",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full bg-gradient-primary hover:shadow-soft"
                onClick={() => navigate("/signup?role=TVET_STUDENT")}
              >
                Explore TVET Careers
              </Button>
            </Card>

            <Card className="p-8 shadow-card">
              <div className="flex items-center mb-6">
                <Briefcase className="w-10 h-10 text-primary mr-4" />
                <div>
                  <h3 className="text-2xl font-bold">For Working Adults</h3>
                  <p className="text-muted-foreground">
                    Professional Development
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {[
                  "Advanced personality insights",
                  "Career advancement strategies",
                  "Leadership development coaching",
                  "Industry-specific recommendations",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/signup?role=WORKING_ADOF")}
              >
                View Professional Plans
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Employers Section */}
      <section id="employers" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-primary text-white">
              For Employers
            </Badge>
            <h2 className="text-4xl font-bold mb-6">
              Streamline Your Hiring Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Use AI to identify the best candidates and make data-driven hiring
              decisions
            </p>
          </div>

          <Card className="p-8 shadow-card bg-gradient-card">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  AI Candidate Matching
                </h3>
                <p className="text-muted-foreground">
                  Get top 3 candidate recommendations based on role requirements
                </p>
              </div>

              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Analytics Dashboard
                </h3>
                <p className="text-muted-foreground">
                  Comprehensive overview of all candidates and hiring metrics
                </p>
              </div>

              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Screening Automation
                </h3>
                <p className="text-muted-foreground">
                  Automated candidate screening and personality assessment
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button
                size="lg"
                className="bg-gradient-primary hover:shadow-hover"
                onClick={() => navigate("/signup?role=WORKING_ADOF")}
              >
                Get Started
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Career Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who have discovered their perfect
            career path with AI
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6"
              onClick={() => navigate("/signup")}
            >
              Start Free Assessment
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="text-lg px-8 py-6 text-white border border-white hover:bg-white hover:text-primary"
              onClick={() => navigate("/login")}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Brain className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">FitFind</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Empowering careers through AI-powered insights and personalized
            coaching
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 FitFind Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
