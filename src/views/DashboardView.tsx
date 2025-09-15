import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TVETDashboard from "../components/TVETDashboard";
import WorkingADOFDashboard from "../components/WorkingADOFDashboard";
import {
  User,
  Mail,
  Calendar,
  LogOut,
  Settings,
  BarChart3,
  Target,
  Award,
  TrendingUp,
} from "lucide-react";

export default function DashboardView() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-6">
            Please log in to access your dashboard.
          </p>
          <Button onClick={() => navigate("/login")}>Go to Login</Button>
        </div>
      </div>
    );
  }

  // Show TVET Dashboard for TVET students
  if (user.role === 'TVET_STUDENT') {
    return <TVETDashboard />;
  }

  // Show Working ADOF Dashboard for Working ADOF users
  if (user.role === 'WORKING_ADOF') {
    return <WorkingADOFDashboard />;
  }

  const stats = [
    {
      label: "Assessment Score",
      value: "85%",
      icon: BarChart3,
      color: "text-primary",
    },
    {
      label: "Career Matches",
      value: "12",
      icon: Target,
      color: "text-accent",
    },
    {
      label: "Skills Developed",
      value: "8",
      icon: Award,
      color: "text-success",
    },
    {
      label: "Progress Rate",
      value: "92%",
      icon: TrendingUp,
      color: "text-warning",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-muted-foreground">
              Here's your career development overview
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* User Info Card */}
        <Card className="p-6 mb-8 shadow-card">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
              <div className="flex items-center text-muted-foreground mb-2">
                <Mail className="w-4 h-4 mr-2" />
                {user.email}
              </div>
              {user.role && (
                <Badge variant="outline" className="capitalize">
                  {user.role.replace("_", " ").toLowerCase()}
                </Badge>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Member since</div>
              <div className="font-medium">
                <Calendar className="w-4 h-4 inline mr-1" />
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Take Personality Assessment
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Target className="w-4 h-4 mr-2" />
                View Career Recommendations
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Award className="w-4 h-4 mr-2" />
                Skills Development Plan
              </Button>
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-lg">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Completed personality assessment
                  </p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-lg">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Received career recommendations
                  </p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-lg">
                <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-success" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Skills assessment completed
                  </p>
                  <p className="text-xs text-muted-foreground">2 weeks ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
