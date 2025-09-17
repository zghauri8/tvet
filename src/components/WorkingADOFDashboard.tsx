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
            <img src={"/src/assets/logo.svg"} alt="Logo" className="h-8 w-8" />
            <h1 className="text-2xl font-semibold text-gray-800">Working ADOF Dashboard</h1>
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
                Working ADOF Menu
              </div>
              
              <Button className="w-full justify-start bg-blue-50 text-blue-700 border-blue-200">
                <Briefcase className="w-4 h-4 mr-3" />
                Enter Job for Apply
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
                <Upload className="w-4 h-4 mr-3" />
                Collect CV
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
                <Brain className="w-4 h-4 mr-3" />
                Personality Test
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
                <FileText className="w-4 h-4 mr-3" />
                Provide Personality Report
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
                <Activity className="w-4 h-4 mr-3" />
                Add Results in Backend
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
                <Users className="w-4 h-4 mr-3" />
                Filter Out Employees
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
                <CheckCircle className="w-4 h-4 mr-3" />
                Recommend or Reject
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome back, {user.name}!</h2>
            <p className="text-gray-600">Working ADOF Dashboard - Manage job applications, CV collection, personality tests, and employee recommendations</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Jobs Posted</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">CVs Collected</p>
                  <p className="text-2xl font-bold text-gray-900">15</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tests Completed</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Recommendations</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Employee Processing Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Employee Processing</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">CVs Collected</span>
                  <span className="text-sm font-medium text-gray-800">15/20</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tests Completed</span>
                  <span className="text-sm font-medium text-gray-800">12/15</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '80%'}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Recommendations</span>
                  <span className="text-sm font-medium text-gray-800">8/12</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '67%'}}></div>
                </div>
              </div>
            </Card>

            {/* Process Activity Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Process Activity</h3>
                <PieChart className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">Jobs Posted</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">3</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Upload className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">CVs Collected</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">15</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Brain className="w-4 h-4 text-purple-500 mr-2" />
                    <span className="text-sm text-gray-600">Tests Completed</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">12</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-yellow-500 mr-2" />
                    <span className="text-sm text-gray-600">Recommendations</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">8</span>
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

          {/* Working ADOF Process Status */}
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Working ADOF Process Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Enter Job for Apply</h4>
                <p className="text-gray-600 text-sm mb-2">3 jobs posted for applications</p>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Collect CV</h4>
                <p className="text-gray-600 text-sm mb-2">15 CVs collected from applicants</p>
                <Badge className="bg-green-100 text-green-800">In Progress</Badge>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Personality Test</h4>
                <p className="text-gray-600 text-sm mb-2">12 tests completed</p>
                <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>
              </div>
            </div>
          </Card>

          {/* Working ADOF Process Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Working ADOF Process Steps</h3>
              <Badge className="bg-blue-100 text-blue-800">7 Steps</Badge>
            </div>
            <div className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h4 className="text-xl font-semibold text-gray-800">1. Enter Job for Apply</h4>
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    </div>
                    <p className="text-gray-600 mb-2">Posted 3 job positions for applications</p>
                    <p className="text-gray-500 text-sm mb-2">Software Engineer, Product Manager, Data Analyst positions are now live</p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Job
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h4 className="text-xl font-semibold text-gray-800">2. Collect CV</h4>
                      <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                    </div>
                    <p className="text-gray-600 mb-2">15 CVs collected from applicants</p>
                    <p className="text-gray-500 text-sm mb-2">CVs are being processed and reviewed for initial screening</p>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Upload className="w-4 h-4 mr-2" />
                    View CVs
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h4 className="text-xl font-semibold text-gray-800">3. Personality Test</h4>
                      <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>
                    </div>
                    <p className="text-gray-600 mb-2">12 personality tests completed</p>
                    <p className="text-gray-500 text-sm mb-2">Test results are being analyzed and scored</p>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Brain className="w-4 h-4 mr-2" />
                    View Results
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h4 className="text-xl font-semibold text-gray-800">4. Provide Personality Report</h4>
                      <Badge className="bg-blue-100 text-blue-800">Pending</Badge>
                    </div>
                    <p className="text-gray-600 mb-2">Generate comprehensive personality reports</p>
                    <p className="text-gray-500 text-sm mb-2">Reports will be created based on test results</p>
                  </div>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Reports
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h4 className="text-xl font-semibold text-gray-800">5. Add Results in Backend</h4>
                      <Badge className="bg-blue-100 text-blue-800">Pending</Badge>
                    </div>
                    <p className="text-gray-600 mb-2">Store all results and data in backend system</p>
                    <p className="text-gray-500 text-sm mb-2">Results will be saved for further processing</p>
                  </div>
                  <Button variant="outline">
                    <Activity className="w-4 h-4 mr-2" />
                    Save to Backend
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h4 className="text-xl font-semibold text-gray-800">6. Filter Out Employees</h4>
                      <Badge className="bg-blue-100 text-blue-800">Pending</Badge>
                    </div>
                    <p className="text-gray-600 mb-2">Filter and categorize employees based on criteria</p>
                    <p className="text-gray-500 text-sm mb-2">Apply filtering algorithms to match candidates</p>
                  </div>
                  <Button variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Start Filtering
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h4 className="text-xl font-semibold text-gray-800">7. Recommend or Reject</h4>
                      <Badge className="bg-blue-100 text-blue-800">Pending</Badge>
                    </div>
                    <p className="text-gray-600 mb-2">Final recommendations for each candidate</p>
                    <p className="text-gray-500 text-sm mb-2">Make final hiring decisions based on all data</p>
                  </div>
                  <Button variant="outline">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Make Decisions
                  </Button>
                </div>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};