import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CheckCircle, 
  X, 
  User, 
  Target, 
  FileText, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
  Save,
  Download,
  Mail,
  Phone
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

interface Decision {
  id: string;
  cvId: string;
  jobId: string;
  decision: 'recommend' | 'reject' | 'pending';
  reasoning: string;
  confidence: number;
  nextSteps: string[];
  interviewerNotes: string;
  decisionDate: string;
  decisionBy: string;
}

interface RecommendRejectProps {
  candidate: FilteredCandidate;
  onBack: () => void;
  onDecisionMade: (decision: Decision) => void;
}

export default function RecommendReject({ candidate, onBack, onDecisionMade }: RecommendRejectProps) {
  const [decision, setDecision] = useState<Decision['decision']>('pending');
  const [reasoning, setReasoning] = useState('');
  const [confidence, setConfidence] = useState(85);
  const [nextSteps, setNextSteps] = useState<string[]>([]);
  const [interviewerNotes, setInterviewerNotes] = useState('');
  const [newNextStep, setNewNextStep] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    generateInitialReasoning();
  }, []);

  const generateInitialReasoning = () => {
    const { cv, job, report, filterScore, category } = candidate;
    
    let initialReasoning = '';
    
    if (category === 'high_potential') {
      initialReasoning = `Strong recommendation based on excellent assessment results. ${cv.applicantName} demonstrates high potential with a ${filterScore}% filter score, ${report.report.overallScore}% personality score, and ${report.report.jobFit}% job fit. Key strengths include ${report.report.strengths.slice(0, 2).join(' and ')}.`;
    } else if (category === 'good_fit') {
      initialReasoning = `Good candidate with solid potential. ${cv.applicantName} shows promise with a ${filterScore}% filter score and demonstrates relevant skills and experience for the ${job.title} position.`;
    } else if (category === 'needs_development') {
      initialReasoning = `Candidate shows potential but requires development. While ${cv.applicantName} has some relevant experience, there are areas for improvement including ${report.report.areasForImprovement.slice(0, 2).join(' and ')}.`;
    } else {
      initialReasoning = `Not recommended for this position. ${cv.applicantName} does not meet the minimum requirements for the ${job.title} role based on assessment results and skill gaps.`;
    }
    
    setReasoning(initialReasoning);
    
    // Set initial next steps based on category
    const initialNextSteps = [];
    if (category === 'high_potential') {
      initialNextSteps.push('Schedule final interview with hiring manager');
      initialNextSteps.push('Prepare offer letter');
    } else if (category === 'good_fit') {
      initialNextSteps.push('Schedule technical interview');
      initialNextSteps.push('Review additional references');
    } else if (category === 'needs_development') {
      initialNextSteps.push('Consider for junior role or internship');
      initialNextSteps.push('Provide development plan if hired');
    } else {
      initialNextSteps.push('Send polite rejection email');
      initialNextSteps.push('Keep in database for future opportunities');
    }
    
    setNextSteps(initialNextSteps);
  };

  const addNextStep = () => {
    if (newNextStep.trim()) {
      setNextSteps(prev => [...prev, newNextStep.trim()]);
      setNewNextStep('');
    }
  };

  const removeNextStep = (index: number) => {
    setNextSteps(prev => prev.filter((_, i) => i !== index));
  };

  const handleDecision = async (decisionType: Decision['decision']) => {
    setDecision(decisionType);
    
    // Auto-generate reasoning based on decision
    if (decisionType === 'recommend') {
      setReasoning(prev => prev + ' RECOMMENDED FOR HIRING.');
      setConfidence(85);
    } else if (decisionType === 'reject') {
      setReasoning(prev => prev + ' NOT RECOMMENDED FOR THIS POSITION.');
      setConfidence(75);
    }
  };

  const saveDecision = async () => {
    if (!reasoning.trim()) {
      alert('Please provide reasoning for your decision');
      return;
    }

    setIsSaving(true);
    try {
      const decisionData: Decision = {
        id: `decision_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        cvId: candidate.cv.id,
        jobId: candidate.job.id,
        decision,
        reasoning,
        confidence,
        nextSteps,
        interviewerNotes,
        decisionDate: new Date().toISOString(),
        decisionBy: 'ADOF Manager' // This would come from auth context
      };

      // Store decision in localStorage
      const existingDecisions = JSON.parse(localStorage.getItem('adof_decisions') || '[]');
      existingDecisions.push(decisionData);
      localStorage.setItem('adof_decisions', JSON.stringify(existingDecisions));

      // Update CV status
      const existingCVs = JSON.parse(localStorage.getItem('adof_cvs') || '[]');
      const updatedCVs = existingCVs.map((cv: CVData) => 
        cv.id === candidate.cv.id ? { ...cv, status: decision === 'recommend' ? 'recommended' : 'rejected' } : cv
      );
      localStorage.setItem('adof_cvs', JSON.stringify(updatedCVs));

      onDecisionMade(decisionData);
    } catch (error) {
      console.error('Error saving decision:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const downloadDecisionReport = () => {
    const reportText = `
HIRING DECISION REPORT
=====================

Candidate: ${candidate.cv.applicantName}
Position: ${candidate.job.title} - ${candidate.job.company}
Decision Date: ${new Date().toLocaleDateString()}
Decision: ${decision.toUpperCase()}
Confidence: ${confidence}%

ASSESSMENT SUMMARY:
- Filter Score: ${candidate.filterScore}%
- Personality Score: ${candidate.report.report.overallScore}%
- Job Fit: ${candidate.report.report.jobFit}%
- Category: ${candidate.category.replace('_', ' ').toUpperCase()}

DECISION REASONING:
${reasoning}

NEXT STEPS:
${nextSteps.map(step => `• ${step}`).join('\n')}

INTERVIEWER NOTES:
${interviewerNotes || 'No additional notes provided'}

DETAILED ANALYSIS:
${candidate.report.report.detailedAnalysis}
    `;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `decision_report_${candidate.cv.applicantName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getDecisionColor = (decisionType: string) => {
    switch (decisionType) {
      case 'recommend': return 'bg-green-100 text-green-800';
      case 'reject': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDecisionIcon = (decisionType: string) => {
    switch (decisionType) {
      case 'recommend': return <ThumbsUp className="w-4 h-4" />;
      case 'reject': return <ThumbsDown className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Recommend or Reject</h2>
        <p className="text-gray-600">Make final hiring decision for {candidate.cv.applicantName}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{candidate.cv.applicantName}</h3>
                <p className="text-sm text-gray-600">{candidate.job.title}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {candidate.cv.email}
              </div>
              {candidate.cv.phone && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {candidate.cv.phone}
                </div>
              )}
              <div className="flex items-center text-sm text-gray-600">
                <Target className="w-4 h-4 mr-2" />
                {candidate.cv.location}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Filter Score:</span>
                <span className="font-semibold">{candidate.filterScore}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Personality Score:</span>
                <span className="font-semibold">{candidate.report.report.overallScore}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Job Fit:</span>
                <span className="font-semibold">{candidate.report.report.jobFit}%</span>
              </div>
            </div>

            <div className="mt-4">
              <Badge className={`${getDecisionColor(candidate.category)} w-full justify-center`}>
                {candidate.category.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          </Card>
        </div>

        {/* Decision Form */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Hiring Decision</h3>

            {/* Decision Buttons */}
            <div className="flex space-x-4 mb-6">
              <Button
                onClick={() => handleDecision('recommend')}
                className={`flex-1 ${
                  decision === 'recommend' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Recommend
              </Button>
              <Button
                onClick={() => handleDecision('reject')}
                className={`flex-1 ${
                  decision === 'reject' 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                }`}
              >
                <X className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>

            {/* Decision Status */}
            {decision !== 'pending' && (
              <div className="mb-6">
                <Badge className={`${getDecisionColor(decision)} flex items-center gap-1 w-fit`}>
                  {getDecisionIcon(decision)}
                  {decision.toUpperCase()}
                </Badge>
              </div>
            )}

            {/* Reasoning */}
            <div className="mb-6">
              <Label htmlFor="reasoning" className="text-sm font-medium text-gray-700">
                Decision Reasoning *
              </Label>
              <Textarea
                id="reasoning"
                value={reasoning}
                onChange={(e) => setReasoning(e.target.value)}
                className="mt-1 min-h-[120px]"
                placeholder="Explain your decision based on the assessment results..."
              />
            </div>

            {/* Confidence Level */}
            <div className="mb-6">
              <Label htmlFor="confidence" className="text-sm font-medium text-gray-700">
                Confidence Level: {confidence}%
              </Label>
              <input
                id="confidence"
                type="range"
                min="0"
                max="100"
                value={confidence}
                onChange={(e) => setConfidence(parseInt(e.target.value))}
                className="w-full mt-2"
              />
            </div>

            {/* Next Steps */}
            <div className="mb-6">
              <Label className="text-sm font-medium text-gray-700">Next Steps</Label>
              <div className="mt-2 space-y-2">
                <div className="flex space-x-2">
                  <input
                    value={newNextStep}
                    onChange={(e) => setNewNextStep(e.target.value)}
                    placeholder="Add next step..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && addNextStep()}
                  />
                  <Button onClick={addNextStep} size="sm">
                    Add
                  </Button>
                </div>
                <div className="space-y-1">
                  {nextSteps.map((step, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm text-gray-700">{step}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeNextStep(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interviewer Notes */}
            <div className="mb-6">
              <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                value={interviewerNotes}
                onChange={(e) => setInterviewerNotes(e.target.value)}
                className="mt-1 min-h-[80px]"
                placeholder="Any additional notes or observations..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Filtering
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={downloadDecisionReport}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button 
                  onClick={saveDecision}
                  disabled={isSaving || decision === 'pending' || !reasoning.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Decision
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
