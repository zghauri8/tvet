import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Brain, 
  Target, 
  TrendingUp, 
  Award,
  Star,
  Clock,
  Users,
  BookOpen,
  Play,
  Download,
  Share2,
  RefreshCw,
  User,
  Calendar,
  GraduationCap,
  Zap,
  ChevronDown,
  ChevronUp,
  FileText,
  Eye
} from "lucide-react";
import { personalityTestService, TestResult } from "../services/personalityTestService";

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

// Course Card Component
const CourseCard = ({ course }: { course: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="bg-white rounded-lg border border-blue-100 hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
      {/* Course Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-blue-100 text-blue-800 text-xs">
                {course.difficulty}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {course.duration}
              </Badge>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{course.description}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{course.rating}</span>
            </div>
            <p className="text-xs text-gray-500">{course.studentsEnrolled} students</p>
          </div>
        </div>

        {/* Course Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <User className="w-4 h-4 mr-2" />
            <span>{course.instructor}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <GraduationCap className="w-4 h-4 mr-2" />
            <span>{course.certification}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <h5 className="text-sm font-semibold text-gray-800 mb-2">Key Skills</h5>
          <div className="flex flex-wrap gap-1">
            {course.skills.slice(0, 3).map((skill: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {course.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{course.skills.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500 line-through">{course.price}</span>
              <span className="ml-2 font-semibold text-green-600">{course.finalPrice}</span>
            </div>
            <Badge className="bg-green-100 text-green-800 text-xs">
              {course.discount}
            </Badge>
          </div>
        </div>

        {/* Expandable Content */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
            {isExpanded ? 'Show Less' : 'View Details'}
          </Button>

          {isExpanded && (
            <div className="space-y-4 pt-4 border-t border-gray-200">
              {/* Detailed Description */}
              <div>
                <h5 className="text-sm font-semibold text-gray-800 mb-2">Course Overview</h5>
                <p className="text-sm text-gray-600">{course.detailedDescription}</p>
              </div>

              {/* Lectures */}
              <div>
                <h5 className="text-sm font-semibold text-gray-800 mb-2">Course Lectures</h5>
                <div className="space-y-2">
                  {course.lectures.map((lecture: any) => (
                    <div key={lecture.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-800">{lecture.title}</span>
                        <span className="text-xs text-gray-500">{lecture.duration}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        Topics: {lecture.topics.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Paths */}
              <div>
                <h5 className="text-sm font-semibold text-gray-800 mb-2">Career Paths</h5>
                <div className="flex flex-wrap gap-1">
                  {course.careerPaths.map((path: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {path}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              <div>
                <h5 className="text-sm font-semibold text-gray-800 mb-2">Prerequisites</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  {course.prerequisites.map((prereq: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                      {prereq}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4 border-t border-gray-200">
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <Play className="w-4 h-4 mr-2" />
              Enroll Now
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                // Show detailed course information
                alert(`Course Details:\n\n${course.detailedDescription}\n\nInstructor: ${course.instructor}\nBio: ${course.instructorBio}\n\nPrerequisites: ${course.prerequisites.join(', ')}\n\nCareer Paths: ${course.careerPaths.join(', ')}`);
              }}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Generate Detailed Test Report Function
const generateDetailedTestReport = (testResult: TestResult, testData: TestData | null, selectedTrait: string) => {
  const reportContent = `
# COMPREHENSIVE PERSONALITY ASSESSMENT REPORT
## Detailed Analysis of Your Assessment Results

### ASSESSMENT OVERVIEW
- **Assessment Date:** ${new Date(testResult.completed_date).toLocaleDateString()}
- **Trait Assessed:** ${selectedTrait.replace('_', ' ').toUpperCase()}
- **Total Questions:** ${testData?.questions.length || 0}
- **Score Achieved:** ${testResult.score}%
- **Performance Level:** ${testResult.level}
- **Assessment Duration:** Approximately ${Math.ceil((testData?.questions.length || 0) * 2)} minutes

### DETAILED RESULTS ANALYSIS

#### Your Performance Score
- **Overall Score:** ${testResult.score}%
- **Performance Level:** ${testResult.level}
- **Score Interpretation:** ${getScoreInterpretation(testResult.score)}

#### Key Strengths Identified
Based on your responses, the following strengths were identified:
${testResult.strengths.map((strength, index) => `${index + 1}. ${strength}`).join('\n')}

#### Career Recommendations
Your assessment results suggest the following career paths:
${testResult.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

### DETAILED ANALYSIS

#### Personality Trait: ${selectedTrait.replace('_', ' ').toUpperCase()}
${getTraitDescription(selectedTrait)}

#### Strengths Analysis
${testResult.strengths.map((strength, index) => `
**${index + 1}. ${strength}**
${getStrengthDescription(strength)}
`).join('\n')}

#### Career Path Analysis
${testResult.recommendations.map((rec, index) => `
**${index + 1}. ${rec}**
${getCareerDescription(rec)}
`).join('\n')}

### DEVELOPMENT RECOMMENDATIONS

#### Immediate Actions (Next 30 Days)
1. **Focus on Strengths:** Continue developing your ${testResult.strengths[0]} skills
2. **Career Exploration:** Research opportunities in ${testResult.recommendations.slice(0, 2).join(' and ')}
3. **Skill Building:** Take relevant courses to enhance your capabilities
4. **Networking:** Connect with professionals in your recommended fields

#### Medium-term Goals (3-6 Months)
1. **Professional Development:** Enroll in courses related to your strengths
2. **Practical Application:** Apply your skills in real-world projects
3. **Career Planning:** Create a detailed career development plan
4. **Mentorship:** Seek guidance from experienced professionals

#### Long-term Vision (6-12 Months)
1. **Career Transition:** Consider roles in your recommended career paths
2. **Advanced Training:** Pursue advanced certifications in your field
3. **Leadership Development:** Build leadership skills for career advancement
4. **Portfolio Building:** Create a portfolio showcasing your strengths

### ASSESSMENT METHODOLOGY

#### Test Structure
- **Total Questions:** ${testData?.questions.length || 0}
- **Question Types:** Multiple choice with 5-point scale
- **Assessment Duration:** ${Math.ceil((testData?.questions.length || 0) * 2)} minutes
- **Scoring Method:** Weighted scoring based on trait-specific responses

#### Reliability and Validity
- **Assessment Framework:** Based on established personality assessment models
- **Question Design:** Professionally developed questions targeting specific traits
- **Scoring Algorithm:** Validated scoring system for accurate results
- **Interpretation:** Evidence-based career recommendations

### NEXT STEPS

#### Immediate Actions
1. **Review Results:** Carefully read through all sections of this report
2. **Reflect on Strengths:** Consider how your identified strengths apply to your current situation
3. **Explore Careers:** Research the recommended career paths in detail
4. **Plan Development:** Create a personal development plan based on the recommendations

#### Follow-up Assessments
- **Progress Tracking:** Retake this assessment in 6 months to track development
- **Additional Traits:** Consider taking assessments for other personality dimensions
- **Skill Assessments:** Take complementary skill-based assessments
- **Career Counseling:** Schedule a session with a career counselor

### CONTACT INFORMATION
For questions about your assessment results or career guidance:
- **Academic Advisor:** Contact your TVET academic advisor
- **Career Services:** Visit the career services office
- **Assessment Support:** Reach out to the assessment team for technical questions

---
*This comprehensive report was generated by the TVET Assessment System*
*Report generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}*
*Confidential - For personal use only*
  `.trim();

  // Create and download the file
  const blob = new Blob([reportContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `comprehensive-assessment-report-${selectedTrait}-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Helper functions for report generation
const getScoreInterpretation = (score: number) => {
  if (score >= 90) return "Exceptional performance - You demonstrate outstanding capabilities in this area";
  if (score >= 80) return "High performance - You show strong abilities and potential for growth";
  if (score >= 70) return "Good performance - You have solid foundations with room for development";
  if (score >= 60) return "Average performance - You show basic competency with significant growth potential";
  return "Below average performance - Focus on fundamental skill development";
};

const getTraitDescription = (trait: string) => {
  const descriptions: { [key: string]: string } = {
    'leadership': 'Leadership involves the ability to guide, inspire, and influence others toward achieving common goals. Strong leaders demonstrate vision, decision-making skills, and the ability to motivate teams.',
    'communication': 'Communication skills encompass the ability to express ideas clearly, listen effectively, and engage with others in meaningful ways. This includes verbal, written, and non-verbal communication.',
    'problem_solving': 'Problem-solving involves the ability to analyze complex situations, identify solutions, and implement effective strategies. It requires analytical thinking, creativity, and persistence.',
    'teamwork': 'Teamwork is the ability to collaborate effectively with others, contribute to group goals, and work harmoniously within team environments. It includes cooperation, conflict resolution, and mutual support.',
    'creativity': 'Creativity involves the ability to generate novel ideas, think outside conventional boundaries, and approach challenges with innovative solutions. It includes artistic expression, innovation, and original thinking.',
    'analytical': 'Analytical thinking involves the ability to break down complex information, identify patterns, and draw logical conclusions. It requires attention to detail, critical thinking, and systematic approaches.',
    'emotional_intelligence': 'Emotional intelligence involves understanding and managing your own emotions while recognizing and responding to others\' emotions. It includes empathy, self-awareness, and social skills.',
    'adaptability': 'Adaptability is the ability to adjust to new situations, embrace change, and remain effective in dynamic environments. It includes flexibility, resilience, and learning agility.'
  };
  return descriptions[trait] || 'This trait represents a specific aspect of personality and behavior that influences how you interact with the world around you.';
};

const getStrengthDescription = (strength: string) => {
  const descriptions: { [key: string]: string } = {
    'Decision Making': 'You demonstrate strong ability to analyze options and make informed choices quickly and effectively.',
    'Team Management': 'You excel at leading and coordinating team efforts toward common objectives.',
    'Strategic Thinking': 'You have the ability to see the big picture and plan for long-term success.',
    'Public Speaking': 'You communicate effectively in front of groups and can engage audiences.',
    'Written Communication': 'You express ideas clearly and persuasively through written formats.',
    'Active Listening': 'You demonstrate genuine interest in others\' perspectives and respond thoughtfully.',
    'Analytical Thinking': 'You break down complex problems systematically and identify key components.',
    'Creative Solutions': 'You approach challenges with innovative and original thinking.',
    'Critical Analysis': 'You evaluate information objectively and identify underlying patterns.',
    'Collaboration': 'You work effectively with others to achieve shared goals.',
    'Conflict Resolution': 'You help resolve disagreements and find mutually beneficial solutions.',
    'Supporting Others': 'You provide encouragement and assistance to team members.',
    'Innovation': 'You generate new ideas and approaches to existing challenges.',
    'Design Thinking': 'You approach problems from a user-centered perspective.',
    'Artistic Expression': 'You communicate ideas and emotions through creative mediums.',
    'Data Analysis': 'You extract meaningful insights from complex datasets.',
    'Logical Reasoning': 'You apply systematic thinking to solve problems.',
    'Pattern Recognition': 'You identify trends and relationships in information.',
    'Empathy': 'You understand and share the feelings of others.',
    'Self-Awareness': 'You have a clear understanding of your own emotions and motivations.',
    'Social Skills': 'You interact effectively with people from diverse backgrounds.',
    'Flexibility': 'You adapt your approach based on changing circumstances.',
    'Resilience': 'You bounce back from setbacks and maintain positive outlook.',
    'Change Management': 'You help others navigate through organizational transitions.'
  };
  return descriptions[strength] || 'This strength represents a valuable skill that contributes to your overall effectiveness and success.';
};

const getCareerDescription = (career: string) => {
  const descriptions: { [key: string]: string } = {
    'Project Manager': 'Oversee projects from conception to completion, coordinating teams and resources to achieve objectives.',
    'Team Lead': 'Guide and mentor team members while ensuring project deliverables meet quality standards.',
    'Operations Director': 'Manage day-to-day operations and strategic planning for organizational success.',
    'Marketing Manager': 'Develop and execute marketing strategies to promote products and services.',
    'Content Writer': 'Create compelling written content for various platforms and audiences.',
    'Sales Representative': 'Build relationships with clients and drive revenue through effective sales techniques.',
    'Software Engineer': 'Design, develop, and maintain software applications and systems.',
    'Data Analyst': 'Analyze data to provide insights and support business decision-making.',
    'Research Scientist': 'Conduct scientific research and experiments to advance knowledge in your field.',
    'HR Specialist': 'Manage human resources functions including recruitment, training, and employee relations.',
    'Community Manager': 'Build and engage online communities around brands or causes.',
    'Event Coordinator': 'Plan and execute events that meet organizational objectives.',
    'Graphic Designer': 'Create visual content that communicates messages effectively.',
    'Marketing Creative': 'Develop innovative marketing campaigns and creative content.',
    'Product Designer': 'Design user experiences and interfaces for digital products.',
    'Business Analyst': 'Analyze business processes and recommend improvements for efficiency.',
    'Financial Analyst': 'Evaluate financial data to support investment and business decisions.',
    'Research Analyst': 'Conduct research and analysis to support strategic planning.',
    'Counselor': 'Provide guidance and support to individuals facing personal or professional challenges.',
    'HR Manager': 'Oversee human resources functions and develop organizational policies.',
    'Customer Success Manager': 'Ensure customer satisfaction and drive product adoption.',
    'Consultant': 'Provide expert advice to organizations on specific business challenges.',
    'Project Coordinator': 'Support project management activities and ensure smooth execution.',
    'Change Manager': 'Guide organizations through transitions and change initiatives.'
  };
  return descriptions[career] || 'This career path offers opportunities to apply your strengths in a professional setting.';
};

// Generate Course Report Function
const generateCourseReport = (courses: any[], testResult: TestResult) => {
  const reportContent = `
# Personalized Course Recommendations Report
## Based on Your Personality Assessment

### Assessment Summary
- **Trait Assessed:** ${testResult.trait.replace('_', ' ').toUpperCase()}
- **Score Achieved:** ${testResult.score}%
- **Performance Level:** ${testResult.level}
- **Assessment Date:** ${new Date(testResult.completed_date).toLocaleDateString()}

### Recommended Courses for Improvement

${courses.map((course, index) => `
## ${index + 1}. ${course.title}

**Course Overview:**
${course.detailedDescription}

**Duration:** ${course.duration}
**Difficulty:** ${course.difficulty}
**Instructor:** ${course.instructor}
**Rating:** ${course.rating}/5.0 (${course.studentsEnrolled} students)

**Key Skills You'll Learn:**
${course.skills.map(skill => `- ${skill}`).join('\n')}

**Course Lectures:**
${course.lectures.map(lecture => `- ${lecture.title} (${lecture.duration})`).join('\n')}

**Career Paths:**
${course.careerPaths.map(path => `- ${path}`).join('\n')}

**Prerequisites:**
${course.prerequisites.map(prereq => `- ${prereq}`).join('\n')}

**Pricing:** ${course.finalPrice} (${course.discount})
**Certification:** ${course.certification}

---
`).join('\n')}

### Why These Courses?
Based on your assessment results showing strong ${testResult.trait.replace('_', ' ')} skills, these courses are specifically designed to:
1. Build upon your existing strengths
2. Address areas for improvement
3. Provide practical skills for career advancement
4. Offer industry-recognized certifications

### Next Steps
1. Review each course description carefully
2. Consider your schedule and learning preferences
3. Enroll in the course that best fits your career goals
4. Track your progress and apply new skills in real-world scenarios

---
*This report was generated by the TVET Assessment System*
*For questions about course recommendations, contact your academic advisor*
  `.trim();

  // Create and download the file
  const blob = new Blob([reportContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `course-recommendations-report-${testResult.trait}-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export default function PersonalityTest({ onTestComplete, onBack, userId: propUserId }: PersonalityTestProps) {
  const [step, setStep] = useState<'setup' | 'test' | 'loading' | 'results'>('setup');
  const [userId, setUserId] = useState(propUserId || '');
  const [selectedTrait, setSelectedTrait] = useState('');
  const [testData, setTestData] = useState<TestData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

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

  if (step === 'results' && testResult) {
    const suggestedCourses = [
      {
        id: 'improve-communication',
        title: 'Improve Communication for Teams',
        description: 'Practice concise, structured communication and feedback loops in projects.',
        detailedDescription: 'Master the art of effective team communication with practical exercises and real-world scenarios. Learn to give constructive feedback, conduct productive meetings, and build strong professional relationships.',
        duration: '4 weeks',
        difficulty: 'Beginner',
        instructor: 'Dr. Sarah Mitchell',
        instructorBio: 'Communication Expert with 15+ years in corporate training',
        rating: 4.8,
        studentsEnrolled: 1247,
        price: 'RM 299',
        discount: 'Free for TVET students',
        finalPrice: 'RM 0',
        skills: ['Active Listening', 'Written Communication', 'Presentation Skills', 'Conflict Resolution'],
        lectures: [
          {
            id: 1,
            title: 'Foundations of Team Communication',
            duration: '45 min',
            topics: ['Communication models', 'Barriers to effective communication', 'Cultural considerations']
          },
          {
            id: 2,
            title: 'Active Listening Techniques',
            duration: '60 min',
            topics: ['Listening vs hearing', 'Empathetic listening', 'Asking the right questions']
          },
          {
            id: 3,
            title: 'Written Communication Excellence',
            duration: '50 min',
            topics: ['Email etiquette', 'Report writing', 'Documentation best practices']
          },
          {
            id: 4,
            title: 'Presentation and Public Speaking',
            duration: '75 min',
            topics: ['Overcoming stage fright', 'Visual aids design', 'Engaging your audience']
          }
        ],
        careerPaths: ['Team Lead', 'Project Manager', 'HR Specialist'],
        prerequisites: ['Basic English proficiency', 'Teamwork experience preferred'],
        certification: 'Team Communication Certificate'
      },
      {
        id: 'critical-thinking',
        title: 'Critical Thinking & Problem Solving',
        description: 'Strengthen reasoning, pattern recognition, and decision frameworks.',
        detailedDescription: 'Develop advanced analytical skills and learn systematic approaches to complex problem-solving. Enhance your decision-making capabilities with proven frameworks and methodologies.',
        duration: '6 weeks',
        difficulty: 'Intermediate',
        instructor: 'Prof. Michael Chen',
        instructorBio: 'Cognitive Science Expert with 20+ years in analytical training',
        rating: 4.9,
        studentsEnrolled: 892,
        price: 'RM 399',
        discount: 'Free for TVET students',
        finalPrice: 'RM 0',
        skills: ['Logical Reasoning', 'Data Analysis', 'Decision Making', 'Pattern Recognition'],
        lectures: [
          {
            id: 1,
            title: 'Introduction to Critical Thinking',
            duration: '50 min',
            topics: ['What is critical thinking?', 'Cognitive biases', 'Logical fallacies']
          },
          {
            id: 2,
            title: 'Problem-Solving Frameworks',
            duration: '65 min',
            topics: ['The 5-step problem-solving process', 'Root cause analysis', 'Brainstorming techniques']
          },
          {
            id: 3,
            title: 'Data Analysis and Interpretation',
            duration: '70 min',
            topics: ['Statistical thinking', 'Data visualization', 'Drawing conclusions']
          },
          {
            id: 4,
            title: 'Decision-Making Models',
            duration: '55 min',
            topics: ['Decision trees', 'Cost-benefit analysis', 'Risk assessment']
          },
          {
            id: 5,
            title: 'Creative Problem Solving',
            duration: '60 min',
            topics: ['Lateral thinking', 'Design thinking', 'Innovation techniques']
          }
        ],
        careerPaths: ['Business Analyst', 'Data Scientist', 'Management Consultant'],
        prerequisites: ['High school mathematics', 'Basic computer skills'],
        certification: 'Critical Thinking Specialist Certificate'
      },
      {
        id: 'time-management',
        title: 'Time Management Fundamentals',
        description: 'Prioritize tasks, plan sprints, and reduce context switching.',
        detailedDescription: 'Learn proven time management techniques to boost productivity and achieve work-life balance. Master the art of prioritization, delegation, and efficient task execution.',
        duration: '3 weeks',
        difficulty: 'Beginner',
        instructor: 'Eng. Lisa Rodriguez',
        instructorBio: 'Productivity Expert and Certified Project Manager',
        rating: 4.7,
        studentsEnrolled: 1563,
        price: 'RM 199',
        discount: 'Free for TVET students',
        finalPrice: 'RM 0',
        skills: ['Task Prioritization', 'Goal Setting', 'Delegation', 'Work-Life Balance'],
        lectures: [
          {
            id: 1,
            title: 'Time Management Principles',
            duration: '40 min',
            topics: ['Time vs energy management', 'The 80/20 rule', 'Time tracking methods']
          },
          {
            id: 2,
            title: 'Goal Setting and Planning',
            duration: '55 min',
            topics: ['SMART goals', 'Long-term planning', 'Daily planning techniques']
          },
          {
            id: 3,
            title: 'Task Prioritization Methods',
            duration: '50 min',
            topics: ['Eisenhower Matrix', 'ABC method', 'Urgent vs important']
          },
          {
            id: 4,
            title: 'Delegation and Team Management',
            duration: '45 min',
            topics: ['When to delegate', 'How to delegate effectively', 'Team coordination']
          }
        ],
        careerPaths: ['Project Manager', 'Team Lead', 'Operations Manager'],
        prerequisites: ['Basic organizational skills'],
        certification: 'Time Management Professional Certificate'
      }
    ];

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Assessment Complete!</h1>
            <p className="text-gray-600">Your personality assessment has been completed successfully</p>
          </div>

          {/* Enhanced Test Results */}
          <div className="bg-white rounded-lg border p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Your Assessment Results</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => generateDetailedTestReport(testResult, testData, selectedTrait)}
                className="bg-blue-50 hover:bg-blue-100"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Full Report
              </Button>
            </div>
            
            {/* Main Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{testResult.score}%</div>
                <div className="text-gray-600 text-sm font-medium">Overall Score</div>
                <div className="text-xs text-gray-500 mt-1">{testResult.level} Level</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-2 capitalize">{selectedTrait.replace('_', ' ')}</div>
                <div className="text-gray-600 text-sm font-medium">Assessed Trait</div>
                <div className="text-xs text-gray-500 mt-1">Personality Dimension</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-2">{testData?.questions.length || 0}</div>
                <div className="text-gray-600 text-sm font-medium">Questions Answered</div>
                <div className="text-xs text-gray-500 mt-1">Assessment Completed</div>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Strengths Analysis */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-600" />
                  Your Key Strengths
                </h3>
                <div className="space-y-3">
                  {testResult.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700 font-medium">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Recommendations */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Career Recommendations
                </h3>
                <div className="space-y-3">
                  {testResult.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                      <Target className="w-5 h-5 text-blue-500 mr-3" />
                      <span className="text-gray-700 font-medium">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-indigo-600" />
                Performance Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-gray-600">Assessment Date</span>
                  <span className="font-medium text-gray-800">{new Date(testResult.completed_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-gray-600">Performance Level</span>
                  <Badge className={testResult.score >= 80 ? 'bg-green-100 text-green-800' : testResult.score >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                    {testResult.level}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-gray-600">Strengths Identified</span>
                  <span className="font-medium text-gray-800">{testResult.strengths.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-gray-600">Career Options</span>
                  <span className="font-medium text-gray-800">{testResult.recommendations.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Course Recommendations */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6 mb-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Recommended Courses to Improve</h3>
                  <p className="text-blue-800 text-sm">Based on your assessment results, we recommend starting with these courses:</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => generateCourseReport(suggestedCourses, testResult)}
                  className="bg-white hover:bg-blue-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Course Report
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {suggestedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => {
                onTestComplete(testResult);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Return to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return null;
}