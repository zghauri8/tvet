import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  CheckCircle, 
  AlertCircle,
  BookOpen,
  Users,
  Lightbulb,
  BarChart3,
  PieChart
} from "lucide-react";
import { personalityTestService, TestResult, UserStats } from "../services/personalityTestService";

interface ReportSectionProps {
  userId: string;
  onRetakeTest: () => void;
}

export default function ReportSection({ userId, onRetakeTest }: ReportSectionProps) {
  const [results, setResults] = useState<TestResult[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalTests: 0,
    averageScore: 0,
    topTrait: '',
    completedThisMonth: 0,
    lastTestDate: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, [userId]);

  const fetchReportData = async () => {
    try {
      const testResults = await personalityTestService.getUserTestHistory(userId);
      const userStats = await personalityTestService.getUserStats(userId);
      
      setResults(testResults);
      setStats(userStats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching report data:', error);
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

  const getImprovementSuggestions = (trait: string, score: number) => {
    const suggestions: {[key: string]: string[]} = {
      leadership: [
        "Practice decision-making in low-stakes situations",
        "Take on small team projects to build confidence",
        "Read leadership books and case studies",
        "Seek feedback from peers and mentors"
      ],
      communication: [
        "Join public speaking clubs or workshops",
        "Practice active listening in daily conversations",
        "Write regularly to improve written communication",
        "Record yourself speaking to identify areas for improvement"
      ],
      problem_solving: [
        "Practice brain teasers and logic puzzles",
        "Break down complex problems into smaller parts",
        "Learn different problem-solving methodologies",
        "Collaborate with others to see different approaches"
      ],
      teamwork: [
        "Volunteer for group projects",
        "Practice conflict resolution techniques",
        "Learn about different personality types",
        "Develop empathy and emotional intelligence"
      ],
      creativity: [
        "Engage in creative hobbies regularly",
        "Practice brainstorming without judgment",
        "Expose yourself to different art forms and cultures",
        "Keep a creative journal for ideas"
      ],
      analytical: [
        "Practice data analysis with real datasets",
        "Learn statistical analysis tools",
        "Take courses in critical thinking",
        "Practice identifying patterns in daily life"
      ],
      emotional_intelligence: [
        "Practice mindfulness and self-reflection",
        "Learn to identify and manage emotions",
        "Develop empathy through active listening",
        "Seek feedback on your emotional responses"
      ],
      adaptability: [
        "Embrace change in small ways daily",
        "Practice flexibility in your routines",
        "Learn new skills regularly",
        "Expose yourself to different cultures and perspectives"
      ]
    };
    return suggestions[trait] || ["Focus on continuous learning and self-improvement"];
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your assessment report...</p>
        </div>
      </Card>
    );
  }

  if (results.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Assessment Data</h3>
          <p className="text-gray-600 mb-4">Complete your first assessment to see your personalized report.</p>
          <Button onClick={onRetakeTest} className="bg-blue-600 hover:bg-blue-700">
            <Brain className="w-4 h-4 mr-2" />
            Take Assessment
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Performance Summary */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Assessment Summary</h3>
          <Button onClick={onRetakeTest} variant="outline">
            <Brain className="w-4 h-4 mr-2" />
            Retake Assessment
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.averageScore}%</div>
            <div className="text-gray-600 text-sm">Overall Average</div>
            <div className="text-xs text-gray-500 mt-1">Based on {stats.totalTests} test(s)</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-800 mb-2 capitalize">{stats.topTrait.replace('_', ' ')}</div>
            <div className="text-gray-600 text-sm">Strongest Trait</div>
            <div className="text-xs text-gray-500 mt-1">Your top performing area</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.completedThisMonth}</div>
            <div className="text-gray-600 text-sm">This Month</div>
            <div className="text-xs text-gray-500 mt-1">Tests completed</div>
          </div>
        </div>
      </Card>

      {/* Detailed Results */}
      {results.map((result, index) => (
        <Card key={`${result.trait}-${result.completed_date}`} className="p-6">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Strengths */}
            <div>
              <h5 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Key Strengths
              </h5>
              <div className="space-y-2">
                {result.strengths.map((strength, idx) => (
                  <div key={idx} className="flex items-center text-gray-700 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {strength}
                  </div>
                ))}
              </div>
            </div>

            {/* Career Recommendations */}
            <div>
              <h5 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <Target className="w-4 h-4 text-blue-500 mr-2" />
                Career Paths
              </h5>
              <div className="space-y-2">
                {result.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-center text-gray-700 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {rec}
                  </div>
                ))}
              </div>
            </div>

            {/* Improvement Suggestions */}
            <div>
              <h5 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <Lightbulb className="w-4 h-4 text-yellow-500 mr-2" />
                Improvement Areas
              </h5>
              <div className="space-y-2">
                {getImprovementSuggestions(result.trait, result.score).map((suggestion, idx) => (
                  <div key={idx} className="flex items-start text-gray-700 text-sm">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></div>
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Performance Level</span>
              <span className="text-sm text-gray-500">{result.score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  result.score >= 90 ? 'bg-green-500' :
                  result.score >= 80 ? 'bg-blue-500' :
                  result.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{width: `${result.score}%`}}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Needs Improvement</span>
              <span>Excellent</span>
            </div>
          </div>
        </Card>
      ))}

      {/* Action Items */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          Next Steps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-800">Enroll in Courses</h4>
              <p className="text-blue-700 text-sm">Based on your assessment, we recommend specific courses to strengthen your skills.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-800">Join Study Groups</h4>
              <p className="text-blue-700 text-sm">Connect with peers who share similar learning goals and strengths.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
