import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Search, MapPin, Clock, Briefcase, Bookmark } from "lucide-react";
import { jobService, Job } from "@/services/JobService";
import { useAuth } from "@/contexts/AuthContext";
import JobApplicationFlow from "@/components/JobApplicationFlow";

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

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !selectedType || job.type === selectedType;
    const matchesLocation = !selectedLocation || job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesType && matchesLocation;
  });

  const jobTypes = Array.from(new Set(jobs.map(job => job.type)));
  const locations = Array.from(new Set(jobs.map(job => job.location)));

  const handleApply = (job: Job) => {
    if (!user) {
      navigate('/login', { state: { from: '/jobs' } });
      return;
    }
    setSelectedJob(job);
    setShowApplication(true);
  };

  const handleApplicationComplete = () => {
    setShowApplication(false);
    setSelectedJob(null);
    toast({
      title: "Application submitted!",
      description: "Your application has been received. We'll be in touch soon."
    });
  };

  if (showApplication && selectedJob) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Button 
          variant="ghost" 
          onClick={() => setShowApplication(false)}
          className="mb-6"
        >
          ← Back to Jobs
        </Button>
        <JobApplicationFlow 
          job={selectedJob} 
          onComplete={handleApplicationComplete}
          onBack={() => setShowApplication(false)}
        />
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
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          
          {/* Job List */}
          <div className="md:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
        <p className="text-xl text-gray-600">
          Browse through our latest job openings and start your career journey today
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Job title, company, or keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
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
            className="w-full" 
            onClick={() => {
              setSearchTerm('');
              setSelectedType('');
              setSelectedLocation('');
            }}
          >
            Clear Filters
          </Button>
        </div>
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
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    <Badge variant="outline" className="ml-2">
                      {job.type}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(job.created_at || '').toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-gray-700 line-clamp-2">
                    {job.description}
                  </p>
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
    </div>
  );
};

export default JobsPage;
