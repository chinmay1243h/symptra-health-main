import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarCheck, User as UserIcon, Clock, Mail, Phone, Loader2, RefreshCcw, Link } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import AppointmentForm from './AppointmentForm'; // Assuming this is the form to book new appointments
import { format } from 'date-fns'; // For date formatting
import { Navigate } from 'react-router-dom'; // For redirection if not logged in

// Define the base URL for your backend API
const API_BASE_URL = 'http://localhost:5000/api';

// Type definition for an appointment request from the backend
type AppointmentRequest = {
  _id: string;
  type: 'appointment_booking' | 'free_consultation'; // Include free_consultation type
  status: 'pending' | 'approved' | 'rejected';
  data: {
    patientName?: string; // Optional for free_consultation
    fullName?: string; // For free_consultation
    patientEmail?: string; // Optional for free_consultation
    email?: string; // For free_consultation
    patientPhone?: string; // Optional for free_consultation
    phoneNumber?: string; // For free_consultation
    appointmentDate: string; // ISO string from backend
    appointmentTime: string;
    reasonForVisit?: string; // For appointment_booking
    service?: string; // For free_consultation
  };
  submittedBy: string; // User ID
  createdAt: string;
  updatedAt: string;
};

const UserDashboard = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentRequest[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  const fetchUserAppointments = async () => {
    if (!user) {
      setLoadingAppointments(false);
      return;
    }

    setLoadingAppointments(true);
    try {
      const response = await fetch(`${API_BASE_URL}/requests/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Crucial for httpOnly cookies
      });

      if (!response.ok) {
        toast.error('Failed to load your appointments. Please log in again.');
        setLoadingAppointments(false);
        return;
      }

      const data = await response.json();

      if (data.success) {
        // Filter for both appointment_booking and free_consultation types
        const userAppointments = data.data.filter(
          (req: any) => req.type === 'appointment_booking' || req.type === 'free_consultation'
        );
        // Sort by date, newest first
        userAppointments.sort((a: AppointmentRequest, b: AppointmentRequest) => 
          new Date(b.data.appointmentDate).getTime() - new Date(a.data.appointmentDate).getTime()
        );
        setAppointments(userAppointments);
      } else {
        toast.error(data.message || 'Failed to load appointments.');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments.');
    } finally {
      setLoadingAppointments(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) { // Fetch appointments once user is loaded
      fetchUserAppointments();
    }
  }, [user, authLoading]); // Dependency array to re-run when user or authLoading changes

  // Show loading indicator while authentication status is being determined
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <RefreshCcw className="h-8 w-8 animate-spin text-healthcare-primary" />
          <p className="mt-4 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    toast.error('You must be logged in to view your dashboard.');
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Navigation is usually a global component, not part of individual page content */}
      {/* <Navigation /> */} 
      <div className="container mx-auto pt-24 px-4 pb-12">
        <h1 className="text-3xl font-bold text-healthcare-dark mb-6">Welcome, {user.name}!</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Your personalized health dashboard. Manage your appointments and access quick tools.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <Card className="lg:col-span-1 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-healthcare-primary" />
                My Info
              </CardTitle>
              <CardDescription>Quick overview of your profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
              <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-700"><strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/profile">Edit Profile</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Book Appointment Form */}
          <div className="lg:col-span-2">
            <AppointmentForm />
          </div>
        </div>

        {/* Recent Appointments Section */}
        <section className="mt-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarCheck className="h-5 w-5 mr-2 text-healthcare-primary" />
                My Recent Appointments
              </CardTitle>
              <CardDescription>A summary of your latest appointment requests.</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingAppointments ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-healthcare-primary" />
                  <span className="ml-2">Loading appointments...</span>
                </div>
              ) : appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.slice(0, 3).map((appt) => ( // Show up to 3 recent appointments
                    <div key={appt._id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg">
                          {appt.type === 'appointment_booking' ? appt.data.reasonForVisit : `Free Consultation: ${appt.data.service}`}
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          appt.status === 'approved' ? 'bg-green-100 text-green-800' :
                          appt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">
                        <CalendarCheck className="inline-block h-4 w-4 mr-1 align-text-bottom" />
                        Date: {format(new Date(appt.data.appointmentDate), 'PPP')} at {appt.data.appointmentTime}
                      </p>
                      <p className="text-gray-600 text-sm mb-1">
                        <Phone className="inline-block h-4 w-4 mr-1 align-text-bottom" />
                        Contact: {appt.type === 'appointment_booking' ? appt.data.patientPhone : appt.data.phoneNumber}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <Mail className="inline-block h-4 w-4 mr-1 align-text-bottom" />
                        Email: {appt.type === 'appointment_booking' ? appt.data.patientEmail : appt.data.email}
                      </p>
                      <p className="text-gray-500 text-xs mt-2">
                        Submitted on: {format(new Date(appt.createdAt), 'PPpp')}
                      </p>
                    </div>
                  ))}
                  {appointments.length > 3 && (
                    <div className="text-center mt-4">
                      <Button asChild variant="outline">
                        <Link to="/records">View All Appointments</Link>
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No recent appointments found.</p>
                  <p className="mt-2">Book your first appointment above!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Other sections can go here, e.g., quick links to AI tools, etc. */}
      </div>
    </div>
  );
};

export default UserDashboard;