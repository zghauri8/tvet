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
  BookOpen,
  FileText,
  Play,
  CheckCircle,
  Clock,
  Award,
  TrendingUp
} from "lucide-react";

export default function TVETDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  // Mock data for courses and personality test status
  const courses = [
    {
      id: 1,
      title: "Technical Skills Development",
      description: "Learn essential technical skills for your chosen field",
      progress: 75,
      status: "in-progress",
      duration: "8 weeks",
      instructor: "Dr. Sarah Johnson"
    },
    {
      id: 2,
      title: "Professional Communication",
      description: "Master workplace communication and presentation skills",
      progress: 45,
      status: "in-progress",
      duration: "6 weeks",
      instructor: "Prof. Michael Chen"
    },
    {
      id: 3,
      title: "Industry Certification Prep",
      description: "Prepare for industry-recognized certifications",
      progress: 0,
      status: "not-started",
      duration: "10 weeks",
      instructor: "Eng. Lisa Rodriguez"
    }
  ];

  const personalityTestStatus = {
    completed: true,
    score: 85,
    lastTaken: "2024-01-15",
    strengths: ["Analytical Thinking", "Problem Solving", "Attention to Detail"],
    recommendations: ["Engineering", "Data Analysis", "Quality Control"]
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Loading...</h1>
          <p className="text-purple-300">Please wait while we load your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-slate-800/50 backdrop-blur-sm border-r border-purple-500/20">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-full"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              FitFind
            </span>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-4">
              START HERE
            </div>
            
            <Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              <div className="w-4 h-4 border-2 border-white rounded-full mr-3"></div>
              Dashboard
            </Button>
            
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-purple-500/20">
              <Brain className="w-4 h-4 mr-3" />
              Personality Test
            </Button>

            <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-4 mt-6">
              LEARNING PATH
            </div>
            
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-purple-500/20">
              <BookOpen className="w-4 h-4 mr-3" />
              My Courses
            </Button>
            
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-purple-500/20">
              <FileText className="w-4 h-4 mr-3" />
              Reports
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
            <p className="text-purple-300">Welcome to FitFind</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
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
              </div>
              <div className="flex flex-col space-y-3">
                <Button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white rounded-lg px-6 py-2">
                  Upgrade Plan
                </Button>
                <Button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white rounded-lg px-6 py-2">
                  Cancel Plan
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Personality Test Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Personality Assessment</h3>
          <div className="relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-lg">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px]">
              <div className="w-full h-full bg-slate-800/50 rounded-lg"></div>
            </div>
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Personality Test</h4>
                  <p className="text-gray-300">
                    {personalityTestStatus.completed 
                      ? `Completed - Score: ${personalityTestStatus.score}%` 
                      : "Not completed yet"}
                  </p>
                </div>
              </div>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={() => navigate("/personality-test")}
              >
                {personalityTestStatus.completed ? "Retake Test" : "Start Test"}
              </Button>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">My Courses (3 Courses)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-lg">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px]">
                  <div className="w-full h-full bg-slate-800/50 rounded-lg"></div>
                </div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <Badge 
                      className={
                        course.status === "completed" 
                          ? "bg-green-500" 
                          : course.status === "in-progress" 
                          ? "bg-yellow-500" 
                          : "bg-gray-500"
                      }
                    >
                      {course.status === "completed" ? "Completed" : 
                       course.status === "in-progress" ? "In Progress" : "Not Started"}
                    </Badge>
                    <div className="flex items-center text-gray-300 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-2">{course.title}</h4>
                  <p className="text-gray-300 text-sm mb-4">{course.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-white mb-2">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                        style={{width: `${course.progress}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">Instructor: {course.instructor}</p>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    onClick={() => navigate(`/course/${course.id}`)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {course.status === "not-started" ? "Start Course" : "Continue"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reports Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Reports & Analytics</h3>
          <div className="relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-lg">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px]">
              <div className="w-full h-full bg-slate-800/50 rounded-lg"></div>
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Career Assessment Report</h4>
                    <p className="text-gray-300">Based on your personality test and course progress</p>
                  </div>
                </div>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={() => navigate("/reports")}
                >
                  View Full Report
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-lg font-semibold text-white mb-3">Top Strengths</h5>
                  <div className="space-y-2">
                    {personalityTestStatus.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        {strength}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-lg font-semibold text-white mb-3">Career Recommendations</h5>
                  <div className="space-y-2">
                    {personalityTestStatus.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center text-gray-300">
                        <Award className="w-4 h-4 text-yellow-400 mr-2" />
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
                    <span>Remaining AI Words</span>
                    <span>0/100000</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full" style={{width: '0%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-white mb-2">
                    <span>Remaining AI Chats</span>
                    <span>0/500</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full" style={{width: '0%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-white mb-2">
                    <span>Remaining Image Prompts</span>
                    <span>0/0</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full" style={{width: '0%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-white mb-2">
                    <span>Remaining Voice Counts</span>
                    <span>0/100</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full" style={{width: '0%'}}></div>
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
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
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
