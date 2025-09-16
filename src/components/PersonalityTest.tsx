import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { personalityTestService, TestData, TestResult } from "../services/personalityTestService";

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

interface PersonalityTestProps {
  onTestComplete: (results: TestResult) => void;
  onBack: () => void;
  userId?: string;
}

export default function PersonalityTest({ onTestComplete, onBack, userId: propUserId }: PersonalityTestProps) {
  const [step, setStep] = useState<'setup' | 'test' | 'loading'>('setup');
  const [userId, setUserId] = useState(propUserId || '');
  const [selectedTrait, setSelectedTrait] = useState('');
  const [testData, setTestData] = useState<TestData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const traits = [
    { value: 'leadership', label: 'Leadership' },
    { value: 'communication', label: 'Communication' },
    { value: 'problem_solving', label: 'Problem Solving' },
    { value: 'teamwork', label: 'Teamwork' },
    { value: 'creativity', label: 'Creativity' },
    { value: 'analytical', label: 'Analytical Thinking' },
    { value: 'emotional_intelligence', label: 'Emotional Intelligence' },
    { value: 'adaptability', label: 'Adaptability' }
  ];

  const generateTest = async () => {
    if (!userId || !selectedTrait) return;
    
    setStep('loading');
    try {
      console.log('Generating test for:', { userId, selectedTrait });
      const success = await personalityTestService.generateTest(userId, selectedTrait);
      console.log('Generate test success:', success);
      
      if (success) {
        // Wait a moment for the test to be generated
        await new Promise(resolve => setTimeout(resolve, 2000));
        // After generating test, fetch the questions
        await fetchQuestions();
      } else {
        console.error('Failed to generate test');
        setStep('setup');
      }
    } catch (error) {
      console.error('Error generating test:', error);
      setStep('setup');
    }
  };

  const fetchQuestions = async () => {
    try {
      const data = await personalityTestService.getTestQuestions(userId);
      
      if (data) {
        setTestData(data);
        setStep('test');
      } else {
        console.error('No test data found');
        setStep('setup');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setStep('setup');
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
      userId,
      selectedTrait,
      answers,
      testName: testData.test_name
    });
    
    setIsSubmitting(true);
    try {
      const result = await personalityTestService.submitAnswers(
        userId, 
        selectedTrait, 
        answers, 
        testData.test_name
      );

      console.log('Submit answers result:', result);

      if (result) {
        console.log('Test result received:', result);
        console.log('Calling onTestComplete with result:', result);
        onTestComplete(result);
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

  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Generating Your Test</h2>
            <p className="text-gray-600">Please wait while we prepare your personality assessment...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 'setup') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Personality Assessment</h1>
            <p className="text-gray-600">Discover your strengths and traits through our comprehensive assessment</p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="userId" className="text-sm font-medium text-gray-700">
                User ID
              </Label>
              <Input
                id="userId"
                type="text"
                placeholder="Enter your user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="mt-1"
                disabled={!!propUserId}
              />
            </div>

            <div>
              <Label htmlFor="trait" className="text-sm font-medium text-gray-700">
                Assessment Focus
              </Label>
              <Select value={selectedTrait} onValueChange={setSelectedTrait}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose a trait to assess" />
                </SelectTrigger>
                <SelectContent>
                  {traits.map((trait) => (
                    <SelectItem key={trait.value} value={trait.value}>
                      {trait.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={onBack} className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={generateTest} 
                disabled={!userId || !selectedTrait}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Start Assessment
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 'test' && testData) {
    const question = testData.questions[currentQuestion];
    const isLastQuestion = currentQuestion === testData.questions.length - 1;

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-2xl w-full">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Assessment in Progress</h1>
            <div className="flex items-center space-x-4">
              <Progress value={progress} className="flex-1" />
              <span className="text-sm font-medium text-gray-600">
                {currentQuestion + 1} of {testData.questions.length}
              </span>
            </div>
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

  return null;
}