import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Filter, 
  Search, 
  User, 
  Target, 
  TrendingUp, 
  TrendingDown,
  CheckCircle,
  X,
  Eye,
  ArrowLeft,
  Users,
  BarChart3
} from "lucide-react";

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

interface ReportData {
  id: string;
  cvId: string;
  jobId: string;
  testResult: any;
  report: {
    overallScore: number;
    personalityType: string;
    strengths: string[];
    areasForImprovement: string[];
    jobFit: number;
    recommendations: string[];
    riskFactors: string[];
    summary: string;
    detailedAnalysis: string;
  };
  generatedAt: string;
  status: string;
}

interface FilteredCandidate {
  cv: CVData;
  job: JobPosition;
  report: ReportData;
  filterScore: number;
  filterReasons: string[];
  category: 'high_potential' | 'good_fit' | 'needs_development' | 'not_suitable';
}

interface EmployeeFilteringProps {
  onBack: () => void;
  onCandidateSelected: (candidate: FilteredCandidate) => void;
}

export default function EmployeeFiltering({ onBack, onCandidateSelected }: EmployeeFilteringProps) {
  const [cvs, setCvs] = useState<CVData[]>([]);
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [reports, setReports] = useState<ReportData[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<FilteredCandidate[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedCVs = JSON.parse(localStorage.getItem('adof_cvs') || '[]');
    const storedJobs = JSON.parse(localStorage.getItem('adof_jobs') || '[]');
    const storedReports = JSON.parse(localStorage.getItem('adof_reports') || '[]');
    
    setCvs(storedCVs);
    setJobs(storedJobs);
    setReports(storedReports);
  };

  const runFiltering = async () => {
    setIsFiltering(true);
    
    try {
      // Simulate filtering process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const candidates: FilteredCandidate[] = [];
      
      // Get CVs with completed reports
      const cvsWithReports = cvs.filter(cv => 
        reports.some(report => report.cvId === cv.id)
      );
      
      for (const cv of cvsWithReports) {
        const job = jobs.find(j => j.id === cv.jobId);
        const report = reports.find(r => r.cvId === cv.id);
        
        if (job && report) {
          const filterResult = analyzeCandidate(cv, job, report);
          candidates.push({
            cv,
            job,
            report,
            ...filterResult
          });
        }
      }
      
      // Sort by filter score
      candidates.sort((a, b) => b.filterScore - a.filterScore);
      
      setFilteredCandidates(candidates);
    } catch (error) {
      console.error('Error filtering candidates:', error);
    } finally {
      setIsFiltering(false);
    }
  };

  const analyzeCandidate = (cv: CVData, job: JobPosition, report: ReportData) => {
    let filterScore = 0;
    const reasons: string[] = [];
    
    // Personality test score (40% weight)
    const personalityScore = report.report.overallScore;
    filterScore += personalityScore * 0.4;
    
    if (personalityScore >= 80) {
      reasons.push('Excellent personality assessment score');
    } else if (personalityScore >= 60) {
      reasons.push('Good personality assessment score');
    } else {
      reasons.push('Below average personality assessment score');
    }
    
    // Job fit score (30% weight)
    const jobFitScore = report.report.jobFit;
    filterScore += jobFitScore * 0.3;
    
    if (jobFitScore >= 80) {
      reasons.push('High job fit score');
    } else if (jobFitScore >= 60) {
      reasons.push('Moderate job fit score');
    } else {
      reasons.push('Low job fit score');
    }
    
    // Skill match (20% weight)
    const matchingSkills = job.skills.filter(skill => 
      cv.skills.some(cvSkill => cvSkill.toLowerCase().includes(skill.toLowerCase()))
    );
    const skillMatchScore = (matchingSkills.length / job.skills.length) * 100;
    filterScore += skillMatchScore * 0.2;
    
    if (skillMatchScore >= 70) {
      reasons.push('Strong skill alignment');
    } else if (skillMatchScore >= 50) {
      reasons.push('Moderate skill alignment');
    } else {
      reasons.push('Limited skill alignment');
    }
    
    // Experience match (10% weight)
    let experienceScore = 0;
    if (cv.experience && job.experience) {
      // Simple experience matching logic
      const cvYears = extractYears(cv.experience);
      const jobYears = extractYears(job.experience);
      
      if (cvYears >= jobYears) {
        experienceScore = 100;
        reasons.push('Meets experience requirements');
      } else if (cvYears >= jobYears * 0.7) {
        experienceScore = 70;
        reasons.push('Partially meets experience requirements');
      } else {
        experienceScore = 30;
        reasons.push('Below experience requirements');
      }
    }
    filterScore += experienceScore * 0.1;
    
    // Determine category
    let category: FilteredCandidate['category'];
    if (filterScore >= 80) {
      category = 'high_potential';
    } else if (filterScore >= 65) {
      category = 'good_fit';
    } else if (filterScore >= 50) {
      category = 'needs_development';
    } else {
      category = 'not_suitable';
    }
    
    return {
      filterScore: Math.round(filterScore),
      filterReasons: reasons,
      category
    };
  };

  const extractYears = (experience: string): number => {
    const match = experience.match(/(\d+)\s*year/i);
    return match ? parseInt(match[1]) : 0;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'high_potential': return 'bg-green-100 text-green-800';
      case 'good_fit': return 'bg-blue-100 text-blue-800';
      case 'needs_development': return 'bg-yellow-100 text-yellow-800';
      case 'not_suitable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'high_potential': return <TrendingUp className="w-4 h-4" />;
      case 'good_fit': return <CheckCircle className="w-4 h-4" />;
      case 'needs_development': return <TrendingDown className="w-4 h-4" />;
      case 'not_suitable': return <X className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const filteredResults = filteredCandidates.filter(candidate => {
    const matchesJob = !selectedJob || candidate.job.id === selectedJob;
    const matchesSearch = !searchTerm || 
      candidate.cv.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.cv.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || candidate.category === filterCategory;
    
    return matchesJob && matchesSearch && matchesCategory;
  });

  const categoryStats = {
    high_potential: filteredCandidates.filter(c => c.category === 'high_potential').length,
    good_fit: filteredCandidates.filter(c => c.category === 'good_fit').length,
    needs_development: filteredCandidates.filter(c => c.category === 'needs_development').length,
    not_suitable: filteredCandidates.filter(c => c.category === 'not_suitable').length
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Filter Out Employees</h2>
        <p className="text-gray-600">Analyze and categorize candidates based on comprehensive assessment</p>
      </div>

      {/* Filtering Controls */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <Label htmlFor="search" className="text-sm font-medium text-gray-700">Search Candidates</Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or email..."
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <Label htmlFor="jobFilter" className="text-sm font-medium text-gray-700">Filter by Job</Label>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All jobs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All jobs</SelectItem>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title} - {job.company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Label htmlFor="categoryFilter" className="text-sm font-medium text-gray-700">Filter by Category</Label>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All categories</SelectItem>
                <SelectItem value="high_potential">High Potential</SelectItem>
                <SelectItem value="good_fit">Good Fit</SelectItem>
                <SelectItem value="needs_development">Needs Development</SelectItem>
                <SelectItem value="not_suitable">Not Suitable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={runFiltering}
            disabled={isFiltering || cvs.length === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isFiltering ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Filtering...
              </>
            ) : (
              <>
                <Filter className="w-4 h-4 mr-2" />
                Run Filtering
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Statistics */}
      {filteredCandidates.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{categoryStats.high_potential}</div>
            <div className="text-sm text-gray-600">High Potential</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{categoryStats.good_fit}</div>
            <div className="text-sm text-gray-600">Good Fit</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">{categoryStats.needs_development}</div>
            <div className="text-sm text-gray-600">Needs Development</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">{categoryStats.not_suitable}</div>
            <div className="text-sm text-gray-600">Not Suitable</div>
          </Card>
        </div>
      )}

      {/* Filtered Candidates */}
      {filteredCandidates.length === 0 && !isFiltering ? (
        <Card className="p-8 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Candidates to Filter</h3>
          <p className="text-gray-600 mb-4">
            Complete the previous steps (job entry, CV collection, personality testing, and report generation) to filter candidates.
          </p>
          <Button onClick={runFiltering} disabled={cvs.length === 0}>
            <Filter className="w-4 h-4 mr-2" />
            Run Filtering
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((candidate) => (
            <Card key={candidate.cv.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{candidate.cv.applicantName}</h3>
                    <p className="text-sm text-gray-600">{candidate.cv.email}</p>
                  </div>
                </div>
                <Badge className={`${getCategoryColor(candidate.category)} flex items-center gap-1`}>
                  {getCategoryIcon(candidate.category)}
                  {candidate.category.replace('_', ' ')}
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Filter Score:</span>
                  <span className="font-semibold text-gray-800">{candidate.filterScore}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Personality Score:</span>
                  <span className="font-semibold text-gray-800">{candidate.report.report.overallScore}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Job Fit:</span>
                  <span className="font-semibold text-gray-800">{candidate.report.report.jobFit}%</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Key Reasons:</h4>
                <div className="space-y-1">
                  {candidate.filterReasons.slice(0, 3).map((reason, index) => (
                    <div key={index} className="text-xs text-gray-600 flex items-start">
                      <span className="text-blue-600 mr-1">•</span>
                      {reason}
                    </div>
                  ))}
                  {candidate.filterReasons.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{candidate.filterReasons.length - 3} more reasons
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onCandidateSelected(candidate)}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Review
                </Button>
                <Button 
                  size="sm" 
                  className={`flex-1 ${
                    candidate.category === 'high_potential' || candidate.category === 'good_fit'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                >
                  {candidate.category === 'high_potential' || candidate.category === 'good_fit' ? 'Recommend' : 'Review'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
