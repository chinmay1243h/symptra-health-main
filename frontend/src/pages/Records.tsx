import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarCheck, FileText, Loader2, Mail, Phone, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext'; // Import useAuth
import { format } from 'date-fns'; // For formatting dates
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

const Records = () => {
  const { user, getToken, isLoading: authLoading } = useAuth(); // Get user, getToken, authLoading
  const [appointments, setAppointments] = useState<AppointmentRequest[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [medicalReports, setMedicalReports] = useState<any[]>([]); // Placeholder for medical reports
  const [loadingMedicalReports, setLoadingMedicalReports] = useState(false); // Placeholder loading state

  const fetchAppointments = async () => {
    if (!user) { // If not logged in, don't fetch
      setLoadingAppointments(false);
      return;
    }

    setLoadingAppointments(true);
    try {
      // No need for getToken() or Authorization header for httpOnly cookies
      const response = await fetch(`${API_BASE_URL}/requests/user`, { // This endpoint fetches requests for the current user
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // CRUCIAL: Browser sends httpOnly cookie automatically
      });

      if (!response.ok) {
        // If 401, it means the cookie wasn't sent or was invalid.
        // The backend will return success: false and a message.
        toast.error('Failed to load your appointments. Please log in again.');
        setLoadingAppointments(false);
        return;
      }

      const data = await response.json();

      if (data.success) {
        // Filter for both 'appointment_booking' and 'free_consultation' types
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
    // Only fetch appointments once user and token status is resolved
    // Added user.id to dependencies to trigger re-fetch if user object itself changes (e.g., after login)
    if (!authLoading && user) {
      fetchAppointments();
    } else if (!authLoading && !user) { // If auth finished loading and no user, stop loading appointments
        setLoadingAppointments(false);
    }
  }, [user, authLoading, user?.id]); // Re-fetch when user object (or its ID) or authLoading changes

  // Placeholder for fetching medical reports (future integration)
  const fetchMedicalReports = async () => {
    setLoadingMedicalReports(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMedicalReports([]); // No real data yet
    setLoadingMedicalReports(false);
  };

  useEffect(() => {
    // fetchMedicalReports(); // Uncomment when ready to integrate
  }, []);

  // Show loading indicator while authentication status is being determined
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <RefreshCcw className="h-8 w-8 animate-spin text-healthcare-primary" />
          <p className="mt-4 text-lg">Loading records...</p>
        </div>
      </div>
    );
  }

  // Redirect if not logged in
  if (!user && !authLoading) { // Only redirect if not loading and user is null
    toast.error('You must be logged in to view your records.');
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto pt-24 px-4 pb-12">
        <h1 className="text-3xl font-bold text-healthcare-dark mb-6">My Records</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          View your past appointments, medical reports, and health history.
        </p>

        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="appointments" className="flex items-center justify-center">
              <CalendarCheck className="h-4 w-4 mr-2" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="medical-reports" className="flex items-center justify-center">
              <FileText className="h-4 w-4 mr-2" />
              Medical Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>My Appointments</CardTitle>
                <CardDescription>Your upcoming and past appointment requests.</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingAppointments ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-healthcare-primary" />
                    <span className="ml-2">Loading appointments...</span>
                  </div>
                ) : appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appt) => (
                      <div key={appt._id} className="border rounded-lg p-4 shadow-sm">
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
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No appointment requests found.</p>
                    <p className="mt-2">Book your first appointment via the Dashboard!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medical-reports">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>My Medical Reports</CardTitle>
                <CardDescription>Your uploaded and analyzed medical reports.</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingMedicalReports ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-healthcare-primary" />
                    <span className="ml-2">Loading reports...</span>
                  </div>
                ) : medicalReports.length > 0 ? (
                  <div className="space-y-4">
                    {/* Render medical reports here */}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No medical reports found.</p>
                    <p className="mt-2">Upload your medical reports for analysis.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Records;