import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  Filter,
  MapPin,
  Users,
  Building2,
  Star,
  ArrowRight,
  Eye,
  Share2,
  Briefcase,
  TrendingUp,
  Award,
  Target,
  BarChart3,
  CheckCircle,
  Globe,
  Calendar
} from "lucide-react";

const CompaniesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const industries = [
    { name: "Technology", count: 150, icon: Target },
    { name: "Healthcare", count: 120, icon: Users },
    { name: "Finance", count: 80, icon: BarChart3 },
    { name: "Education", count: 60, icon: Award },
    { name: "Manufacturing", count: 45, icon: Building2 },
    { name: "Retail", count: 35, icon: TrendingUp },
  ];

  const companySizes = [
    { name: "Startup (1-50)", count: 200 },
    { name: "Small (51-200)", count: 150 },
    { name: "Medium (201-1000)", count: 100 },
    { name: "Large (1000+)", count: 50 },
  ];

  const featuredCompanies = [
    {
      id: 1,
      name: "TechCorp Solutions",
      industry: "Technology",
      size: "500-1000 employees",
      location: "San Francisco, CA",
      founded: "2015",
      description: "Leading provider of cloud-based software solutions for enterprise clients worldwide.",
      rating: 4.8,
      reviews: 1250,
      openJobs: 25,
      benefits: ["Health insurance", "401k matching", "Flexible hours", "Remote work", "Stock options"],
      culture: ["Innovation", "Collaboration", "Work-life balance", "Diversity"],
      logo: "TC",
      featured: true
    },
    {
      id: 2,
      name: "InnovateLab",
      industry: "Technology",
      size: "200-500 employees",
      location: "New York, NY",
      founded: "2018",
      description: "Cutting-edge AI and machine learning company transforming industries through innovation.",
      rating: 4.9,
      reviews: 890,
      openJobs: 18,
      benefits: ["Health insurance", "401k", "Learning budget", "Team events", "Stock options"],
      culture: ["Innovation", "Growth", "Creativity", "Impact"],
      logo: "IL",
      featured: true
    },
    {
      id: 3,
      name: "DesignHub",
      industry: "Design",
      size: "100-200 employees",
      location: "Austin, TX",
      founded: "2016",
      description: "Creative design agency specializing in user experience and digital transformation.",
      rating: 4.7,
      reviews: 650,
      openJobs: 12,
      benefits: ["Health insurance", "401k", "Design tools", "Conference budget", "Flexible schedule"],
      culture: ["Creativity", "Collaboration", "Learning", "Work-life balance"],
      logo: "DH",
      featured: false
    },
    {
      id: 4,
      name: "DataFlow Inc",
      industry: "Technology",
      size: "300-500 employees",
      location: "Seattle, WA",
      founded: "2014",
      description: "Data analytics and business intelligence solutions for Fortune 500 companies.",
      rating: 4.6,
      reviews: 720,
      openJobs: 15,
      benefits: ["Health insurance", "401k", "Learning budget", "Flexible schedule", "Stock options"],
      culture: ["Data-driven", "Innovation", "Collaboration", "Growth"],
      logo: "DF",
      featured: false
    },
    {
      id: 5,
      name: "GrowthCo",
      industry: "Marketing",
      size: "150-300 employees",
      location: "Chicago, IL",
      founded: "2017",
      description: "Digital marketing agency helping businesses scale through data-driven strategies.",
      rating: 4.5,
      reviews: 480,
      openJobs: 8,
      benefits: ["Health insurance", "401k", "Marketing budget", "Team building", "Flexible hours"],
      culture: ["Growth", "Innovation", "Teamwork", "Results"],
      logo: "GC",
      featured: false
    },
    {
      id: 6,
      name: "CloudTech",
      industry: "Technology",
      size: "1000+ employees",
      location: "Denver, CO",
      founded: "2012",
      description: "Enterprise cloud infrastructure and DevOps solutions for global organizations.",
      rating: 4.4,
      reviews: 1100,
      openJobs: 32,
      benefits: ["Health insurance", "401k", "Stock options", "Remote work", "Learning budget"],
      culture: ["Innovation", "Collaboration", "Work-life balance", "Diversity"],
      logo: "CT",
      featured: false
    }
  ];

  const stats = [
    { number: "500+", label: "Companies", icon: Building2 },
    { number: "10,000+", label: "Open Positions", icon: Briefcase },
    { number: "50,000+", label: "Employees", icon: Users },
    { number: "95%", label: "Satisfaction Rate", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Discover Top Companies
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Explore opportunities at leading companies across various industries
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-xl p-2 shadow-lg">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Company name or industry"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-0 focus:ring-0 text-gray-900"
                    />
                  </div>
                </div>
                <div className="md:w-48">
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger className="border-0 focus:ring-0">
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:w-48">
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="border-0 focus:ring-0">
                      <SelectValue placeholder="Company Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup (1-50)</SelectItem>
                      <SelectItem value="small">Small (51-200)</SelectItem>
                      <SelectItem value="medium">Medium (201-1000)</SelectItem>
                      <SelectItem value="large">Large (1000+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Search Companies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
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

      {/* Industries */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Browse by Industry
            </h2>
            <p className="text-gray-600">
              Find companies in your field of interest
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <button
                  key={index}
                  className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {industry.name}
                  </h3>
                  <p className="text-sm text-gray-600">{industry.count} companies</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Sizes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Company Sizes
            </h2>
            <p className="text-gray-600">
              Find the right company size for your career goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companySizes.map((size, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {size.name}
                </h3>
                <p className="text-gray-600">{size.count} companies</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Featured Companies
              </h2>
              <p className="text-gray-600">
                Top-rated companies actively hiring
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                Sort by: Rating
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredCompanies.map((company) => (
              <Card key={company.id} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      {company.logo}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{company.name}</h3>
                        {company.featured && (
                          <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                        )}
                      </div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Building2 className="w-4 h-4 mr-1" />
                        {company.industry}
                      </div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Users className="w-4 h-4 mr-1" />
                        {company.size}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {company.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{company.description}</p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-semibold">{company.rating}</span>
                    <span className="text-gray-600 ml-1">({company.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-blue-600">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {company.openJobs} open jobs
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Company Culture:</h4>
                  <div className="flex flex-wrap gap-2">
                    {company.culture.map((trait, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Benefits:</h4>
                  <div className="flex flex-wrap gap-2">
                    {company.benefits.slice(0, 3).map((benefit, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {benefit}
                      </Badge>
                    ))}
                    {company.benefits.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{company.benefits.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Founded in {company.founded}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      View Jobs
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              View All Companies
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join a Great Company?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Create your profile and get matched with companies that align with your values and career goals
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              size="lg"
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
              onClick={() => navigate("/signup")}
            >
              Create Profile
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => navigate("/jobs")}
            >
              Browse Jobs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompaniesPage;
