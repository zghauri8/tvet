import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { jobService, type Job, type Application } from '@/services/job-service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Upload, FileText, CheckCircle, X, AlertCircle } from 'lucide-react';
import ADOFPersonalityTest from './ADOFPersonalityTest';

type ApplicationStep = 'start' | 'resume' | 'test' | 'complete';

interface JobApplicationFlowProps {
  job: Job;
  onComplete: () => void;
  onBack: () => void;
}

interface TestResults {
  overallScore: number;
  traits: Record<string, number>;
  recommendations: string[];
  feedback?: string;
  isEligible?: boolean;
}

interface ExperienceType {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

interface EducationType {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface CertificationType {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience_years: string;
  skills: string[];
  experiences: ExperienceType[];
  education: EducationType[];
  certifications: CertificationType[];
}

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  experience_years: number;
  education: string;
  skills: string[];
  summary: string;
  work_experience: string;
  education_details: string;
  certifications: string;
  cv_file_url: string | null;
}

export default function JobApplicationFlow({ job, onComplete, onBack }: JobApplicationFlowProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  
  // State management
  const [currentStep, setCurrentStep] = useState<ApplicationStep>('start');
  const [isLoading, setIsLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [application, setApplication] = useState<Application | null>(null);
  const [testResults, setTestResults] = useState<TestResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    experience_years: '0',
    skills: [],
    experiences: [],
    education: [],
    certifications: []
  });
  const [skillInput, setSkillInput] = useState('');

  // Progress calculation
  const getProgress = () => {
    switch (currentStep) {
      case 'start': return 25;
      case 'resume': return 50;
      case 'test': return 75;
      case 'complete': return 100;
      default: return 0;
    }
  };

  // Start the application process
  const startApplication = async () => {
    if (!user) {
      setError('You must be logged in to apply for a job');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const app = await jobService.startApplication(job.id, user.id);
      setApplication(app);
      setCurrentStep('resume');
    } catch (err) {
      setError('Failed to start application. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resume upload
  const handleResumeUpload = async () => {
    if (!resumeFile || !application) return;

    setIsLoading(true);
    setError(null);

    try {
      await jobService.submitResume(application.id, resumeFile);
      // Automatically proceed to the test step after successful upload
      setCurrentStep('test');
      
      // Show success message
      toast({
        title: 'Resume uploaded successfully!',
        description: 'Please complete the personality assessment.',
      });
      
    } catch (err) {
      setError('Failed to upload resume. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle test completion
  const handleTestComplete = async (result: TestResults) => {
    if (!application || !user) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const testResult = await jobService.completePersonalityTest(application.id, {
        score: result.overallScore || 0,
        results: {
          traits: result.traits || {},
          recommendations: result.recommendations || []
        },
        feedback: result.feedback || '',
        is_eligible_for_interview: result.isEligible || false
      });
      
      setTestResults({
        overallScore: testResult.score,
        traits: testResult.results?.traits || {},
        recommendations: testResult.results?.recommendations || []
      });
      
      setCurrentStep('complete');
      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit test results. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Form field handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 'start':
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Apply for {job.title}</CardTitle>
              <CardDescription>
                You're about to apply for the {job.title} position at {job.company}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">The application process includes:</p>
              <ul className="space-y-2 list-disc pl-5 mb-6">
                <li>Resume/CV submission</li>
                <li>Personality assessment test</li>
                <li>Application review</li>
              </ul>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={onBack} disabled={isLoading}>
                Back
              </Button>
              <Button onClick={startApplication} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Starting...
                  </>
                ) : (
                  'Start Application'
                )}
              </Button>
            </CardFooter>
          </Card>
        );

      case 'resume':
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Upload Your Resume</CardTitle>
              <CardDescription>
                Please upload your most recent resume or CV in PDF or DOCX format.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                {resumeFile ? (
                  <div className="flex flex-col items-center">
                    <FileText className="h-12 w-12 text-blue-500 mb-2" />
                    <p className="font-medium">{resumeFile.name}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {(resumeFile.size / 1024).toFixed(1)} KB
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setResumeFile(null)}
                      className="mt-2"
                    >
                      Change File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                      <Upload className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <label
                        htmlFor="resume-upload"
                        className="cursor-pointer text-blue-600 hover:text-blue-500 font-medium"
                      >
                        Click to upload
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF or DOCX (Max. 5MB)
                      </p>
                    </div>
                    <input
                      id="resume-upload"
                      name="resume-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setResumeFile(e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
              {error && (
                <div className="mt-4 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {error}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={onBack} disabled={isLoading}>
                Back
              </Button>
              <Button
                onClick={handleResumeUpload}
                disabled={!resumeFile || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Continue to Test'
                )}
              </Button>
            </CardFooter>
          </Card>
        );

      case 'test':
        // Prepare mock CV data from form data
        const mockCV = {
          id: application?.id || '',
          jobId: job.id,
          applicantName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          experience: formData.experience_years,
          education: formData.education.map(edu => `${edu.degree} in ${edu.field} at ${edu.institution}`).join('; '),
          skills: formData.skills,
          summary: formData.summary,
          workHistory: formData.experiences.map(exp => ({
            company: exp.company,
            position: exp.position,
            duration: `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
            description: exp.description
          })),
          uploadedAt: new Date().toISOString(),
          status: 'in_progress'
        };

        // Prepare job data
        const jobData = {
          id: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          type: job.job_type || 'Full-time',
          salary: job.salary_range || 'Not specified',
          description: job.description,
          requirements: job.requirements || [],
          skills: job.skills_required || [],
          experience: job.experience_required || 'Not specified',
          education: job.education_required || 'Not specified'
        };

        return (
          <div className="w-full max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Personality Assessment</CardTitle>
                <CardDescription>
                  Complete this assessment to help us understand your work style and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ADOFPersonalityTest 
                  cv={mockCV}
                  job={jobData}
                  onTestComplete={(cv, result) => handleTestComplete(result)}
                  onBack={() => setCurrentStep('resume')}
                />
              </CardContent>
            </Card>
          </div>
        );

      case 'complete':
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="mt-4">Application Submitted!</CardTitle>
              <CardDescription>
                Thank you for applying to {job.title} at {job.company}.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">
                We've received your application and will review it shortly. You'll be notified via email about the next steps.
              </p>
              {testResults && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
                  <h3 className="font-medium mb-2">Your Assessment Results:</h3>
                  <p>Overall Score: {testResults.overallScore}%</p>
                  {testResults.recommendations.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Recommendations:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {testResults.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={onComplete}>
                Done
              </Button>
            </CardFooter>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Application Progress</span>
          <span>{getProgress()}% Complete</span>
        </div>
        <Progress value={getProgress()} className="h-2" />
        <div className="grid grid-cols-4 text-xs text-center mt-2">
          <div className={currentStep === 'start' ? 'font-medium text-blue-600' : ''}>
            Start
          </div>
          <div className={currentStep === 'resume' ? 'font-medium text-blue-600' : ''}>
            Resume
          </div>
          <div className={currentStep === 'test' ? 'font-medium text-blue-600' : ''}>
            Assessment
          </div>
          <div className={currentStep === 'complete' ? 'font-medium text-blue-600' : ''}>
            Complete
          </div>
        </div>
      </div>

      {/* Current Step Content */}
      {renderStep()}
    </div>
  );
}