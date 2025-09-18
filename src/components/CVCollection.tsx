import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Download,
  Eye,
  Trash2,
  Plus,
  Search
} from "lucide-react";

interface JobPosition {
  id: string;
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

interface CVData {
  id: string;
  jobId: string;
  applicantName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  summary: string;
  workHistory: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  uploadedAt: string;
  status: 'pending' | 'reviewed' | 'test_generated' | 'test_completed' | 'filtered' | 'recommended' | 'rejected';
}

interface CVCollectionProps {
  onBack: () => void;
  onCVSelected: (cv: CVData) => void;
}

export default function CVCollection({ onBack, onCVSelected }: CVCollectionProps) {
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [cvs, setCvs] = useState<CVData[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCV, setNewCV] = useState<Partial<CVData>>({
    applicantName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    education: '',
    skills: [],
    summary: '',
    workHistory: []
  });
  const [newSkill, setNewSkill] = useState('');
  const [newWorkEntry, setNewWorkEntry] = useState({
    company: '',
    position: '',
    duration: '',
    description: ''
  });

  useEffect(() => {
    loadJobs();
    loadCVs();
  }, []);

  const loadJobs = () => {
    const storedJobs = JSON.parse(localStorage.getItem('adof_jobs') || '[]');
    setJobs(storedJobs);
  };

  const loadCVs = () => {
    const storedCVs = JSON.parse(localStorage.getItem('adof_cvs') || '[]');
    setCvs(storedCVs);
  };

  const addSkill = () => {
    if (newSkill.trim() && newCV.skills) {
      setNewCV(prev => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setNewCV(prev => ({
      ...prev,
      skills: prev.skills?.filter((_, i) => i !== index) || []
    }));
  };

  const addWorkEntry = () => {
    if (newWorkEntry.company && newWorkEntry.position) {
      setNewCV(prev => ({
        ...prev,
        workHistory: [...(prev.workHistory || []), { ...newWorkEntry }]
      }));
      setNewWorkEntry({ company: '', position: '', duration: '', description: '' });
    }
  };

  const removeWorkEntry = (index: number) => {
    setNewCV(prev => ({
      ...prev,
      workHistory: prev.workHistory?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmitCV = () => {
    if (!selectedJob || !newCV.applicantName || !newCV.email) {
      alert('Please fill in all required fields');
      return;
    }

    const cvData: CVData = {
      id: `cv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      jobId: selectedJob,
      applicantName: newCV.applicantName!,
      email: newCV.email!,
      phone: newCV.phone || '',
      location: newCV.location || '',
      experience: newCV.experience || '',
      education: newCV.education || '',
      skills: newCV.skills || [],
      summary: newCV.summary || '',
      workHistory: newCV.workHistory || [],
      uploadedAt: new Date().toISOString(),
      status: 'pending'
    };

    const existingCVs = JSON.parse(localStorage.getItem('adof_cvs') || '[]');
    existingCVs.push(cvData);
    localStorage.setItem('adof_cvs', JSON.stringify(existingCVs));

    setCvs(existingCVs);
    setShowAddForm(false);
    setNewCV({
      applicantName: '',
      email: '',
      phone: '',
      location: '',
      experience: '',
      education: '',
      skills: [],
      summary: '',
      workHistory: []
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'test_generated': return 'bg-purple-100 text-purple-800';
      case 'test_completed': return 'bg-green-100 text-green-800';
      case 'filtered': return 'bg-orange-100 text-orange-800';
      case 'recommended': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCVs = cvs.filter(cv => {
    const matchesJob = !selectedJob || cv.jobId === selectedJob;
    const matchesSearch = !searchTerm || 
      cv.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cv.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesJob && matchesSearch;
  });

  const selectedJobData = jobs.find(job => job.id === selectedJob);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Collect CV</h2>
        <p className="text-gray-600">Manage CVs from job applicants and track their progress</p>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Label htmlFor="search" className="text-sm font-medium text-gray-700">Search CVs</Label>
          <div className="relative mt-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email..."
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <Label htmlFor="jobFilter" className="text-sm font-medium text-gray-700">Filter by Job</Label>
          <Select value={selectedJob} onValueChange={setSelectedJob}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="All jobs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All jobs</SelectItem>
              {jobs.map((job) => (
                <SelectItem key={job.id} value={job.id}>
                  {job.title} - {job.company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add CV
          </Button>
        </div>
      </div>

      {/* Job Info */}
      {selectedJobData && (
        <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">{selectedJobData.title}</h3>
          </div>
          <p className="text-blue-800 text-sm">
            {selectedJobData.company} • {selectedJobData.location} • {selectedJobData.type}
          </p>
        </Card>
      )}

      {/* CV List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCVs.map((cv) => (
          <Card key={cv.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{cv.applicantName}</h3>
                  <p className="text-sm text-gray-600">{cv.email}</p>
                </div>
              </div>
              <Badge className={getStatusColor(cv.status)}>
                {cv.status.replace('_', ' ')}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              {cv.phone && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {cv.phone}
                </div>
              )}
              {cv.location && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {cv.location}
                </div>
              )}
              {cv.experience && (
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {cv.experience}
                </div>
              )}
              {cv.education && (
                <div className="flex items-center text-sm text-gray-600">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  {cv.education}
                </div>
              )}
            </div>

            {cv.skills.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {cv.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {cv.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{cv.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onCVSelected(cv)}
                className="flex-1"
              >
                <Eye className="w-4 h-4 mr-1" />
                Review
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredCVs.length === 0 && (
        <Card className="p-8 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No CVs Found</h3>
          <p className="text-gray-600 mb-4">
            {selectedJob ? 'No CVs found for the selected job.' : 'No CVs have been collected yet.'}
          </p>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add First CV
          </Button>
        </Card>
      )}

      {/* Add CV Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Add New CV</h3>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="jobSelect" className="text-sm font-medium text-gray-700">
                    Job Position *
                  </Label>
                  <Select value={selectedJob} onValueChange={setSelectedJob}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a job position" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobs.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.title} - {job.company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Applicant Name *
                    </Label>
                    <Input
                      id="name"
                      value={newCV.applicantName || ''}
                      onChange={(e) => setNewCV(prev => ({ ...prev, applicantName: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={newCV.email || ''}
                      onChange={(e) => setNewCV(prev => ({ ...prev, email: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={newCV.phone || ''}
                      onChange={(e) => setNewCV(prev => ({ ...prev, phone: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={newCV.location || ''}
                      onChange={(e) => setNewCV(prev => ({ ...prev, location: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="summary" className="text-sm font-medium text-gray-700">
                    Professional Summary
                  </Label>
                  <Textarea
                    id="summary"
                    value={newCV.summary || ''}
                    onChange={(e) => setNewCV(prev => ({ ...prev, summary: e.target.value }))}
                    className="mt-1 min-h-[100px]"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Skills</Label>
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
                      {newCV.skills?.map((skill, index) => (
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
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitCV} className="bg-blue-600 hover:bg-blue-700">
                  Add CV
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="mt-6">
        <Button variant="outline" onClick={onBack}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
