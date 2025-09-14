import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Mail, 
  Calendar, 
  LogOut, 
  Settings,
  Target,
  Users,
  Gift,
  Wallet
} from "lucide-react";

export default function TVETDashboard() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-6">
            Please log in to access your dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-slate-800/50 backdrop-blur-sm border-r border-purple-500/20">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              FitFind
            </span>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-4">
              START HERE
            </div>
            
            <Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              <Target className="w-4 h-4 mr-3" />
              Dashboard
            </Button>
            
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-purple-500/20">
              <Users className="w-4 h-4 mr-3" />
              Personality Test Assessment
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Hi, {user.name}</h1>
            <p className="text-purple-300">Welcome to FitFind</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 backdrop-blur-sm">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
                  <p className="text-purple-200 mb-4">{user.email}</p>
                  <div className="flex space-x-3">
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      Upgrade Plan
                    </Button>
                    <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20">
                      Cancel Plan
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Usage Stats */}
          <div className="space-y-6">
            {/* Your Usage */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Your Usage</h3>
              <Card className="p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 backdrop-blur-sm">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-purple-200 mb-2">
                      <span>Remaining AI Words</span>
                      <span>0/100000</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-purple-200 mb-2">
                      <span>Remaining AI Chats</span>
                      <span>0/500</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-purple-200 mb-2">
                      <span>Remaining Image Prompts</span>
                      <span>0/0</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-purple-200 mb-2">
                      <span>Remaining Voice Counts</span>
                      <span>0/100</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Refer a Friend */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Refer a Friend</h3>
              <Card className="p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 backdrop-blur-sm">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Earn 15%</h4>
                  <p className="text-purple-200 mb-4">Recurring Commission Forever</p>
                  <p className="text-sm text-purple-300 mb-6">
                    Earn 15% recurring (that's forever) commission for referring friends to FitFind.
                  </p>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    Refer Now
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Button */}
      <div className="fixed bottom-6 right-6">
        <Button size="lg" className="w-14 h-14 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white">
          ♿
        </Button>
      </div>
    </div>
  );
}
