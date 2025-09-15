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
  Download
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Loading...</h1>
          <p className="text-blue-300">Please wait while we load your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-slate-800/50 backdrop-blur-sm border-r border-blue-500/20">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-full"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              FitFind
            </span>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-4">
              JOB SEARCH
            </div>
            
            <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <div className="w-4 h-4 border-2 border-white rounded-full mr-3"></div>
              Dashboard
            </Button>
            
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-blue-500/20">
              <Search className="w-4 h-4 mr-3" />
              Browse Jobs
            </Button>

            <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-4 mt-6">
              APPLICATION PROCESS
            </div>
            
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-blue-500/20">
              <Upload className="w-4 h-4 mr-3" />
              Upload CV
            </Button>
            
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-blue-500/20">
              <Brain className="w-4 h-4 mr-3" />
              Personality Test
            </Button>
            
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-blue-500/20">
              <FileText className="w-4 h-4 mr-3" />
              Applications
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Hi, {user.name}</h1>
            <p className="text-blue-300">Welcome to your job search dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* User Profile Card - Full Width */}
        <div className="mb-8">
          <div className="relative p-8 bg-slate-800/50 backdrop-blur-sm rounded-lg">
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px]">
              <div className="w-full h-full bg-slate-800/50 rounded-lg"></div>
            </div>
            
            <div className="relative flex items-center space-x-6">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
                <p className="text-gray-300 mb-4">{user.email}</p>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-green-500">CV Uploaded</Badge>
                  <Badge className="bg-blue-500">Test Completed</Badge>
                  <Badge className="bg-purple-500">Active Job Seeker</Badge>
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg px-6 py-2">
                  Update Profile
                </Button>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg px-6 py-2">
                  Download CV
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Application Process Status */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Application Process Status</h3>
          <div className="relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-lg">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px]">
              <div className="w-full h-full bg-slate-800/50 rounded-lg"></div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">CV Collection</h4>
                  <p className="text-gray-300 text-sm">CV uploaded and processed</p>
                  <Badge className="bg-green-500 mt-2">Completed</Badge>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Personality Test</h4>
                  <p className="text-gray-300 text-sm">Score: {applicationProcess.testScore}%</p>
                  <Badge className="bg-green-500 mt-2">Completed</Badge>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Job Applications</h4>
                  <p className="text-gray-300 text-sm">{applicationProcess.applicationsCount} applications sent</p>
                  <Badge className="bg-yellow-500 mt-2">In Progress</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Applications */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">My Job Applications</h3>
          <div className="space-y-4">
            {jobApplications.map((application) => (
              <div key={application.id} className="relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-lg">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px]">
                  <div className="w-full h-full bg-slate-800/50 rounded-lg"></div>
                </div>
                
                <div className="relative flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h4 className="text-xl font-bold text-white">{application.title}</h4>
                      <Badge 
                        className={
                          application.status === "applied" 
                            ? "bg-blue-500" 
                            : application.status === "under-review" 
                            ? "bg-yellow-500" 
                            : "bg-green-500"
                        }
                      >
                        {application.status === "applied" ? "Applied" : 
                         application.status === "under-review" ? "Under Review" : "Interview Scheduled"}
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-2">{application.company} • {application.location}</p>
                    <p className="text-gray-400 text-sm mb-2">{application.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>💰 {application.salary}</span>
                      <span>📅 Applied: {application.appliedDate}</span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      onClick={() => navigate(`/job/${application.id}`)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {application.status === "interview-scheduled" && (
                      <Button 
                        variant="outline"
                        className="border-green-500 text-green-400 hover:bg-green-500/20"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        View Interview
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Recommended Jobs for You</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentJobs.map((job) => (
              <div key={job.id} className="relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-lg">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px]">
                  <div className="w-full h-full bg-slate-800/50 rounded-lg"></div>
                </div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-blue-500">{job.type}</Badge>
                    <div className="flex items-center text-gray-300 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.postedDate}
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-2">{job.title}</h4>
                  <p className="text-gray-300 text-sm mb-2">{job.company}</p>
                  <p className="text-gray-400 text-sm mb-4">{job.location}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-green-400 font-semibold">{job.salary}</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    onClick={() => navigate(`/job/${job.id}`)}
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Grid - Usage and Refer a Friend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Your Usage - Left Side */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Your Usage</h3>
            <div className="relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-lg">
              {/* Gradient Border */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px]">
                <div className="w-full h-full bg-slate-800/50 rounded-lg"></div>
              </div>
              
              <div className="relative space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-white mb-2">
                    <span>Applications Sent</span>
                    <span>{applicationProcess.applicationsCount}/50</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full" style={{width: `${(applicationProcess.applicationsCount/50)*100}%`}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-white mb-2">
                    <span>Interviews Scheduled</span>
                    <span>{applicationProcess.interviewsScheduled}/10</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full" style={{width: `${(applicationProcess.interviewsScheduled/10)*100}%`}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-white mb-2">
                    <span>Job Offers</span>
                    <span>{applicationProcess.offersReceived}/5</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full" style={{width: `${(applicationProcess.offersReceived/5)*100}%`}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Refer a Friend - Right Side */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Refer a Friend</h3>
            <div className="relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-lg">
              {/* Gradient Border */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px]">
                <div className="w-full h-full bg-slate-800/50 rounded-lg"></div>
              </div>
              
              <div className="relative text-left">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center mb-4 border-2 border-blue-300/50">
                  <Wallet className="w-6 h-6 text-white mr-1" />
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Earn 15%</h4>
                <p className="text-white font-semibold mb-4">Recurring Commission Forever</p>
                <p className="text-sm text-white mb-6">
                  Earn 15% recurring (that's forever) commission for referring friends to FitFind.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                  Refer Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Button */}
      <div className="fixed bottom-6 right-6">
        <Button size="lg" className="w-14 h-14 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white">
          ♿
        </Button>
      </div>
    </div>
  );
}
