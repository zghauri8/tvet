import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Save, Briefcase } from "lucide-react";

interface JobPosition {
  id?: string;
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

interface JobEntryFormProps {
  onJobCreated: (job: JobPosition) => void;
  onBack: () => void;
}

export default function JobEntryForm({ onJobCreated, onBack }: JobEntryFormProps) {
  const [job, setJob] = useState<JobPosition>({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: [],
    skills: [],
    experience: '',
    education: ''
  });

  const [newRequirement, setNewRequirement] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
    'Remote',
    'Hybrid'
  ];

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setJob(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setJob(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setJob(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setJob(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    if (!job.title || !job.company || !job.description) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // Generate unique ID
      const jobWithId = {
        ...job,
        id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };

      // Store in localStorage for now (will integrate with Supabase later)
      const existingJobs = JSON.parse(localStorage.getItem('adof_jobs') || '[]');
      existingJobs.push(jobWithId);
      localStorage.setItem('adof_jobs', JSON.stringify(existingJobs));

      onJobCreated(jobWithId);
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Enter Job for Apply</h2>
        <p className="text-gray-600">Create a new job position for applicants to apply to</p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Job Title *
              </Label>
              <Input
                id="title"
                value={job.title}
                onChange={(e) => setJob(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Software Engineer"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                Company Name *
              </Label>
              <Input
                id="company"
                value={job.company}
                onChange={(e) => setJob(prev => ({ ...prev, company: e.target.value }))}
                placeholder="e.g., TechCorp Solutions"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                Location
              </Label>
              <Input
                id="location"
                value={job.location}
                onChange={(e) => setJob(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., New York, NY or Remote"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                Job Type
              </Label>
              <Select value={job.type} onValueChange={(value) => setJob(prev => ({ ...prev, type: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="salary" className="text-sm font-medium text-gray-700">
                Salary Range
              </Label>
              <Input
                id="salary"
                value={job.salary}
                onChange={(e) => setJob(prev => ({ ...prev, salary: e.target.value }))}
                placeholder="e.g., $70,000 - $90,000"
                className="mt-1"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                Required Experience
              </Label>
              <Input
                id="experience"
                value={job.experience}
                onChange={(e) => setJob(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="e.g., 2-5 years"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="education" className="text-sm font-medium text-gray-700">
                Education Requirements
              </Label>
              <Input
                id="education"
                value={job.education}
                onChange={(e) => setJob(prev => ({ ...prev, education: e.target.value }))}
                placeholder="e.g., Bachelor's degree in Computer Science"
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="mt-6">
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">
            Job Description *
          </Label>
          <Textarea
            id="description"
            value={job.description}
            onChange={(e) => setJob(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
            className="mt-1 min-h-[120px]"
          />
        </div>

        {/* Requirements */}
        <div className="mt-6">
          <Label className="text-sm font-medium text-gray-700">Job Requirements</Label>
          <div className="mt-2 space-y-2">
            <div className="flex space-x-2">
              <Input
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                placeholder="Add a requirement..."
                onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
              />
              <Button onClick={addRequirement} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {job.requirements.map((req, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {req}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeRequirement(index)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <Label className="text-sm font-medium text-gray-700">Required Skills</Label>
          <div className="mt-2 space-y-2">
            <div className="flex space-x-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill..."
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <Button onClick={addSkill} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {skill}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeSkill(index)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={onBack}>
            Back to Dashboard
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating Job...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Create Job Position
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
