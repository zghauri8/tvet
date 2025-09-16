// Personality Test API Service
const API_BASE_URL = 'https://projekanda.top';

export interface TestQuestion {
  question_no: number;
  question: string;
  options: Array<{
    score: number;
    text: string;
  }>;
  trait: string;
}

export interface TestData {
  test_name: string;
  trait: string;
  user_id: string;
  questions: TestQuestion[];
}

export interface TestResult {
  trait: string;
  score: number;
  level: string;
  strengths: string[];
  recommendations: string[];
  completed_date: string;
  user_id: string;
}

export interface UserStats {
  totalTests: number;
  averageScore: number;
  topTrait: string;
  completedThisMonth: number;
  lastTestDate: string;
}

class PersonalityTestService {
  // Generate a new test
  async generateTest(userId: string, trait: string): Promise<boolean> {
    try {
      console.log('Generating test for:', { userId, trait });
      const response = await fetch(`${API_BASE_URL}/generate_test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          trait: trait
        })
      });

      console.log('Generate test response status:', response.status);
      const responseText = await response.text();
      console.log('Generate test response:', responseText);

      return response.ok;
    } catch (error) {
      console.error('Error generating test:', error);
      return false;
    }
  }

  // Get test questions
  async getTestQuestions(userId: string): Promise<TestData | null> {
    try {
      console.log('Fetching test questions for user:', userId);
      const response = await fetch(`${API_BASE_URL}/get_mcqs/${userId}`);
      console.log('Get questions response status:', response.status);
      
      if (!response.ok) {
        console.error('Failed to fetch questions:', response.status, response.statusText);
        return null;
      }
      
      const data = await response.json();
      console.log('Get questions response data:', data);
      
      if (data && data.length > 0) {
        return data[0]; // Return the first test data
      }
      return null;
    } catch (error) {
      console.error('Error fetching test questions:', error);
      return null;
    }
  }

  // Submit test answers
  async submitAnswers(userId: string, trait: string, answers: {[key: number]: number}, testName: string): Promise<TestResult | null> {
    try {
      console.log('Submitting answers:', { userId, trait, answers, testName });
      
      const response = await fetch(`${API_BASE_URL}/submit_answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          trait: trait,
          answers: answers,
          test_name: testName
        })
      });

      console.log('Submit response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Submit response data:', result);
        
        const testResult: TestResult = {
          trait: trait,
          score: result.score || this.calculateScore(answers),
          level: this.getScoreLevel(result.score || this.calculateScore(answers)),
          strengths: result.strengths || this.getDefaultStrengths(trait),
          recommendations: result.recommendations || this.getDefaultRecommendations(trait),
          completed_date: new Date().toISOString().split('T')[0],
          user_id: userId
        };
        
        // Save to local storage immediately
        this.saveTestResult(userId, testResult);
        
        return testResult;
      } else {
        console.error('Submit failed:', response.status, response.statusText);
        // Even if API fails, create a local result
        const testResult: TestResult = {
          trait: trait,
          score: this.calculateScore(answers),
          level: this.getScoreLevel(this.calculateScore(answers)),
          strengths: this.getDefaultStrengths(trait),
          recommendations: this.getDefaultRecommendations(trait),
          completed_date: new Date().toISOString().split('T')[0],
          user_id: userId
        };
        
        this.saveTestResult(userId, testResult);
        return testResult;
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
      // Create a local result even if API fails
      const testResult: TestResult = {
        trait: trait,
        score: this.calculateScore(answers),
        level: this.getScoreLevel(this.calculateScore(answers)),
        strengths: this.getDefaultStrengths(trait),
        recommendations: this.getDefaultRecommendations(trait),
        completed_date: new Date().toISOString().split('T')[0],
        user_id: userId
      };
      
      this.saveTestResult(userId, testResult);
      return testResult;
    }
  }

  // Get user's test history and stats
  async getUserStats(userId: string): Promise<UserStats> {
    try {
      // For now, we'll use localStorage to track user's test history
      // In a real app, this would come from your backend API
      const testHistory = this.getTestHistory(userId);
      
      const totalTests = testHistory.length;
      const averageScore = totalTests > 0 
        ? testHistory.reduce((sum, test) => sum + test.score, 0) / totalTests 
        : 0;
      const topTrait = totalTests > 0 
        ? testHistory.reduce((prev, current) => (prev.score > current.score) ? prev : current).trait
        : '';
      const completedThisMonth = testHistory.filter(test => {
        const testDate = new Date(test.completed_date);
        const now = new Date();
        return testDate.getMonth() === now.getMonth() && testDate.getFullYear() === now.getFullYear();
      }).length;
      const lastTestDate = totalTests > 0 ? testHistory[testHistory.length - 1].completed_date : '';

      return {
        totalTests,
        averageScore: Math.round(averageScore),
        topTrait,
        completedThisMonth,
        lastTestDate
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return {
        totalTests: 0,
        averageScore: 0,
        topTrait: '',
        completedThisMonth: 0,
        lastTestDate: ''
      };
    }
  }

  // Get user's test history
  async getUserTestHistory(userId: string): Promise<TestResult[]> {
    return this.getTestHistory(userId);
  }

  // Public method to get test history
  getTestHistory(userId: string): TestResult[] {
    try {
      console.log('Getting test history for user:', userId);
      const history = localStorage.getItem(`test_history_${userId}`);
      console.log('Raw localStorage data:', history);
      const parsed = history ? JSON.parse(history) : [];
      console.log('Parsed history:', parsed);
      return parsed;
    } catch (error) {
      console.error('Error reading test history:', error);
      return [];
    }
  }

  // Private helper methods
  private calculateScore(answers: {[key: number]: number}): number {
    const scores = Object.values(answers);
    if (scores.length === 0) return 0;
    const total = scores.reduce((sum, score) => sum + score, 0);
    const maxPossible = scores.length * 5; // Assuming 5 is max score
    return Math.round((total / maxPossible) * 100);
  }

  private getScoreLevel(score: number): string {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'High';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Average';
    return 'Below Average';
  }

  private getDefaultStrengths(trait: string): string[] {
    const strengthsMap: {[key: string]: string[]} = {
      leadership: ['Decision Making', 'Team Management', 'Strategic Thinking'],
      communication: ['Public Speaking', 'Written Communication', 'Active Listening'],
      problem_solving: ['Analytical Thinking', 'Creative Solutions', 'Critical Analysis'],
      teamwork: ['Collaboration', 'Conflict Resolution', 'Supporting Others'],
      creativity: ['Innovation', 'Design Thinking', 'Artistic Expression'],
      analytical: ['Data Analysis', 'Logical Reasoning', 'Pattern Recognition'],
      emotional_intelligence: ['Empathy', 'Self-Awareness', 'Social Skills'],
      adaptability: ['Flexibility', 'Resilience', 'Change Management']
    };
    return strengthsMap[trait] || ['General Strengths'];
  }

  private getDefaultRecommendations(trait: string): string[] {
    const recommendationsMap: {[key: string]: string[]} = {
      leadership: ['Project Manager', 'Team Lead', 'Operations Director'],
      communication: ['Marketing Manager', 'Content Writer', 'Sales Representative'],
      problem_solving: ['Software Engineer', 'Data Analyst', 'Research Scientist'],
      teamwork: ['HR Specialist', 'Community Manager', 'Event Coordinator'],
      creativity: ['Graphic Designer', 'Marketing Creative', 'Product Designer'],
      analytical: ['Business Analyst', 'Financial Analyst', 'Research Analyst'],
      emotional_intelligence: ['Counselor', 'HR Manager', 'Customer Success Manager'],
      adaptability: ['Consultant', 'Project Coordinator', 'Change Manager']
    };
    return recommendationsMap[trait] || ['General Career Paths'];
  }


  private saveTestResult(userId: string, result: TestResult): void {
    try {
      console.log('Saving test result for user:', userId, 'Result:', result);
      const history = this.getTestHistory(userId);
      console.log('Current history before saving:', history);
      history.push(result);
      console.log('New history after adding result:', history);
      localStorage.setItem(`test_history_${userId}`, JSON.stringify(history));
      console.log('Saved to localStorage with key:', `test_history_${userId}`);
      
      // Verify it was saved
      const saved = localStorage.getItem(`test_history_${userId}`);
      console.log('Verification - what was actually saved:', saved);
    } catch (error) {
      console.error('Error saving test result:', error);
    }
  }

  // Public method to save test result
  async saveTestResultToHistory(userId: string, result: TestResult): Promise<void> {
    this.saveTestResult(userId, result);
  }
}

export const personalityTestService = new PersonalityTestService();
