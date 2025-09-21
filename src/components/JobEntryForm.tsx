import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Save, Briefcase, Search, MapPin, Clock, ExternalLink } from "lucide-react";
import { jobService, Job } from "@/services/JobService";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface JobEntryFormProps {
  onBack: () => void;
}

export default function JobEntryForm({ onBack }: JobEntryFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  
  // Fetch jobs from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const jobsData = await jobService.getJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast({
          title: "Error",
          description: "Failed to load jobs. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);
  
  // Filter jobs based on search
  const filteredJobs = jobs.filter(job => {
    const searchLower = searchTerm.toLowerCase();
    return (
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower) ||
      (job.skills && job.skills.some(skill => 
        skill.toLowerCase().includes(searchLower)
      ))
    );
  });
  
  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };
  // Job type options for filtering
  const jobTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
    'Temporary',
    'Freelance',
    'Remote',
    'Hybrid'
  ];
  
  // Get job type display name
  const getJobTypeDisplay = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };
  
  // Handle job application
  const handleSubmitApplication = async (job: Job) => {
    try {
      // Here you would typically integrate with your job application service
      console.log('Applying for job:', job.id);
      
      toast({
        title: "Application submitted!",
        description: `Your application for ${job.title} at ${job.company} has been received.`,
      });
      
      setShowApplicationForm(false);
      setSelectedJob(null);
    } catch (error) {
      console.error('Error applying for job:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Render job listings
  const renderJobListings = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </Card>
          ))}
        </div>
      );
    }

    if (filteredJobs.length === 0) {
      return (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
          <p className="mt-2 text-gray-600">
            {searchTerm ? 'Try a different search term' : 'There are currently no job openings'}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="whitespace-nowrap">
                      {getJobTypeDisplay(job.job_type)}
                    </Badge>
                    {job.remote_work && (
                      <Badge variant="secondary">
                        Remote
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {job.company}
                  </div>
                  {job.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                  )}
                  {job.salary && (
                    <span className="text-green-600 font-medium">{job.salary}</span>
                  )}
                </div>
                
                <p className="text-gray-700 line-clamp-2 mb-3">
                  {job.description}
                </p>
                
                {job.requirements && job.requirements.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Requirements:</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {job.requirements.slice(0, 3).map((req, idx) => (
                        <li key={idx} className="truncate">{req}</li>
                      ))}
                      {job.requirements.length > 3 && (
                        <li className="text-blue-600">+{job.requirements.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                )}
                
                {job.skills && job.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <Button onClick={() => handleApply(job)} className="whitespace-nowrap">
                Apply Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  // Render application form
  const renderApplicationForm = () => {
    if (!selectedJob) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Apply for {selectedJob.title}</h2>
              <p className="text-gray-600">{selectedJob.company} • {selectedJob.location}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowApplicationForm(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Your Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" placeholder="Your full name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="resume">Resume *</Label>
                  <div className="mt-1 flex items-center gap-2">
                    <Input id="resume" type="file" accept=".pdf,.doc,.docx" />
                    <span className="text-sm text-gray-500">PDF, DOC, or DOCX (max 5MB)</span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                  <Textarea 
                    id="coverLetter" 
                    placeholder="Tell us why you're a great fit for this position..." 
                    rows={5} 
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button 
                variant="outline" 
                onClick={() => setShowApplicationForm(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={() => handleSubmitApplication(selectedJob)}
              >
                Submit Application
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Apply for Jobs</h2>
        <p className="text-gray-600">Browse and apply for available job positions</p>
      </div>
      
      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search jobs by title, company, or skills..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Job Listings */}
      <Card className="p-6">
        {renderJobListings()}
      </Card>
      
      {/* Application Form Modal */}
      {showApplicationForm && renderApplicationForm()}
    </div>
  );
}
