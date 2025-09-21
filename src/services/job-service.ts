import { supabase } from "@/lib/supabase";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type: string;
  salary_range?: string;
  description: string;
  requirements: string[];
  skills: string[];
  experience_required?: string;
  education_required?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  application_deadline?: string;
  application_process?: string[];
  benefits?: string[];
  contact_email?: string;
  job_category?: string;
  working_hours?: string;
  remote_work?: boolean;
}

export interface Application {
  id?: string;
  job_id: string;
  user_id: string;
  status: 'applied' | 'test_taken' | 'evaluated' | 'accepted' | 'rejected';
  applied_at?: string;
  updated_at?: string;
}

export interface TestResult {
  id?: string;
  application_id: string;
  score: number;
  results: any;
  feedback: string;
  is_eligible_for_interview: boolean;
  created_at?: string;
  updated_at?: string;
}

// Helper function to handle Supabase errors
const handleSupabaseError = (error: any, operation: string) => {
  console.error(`Error ${operation}:`, error);
  throw new Error(`Failed to ${operation}: ${error.message}`);
};

export const jobService = {
  // ====================
  // Job Operations
  // ====================
  async createJob(job: Omit<Job, 'id' | 'created_at' | 'updated_at'>): Promise<Job> {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert(job)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error, 'create job');
      throw error;
    }
  },

  async getJobs(): Promise<Job[]> {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error, 'fetch jobs');
      return [];
    }
  },

  async getJobById(id: string): Promise<Job | null> {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error, 'fetch job by id');
      return null;
    }
  },

  // ====================
  // Application Workflow
  // ====================
  
  /**
   * Start a new job application
   */
  async startApplication(jobId: string, userId: string): Promise<Application> {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert({
          job_id: jobId,
          user_id: userId,
          status: 'applied'
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error, 'start application');
      throw error;
    }
  },

  // ====================
  // Application Operations
  // ====================
  async applyForJob(jobId: string, userId: string): Promise<Application> {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert({
          job_id: jobId,
          user_id: userId,
          status: 'applied'
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error, 'apply for job');
      throw error;
    }
  },

  async getApplicationById(applicationId: string): Promise<Application | null> {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('id', applicationId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error, 'fetch application by id');
      return null;
    }
  },

  async getUserApplications(userId: string): Promise<Application[]> {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error, 'fetch user applications');
      return [];
    }
  },

  // Test Results Operations
  async saveTestResult(
    applicationId: string,
    resultData: {
      score: number;
      results: any;
      feedback: string;
      isEligible: boolean;
    }
  ): Promise<TestResult> {
    try {
      const { data, error } = await supabase
        .from('test_results')
        .insert({
          application_id: applicationId,
          score: resultData.score,
          results: resultData.results,
          feedback: resultData.feedback,
          is_eligible_for_interview: resultData.isEligible
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error, 'save test result');
      throw error;
    }
  },

  async getTestResult(applicationId: string): Promise<TestResult | null> {
    try {
      const { data, error } = await supabase
        .from('test_results')
        .select('*')
        .eq('application_id', applicationId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error, 'fetch test result');
      return null;
    }
  },

  // User Profile Operations
  async updateUserProfile(
    userId: string,
    updates: {
      full_name?: string;
      email?: string;
      phone?: string;
      location?: string;
      summary?: string;
      experience_years?: number;
      skills?: string[];
      work_experience?: string;
      education_details?: string;
      certifications?: string;
      cv_file_url?: string;
    }
  ) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          ...updates,
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error, 'update user profile');
      throw error;
    }
  },

  async getUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error, 'fetch user profile');
      return null;
    }
  },

  // File Upload
  async uploadResume(file: File, userId: string): Promise<{ path: string }> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `resumes/${fileName}`;
      
      const { error } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);
      
      if (error) throw error;
      
      return { path: filePath };
    } catch (error) {
      handleSupabaseError(error, 'upload resume');
      throw error;
    }
  },

  async updateApplicationStatus(applicationId: string, status: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ 
          status,
          updated_at: new Date().toISOString() 
        })
        .eq('id', applicationId);
      
      if (error) throw error;
    } catch (error) {
      handleSupabaseError(error, 'update application status');
      throw error;
    }
  },

  async submitResume(applicationId: string, resumeFile: File): Promise<{ path: string }> {
    try {
      // Upload the resume file
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `${applicationId}-${Date.now()}.${fileExt}`;
      const filePath = `resumes/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, resumeFile);
      
      if (uploadError) throw uploadError;
      
      // Update the application with the resume path
      const { error: updateError } = await supabase
        .from('applications')
        .update({ 
          resume_path: filePath,
          status: 'resume_submitted',
          updated_at: new Date().toISOString() 
        })
        .eq('id', applicationId);
      
      if (updateError) throw updateError;
      
      return { path: filePath };
    } catch (error) {
      handleSupabaseError(error, 'submit resume');
      throw error;
    }
  },

  async completePersonalityTest(applicationId: string, testResults: any): Promise<TestResult> {
    try {
      // Calculate score (this is a simple example, adjust as needed)
      const score = testResults.results.reduce((sum: number, r: any) => sum + r.score, 0) / testResults.results.length;
      
      // Determine if eligible for interview (example logic)
      const isEligible = score >= 0.6; // 60% or higher
      
      // Generate feedback
      const feedback = isEligible 
        ? 'Your personality test results are a great match for this position!'
        : 'Thank you for completing the personality test.';
      
      // Save test results
      const { data, error } = await supabase
        .from('test_results')
        .insert({
          application_id: applicationId,
          score,
          results: testResults,
          feedback,
          is_eligible_for_interview: isEligible
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Update application status
      await this.updateApplicationStatus(
        applicationId, 
        isEligible ? 'test_completed' : 'test_failed'
      );
      
      return data;
    } catch (error) {
      handleSupabaseError(error, 'complete personality test');
      throw error;
    }
  }
};
