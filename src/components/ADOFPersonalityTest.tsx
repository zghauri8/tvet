import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle, Brain, User, FileText, Target } from "lucide-react";
import { personalityTestService, TestResult } from "../services/personalityTestService";

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

interface Question {
  question_no: number;
  question: string;
  options: Array<{
    score: number;
    text: string;
  }>;
  trait: string;
}

interface TestData {
  test_name: string;
  trait: string;
  user_id: string;
  questions: Question[];
}

interface ADOFPersonalityTestProps {
  cv: CVData;
  job: JobPosition;
  onTestComplete: (cv: CVData, result: TestResult) => void;
  onBack: () => void;
}

export default function ADOFPersonalityTest({ cv, job, onTestComplete, onBack }: ADOFPersonalityTestProps) {
  const [step, setStep] = useState<'analysis' | 'test' | 'loading' | 'results'>('analysis');
  const [testData, setTestData] = useState<TestData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Analyze CV and determine appropriate personality traits to test
  const analyzeCV = () => {
    const analysis = {
      recommendedTraits: [],
      jobMatch: 0,
      strengths: [],
      areasToAssess: []
    };

    // Analyze skills and match with job requirements
    const jobSkills = job.skills.map(s => s.toLowerCase());
    const cvSkills = cv.skills.map(s => s.toLowerCase());
    const matchingSkills = jobSkills.filter(skill => 
      cvSkills.some(cvSkill => cvSkill.includes(skill) || skill.includes(cvSkill))
    );
    
    analysis.jobMatch = (matchingSkills.length / jobSkills.length) * 100;

    // Determine personality traits to assess based on job and CV
    const traitsToTest = [];
    
    if (job.title.toLowerCase().includes('manager') || job.title.toLowerCase().includes('lead')) {
      traitsToTest.push('leadership');
    }
    if (job.title.toLowerCase().includes('developer') || job.title.toLowerCase().includes('engineer')) {
      traitsToTest.push('analytical');
      traitsToTest.push('problem_solving');
    }
    if (job.title.toLowerCase().includes('designer') || job.title.toLowerCase().includes('creative')) {
      traitsToTest.push('creativity');
    }
    if (job.requirements.some(req => req.toLowerCase().includes('team'))) {
      traitsToTest.push('teamwork');
    }
    if (job.requirements.some(req => req.toLowerCase().includes('communication'))) {
      traitsToTest.push('communication');
    }

    // Default traits if none specific found
    if (traitsToTest.length === 0) {
      traitsToTest.push('problem_solving', 'communication', 'adaptability');
    }

    analysis.recommendedTraits = traitsToTest;
    analysis.strengths = matchingSkills;
    analysis.areasToAssess = traitsToTest;

    setAnalysisResult(analysis);
    return analysis;
  };

  const generateTest = async () => {
    if (!analysisResult) return;
    
    setStep('loading');
    try {
      // Use the first recommended trait for the test
      const traitToTest = analysisResult.recommendedTraits[0];
      const userId = cv.email; // Use email as user ID
      
      console.log('Generating test for:', { userId, traitToTest, cvId: cv.id });
      
      const success = await personalityTestService.generateTest(userId, traitToTest);
      console.log('Generate test success:', success);
      
      if (success) {
        // Wait a moment for the test to be generated
        await new Promise(resolve => setTimeout(resolve, 2000));
        // After generating test, fetch the questions
        await fetchQuestions();
      } else {
        console.error('Failed to generate test');
        setStep('analysis');
      }
    } catch (error) {
      console.error('Error generating test:', error);
      setStep('analysis');
    }
  };

  const fetchQuestions = async () => {
    try {
      const data = await personalityTestService.getTestQuestions(cv.email);
      
      if (data) {
        setTestData(data);
        setStep('test');
      } else {
        console.error('No test data found');
        setStep('analysis');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setStep('analysis');
    }
  };

  const handleAnswerSelect = (questionNo: number, score: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionNo]: score
    }));
  };

  const handleNext = () => {
    if (currentQuestion < (testData?.questions.length || 0) - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const submitAnswers = async () => {
    if (!testData) return;
    
    console.log('Submitting test with data:', {
      userId: cv.email,
      trait: testData.trait,
      answers,
      testName: testData.test_name
    });
    
    setIsSubmitting(true);
    try {
      const result = await personalityTestService.submitAnswers(
        cv.email, 
        testData.trait, 
        answers, 
        testData.test_name
      );

      console.log('Submit answers result:', result);

      if (result) {
        console.log('Test result received:', result);
        setTestResult(result);
        setStep('results');
      } else {
        console.error('Failed to submit answers - no result returned');
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isTestComplete = () => {
    return testData?.questions.every(q => answers[q.question_no] !== undefined);
  };

  const progress = testData ? ((currentQuestion + 1) / testData.questions.length) * 100 : 0;

  useEffect(() => {
    if (step === 'analysis') {
      analyzeCV();
    }
  }, [step]);

  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Generating Personality Test</h2>
            <p className="text-gray-600">Analyzing CV and creating personalized assessment...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 'analysis' && analysisResult) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">CV Analysis & Test Generation</h2>
          <p className="text-gray-600">Review the analysis and generate a personalized personality test</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* CV Summary */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{cv.applicantName}</h3>
                <p className="text-sm text-gray-600">{cv.email}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-700">Experience:</span>
                <p className="text-sm text-gray-600">{cv.experience}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Education:</span>
                <p className="text-sm text-gray-600">{cv.education}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Skills:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {cv.skills.slice(0, 5).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {cv.skills.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{cv.skills.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Job Requirements */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-700">Required Skills:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {job.skills.slice(0, 5).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {job.skills.length > 5 && (
                    <Badge variant="secondary" className="text-xs">
                      +{job.skills.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Experience Required:</span>
                <p className="text-sm text-gray-600">{job.experience}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Analysis Results */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Analysis Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {Math.round(analysisResult.jobMatch)}%
              </div>
              <div className="text-gray-600 text-sm">Job Match</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {analysisResult.strengths.length}
              </div>
              <div className="text-gray-600 text-sm">Matching Skills</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {analysisResult.recommendedTraits.length}
              </div>
              <div className="text-gray-600 text-sm">Traits to Assess</div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-800 mb-2">Recommended Personality Traits to Test:</h4>
            <div className="flex flex-wrap gap-2">
              {analysisResult.recommendedTraits.map((trait: string, index: number) => (
                <Badge key={index} variant="outline" className="capitalize">
                  {trait.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to CV Collection
          </Button>
          <Button onClick={generateTest} className="bg-blue-600 hover:bg-blue-700">
            <Brain className="w-4 h-4 mr-2" />
            Generate Personality Test
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'test' && testData) {
    const question = testData.questions[currentQuestion];
    const isLastQuestion = currentQuestion === testData.questions.length - 1;

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Personality Assessment</h2>
          <p className="text-gray-600">Assessing {cv.applicantName} for {job.title} position</p>
        </div>

        <Card className="p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Assessment Progress</h3>
              <span className="text-sm font-medium text-gray-600">
                {currentQuestion + 1} of {testData.questions.length}
              </span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          <div className="bg-white rounded-lg border p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Question {question.question_no}
            </h2>
            <p className="text-gray-700 mb-6">{question.question}</p>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                    answers[question.question_no] === option.score
                      ? 'bg-blue-50 border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${question.question_no}`}
                    value={option.score}
                    checked={answers[question.question_no] === option.score}
                    onChange={() => handleAnswerSelect(question.question_no, option.score)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700">{option.text}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {isLastQuestion ? (
              <Button
                onClick={submitAnswers}
                disabled={!isTestComplete() || isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Assessment
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={answers[question.question_no] === undefined}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next Question
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  }

  if (step === 'results' && testResult) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Assessment Complete</h2>
          <p className="text-gray-600">Personality test results for {cv.applicantName}</p>
        </div>

        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Assessment Results</h3>
            <p className="text-gray-600">Test completed successfully</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{testResult.score}%</div>
              <div className="text-gray-600 text-sm">Overall Score</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2 capitalize">
                {testData?.trait.replace('_', ' ')}
              </div>
              <div className="text-gray-600 text-sm">Assessed Trait</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {testData?.questions.length || 0}
              </div>
              <div className="text-gray-600 text-sm">Questions Answered</div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => {
                onTestComplete(cv, testResult);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Generate Personality Report
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return null;
}
