
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { BarChart, Calendar, Users, Activity, TrendingUp, AlertCircle } from "lucide-react";
import AppointmentForm from "@/components/dashboard/AppointmentForm";

const Dashboard = () => {
  // Mock data for charts and stats
  const healthStats = [
    { title: "Heart Rate", value: "72 bpm", change: "+2%", icon: Activity },
    { title: "Blood Pressure", value: "120/80", change: "-5%", icon: TrendingUp },
    { title: "Sleep", value: "7.2 hrs", change: "+8%", icon: AlertCircle },
    { title: "Steps", value: "8,942", change: "+12%", icon: Users },
  ];

  const upcomingAppointments = [
    { title: "Dr. Sarah Johnson", type: "Cardiology", date: "Tomorrow, 10:00 AM" },
    { title: "Dr. Michael Chen", type: "General Checkup", date: "Oct 15, 2:30 PM" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto pt-24 px-4 pb-12">
        <h1 className="text-3xl font-bold text-healthcare-dark mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {healthStats.map((stat) => (
            <Card key={stat.title} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-healthcare-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} from last week
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Health Trends</CardTitle>
                <BarChart className="h-4 w-4 text-healthcare-primary" />
              </div>
              <CardDescription>Your health metrics over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
              <p className="text-gray-500">Health metrics visualization would go here</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-healthcare-primary" />
              </div>
              <CardDescription>Your scheduled medical appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <h3 className="font-medium">{appointment.title}</h3>
                      <p className="text-sm text-gray-500">{appointment.type}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-healthcare-primary">{appointment.date}</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">
                  View All Appointments
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Appointment Booking Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-healthcare-dark mb-6">Schedule an Appointment</h2>
          <AppointmentForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
