import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Calendar, 
  LogOut, 
  Settings,
  Target,
  Users,
  Gift,
  Wallet,
  Plus,
  Brain,
  FileText,
  Upload,
  Briefcase,
  CheckCircle,
  Clock,
  Award,
  TrendingUp,
  Search,
  Building2,
  Eye,
  Download,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  MessageSquare,
  Image,
  Mic,
  Star,
  ArrowRight
} from "lucide-react";

export default function WorkingADOFDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  // Mock data for job applications and process status
  const jobApplications = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      status: "applied",
      appliedDate: "2024-01-15",
      salary: "$80,000 - $100,000",
      location: "Remote",
      description: "Full-stack development role with modern technologies"
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateLab",
      status: "under-review",
      appliedDate: "2024-01-10",
      salary: "$90,000 - $120,000",
      location: "New York, NY",
      description: "Lead product development and strategy"
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "DataFlow Inc",
      status: "interview-scheduled",
      appliedDate: "2024-01-05",
      salary: "$70,000 - $85,000",
      location: "San Francisco, CA",
      description: "Analyze business data and create insights"
    }
  ];

  const applicationProcess = {
    cvUploaded: true,
    personalityTestCompleted: true,
    testScore: 88,
    applicationsCount: 3,
    interviewsScheduled: 1,
    offersReceived: 0
  };

  const recentJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "WebCraft Studios",
      salary: "$75,000 - $95,000",
      location: "Austin, TX",
      postedDate: "2024-01-20",
      type: "Full-time"
    },
    {
      id: 2,
      title: "UX Designer",
      company: "DesignHub",
      salary: "$65,000 - $85,000",
      location: "Seattle, WA",
      postedDate: "2024-01-19",
      type: "Full-time"
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "CloudTech",
      salary: "$85,000 - $110,000",
      location: "Denver, CO",
      postedDate: "2024-01-18",
      type: "Full-time"
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading...</h1>
          <p className="text-gray-600">Please wait while we load your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Microsoft Outlook-style Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">FitFind Job Search Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">{user.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Microsoft Outlook-style Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 h-screen">
          <div className="p-4">
            <nav className="space-y-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Job Search
              </div>
              
              <Button className="w-full justify-start bg-blue-50 text-blue-700 border-blue-200">
                <BarChart3 className="w-4 h-4 mr-3" />
                Dashboard
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
                <Search className="w-4 h-4 mr-3" />
                Browse Jobs
              </Button>

              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 mt-6">
                Application Process
              </div>
              
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
                <Upload className="w-4 h-4 mr-3" />
                Upload CV
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
                <Brain className="w-4 h-4 mr-3" />
                Personality Test
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
                <FileText className="w-4 h-4 mr-3" />
                Applications
              </Button>

              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 mt-6">
                Tools
              </div>
              
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome back, {user.name}!</h2>
            <p className="text-gray-600">Track your job search progress and discover new opportunities</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Applications Sent</p>
                  <p className="text-2xl font-bold text-gray-900">{applicationProcess.applicationsCount}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Interviews</p>
                  <p className="text-2xl font-bold text-gray-900">{applicationProcess.interviewsScheduled}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Test Score</p>
                  <p className="text-2xl font-bold text-gray-900">{applicationProcess.testScore}%</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Job Offers</p>
                  <p className="text-2xl font-bold text-gray-900">{applicationProcess.offersReceived}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Application Progress Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Application Progress</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Applications Sent</span>
                  <span className="text-sm font-medium text-gray-800">{applicationProcess.applicationsCount}/50</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: `${(applicationProcess.applicationsCount/50)*100}%`}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Interviews Scheduled</span>
                  <span className="text-sm font-medium text-gray-800">{applicationProcess.interviewsScheduled}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: `${(applicationProcess.interviewsScheduled/10)*100}%`}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Job Offers</span>
                  <span className="text-sm font-medium text-gray-800">{applicationProcess.offersReceived}/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: `${(applicationProcess.offersReceived/5)*100}%`}}></div>
                </div>
              </div>
            </Card>

            {/* Job Search Activity Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Job Search Activity</h3>
                <PieChart className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Search className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">Jobs Viewed</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">45</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Applications</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{applicationProcess.applicationsCount}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-purple-500 mr-2" />
                    <span className="text-sm text-gray-600">Interviews</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{applicationProcess.interviewsScheduled}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    <span className="text-sm text-gray-600">Saved Jobs</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">12</span>
                </div>
              </div>
            </Card>
          </div>

          {/* User Profile Card */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex space-x-2 mt-2">
                    <Badge className="bg-green-100 text-green-800">CV Uploaded</Badge>
                    <Badge className="bg-blue-100 text-blue-800">Test Completed</Badge>
                    <Badge className="bg-purple-100 text-purple-800">Active Job Seeker</Badge>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Update Profile
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              </div>
            </div>
          </Card>

          {/* Application Process Status */}
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Application Process Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">CV Collection</h4>
                <p className="text-gray-600 text-sm mb-2">CV uploaded and processed</p>
                <Badge className="bg-green-100 text-green-800">Completed</Badge>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Personality Test</h4>
                <p className="text-gray-600 text-sm mb-2">Score: {applicationProcess.testScore}%</p>
                <Badge className="bg-green-100 text-green-800">Completed</Badge>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Job Applications</h4>
                <p className="text-gray-600 text-sm mb-2">{applicationProcess.applicationsCount} applications sent</p>
                <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
              </div>
            </div>
          </Card>

          {/* My Applications */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">My Job Applications</h3>
              <Badge className="bg-blue-100 text-blue-800">{jobApplications.length} Applications</Badge>
            </div>
            <div className="space-y-4">
              {jobApplications.map((application) => (
                <Card key={application.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h4 className="text-xl font-semibold text-gray-800">{application.title}</h4>
                        <Badge 
                          className={
                            application.status === "applied" 
                              ? "bg-blue-100 text-blue-800" 
                              : application.status === "under-review" 
                              ? "bg-yellow-100 text-yellow-800" 
                              : "bg-green-100 text-green-800"
                          }
                        >
                          {application.status === "applied" ? "Applied" : 
                           application.status === "under-review" ? "Under Review" : "Interview Scheduled"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{application.company} • {application.location}</p>
                      <p className="text-gray-500 text-sm mb-2">{application.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>💰 {application.salary}</span>
                        <span>📅 Applied: {application.appliedDate}</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => navigate(`/job/${application.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      {application.status === "interview-scheduled" && (
                        <Button 
                          variant="outline"
                          className="border-green-500 text-green-600 hover:bg-green-50"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          View Interview
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Recommended Jobs for You</h3>
              <Button variant="outline" onClick={() => navigate("/jobs")}>
                View All Jobs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentJobs.map((job) => (
                <Card key={job.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-blue-100 text-blue-800">{job.type}</Badge>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.postedDate}
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{job.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{job.company}</p>
                  <p className="text-gray-500 text-sm mb-4">{job.location}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-green-600 font-semibold">{job.salary}</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => navigate(`/job/${job.id}`)}
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Apply Now
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Refer a Friend Section */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Refer a Friend</h4>
                  <p className="text-gray-600">Earn $10 for each successful referral</p>
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Refer Now
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};