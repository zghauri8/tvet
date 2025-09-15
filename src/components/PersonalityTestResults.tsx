import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Target, 
  Award, 
  CheckCircle,
  ArrowLeft,
  Download,
  Share2,
  RefreshCw
} from "lucide-react";

interface TestResult {
  trait: string;
  score: number;
  level: string;
  strengths: string[];
  recommendations: string[];
  completed_date: string;
}

interface PersonalityTestResultsProps {
  userId: string;
  onBack: () => void;
  onRetakeTest: () => void;
}

export default function PersonalityTestResults({ userId, onBack, onRetakeTest }: PersonalityTestResultsProps) {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTests: 0,
    averageScore: 0,
    topTrait: '',
    completedThisMonth: 0
  });

  useEffect(() => {
    fetchResults();
  }, [userId]);

  const fetchResults = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockResults: TestResult[] = [
        {
          trait: 'leadership',
          score: 85,
          level: 'High',
          strengths: ['Decision Making', 'Team Management', 'Strategic Thinking'],
          recommendations: ['Project Manager', 'Team Lead', 'Operations Director'],
          completed_date: '2024-01-15'
        },
        {
          trait: 'communication',
          score: 78,
          level: 'Good',
          strengths: ['Public Speaking', 'Written Communication', 'Active Listening'],
          recommendations: ['Marketing Manager', 'Content Writer', 'Sales Representative'],
          completed_date: '2024-01-10'
        },
        {
          trait: 'problem_solving',
          score: 92,
          level: 'Excellent',
          strengths: ['Analytical Thinking', 'Creative Solutions', 'Critical Analysis'],
          recommendations: ['Software Engineer', 'Data Analyst', 'Research Scientist'],
          completed_date: '2024-01-05'
        }
      ];

      setResults(mockResults);
      
      // Calculate stats
      const totalTests = mockResults.length;
      const averageScore = mockResults.reduce((sum, result) => sum + result.score, 0) / totalTests;
      const topTrait = mockResults.reduce((prev, current) => 
        (prev.score > current.score) ? prev : current
      ).trait;
      
      setStats({
        totalTests,
        averageScore: Math.round(averageScore),
        topTrait,
        completedThisMonth: mockResults.filter(r => 
          new Date(r.completed_date).getMonth() === new Date().getMonth()
        ).length
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching results:', error);
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'high': return 'bg-blue-100 text-blue-800';
      case 'good': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Results</h2>
          <p className="text-gray-600">Please wait while we analyze your assessment results...</p>
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
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">Personality Assessment Results</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              View Dashboard
            </Button>
            <Button variant="outline" onClick={onRetakeTest}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Take New Test
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTests}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
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
                <p className="text-lg font-bold text-gray-900 capitalize">{stats.topTrait.replace('_', ' ')}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedThisMonth}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Score Distribution Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Score Distribution</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {results.map((result) => (
                <div key={result.trait} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize">{result.trait.replace('_', ' ')}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{width: `${result.score}%`}}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800 w-12">{result.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Trait Analysis Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Trait Analysis</h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {results.map((result) => (
                <div key={result.trait} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      result.score >= 90 ? 'bg-green-500' :
                      result.score >= 80 ? 'bg-blue-500' :
                      result.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm text-gray-600 capitalize">{result.trait.replace('_', ' ')}</span>
                  </div>
                  <Badge className={getLevelColor(result.level)}>
                    {result.level}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Detailed Results */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Detailed Assessment Results</h3>
          <div className="space-y-6">
            {results.map((result) => (
              <Card key={result.trait} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 capitalize mb-2">
                      {result.trait.replace('_', ' ')} Assessment
                    </h4>
                    <p className="text-gray-600 text-sm">Completed on {new Date(result.completed_date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(result.score)}`}>
                      {result.score}%
                    </div>
                    <Badge className={`ml-2 ${getLevelColor(result.level)}`}>
                      {result.level}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-sm font-semibold text-gray-800 mb-3">Key Strengths</h5>
                    <div className="space-y-2">
                      {result.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {strength}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-gray-800 mb-3">Career Recommendations</h5>
                    <div className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-center text-gray-700">
                          <Target className="w-4 h-4 text-blue-500 mr-2" />
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Results
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
