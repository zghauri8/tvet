import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Search, MapPin, Clock, Briefcase, Bookmark, X } from "lucide-react";
import { jobService, type Job } from "@/services/jobService";
import { useAuth } from "@/contexts/AuthContext";
import JobApplicationFlow from "@/components/JobApplicationFlow";

type ApplicationStatus = 'idle' | 'applying' | 'success' | 'error';

const JobsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>('idle');
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  // Fetch jobs and set up filters
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const jobsData = await jobService.getJobs();
        setJobs(jobsData);
        
        // Extract unique job types and locations for filters
        const types = Array.from(new Set(jobsData.map(job => job.job_type))).filter(Boolean) as string[];
        const locs = Array.from(new Set(jobsData.map(job => job.location))).filter(Boolean) as string[];
        
        setJobTypes(types);
        setLocations(locs);
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

    fetchData();
  }, [toast]);

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !searchTerm || 
                         job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !selectedType || job.job_type === selectedType;
    const matchesLocation = !selectedLocation || 
                           (job.location && job.location.toLowerCase().includes(selectedLocation.toLowerCase()));
    
    return matchesSearch && matchesType && matchesLocation;
  });

  const handleApply = (job: Job) => {
    if (!user) {
      navigate('/login', { state: { from: '/jobs' } });
      return;
    }
    setApplicationStatus('applying');
    setSelectedJob(job);
    setShowApplication(true);
  };

  const handleApplicationComplete = () => {
    setApplicationStatus('success');
    setShowApplication(false);
    
    toast({
      title: "Application submitted!",
      description: `Your application for ${selectedJob?.title} at ${selectedJob?.company} has been received.`,
    });
    
    // Reset status after showing success
    setTimeout(() => setApplicationStatus('idle'), 3000);
  };

  const handleApplicationError = (error: Error) => {
    setApplicationStatus('error');
    console.error('Application error:', error);
    
    toast({
      variant: "destructive",
      title: "Application Error",
      description: error.message || "Failed to submit application. Please try again.",
    });
  };

  // Render the job application dialog
  const renderApplicationDialog = () => (
    <Dialog open={showApplication} onOpenChange={setShowApplication}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-full z-10"
            onClick={() => setShowApplication(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
          
          {selectedJob && applicationStatus === 'applying' ? (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
              <p className="text-muted-foreground mb-6">
                {selectedJob.company} • {selectedJob.location}
              </p>
              <JobApplicationFlow 
                job={selectedJob}
                onComplete={handleApplicationComplete}
                onBack={() => setShowApplication(false)}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  // Show full-screen loading when application is in progress
  if (showApplication && selectedJob) {
    return (
      <div className="container mx-auto py-8 px-4">
        {renderApplicationDialog()}
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Filters */}
          <div className="space-y-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
          
          {/* Job List */}
          <div className="md:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/4 mt-4" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search jobs..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            {jobTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          onClick={() => {
            setSearchTerm('');
            setSelectedType('');
            setSelectedLocation('');
          }}
        >
          Clear Filters
        </Button>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="mt-2 text-gray-600">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <Card key={job.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="whitespace-nowrap">
                        {job.job_type}
                      </Badge>
                      {job.remote_work && (
                        <Badge variant="secondary" className="whitespace-nowrap">
                          Remote
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{job.company}</span>
                    </div>
                    {job.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                    </div>
                    {job.salary_range && (
                      <div className="flex items-center">
                        <span className="font-medium text-green-600">{job.salary_range}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-700 line-clamp-2">
                      {job.description}
                    </p>
                    
                    {job.skills && job.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {job.skills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {job.application_deadline && (
                      <div className="text-sm text-gray-500 mt-2">
                        <span className="font-medium">Application Deadline: </span>
                        {new Date(job.application_deadline).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col gap-2 mt-4 md:mt-0">
                  <Button onClick={() => handleApply(job)}>
                    Apply Now
                  </Button>
                  <Button variant="outline">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Application Dialog */}
      {renderApplicationDialog()}
    </div>
  );
};

export default JobsPage;
