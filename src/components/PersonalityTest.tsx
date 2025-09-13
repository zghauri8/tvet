import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Target, Users, Lightbulb, Shield } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "When working in a team, you prefer to:",
    options: ["Lead the project", "Support others", "Work independently", "Brainstorm ideas"]
  },
  {
    id: 2,
    text: "Your ideal work environment is:",
    options: ["Fast-paced and dynamic", "Structured and organized", "Creative and flexible", "Collaborative and social"]
  },
  {
    id: 3,
    text: "When solving problems, you typically:",
    options: ["Analyze data thoroughly", "Trust your intuition", "Seek input from others", "Try multiple approaches"]
  },
  {
    id: 4,
    text: "You feel most energized when:",
    options: ["Achieving targets", "Helping others succeed", "Learning new skills", "Creating something new"]
  },
  {
    id: 5,
    text: "Your communication style is:",
    options: ["Direct and clear", "Empathetic and supportive", "Analytical and detailed", "Inspiring and motivational"]
  }
];

const PersonalityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  // Mock personality analysis based on answers
  const getPersonalityProfile = () => {
    const profiles = {
      leader: { name: "Natural Leader", icon: Target, color: "text-accent" },
      supporter: { name: "Team Supporter", icon: Users, color: "text-success" },
      analyst: { name: "Data Analyst", icon: Brain, color: "text-primary" },
      innovator: { name: "Creative Innovator", icon: Lightbulb, color: "text-warning" }
    };

    const strengths = [
      "Strategic thinking", "Team collaboration", "Problem solving", 
      "Communication", "Adaptability", "Leadership"
    ];

    const weaknesses = [
      "Time management", "Public speaking", "Risk taking", 
      "Delegation", "Stress management", "Technical skills"
    ];

    // Simple logic based on most common answer patterns
    const dominantAnswer = answers.reduce((a, b, i, arr) => 
      arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
    );

    const profileKeys = Object.keys(profiles) as (keyof typeof profiles)[];
    const selectedProfile = profiles[profileKeys[dominantAnswer]];

    return {
      profile: selectedProfile,
      strengths: strengths.slice(0, 4),
      weaknesses: weaknesses.slice(0, 3)
    };
  };

  if (showResults) {
    const { profile, strengths, weaknesses } = getPersonalityProfile();
    const ProfileIcon = profile.icon;

    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-8 shadow-card">
          <div className="text-center mb-8">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center`}>
              <ProfileIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Your Personality Profile</h2>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {profile.name}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Strengths */}
            <div>
              <div className="flex items-center mb-4">
                <TrendingUp className="w-5 h-5 text-success mr-2" />
                <h3 className="text-xl font-semibold">Your Strengths</h3>
              </div>
              <div className="space-y-2">
                {strengths.map((strength, index) => (
                  <div key={index} className="flex items-center p-3 bg-success/10 rounded-lg">
                    <Shield className="w-4 h-4 text-success mr-3" />
                    <span>{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas for Development */}
            <div>
              <div className="flex items-center mb-4">
                <Target className="w-5 h-5 text-warning mr-2" />
                <h3 className="text-xl font-semibold">Areas for Development</h3>
              </div>
              <div className="space-y-2">
                {weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                    <span>{weakness}</span>
                    <Button size="sm" variant="outline" className="text-xs">
                      Get Coaching
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center space-y-4">
            <p className="text-muted-foreground">
              Based on your results, our AI has identified personalized coaching opportunities to help you excel.
            </p>
            <div className="flex justify-center space-x-4">
              <Button onClick={resetTest} variant="outline">
                Retake Test
              </Button>
              <Button className="bg-gradient-primary">
                View Career Recommendations
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Personality Assessment</h2>
          <Badge variant="outline">
            {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
        <Progress value={(currentQuestion / questions.length) * 100} className="mb-2" />
        <p className="text-sm text-muted-foreground">
          Progress: {Math.round((currentQuestion / questions.length) * 100)}% complete
        </p>
      </div>

      <Card className="p-8 shadow-card">
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            {questions[currentQuestion].text}
          </h3>
        </div>

        <div className="grid gap-4">
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="p-6 h-auto text-left justify-start hover:bg-primary/10 hover:border-primary transition-all duration-200"
              onClick={() => handleAnswer(index)}
            >
              <div className="w-6 h-6 rounded-full border-2 border-primary/30 mr-4 flex items-center justify-center">
                <span className="text-sm font-medium">{String.fromCharCode(65 + index)}</span>
              </div>
              {option}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PersonalityTest;