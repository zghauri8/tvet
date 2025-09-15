import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import PersonalityTest from "./PersonalityTest";
import PersonalityTestResults from "./PersonalityTestResults";
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
  TrendingUp,
  Star,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Bookmark,
  MessageSquare,
  Image,
  Mic
} from "lucide-react";

export default function TVETDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'dashboard' | 'test' | 'results'>('dashboard');
  const [testResults, setTestResults] = useState<any>(null);

  const handleLogout = () => {
    logout();
  };

  const handleStartTest = () => {
    setCurrentView('test');
  };

  const handleTestComplete = (results: any) => {
    setTestResults(results);
    setCurrentView('results');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleRetakeTest = () => {
    setCurrentView('test');
  };

  // Mock data for courses and personality test status
  const courses = [
    {
      id: 1,
      title: "Technical Skills Development",
      description: "Learn essential technical skills for your chosen field including programming, system design, and modern development practices",
      progress: 75,
      status: "in-progress",
      duration: "8 weeks",
      instructor: "Dr. Sarah Johnson",
      modules: 12,
      completedModules: 9,
      nextDeadline: "2024-02-15",
      grade: "A-"
    },
    {
      id: 2,
      title: "Professional Communication",
      description: "Master workplace communication, presentation skills, and professional writing for technical environments",
      progress: 45,
      status: "in-progress",
      duration: "6 weeks",
      instructor: "Prof. Michael Chen",
      modules: 8,
      completedModules: 4,
      nextDeadline: "2024-02-10",
      grade: "B+"
    },
    {
      id: 3,
      title: "Industry Certification Prep",
      description: "Prepare for industry-recognized certifications in your field with comprehensive exam preparation",
      progress: 0,
      status: "not-started",
      duration: "10 weeks",
      instructor: "Eng. Lisa Rodriguez",
      modules: 15,
      completedModules: 0,
      nextDeadline: "2024-03-01",
      grade: null
    }
  ];

  const personalityTestStatus = {
    completed: true,
    score: 85,
    lastTaken: "2024-01-15",
    strengths: ["Analytical Thinking", "Problem Solving", "Attention to Detail", "Technical Aptitude"],
    recommendations: ["Software Engineering", "Data Analysis", "Quality Control", "System Administration"],
    personalityType: "INTJ - The Architect",
    careerFit: 92
  };

  const achievements = [
    {
      id: 1,
      title: "First Course Completed",
      description: "Successfully completed Technical Skills Development course",
      date: "2024-01-20",
      icon: Award,
      type: "course"
    },
    {
      id: 2,
      title: "Personality Assessment",
      description: "Completed comprehensive personality assessment",
      date: "2024-01-15",
      icon: Brain,
      type: "assessment"
    },
    {
      id: 3,
      title: "High Performer",
      description: "Maintained A- average across all courses",
      date: "2024-01-10",
      icon: Star,
      type: "performance"
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

  // Show personality test component
  if (currentView === 'test') {
    return (
      <PersonalityTest 
        onTestComplete={handleTestComplete}
        onBack={handleBackToDashboard}
      />
    );
  }

  // Show test results component
  if (currentView === 'results') {
    return (
      <PersonalityTestResults 
        userId={user.id || user.email}
        onBack={handleBackToDashboard}
        onRetakeTest={handleRetakeTest}
      />
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
            <h1 className="text-2xl font-semibold text-gray-800">FitFind Dashboard</h1>
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
                TVET Student Menu
              </div>
              
              <Button className="w-full justify-start bg-blue-50 text-blue-700 border-blue-200">
                <Brain className="w-4 h-4 mr-3" />
                Personality Test
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
                <BookOpen className="w-4 h-4 mr-3" />
                Courses
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
                <FileText className="w-4 h-4 mr-3" />
                Report
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome back, {user.name}!</h2>
            <p className="text-gray-600">TVET Student Dashboard - Complete your personality test, courses, and view your report</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Personality Test</p>
                  <p className="text-2xl font-bold text-gray-900">{personalityTestStatus.completed ? "Completed" : "Pending"}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">3 Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{courses.filter(c => c.status === "completed").length}/3</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Report Status</p>
                  <p className="text-2xl font-bold text-gray-900">{personalityTestStatus.completed ? "Ready" : "Pending"}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Progress Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Learning Progress</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Technical Skills</span>
                  <span className="text-sm font-medium text-gray-800">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Communication</span>
                  <span className="text-sm font-medium text-gray-800">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Certification</span>
                  <span className="text-sm font-medium text-gray-800">0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '0%'}}></div>
                </div>
              </div>
            </Card>

            {/* Usage Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">AI Usage</h3>
                <PieChart className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">Chat Messages</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">1,250</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Image className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Image Prompts</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">340</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Mic className="w-4 h-4 text-purple-500 mr-2" />
                    <span className="text-sm text-gray-600">Voice Counts</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">89</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                    <span className="text-sm text-gray-600">AI Words</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">15,420</span>
                </div>
              </div>
            </Card>
          </div>


          {/* Personality Test Section */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Personality Assessment</h4>
                  <p className="text-gray-600">
                    {personalityTestStatus.completed 
                      ? `Completed - Score: ${personalityTestStatus.score}%` 
                      : "Take our comprehensive personality assessment to discover your strengths"}
                  </p>
                </div>
              </div>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleStartTest}
              >
                {personalityTestStatus.completed ? "Retake Test" : "Start Assessment"}
              </Button>
            </div>
          </Card>

          {/* 3 Courses Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Courses</h3>
              <Badge className="bg-blue-100 text-blue-800">Required Courses</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge 
                      className={
                        course.status === "completed" 
                          ? "bg-green-100 text-green-800" 
                          : course.status === "in-progress" 
                          ? "bg-yellow-100 text-yellow-800" 
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {course.status === "completed" ? "Completed" : 
                       course.status === "in-progress" ? "In Progress" : "Not Started"}
                    </Badge>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-700 mb-2">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{width: `${course.progress}%`}}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{course.completedModules}/{course.modules} modules</span>
                      {course.grade && <span>Grade: {course.grade}</span>}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-500 text-sm mb-1">Instructor: {course.instructor}</p>
                    <p className="text-gray-500 text-sm">Next deadline: {course.nextDeadline}</p>
                  </div>
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => navigate(`/course/${course.id}`)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {course.status === "not-started" ? "Start Course" : "Continue"}
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Report Section */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Report</h4>
                  <p className="text-gray-600">Based on your personality test and 3 courses completion</p>
                </div>
              </div>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate("/reports")}
              >
                View Report
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-gray-800 mb-2">{personalityTestStatus.score}%</div>
                <div className="text-gray-600 text-sm">Assessment Score</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-gray-800 mb-2">{personalityTestStatus.careerFit}%</div>
                <div className="text-gray-600 text-sm">Career Fit</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-800 mb-2">{personalityTestStatus.personalityType}</div>
                <div className="text-gray-600 text-sm">Personality Type</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-lg font-semibold text-gray-800 mb-3">Top Strengths</h5>
                <div className="space-y-2">
                  {personalityTestStatus.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {strength}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-lg font-semibold text-gray-800 mb-3">Career Recommendations</h5>
                <div className="space-y-2">
                  {personalityTestStatus.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <Target className="w-4 h-4 text-blue-500 mr-2" />
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};