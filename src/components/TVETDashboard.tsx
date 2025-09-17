import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import PersonalityTest from "./PersonalityTest";
import PersonalityTestResults from "./PersonalityTestResults";
// Removed inline report section usage per request
import { personalityTestService, TestResult, UserStats } from "../services/personalityTestService";
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
  Play,
  CheckCircle,
  Clock,
  Award,
  TrendingUp,
  Star,
  BarChart3,
  Activity,
  Zap,
  Bookmark,
  MessageSquare,
  Image,
  Mic,
  AlertTriangle
} from "lucide-react";

export default function TVETDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showTest, setShowTest] = useState(false);
  const [testResults, setTestResults] = useState<TestResult | null>(null);
  const [activeSidebarItem, setActiveSidebarItem] = useState<'dashboard' | 'personality' | 'courses'>('dashboard');
  const [userStats, setUserStats] = useState<UserStats>({
    totalTests: 0,
    averageScore: 0,
    topTrait: '',
    completedThisMonth: 0,
    lastTestDate: ''
  });
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
  };

  const handleStartTest = () => {
    setShowTest(true);
  };

  const handleTestComplete = (results: TestResult) => {
    console.log('Test completed with results:', results);
    setTestResults(results);
    setShowTest(false);
    setActiveSidebarItem('dashboard');
    
    // Force reload stats after a short delay to ensure localStorage is updated
    setTimeout(() => {
      loadUserStats(); // Reload stats after test completion
    }, 500);
  };

  const handleBackToDashboard = () => {
    setShowTest(false);
  };

  // Load user stats when component mounts
  useEffect(() => {
    if (user) {
      loadUserStats();
    }
  }, [user]);

  const loadUserStats = async () => {
    try {
      const userId = user?.id || user?.email || '';
      console.log('Loading stats for user:', userId);
      
      // First check what's in localStorage
      const testHistory = personalityTestService.getTestHistory(userId);
      console.log('Test history from localStorage:', testHistory);
      
      const stats = await personalityTestService.getUserStats(userId);
      console.log('Calculated stats:', stats);
      
      setUserStats(stats);
      setLoading(false);
    } catch (error) {
      console.error('Error loading user stats:', error);
      setLoading(false);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading Dashboard...</h1>
          <p className="text-gray-600">Please wait while we load your assessment data.</p>
        </div>
      </div>
    );
  }

  // We no longer early-return; test renders inside the main content to keep sidebar visible

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Microsoft Outlook-style Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <img src={"/src/assets/logo.svg"} alt="Logo" className="h-8 w-auto" />
            <h1 className="text-2xl font-semibold text-gray-800">TVET</h1>
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
              <Button 
                variant={activeSidebarItem === 'dashboard' ? 'default' : 'ghost'} 
                className={`w-full justify-start ${activeSidebarItem === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setActiveSidebarItem('dashboard')}
              >
                <Activity className="w-4 h-4 mr-3" />
                Dashboard
              </Button>

              <Button 
                variant={activeSidebarItem === 'personality' ? 'default' : 'ghost'} 
                className={`w-full justify-start ${activeSidebarItem === 'personality' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => { setActiveSidebarItem('personality'); setShowTest(true); }}
              >
                <Brain className="w-4 h-4 mr-3" />
                Personality Test
              </Button>
              
              <Button 
                variant={activeSidebarItem === 'courses' ? 'default' : 'ghost'} 
                className={`w-full justify-start ${activeSidebarItem === 'courses' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setActiveSidebarItem('courses')}
              >
                <BookOpen className="w-4 h-4 mr-3" />
                Courses
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeSidebarItem === 'dashboard' && (
            <>
          {/* Welcome Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome back, {user.name}!</h2>
                <p className="text-gray-600">TVET Student Dashboard - Complete your personality test, courses, and view your report</p>
              </div>
              <Button variant="outline" onClick={loadUserStats}>
                <Activity className="w-4 h-4 mr-2" />
                Refresh Stats
              </Button>
            </div>
          </div>



          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tests Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.totalTests}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.averageScore}%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Top Trait</p>
                  <p className="text-lg font-bold text-gray-900 capitalize">{userStats.topTrait.replace('_', ' ') || 'None'}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.completedThisMonth}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Charts Section (AI Usage removed) */}
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
                    {userStats.totalTests > 0 
                      ? `Completed ${userStats.totalTests} test(s) - Average Score: ${userStats.averageScore}%` 
                      : "Take our comprehensive personality assessment to discover your strengths and get personalized recommendations"}
                  </p>
                </div>
              </div>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => { setActiveSidebarItem('personality'); setShowTest(true); }}
              >
                {userStats.totalTests > 0 ? "Take New Test" : "Start Assessment"}
              </Button>
            </div>
          </Card>

          {/* Warning message for users with no tests */}
          {userStats.totalTests === 0 && (
            <Card className="p-6 mb-8 border-yellow-200 bg-yellow-50">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-yellow-800 mb-2">Complete Your First Assessment</h4>
                  <p className="text-yellow-700 mb-4">
                    To get started with your personalized learning journey, please complete at least one personality assessment test. 
                    This will help us understand your strengths and provide you with customized course recommendations.
                  </p>
                  <div className="flex items-center space-x-4">
                    <Button 
                      className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      onClick={handleStartTest}
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Start Assessment Now
                    </Button>
                    <span className="text-sm text-yellow-600">Takes 10-15 minutes</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Retake Assessment message for users with completed tests */}
          {userStats.totalTests > 0 && (
            <Card className="p-6 mb-8 border-blue-200 bg-blue-50">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-blue-800 mb-2">Ready for Another Assessment?</h4>
                  <p className="text-blue-700 mb-4">
                    You've completed {userStats.totalTests} assessment(s) with an average score of {userStats.averageScore}%. 
                    Take another test to track your progress or explore different personality traits.
                  </p>
                  <div className="flex items-center space-x-4">
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={handleStartTest}
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Retake Assessment
                    </Button>
                    <span className="text-sm text-blue-600">Takes 10-15 minutes</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Test Results Section - Show when user has completed tests */}
          {userStats.totalTests > 0 && (
            <Card className="p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Your Assessment Results</h3>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/results')}
                >
                  View All Results
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Latest Test Score</h4>
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl font-bold text-blue-600">{userStats.averageScore}%</div>
                    <div>
                      <p className="text-sm text-gray-600">Average Score</p>
                      <p className="text-sm text-gray-500">Based on {userStats.totalTests} test(s)</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Top Strength</h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 capitalize">{userStats.topTrait.replace('_', ' ') || 'None'}</p>
                      <p className="text-sm text-gray-500">Your strongest trait</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

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

            </>
          )}

          {activeSidebarItem === 'personality' && (
            <div className="space-y-6">
              <div className="mb-2">
                <h2 className="text-2xl font-semibold text-gray-800 mb-1">Personality Test</h2>
                <p className="text-gray-600">Generate test and answer MCQs below.</p>
              </div>
              <Card className="p-0 overflow-hidden">
                <div className="p-4">
                  <PersonalityTest 
                    onTestComplete={handleTestComplete}
                    onBack={handleBackToDashboard}
                    userId={user?.id || user?.email || ''}
                  />
                </div>
              </Card>
            </div>
          )}

          {activeSidebarItem === 'courses' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Courses</h2>
                <p className="text-gray-600">Your learning journey starts here</p>
              </div>
              
              <Card className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Courses Coming Soon</h3>
                <p className="text-gray-600 mb-4">
                  We're working hard to bring you comprehensive courses that align with your personality assessment results.
                </p>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">Stay tuned for:</p>
                  <ul className="text-blue-700 text-sm mt-2 space-y-1">
                    <li>• Personalized course recommendations</li>
                    <li>• Interactive learning modules</li>
                    <li>• Progress tracking and certificates</li>
                    <li>• Industry-relevant skills development</li>
                  </ul>
                </div>
              </Card>
            </div>
          )}

          {/* Report section removed per request */}

        </div>
      </div>
    </div>
  );
};