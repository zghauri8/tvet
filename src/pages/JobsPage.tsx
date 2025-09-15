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
  Clock,
  DollarSign,
  Building2,
  Briefcase,
  Star,
  ArrowRight,
  Bookmark,
  Share2,
  Eye,
  Target,
  Users,
  BarChart3,
  Award,
  TrendingUp,
  CheckCircle
} from "lucide-react";

const JobsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const jobCategories = [
    { name: "Technology", count: 2500, icon: Target },
    { name: "Healthcare", count: 1800, icon: Users },
    { name: "Finance", count: 1200, icon: BarChart3 },
    { name: "Education", count: 900, icon: Award },
    { name: "Marketing", count: 800, icon: TrendingUp },
    { name: "Design", count: 600, icon: Star },
  ];

  const featuredJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      salary: "$120,000 - $150,000",
      type: "Full-time",
      posted: "2 days ago",
      description: "We're looking for a senior software engineer to join our growing team. You'll work on cutting-edge projects using modern technologies.",
      requirements: ["5+ years experience", "React/Node.js", "AWS", "Team leadership"],
      benefits: ["Health insurance", "401k matching", "Flexible hours", "Remote work"],
      featured: true
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateLab",
      location: "New York, NY",
      salary: "$100,000 - $130,000",
      type: "Full-time",
      posted: "1 week ago",
      description: "Lead product development and strategy for our innovative platform. Work with cross-functional teams to deliver exceptional user experiences.",
      requirements: ["3+ years PM experience", "Agile methodology", "Data analysis", "User research"],
      benefits: ["Stock options", "Health insurance", "Learning budget", "Team events"],
      featured: true
    },
    {
      id: 3,
      title: "UX Designer",
      company: "DesignHub",
      location: "Austin, TX",
      salary: "$80,000 - $100,000",
      type: "Full-time",
      posted: "3 days ago",
      description: "Create beautiful and intuitive user experiences. Work closely with product and engineering teams to design user-centered solutions.",
      requirements: ["3+ years UX experience", "Figma/Sketch", "User research", "Prototyping"],
      benefits: ["Health insurance", "401k", "Design tools", "Conference budget"],
      featured: false
    },
    {
      id: 4,
      title: "Data Analyst",
      company: "DataFlow Inc",
      location: "Seattle, WA",
      salary: "$70,000 - $90,000",
      type: "Full-time",
      posted: "5 days ago",
      description: "Analyze business data and create insights to drive strategic decisions. Work with large datasets and modern analytics tools.",
      requirements: ["2+ years experience", "SQL/Python", "Tableau/PowerBI", "Statistics"],
      benefits: ["Health insurance", "401k", "Learning budget", "Flexible schedule"],
      featured: false
    },
    {
      id: 5,
      title: "Marketing Manager",
      company: "GrowthCo",
      location: "Chicago, IL",
      salary: "$75,000 - $95,000",
      type: "Full-time",
      posted: "1 week ago",
      description: "Develop and execute marketing strategies to drive growth. Manage campaigns across multiple channels and analyze performance.",
      requirements: ["4+ years marketing", "Digital marketing", "Analytics", "Team management"],
      benefits: ["Health insurance", "401k", "Marketing budget", "Team building"],
      featured: false
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Denver, CO",
      salary: "$90,000 - $120,000",
      type: "Full-time",
      posted: "4 days ago",
      description: "Build and maintain cloud infrastructure. Automate deployment processes and ensure system reliability and scalability.",
      requirements: ["3+ years DevOps", "AWS/Azure", "Docker/Kubernetes", "CI/CD"],
      benefits: ["Health insurance", "401k", "Stock options", "Remote work"],
      featured: false
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Jobs", icon: Briefcase },
    { number: "500+", label: "Companies", icon: Building2 },
    { number: "50,000+", label: "Job Seekers", icon: Users },
    { number: "95%", label: "Success Rate", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Find Your Dream Job
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover thousands of opportunities from top companies worldwide
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-xl p-2 shadow-lg">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Job title, keywords, or company"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-0 focus:ring-0 text-gray-900"
                    />
                  </div>
                </div>
                <div className="md:w-48">
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="border-0 focus:ring-0">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="new-york">New York, NY</SelectItem>
                      <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                      <SelectItem value="austin">Austin, TX</SelectItem>
                      <SelectItem value="seattle">Seattle, WA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Search Jobs
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

      {/* Job Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Browse by Category
            </h2>
            <p className="text-gray-600">
              Find opportunities in your field of expertise
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {jobCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <button
                  key={index}
                  className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
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

      {/* Featured Jobs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Featured Jobs
              </h2>
              <p className="text-gray-600">
                Hand-picked opportunities from top companies
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                Sort by: Latest
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                      {job.featured && (
                        <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                      )}
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Building2 className="w-4 h-4 mr-1" />
                      {job.company}
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {job.salary}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.posted}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Bookmark className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{job.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                    {job.requirements.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{job.requirements.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              View All Jobs
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Create a job alert and we'll notify you when matching positions become available
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              size="lg"
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
              onClick={() => navigate("/signup")}
            >
              Create Job Alert
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => navigate("/signup")}
            >
              Upload Resume
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobsPage;
