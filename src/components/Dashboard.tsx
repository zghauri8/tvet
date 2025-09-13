import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  TrendingUp, 
  Star, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  Download,
  Eye,
  Filter,
  Search
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  appliedDate: string;
  position: string;
  matchScore: number;
  status: 'pending' | 'reviewed' | 'interviewed' | 'shortlisted';
  skills: string[];
  experience: string;
  personality: string;
  strengths: string[];
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+60 12-345-6789',
    location: 'Kuala Lumpur',
    appliedDate: '2024-01-15',
    position: 'Digital Marketing Manager',
    matchScore: 94,
    status: 'shortlisted',
    skills: ['Digital Strategy', 'Content Marketing', 'Analytics', 'Leadership'],
    experience: '5 years',
    personality: 'Natural Leader',
    strengths: ['Strategic thinking', 'Team collaboration', 'Problem solving']
  },
  {
    id: '2',
    name: 'Ahmad Rahman',
    email: 'ahmad.rahman@email.com',
    phone: '+60 19-876-5432',
    location: 'Selangor',
    appliedDate: '2024-01-14',
    position: 'Data Analyst',
    matchScore: 88,
    status: 'interviewed',
    skills: ['Data Analysis', 'Python', 'SQL', 'Statistical Modeling'],
    experience: '3 years',
    personality: 'Data Analyst',
    strengths: ['Analytical thinking', 'Detail-oriented', 'Problem solving']
  },
  {
    id: '3',
    name: 'Lim Wei Ming',
    email: 'wei.ming@email.com',
    phone: '+60 16-234-5678',
    location: 'Penang',
    appliedDate: '2024-01-13',
    position: 'UX/UI Designer',
    matchScore: 91,
    status: 'reviewed',
    skills: ['User Research', 'Prototyping', 'Design Thinking', 'Figma'],
    experience: '4 years',
    personality: 'Creative Innovator',
    strengths: ['Creativity', 'User empathy', 'Visual design']
  },
  {
    id: '4',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+60 17-345-6789',
    location: 'Johor Bahru',
    appliedDate: '2024-01-12',
    position: 'Project Manager',
    matchScore: 86,
    status: 'pending',
    skills: ['Project Management', 'Agile', 'Leadership', 'Communication'],
    experience: '6 years',
    personality: 'Team Supporter',
    strengths: ['Organization', 'Communication', 'Leadership']
  }
];

const Dashboard = () => {
  const [candidates] = useState(mockCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shortlisted': return 'bg-success text-success-foreground';
      case 'interviewed': return 'bg-primary text-primary-foreground';
      case 'reviewed': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'shortlisted': return 'Shortlisted';
      case 'interviewed': return 'Interviewed';
      case 'reviewed': return 'Under Review';
      default: return 'Pending';
    }
  };

  // Statistics
  const totalCandidates = candidates.length;
  const shortlistedCount = candidates.filter(c => c.status === 'shortlisted').length;
  const averageScore = Math.round(candidates.reduce((sum, c) => sum + c.matchScore, 0) / candidates.length);
  const pendingReview = candidates.filter(c => c.status === 'pending').length;

  if (selectedCandidate) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => setSelectedCandidate(null)}
            className="mb-4"
          >
            ← Back to Dashboard
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Candidate Profile */}
          <div className="md:col-span-2">
            <Card className="p-6 shadow-card">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedCandidate.name}</h2>
                  <p className="text-muted-foreground mb-4">{selectedCandidate.position}</p>
                  <Badge className={getStatusColor(selectedCandidate.status)}>
                    {getStatusText(selectedCandidate.status)}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-5 h-5 text-warning" />
                    <span className="text-2xl font-bold">{selectedCandidate.matchScore}%</span>
                  </div>
                  <span className="text-sm text-muted-foreground">AI Match Score</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedCandidate.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedCandidate.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedCandidate.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Applied: {selectedCandidate.appliedDate}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Skills Assessment</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Personality Type</h3>
                  <Badge variant="outline" className="text-primary">
                    {selectedCandidate.personality}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Key Strengths</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedCandidate.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center p-2 bg-success/10 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-success mr-2" />
                        <span className="text-sm">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full bg-gradient-primary">
                  Schedule Interview
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
                <Button variant="outline" className="w-full">
                  Send Message
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-2">AI Recommendation</h3>
              <div className="mb-4">
                <Progress value={selectedCandidate.matchScore} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Strong match for leadership roles with excellent analytical skills.
                </p>
              </div>
              <Button size="sm" variant="outline" className="w-full">
                View Full Report
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
        <p className="text-muted-foreground">
          Manage candidates and view AI-powered recruitment insights
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-4 shadow-card">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{totalCandidates}</p>
              <p className="text-sm text-muted-foreground">Total Candidates</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-card">
          <div className="flex items-center space-x-3">
            <Star className="w-8 h-8 text-warning" />
            <div>
              <p className="text-2xl font-bold">{shortlistedCount}</p>
              <p className="text-sm text-muted-foreground">Shortlisted</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-card">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-success" />
            <div>
              <p className="text-2xl font-bold">{averageScore}%</p>
              <p className="text-sm text-muted-foreground">Avg Match Score</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-card">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-accent" />
            <div>
              <p className="text-2xl font-bold">{pendingReview}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Candidates Table */}
      <Card className="shadow-card">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Candidate Applications</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <div 
                key={candidate.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                onClick={() => setSelectedCandidate(candidate)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold">{candidate.name}</h3>
                    <p className="text-sm text-muted-foreground">{candidate.position}</p>
                    <p className="text-xs text-muted-foreground">{candidate.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-warning" />
                      <span className="font-semibold">{candidate.matchScore}%</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Match</span>
                  </div>

                  <Badge className={getStatusColor(candidate.status)}>
                    {getStatusText(candidate.status)}
                  </Badge>

                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;