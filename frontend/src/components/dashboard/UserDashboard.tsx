
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  User, 
  FileText, 
  Brain, 
  Hospital, 
  Calendar, 
  Activity, 
  Heart,
  ChevronRight,
  Settings
} from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();

  // Mock data for recent activities
  const recentActivities = [
    { type: 'Medical Report', date: 'Today, 10:30 AM', description: 'Uploaded blood test results' },
    { type: 'Appointment', date: 'Yesterday', description: 'Scheduled appointment with Dr. Johnson' },
    { type: 'Mental Health', date: '3 days ago', description: 'Completed mental health assessment' }
  ];

  // Quick links for user actions
  const quickLinks = [
    { name: 'Medical Reports', icon: FileText, path: '/diagnosis', description: 'Upload and analyze medical reports' },
    { name: 'Mental Health', icon: Brain, path: '/mental-health', description: 'Access mental health resources' },
    { name: 'Find Hospitals', icon: Hospital, path: '/hospitals', description: 'Locate nearby healthcare facilities' },
    { name: 'Health Records', icon: Calendar, path: '/records', description: 'View and manage your health records' }
  ];

  const healthStatistics = [
    { label: 'Reports Analyzed', value: 3, icon: Activity },
    { label: 'Appointments', value: 2, icon: Calendar },
    { label: 'Health Score', value: '85%', icon: Heart }
  ];

  return (
    <div className="space-y-6">
      {/* User greeting */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-healthcare-primary/10 p-3 rounded-full">
              <User className="h-8 w-8 text-healthcare-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Welcome, {user?.name || 'User'}</h2>
              <p className="text-gray-500">Your personal health dashboard</p>
            </div>
            <div className="ml-auto">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {healthStatistics.map((stat, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="bg-healthcare-primary/10 p-2 rounded-full">
                <stat.icon className="h-5 w-5 text-healthcare-primary" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Access key features of HealthAI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickLinks.map((link, index) => (
              <Link key={index} to={link.path}>
                <Card className="hover:bg-gray-50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <div className="bg-healthcare-primary/10 p-2 rounded-full">
                      <link.icon className="h-5 w-5 text-healthcare-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{link.name}</h3>
                      <p className="text-sm text-gray-500">{link.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent activity */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest health-related activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 pb-3 border-b last:border-0 last:pb-0">
                <div className="bg-gray-100 p-2 rounded-full mt-1">
                  {activity.type === 'Medical Report' && <FileText className="h-4 w-4 text-blue-500" />}
                  {activity.type === 'Appointment' && <Calendar className="h-4 w-4 text-green-500" />}
                  {activity.type === 'Mental Health' && <Brain className="h-4 w-4 text-purple-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{activity.type}</h4>
                    <span className="text-xs text-gray-500">{activity.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
