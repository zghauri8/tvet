import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  GraduationCap, 
  Briefcase, 
  Star, 
  TrendingUp, 
  DollarSign,
  MapPin,
  Clock,
  Users,
  Award,
  Zap
} from 'lucide-react';

interface Career {
  id: string;
  title: string;
  field: string;
  matchPercentage: number;
  salaryRange: string;
  demand: 'High' | 'Medium' | 'Low';
  education: string;
  skills: string[];
  description: string;
  growthOutlook: string;
  locations: string[];
}

const tvetCareers: Career[] = [
  {
    id: '1',
    title: 'Automotive Technician',
    field: 'Engineering & Technology',
    matchPercentage: 92,
    salaryRange: 'RM 2,500 - RM 4,500',
    demand: 'High',
    education: 'TVET Certificate/Diploma',
    skills: ['Mechanical Systems', 'Diagnostics', 'Problem Solving', 'Tool Handling'],
    description: 'Diagnose, repair, and maintain automotive vehicles and systems.',
    growthOutlook: '15% growth expected',
    locations: ['Kuala Lumpur', 'Selangor', 'Johor']
  },
  {
    id: '2',
    title: 'Culinary Arts Specialist',
    field: 'Hospitality & Services',
    matchPercentage: 88,
    salaryRange: 'RM 2,200 - RM 5,000',
    demand: 'High',
    education: 'TVET Certificate',
    skills: ['Food Preparation', 'Kitchen Management', 'Creativity', 'Time Management'],
    description: 'Prepare and present high-quality food in restaurants and hotels.',
    growthOutlook: '12% growth expected',
    locations: ['Kuala Lumpur', 'Penang', 'Sabah']
  },
  {
    id: '3',
    title: 'Digital Media Designer',
    field: 'Creative & Design',
    matchPercentage: 85,
    salaryRange: 'RM 2,800 - RM 4,200',
    demand: 'Medium',
    education: 'TVET Diploma',
    skills: ['Graphic Design', 'Video Editing', 'Software Proficiency', 'Creativity'],
    description: 'Create visual content for digital platforms and marketing campaigns.',
    growthOutlook: '20% growth expected',
    locations: ['Kuala Lumpur', 'Cyberjaya', 'Penang']
  }
];

const generalCareers: Career[] = [
  {
    id: '4',
    title: 'Data Analyst',
    field: 'Technology & Analytics',
    matchPercentage: 94,
    salaryRange: 'RM 4,000 - RM 7,500',
    demand: 'High',
    education: 'Bachelor\'s Degree',
    skills: ['Data Analysis', 'Statistical Modeling', 'SQL', 'Python/R'],
    description: 'Analyze complex data to help organizations make informed decisions.',
    growthOutlook: '25% growth expected',
    locations: ['Kuala Lumpur', 'Cyberjaya', 'Penang']
  },
  {
    id: '5',
    title: 'Digital Marketing Manager',
    field: 'Marketing & Communications',
    matchPercentage: 89,
    salaryRange: 'RM 4,500 - RM 8,000',
    demand: 'High',
    education: 'Bachelor\'s Degree',
    skills: ['Digital Strategy', 'Content Marketing', 'Analytics', 'Leadership'],
    description: 'Develop and execute digital marketing strategies for businesses.',
    growthOutlook: '18% growth expected',
    locations: ['Kuala Lumpur', 'Selangor', 'Johor']
  },
  {
    id: '6',
    title: 'UX/UI Designer',
    field: 'Design & Technology',
    matchPercentage: 87,
    salaryRange: 'RM 4,200 - RM 7,800',
    demand: 'Medium',
    education: 'Bachelor\'s Degree',
    skills: ['User Research', 'Prototyping', 'Design Thinking', 'Collaboration'],
    description: 'Design intuitive and engaging user experiences for digital products.',
    growthOutlook: '22% growth expected',
    locations: ['Kuala Lumpur', 'Cyberjaya', 'Penang']
  }
];

const CareerCard = ({ career }: { career: Career }) => {
  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{career.title}</h3>
          <p className="text-muted-foreground text-sm mb-2">{career.field}</p>
          <Badge variant="outline" className={getDemandColor(career.demand)}>
            {career.demand} Demand
          </Badge>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-4 h-4 text-warning" />
            <span className="font-bold text-lg">{career.matchPercentage}%</span>
          </div>
          <span className="text-xs text-muted-foreground">Match Score</span>
        </div>
      </div>

      <div className="mb-4">
        <Progress value={career.matchPercentage} className="mb-2" />
        <p className="text-sm text-muted-foreground">{career.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <span>{career.salaryRange}</span>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <span>{career.growthOutlook}</span>
        </div>
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-4 h-4 text-muted-foreground" />
          <span>{career.education}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span>{career.locations.join(', ')}</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-sm mb-2 flex items-center">
          <Zap className="w-4 h-4 mr-1" />
          Key Skills
        </h4>
        <div className="flex flex-wrap gap-2">
          {career.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <Button className="w-full bg-gradient-primary hover:shadow-soft">
        Learn More
      </Button>
    </Card>
  );
};

const CareerRecommendations = () => {
  const [activeTab, setActiveTab] = useState('tvet');

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">AI Career Recommendations</h2>
        <p className="text-muted-foreground text-lg">
          Based on your personality assessment, here are the top career matches for you
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="tvet" className="flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span>TVET Careers</span>
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4" />
            <span>General Careers</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tvet">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <Award className="w-5 h-5 mr-2 text-accent" />
              TVET Career Paths
            </h3>
            <p className="text-muted-foreground">
              Technical and vocational careers based on NOSS standards
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tvetCareers.map((career) => (
              <CareerCard key={career.id} career={career} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="general">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-primary" />
              Professional Career Paths
            </h3>
            <p className="text-muted-foreground">
              University-level careers across various industries
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalCareers.map((career) => (
              <CareerCard key={career.id} career={career} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-primary mr-3" />
            <h3 className="text-xl font-semibold">Ready to Start Your Journey?</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Get personalized coaching to develop the skills you need for your chosen career path.
          </p>
          <Button size="lg" className="bg-gradient-primary hover:shadow-hover">
            Book Career Coaching Session
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default CareerRecommendations;