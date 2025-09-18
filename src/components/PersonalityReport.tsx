import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  Download, 
  Save, 
  User, 
  Target, 
  Brain, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  X,
  ArrowLeft
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

interface TestResult {
  score: number;
  trait: string;
  testName: string;
  userId: string;
  timestamp: string;
}

interface PersonalityReportProps {
  cv: CVData;
  job: JobPosition;
  testResult: TestResult;
  onReportGenerated: (cv: CVData, report: any) => void;
  onBack: () => void;
}

export default function PersonalityReport({ cv, job, testResult, onReportGenerated, onBack }: PersonalityReportProps) {
  const [report, setReport] = useState({
    overallScore: testResult.score,
    personalityType: '',
    strengths: [] as string[],
    areasForImprovement: [] as string[],
    jobFit: 0,
    recommendations: [] as string[],
    riskFactors: [] as string[],
    summary: '',
    detailedAnalysis: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const generateReport = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI report generation based on CV, job, and test results
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedReport = {
        overallScore: testResult.score,
        personalityType: getPersonalityType(testResult.score, testResult.trait),
        strengths: generateStrengths(cv, job, testResult),
        areasForImprovement: generateAreasForImprovement(cv, job, testResult),
        jobFit: calculateJobFit(cv, job, testResult),
        recommendations: generateRecommendations(cv, job, testResult),
        riskFactors: generateRiskFactors(cv, job, testResult),
        summary: generateSummary(cv, job, testResult),
        detailedAnalysis: generateDetailedAnalysis(cv, job, testResult)
      };
      
      setReport(generatedReport);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getPersonalityType = (score: number, trait: string) => {
    if (score >= 80) return `High ${trait.replace('_', ' ')}`;
    if (score >= 60) return `Moderate ${trait.replace('_', ' ')}`;
    return `Developing ${trait.replace('_', ' ')}`;
  };

  const generateStrengths = (cv: CVData, job: JobPosition, result: TestResult) => {
    const strengths = [];
    
    if (result.score >= 70) {
      strengths.push(`Strong ${result.trait.replace('_', ' ')} capabilities`);
    }
    
    // Match CV skills with job requirements
    const matchingSkills = job.skills.filter(skill => 
      cv.skills.some(cvSkill => cvSkill.toLowerCase().includes(skill.toLowerCase()))
    );
    
    if (matchingSkills.length > 0) {
      strengths.push(`Relevant technical skills: ${matchingSkills.join(', ')}`);
    }
    
    if (cv.experience && cv.experience.includes('year')) {
      strengths.push('Relevant work experience');
    }
    
    if (result.score >= 80) {
      strengths.push('High potential for role success');
    }
    
    return strengths;
  };

  const generateAreasForImprovement = (cv: CVData, job: JobPosition, result: TestResult) => {
    const areas = [];
    
    if (result.score < 60) {
      areas.push(`Needs development in ${result.trait.replace('_', ' ')}`);
    }
    
    // Check for missing skills
    const missingSkills = job.skills.filter(skill => 
      !cv.skills.some(cvSkill => cvSkill.toLowerCase().includes(skill.toLowerCase()))
    );
    
    if (missingSkills.length > 0) {
      areas.push(`Missing key skills: ${missingSkills.slice(0, 3).join(', ')}`);
    }
    
    if (result.score < 50) {
      areas.push('May require additional training and support');
    }
    
    return areas;
  };

  const calculateJobFit = (cv: CVData, job: JobPosition, result: TestResult) => {
    let fit = 0;
    
    // Base score from personality test
    fit += result.score * 0.4;
    
    // Skill match
    const matchingSkills = job.skills.filter(skill => 
      cv.skills.some(cvSkill => cvSkill.toLowerCase().includes(skill.toLowerCase()))
    );
    fit += (matchingSkills.length / job.skills.length) * 30;
    
    // Experience match
    if (cv.experience && job.experience) {
      fit += 20; // Basic experience match
    }
    
    // Education match
    if (cv.education && job.education) {
      fit += 10;
    }
    
    return Math.min(Math.round(fit), 100);
  };

  const generateRecommendations = (cv: CVData, job: JobPosition, result: TestResult) => {
    const recommendations = [];
    
    if (result.score >= 80) {
      recommendations.push('Strong candidate - recommend for interview');
      recommendations.push('Consider for leadership opportunities');
    } else if (result.score >= 60) {
      recommendations.push('Good candidate with potential');
      recommendations.push('May benefit from mentoring program');
    } else {
      recommendations.push('Consider additional assessment');
      recommendations.push('Evaluate training needs');
    }
    
    if (report.jobFit >= 80) {
      recommendations.push('Excellent job fit - prioritize for hiring');
    } else if (report.jobFit >= 60) {
      recommendations.push('Good job fit with some development needed');
    } else {
      recommendations.push('Consider role adjustment or additional training');
    }
    
    return recommendations;
  };

  const generateRiskFactors = (cv: CVData, job: JobPosition, result: TestResult) => {
    const risks = [];
    
    if (result.score < 40) {
      risks.push('Low personality assessment score may indicate challenges');
    }
    
    if (report.jobFit < 50) {
      risks.push('Poor job fit may lead to early turnover');
    }
    
    const missingSkills = job.skills.filter(skill => 
      !cv.skills.some(cvSkill => cvSkill.toLowerCase().includes(skill.toLowerCase()))
    );
    
    if (missingSkills.length > job.skills.length * 0.5) {
      risks.push('Significant skill gaps may require extensive training');
    }
    
    return risks;
  };

  const generateSummary = (cv: CVData, job: JobPosition, result: TestResult) => {
    return `${cv.applicantName} shows ${result.score >= 70 ? 'strong' : result.score >= 50 ? 'moderate' : 'developing'} ${result.trait.replace('_', ' ')} capabilities with a ${report.jobFit}% job fit score. ${result.score >= 70 ? 'This candidate demonstrates high potential for the role.' : 'Additional development may be needed for optimal performance.'}`;
  };

  const generateDetailedAnalysis = (cv: CVData, job: JobPosition, result: TestResult) => {
    return `
**Personality Assessment Analysis:**
The candidate scored ${result.score}% in ${result.trait.replace('_', ' ')} assessment, indicating ${result.score >= 70 ? 'strong' : result.score >= 50 ? 'moderate' : 'developing'} capabilities in this area.

**Job Fit Analysis:**
- Technical Skills Match: ${Math.round((job.skills.filter(skill => cv.skills.some(cvSkill => cvSkill.toLowerCase().includes(skill.toLowerCase()))).length / job.skills.length) * 100)}%
- Experience Alignment: ${cv.experience && job.experience ? 'Good' : 'Needs Review'}
- Education Match: ${cv.education && job.education ? 'Aligned' : 'Requires Assessment'}

**Overall Assessment:**
${report.summary}

**Recommendations:**
${report.recommendations.map(rec => `• ${rec}`).join('\n')}

**Risk Factors:**
${report.riskFactors.length > 0 ? report.riskFactors.map(risk => `• ${risk}`).join('\n') : '• No significant risk factors identified'}
    `.trim();
  };

  const saveReport = async () => {
    setIsSaving(true);
    try {
      // Store report in localStorage (will integrate with Supabase later)
      const reportData = {
        id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        cvId: cv.id,
        jobId: job.id,
        testResult,
        report,
        generatedAt: new Date().toISOString(),
        status: 'completed'
      };

      const existingReports = JSON.parse(localStorage.getItem('adof_reports') || '[]');
      existingReports.push(reportData);
      localStorage.setItem('adof_reports', JSON.stringify(existingReports));

      // Update CV status
      const existingCVs = JSON.parse(localStorage.getItem('adof_cvs') || '[]');
      const updatedCVs = existingCVs.map((existingCV: CVData) => 
        existingCV.id === cv.id ? { ...existingCV, status: 'report_generated' } : existingCV
      );
      localStorage.setItem('adof_cvs', JSON.stringify(updatedCVs));

      onReportGenerated(cv, reportData);
    } catch (error) {
      console.error('Error saving report:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const downloadReport = () => {
    const reportText = `
PERSONALITY ASSESSMENT REPORT
============================

Candidate: ${cv.applicantName}
Position: ${job.title} - ${job.company}
Assessment Date: ${new Date().toLocaleDateString()}

OVERALL SCORE: ${report.overallScore}%
PERSONALITY TYPE: ${report.personalityType}
JOB FIT: ${report.jobFit}%

SUMMARY:
${report.summary}

STRENGTHS:
${report.strengths.map(s => `• ${s}`).join('\n')}

AREAS FOR IMPROVEMENT:
${report.areasForImprovement.map(a => `• ${a}`).join('\n')}

RECOMMENDATIONS:
${report.recommendations.map(r => `• ${r}`).join('\n')}

RISK FACTORS:
${report.riskFactors.length > 0 ? report.riskFactors.map(r => `• ${r}`).join('\n') : '• No significant risk factors identified'}

DETAILED ANALYSIS:
${report.detailedAnalysis}
    `;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `personality_report_${cv.applicantName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Personality Report Generation</h2>
        <p className="text-gray-600">Generate comprehensive personality report for {cv.applicantName}</p>
      </div>

      {!report.summary ? (
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Generate Personality Report</h3>
          <p className="text-gray-600 mb-6">
            Create a comprehensive personality assessment report based on the test results, CV analysis, and job requirements.
          </p>
          <Button 
            onClick={generateReport}
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Generating Report...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Generate Report
              </>
            )}
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Report Header */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{cv.applicantName}</h3>
                  <p className="text-gray-600">{job.title} - {job.company}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={downloadReport}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button 
                  onClick={saveReport}
                  disabled={isSaving}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Report
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{report.overallScore}%</div>
              <div className="text-gray-600 text-sm">Overall Score</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{report.jobFit}%</div>
              <div className="text-gray-600 text-sm">Job Fit</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-lg font-bold text-purple-600 mb-2">{report.personalityType}</div>
              <div className="text-gray-600 text-sm">Personality Type</div>
            </Card>
          </div>

          {/* Summary */}
          <Card className="p-6">
            <h4 className="font-semibold text-gray-800 mb-3">Executive Summary</h4>
            <p className="text-gray-700">{report.summary}</p>
          </Card>

          {/* Strengths and Areas for Improvement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                Strengths
              </h4>
              <ul className="space-y-2">
                {report.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                Areas for Improvement
              </h4>
              <ul className="space-y-2">
                {report.areasForImprovement.map((area, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">{area}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Recommendations and Risk Factors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h4 className="font-semibold text-gray-800 mb-3">Recommendations</h4>
              <ul className="space-y-2">
                {report.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                Risk Factors
              </h4>
              {report.riskFactors.length > 0 ? (
                <ul className="space-y-2">
                  {report.riskFactors.map((risk, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span className="text-gray-700">{risk}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No significant risk factors identified</p>
              )}
            </Card>
          </div>

          {/* Detailed Analysis */}
          <Card className="p-6">
            <h4 className="font-semibold text-gray-800 mb-3">Detailed Analysis</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">{report.detailedAnalysis}</pre>
            </div>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Test
            </Button>
            <Button 
              onClick={saveReport}
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Report & Continue
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
