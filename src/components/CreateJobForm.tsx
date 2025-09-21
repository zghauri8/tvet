import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { jobService, Job } from "@/services/JobService";
import { Plus, X } from "lucide-react";

interface CreateJobFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CreateJobForm({ onSuccess, onCancel }: CreateJobFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [job, setJob] = useState<Omit<Job, 'id' | 'created_at' | 'updated_at' | 'is_active'>>({ 
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: [],
    skills: [],
    experience_required: '',
    education_required: ''
  });
  const [newRequirement, setNewRequirement] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job.title || !job.company || !job.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await jobService.createJob(job);
      toast({
        title: "Success",
        description: "Job posted successfully!"
      });
      onSuccess();
    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: "Error",
        description: "Failed to post job. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setJob({
        ...job,
        requirements: [...job.requirements, newRequirement.trim()]
      });
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    const newRequirements = [...job.requirements];
    newRequirements.splice(index, 1);
    setJob({ ...job, requirements: newRequirements });
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setJob({
        ...job,
        skills: [...job.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    const newSkills = [...job.skills];
    newSkills.splice(index, 1);
    setJob({ ...job, skills: newSkills });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Post a New Job</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              value={job.title}
              onChange={(e) => setJob({...job, title: e.target.value})}
              placeholder="e.g. Senior Developer"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              value={job.company}
              onChange={(e) => setJob({...job, company: e.target.value})}
              placeholder="Company name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={job.location}
              onChange={(e) => setJob({...job, location: e.target.value})}
              placeholder="e.g. New York, NY or Remote"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Job Type</Label>
            <select
              id="type"
              value={job.type}
              onChange={(e) => setJob({...job, type: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">Salary</Label>
            <Input
              id="salary"
              value={job.salary}
              onChange={(e) => setJob({...job, salary: e.target.value})}
              placeholder="e.g. $80,000 - $100,000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience Required</Label>
            <Input
              id="experience"
              value={job.experience_required}
              onChange={(e) => setJob({...job, experience_required: e.target.value})}
              placeholder="e.g. 3+ years"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="education">Education Required</Label>
            <Input
              id="education"
              value={job.education_required}
              onChange={(e) => setJob({...job, education_required: e.target.value})}
              placeholder="e.g. Bachelor's degree"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Job Description *</Label>
          <Textarea
            id="description"
            value={job.description}
            onChange={(e) => setJob({...job, description: e.target.value})}
            placeholder="Detailed job description..."
            rows={5}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Requirements</Label>
          <div className="flex gap-2">
            <Input
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              placeholder="Add a requirement"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
            />
            <Button type="button" onClick={addRequirement} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {job.requirements.length > 0 && (
            <div className="mt-2 space-y-1">
              {job.requirements.map((req, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span>{req}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRequirement(index)}
                    className="h-6 w-6 p-0 text-red-500 hover:bg-red-50"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Skills</Label>
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
            <Button type="button" onClick={addSkill} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {job.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {job.skills.map((skill, index) => (
                <div key={index} className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post Job'}
          </Button>
        </div>
      </form>
    </div>
  );
}
