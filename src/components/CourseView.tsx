import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Clock, 
  User, 
  BookOpen, 
  Download, 
  Star,
  Award,
  Target,
  TrendingUp,
  FileText,
  Video,
  Image,
  Link,
  Calendar,
  Users,
  MessageSquare,
  ThumbsUp,
  Share2,
  Bookmark,
  Eye,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface CourseMaterial {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment' | 'discussion';
  duration: string;
  description: string;
  content: string;
  resources: string[];
  completed: boolean;
  locked: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  progress: number;
  status: 'in-progress' | 'completed' | 'not-started';
  duration: string;
  instructor: string;
  instructorBio: string;
  modules: number;
  completedModules: number;
  grade: string | null;
  skills: string[];
  prerequisites: string[];
  certification: string;
  careerPaths: string[];
  difficulty: string;
  language: string;
  format: string;
  rating: number;
  studentsEnrolled: number;
  price: string;
  discount: string;
  finalPrice: string;
  lectures: Array<{
    id: number;
    title: string;
    duration: string;
    topics: string[];
  }>;
  materials: CourseMaterial[];
}

interface CourseViewProps {
  course: Course;
  onBack: () => void;
}

const CourseView = ({ course, onBack }: CourseViewProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentModule, setCurrentModule] = useState(0);
  const [expandedMaterials, setExpandedMaterials] = useState<Set<string>>(new Set());

  console.log('CourseView received course:', course);

  // Handle case where course is null or undefined
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
          <p className="text-gray-600 mb-6">The requested course could not be loaded.</p>
          <Button onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const toggleMaterial = (materialId: string) => {
    const newExpanded = new Set(expandedMaterials);
    if (newExpanded.has(materialId)) {
      newExpanded.delete(materialId);
    } else {
      newExpanded.add(materialId);
    }
    setExpandedMaterials(newExpanded);
  };

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'reading': return <FileText className="w-4 h-4" />;
      case 'quiz': return <Target className="w-4 h-4" />;
      case 'assignment': return <BookOpen className="w-4 h-4" />;
      case 'discussion': return <MessageSquare className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getMaterialColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-blue-600 bg-blue-100';
      case 'reading': return 'text-green-600 bg-green-100';
      case 'quiz': return 'text-purple-600 bg-purple-100';
      case 'assignment': return 'text-orange-600 bg-orange-100';
      case 'discussion': return 'text-pink-600 bg-pink-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">{course.title}</h1>
                <p className="text-gray-600">{course.instructor}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Progress</div>
                <div className="text-lg font-semibold text-gray-800">{course.progress}%</div>
              </div>
              <div className="w-32">
                <Progress value={course.progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="grades">Grades</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Course Overview */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Overview</h2>
                  <p className="text-gray-600 mb-6">{course.detailedDescription}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Course Details</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>Duration: {course.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <User className="w-4 h-4 mr-2" />
                          <span>Instructor: {course.instructor}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Award className="w-4 h-4 mr-2" />
                          <span>Certificate: {course.certification}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Star className="w-4 h-4 mr-2" />
                          <span>Rating: {course.rating}/5.0</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Key Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {course.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Course Lectures */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Lectures</h2>
                  <div className="space-y-4">
                    {course.lectures && course.lectures.length > 0 ? course.lectures.map((lecture, index) => (
                      <div key={lecture.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-800">{lecture.title}</h3>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">{lecture.duration}</span>
                            <Button size="sm" variant="outline">
                              <Play className="w-4 h-4 mr-2" />
                              Start
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Topics:</strong> {lecture.topics.join(', ')}
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8">
                        <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No lectures available yet.</p>
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="materials" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Materials</h2>
                  <div className="space-y-4">
                    {course.materials && course.materials.length > 0 ? course.materials.map((material) => (
                      <div key={material.id} className="border border-gray-200 rounded-lg">
                        <div 
                          className="p-4 cursor-pointer hover:bg-gray-50"
                          onClick={() => toggleMaterial(material.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${getMaterialColor(material.type)}`}>
                                {getMaterialIcon(material.type)}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-800">{material.title}</h3>
                                <p className="text-sm text-gray-600">{material.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">{material.duration}</span>
                              {material.completed ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                              )}
                              {expandedMaterials.has(material.id) ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {expandedMaterials.has(material.id) && (
                          <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
                            <div className="pt-4">
                              <p className="text-gray-700 mb-4">{material.content}</p>
                              
                              {material.resources.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-2">Resources</h4>
                                  <div className="space-y-2">
                                    {material.resources.map((resource, index) => (
                                      <div key={index} className="flex items-center space-x-2">
                                        <Link className="w-4 h-4 text-blue-500" />
                                        <a href="#" className="text-blue-600 hover:underline">{resource}</a>
                                        <Download className="w-4 h-4 text-gray-400" />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex space-x-2 mt-4">
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                  <Play className="w-4 h-4 mr-2" />
                                  Start
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Bookmark className="w-4 h-4 mr-2" />
                                  Bookmark
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )) : (
                      <div className="text-center py-8">
                        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No course materials available yet.</p>
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="discussions" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Discussions</h2>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-semibold text-gray-800">Dr. Sarah Johnson</span>
                            <span className="text-sm text-gray-500">2 hours ago</span>
                          </div>
                          <p className="text-gray-700 mb-3">
                            Welcome to the course! I'm excited to work with all of you. Please introduce yourselves and share what you hope to learn from this course.
                          </p>
                          <div className="flex items-center space-x-4">
                            <Button size="sm" variant="outline">
                              <ThumbsUp className="w-4 h-4 mr-2" />
                              Like (12)
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-semibold text-gray-800">Ahmad Rahman</span>
                            <span className="text-sm text-gray-500">1 hour ago</span>
                          </div>
                          <p className="text-gray-700 mb-3">
                            Thank you for the warm welcome! I'm looking forward to improving my technical skills and learning about modern development practices.
                          </p>
                          <div className="flex items-center space-x-4">
                            <Button size="sm" variant="outline">
                              <ThumbsUp className="w-4 h-4 mr-2" />
                              Like (5)
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Start New Discussion
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="grades" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Grades & Progress</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{course.grade || 'N/A'}</div>
                      <div className="text-sm text-gray-600">Current Grade</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">{course.completedModules}</div>
                      <div className="text-sm text-gray-600">Modules Completed</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-1">{course.progress}%</div>
                      <div className="text-sm text-gray-600">Overall Progress</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Assignment Grades</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Module 1: Introduction to Programming</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600 font-semibold">A-</span>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Module 2: System Design Fundamentals</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-600 font-semibold">B+</span>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Module 3: Advanced Concepts</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-600 font-semibold">In Progress</span>
                          <div className="w-5 h-5 border-2 border-yellow-300 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Course Progress */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Course Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Overall Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Modules Completed</span>
                      <span>{course.completedModules}/{course.modules}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Course Info */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Course Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="w-4 h-4 mr-2" />
                    <span>{course.certification}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{course.studentsEnrolled} students</span>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Materials
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Course
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
