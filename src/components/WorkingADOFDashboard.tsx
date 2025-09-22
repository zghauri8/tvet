import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import JobEntryForm from "./JobEntryForm";
import CVCollection from "./CVCollection";
import ADOFPersonalityTest from "./ADOFPersonalityTest";
import PersonalityReport from "./PersonalityReport";
import EmployeeFiltering from "./EmployeeFiltering";
import RecommendReject from "./RecommendReject";
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
  ArrowRight,
  X
} from "lucide-react";

interface JobPosition {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  skills: string[];
  experience: string;
  education: string;
}

interface CVData {
  id: string;
  jobId: string;
  applicantName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  summary: string;
  workHistory: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  uploadedAt: string;
  status: string;
}

interface FilteredCandidate {
  cv: CVData;
  job: JobPosition;
  report: any;
  filterScore: number;
  filterReasons: string[];
  category: 'high_potential' | 'good_fit' | 'needs_development' | 'not_suitable';
}

export default function WorkingADOFDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<'dashboard' | 'job_entry' | 'cv_collection' | 'personality_test' | 'personality_report'>('dashboard');
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [selectedCV, setSelectedCV] = useState<CVData | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<FilteredCandidate | null>(null);
  const [testResult, setTestResult] = useState<any>(null);
  const [reportData, setReportData] = useState<any>(null);
  const [stats, setStats] = useState({
    jobsPosted: 0,
    cvsCollected: 0,
    testsCompleted: 0,
    recommendations: 0
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const jobs = JSON.parse(localStorage.getItem('adof_jobs') || '[]');
    const cvs = JSON.parse(localStorage.getItem('adof_cvs') || '[]');
    const reports = JSON.parse(localStorage.getItem('adof_reports') || '[]');
    const decisions = JSON.parse(localStorage.getItem('adof_decisions') || '[]');
    
    setStats({
      jobsPosted: jobs.length,
      cvsCollected: cvs.length,
      testsCompleted: reports.length,
      recommendations: decisions.filter((d: any) => d.decision === 'recommend').length
    });
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
            <h1 className="text-2xl font-semibold text-gray-800">ADOF</h1>
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
              
              <Button 
                variant={activeStep === 'dashboard' ? 'default' : 'ghost'}
                className={`w-full justify-start ${activeStep === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setActiveStep('dashboard')}
              >
                <Activity className="w-4 h-4 mr-3" />
                Dashboard
              </Button>
              
              <Button 
                variant={activeStep === 'job_entry' ? 'default' : 'ghost'}
                className={`w-full justify-start ${activeStep === 'job_entry' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setActiveStep('job_entry')}
              >
                <Briefcase className="w-4 h-4 mr-3" />
                Apply for Jobs
              </Button>
              
              <Button 
                variant={activeStep === 'cv_collection' ? 'default' : 'ghost'}
                className={`w-full justify-start ${activeStep === 'cv_collection' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setActiveStep('cv_collection')}
              >
                <Upload className="w-4 h-4 mr-3" />
                Collect CV
              </Button>
              
              <Button 
                variant={activeStep === 'personality_test' ? 'default' : 'ghost'}
                className={`w-full justify-start ${activeStep === 'personality_test' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setActiveStep('personality_test')}
              >
                <Brain className="w-4 h-4 mr-3" />
                Personality Test
              </Button>
              
              <Button 
                variant={activeStep === 'personality_report' ? 'default' : 'ghost'}
                className={`w-full justify-start ${activeStep === 'personality_report' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setActiveStep('personality_report')}
              >
                <FileText className="w-4 h-4 mr-3" />
                Provide Personality Report
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeStep === 'dashboard' && (
            <>
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
                      <p className="text-2xl font-bold text-gray-900">{stats.jobsPosted}</p>
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
                      <p className="text-2xl font-bold text-gray-900">{stats.cvsCollected}</p>
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
                      <p className="text-2xl font-bold text-gray-900">{stats.testsCompleted}</p>
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
                      <p className="text-2xl font-bold text-gray-900">{stats.recommendations}</p>
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
                      <span className="text-sm font-medium text-gray-800">{stats.cvsCollected}/20</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: `${Math.min((stats.cvsCollected/20)*100, 100)}%`}}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tests Completed</span>
                      <span className="text-sm font-medium text-gray-800">{stats.testsCompleted}/{stats.cvsCollected}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: `${stats.cvsCollected > 0 ? (stats.testsCompleted/stats.cvsCollected)*100 : 0}%`}}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Recommendations</span>
                      <span className="text-sm font-medium text-gray-800">{stats.recommendations}/{stats.testsCompleted}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: `${stats.testsCompleted > 0 ? (stats.recommendations/stats.testsCompleted)*100 : 0}%`}}></div>
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
                      <span className="text-sm font-medium text-gray-800">{stats.jobsPosted}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Upload className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">CVs Collected</span>
                      </div>
                      <span className="text-sm font-medium text-gray-800">{stats.cvsCollected}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Brain className="w-4 h-4 text-purple-500 mr-2" />
                        <span className="text-sm text-gray-600">Tests Completed</span>
                      </div>
                      <span className="text-sm font-medium text-gray-800">{stats.testsCompleted}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-yellow-500 mr-2" />
                        <span className="text-sm text-gray-600">Recommendations</span>
                      </div>
                      <span className="text-sm font-medium text-gray-800">{stats.recommendations}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}

          {activeStep === 'job_entry' && (
            <JobEntryForm 
              onJobCreated={(job: any) => {
                setSelectedJob(job);
                loadStats();
                setRefreshTrigger(prev => prev + 1); // Trigger refresh
                setActiveStep('cv_collection');
              }}
              onBack={() => setActiveStep('dashboard')}
            />
          )}

          {activeStep === 'cv_collection' && (
            <CVCollection 
              key={activeStep} // Force re-render when step changes
              refreshTrigger={refreshTrigger}
              onBack={() => setActiveStep('dashboard')}
              onCVSelected={(cv) => {
                setSelectedCV(cv);
                const job = JSON.parse(localStorage.getItem('adof_jobs') || '[]').find((j: JobPosition) => j.id === cv.jobId);
                setSelectedJob(job);
                setActiveStep('personality_test');
              }}
            />
          )}

          {activeStep === 'personality_test' && (
            selectedCV && selectedJob ? (
              <ADOFPersonalityTest 
                cv={selectedCV}
                job={selectedJob}
                onTestComplete={(cv, result) => {
                  setTestResult(result);
                  loadStats();
                  setActiveStep('personality_report');
                }}
                onBack={() => setActiveStep('cv_collection')}
              />
            ) : (
              <div className="max-w-4xl mx-auto p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">Personality Test</h2>
                  <p className="text-gray-600">Please complete the previous steps to access the personality test</p>
                </div>
                <Card className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Test Available</h3>
                  <p className="text-gray-600 mb-4">
                    To take a personality test, you need to:
                  </p>
                  <div className="text-left max-w-md mx-auto mb-6">
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                      <li>Create a job position</li>
                      <li>Collect CVs from applicants</li>
                      <li>Select a CV to test</li>
                    </ol>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button onClick={() => setActiveStep('job_entry')} variant="outline">
                      Create Job
                    </Button>
                    <Button onClick={() => setActiveStep('cv_collection')}>
                      Collect CVs
                    </Button>
                    <Button 
                      onClick={() => {
                        // Add sample data and auto-select CV for quick test
                        const sampleJob = {
                          id: 'sample_job_1',
                          title: 'Software Engineer',
                          company: 'TechCorp Solutions',
                          location: 'New York, NY',
                          type: 'Full-time',
                          salary: '$80,000 - $100,000',
                          description: 'We are looking for a skilled software engineer to join our team.',
                          requirements: ['Bachelor\'s degree in Computer Science', '3+ years experience', 'Strong problem-solving skills'],
                          skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
                          experience: '3-5 years',
                          education: 'Bachelor\'s degree in Computer Science or related field'
                        };
                        
                        const sampleCV = {
                          id: 'sample_cv_1',
                          jobId: 'sample_job_1',
                          applicantName: 'John Doe',
                          email: 'john.doe@email.com',
                          phone: '+1 (555) 123-4567',
                          location: 'New York, NY',
                          experience: '4 years of software development experience',
                          education: 'Bachelor\'s in Computer Science from NYU',
                          skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'],
                          summary: 'Experienced software engineer with a passion for creating efficient and scalable applications.',
                          workHistory: [
                            {
                              company: 'TechStart Inc',
                              position: 'Senior Software Engineer',
                              duration: '2022 - Present',
                              description: 'Led development of microservices architecture and mentored junior developers.'
                            }
                          ],
                          uploadedAt: new Date().toISOString(),
                          status: 'pending'
                        };
                        
                        // Store sample data
                        localStorage.setItem('adof_jobs', JSON.stringify([sampleJob]));
                        localStorage.setItem('adof_cvs', JSON.stringify([sampleCV]));
                        
                        // Set selected CV and job
                        setSelectedJob(sampleJob);
                        setSelectedCV(sampleCV);
                        loadStats();
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Quick Test
                    </Button>
                  </div>
                </Card>
              </div>
            )
          )}

          {activeStep === 'personality_report' && (
            selectedCV && selectedJob && testResult ? (
              <PersonalityReport 
                cv={selectedCV}
                job={selectedJob}
                testResult={testResult}
                onReportGenerated={(cv, report) => {
                  setReportData(report);
                  loadStats();
                  setActiveStep('employee_filtering');
                }}
                onBack={() => setActiveStep('personality_test')}
              />
            ) : (
              <div className="max-w-4xl mx-auto p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">Personality Report</h2>
                  <p className="text-gray-600">Generate personality reports for tested candidates</p>
                </div>
                <Card className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Report Available</h3>
                  <p className="text-gray-600 mb-4">
                    To generate a personality report, you need to complete a personality test first.
                  </p>
                  <div className="text-left max-w-md mx-auto mb-6">
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                      <li>Complete a personality test</li>
                      <li>View test results</li>
                      <li>Generate comprehensive report</li>
                    </ol>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button onClick={() => setActiveStep('personality_test')} variant="outline">
                      Take Test
                    </Button>
                    <Button onClick={() => setActiveStep('cv_collection')}>
                      Select CV
                    </Button>
                  </div>
                </Card>
              </div>
            )
          )}

          {activeStep === 'employee_filtering' && (
            <EmployeeFiltering 
              onBack={() => setActiveStep('dashboard')}
              onCandidateSelected={(candidate) => {
                setSelectedCandidate(candidate);
                setActiveStep('recommend_reject');
              }}
            />
          )}

          {activeStep === 'recommend_reject' && (
            selectedCandidate ? (
              <RecommendReject 
                candidate={selectedCandidate}
                onBack={() => setActiveStep('employee_filtering')}
                onDecisionMade={(decision) => {
                  loadStats();
                  setActiveStep('dashboard');
                }}
              />
            ) : (
              <div className="max-w-4xl mx-auto p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">Recommend or Reject</h2>
                  <p className="text-gray-600">Make final hiring decisions for filtered candidates</p>
                </div>
                <Card className="p-8 text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Candidate Selected</h3>
                  <p className="text-gray-600 mb-4">
                    To make hiring decisions, you need to filter candidates first.
                  </p>
                  <div className="text-left max-w-md mx-auto mb-6">
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                      <li>Filter candidates based on assessments</li>
                      <li>Review filtered results</li>
                      <li>Select a candidate for decision</li>
                    </ol>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button onClick={() => setActiveStep('employee_filtering')} variant="outline">
                      Filter Candidates
                    </Button>
                    <Button onClick={() => setActiveStep('personality_report')}>
                      Generate Reports
                    </Button>
                  </div>
                </Card>
              </div>
            )
          )}


        </div>
      </div>
    </div>
  );
};