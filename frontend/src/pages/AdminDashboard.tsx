import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  Users, 
  Package, 
  FileText, 
  AlertTriangle,
  RefreshCcw
} from 'lucide-react';
import { toast } from 'sonner';
import AdminUsersList from '@/components/admin/AdminUsersList';
import AdminProductsList from '@/components/admin/AdminProductsList';
import AdminArticlesList from '@/components/admin/AdminArticlesList';
import AdminRequestsList from '@/components/admin/AdminRequestsList';
import { useAuth } from '@/context/AuthContext'; // Import useAuth

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading, logout } = useAuth(); // Get user, authLoading, and logout from AuthContext
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingContent, setLoadingContent] = useState(true); // Loading state for dashboard content

  useEffect(() => {
    // Check authentication status once AuthContext has finished loading
    if (!authLoading) {
      if (user && user.role === 'admin') {
        setIsAdmin(true);
        setLoadingContent(false); // Content can load now
        // Ensure adminSession is set if it's a valid admin login but session wasn't explicitly set
        if (!localStorage.getItem('adminSession')) {
          localStorage.setItem('adminSession', JSON.stringify({
            isAdmin: true,
            email: user.email,
            timestamp: new Date().getTime()
          }));
        }
      } else {
        // If not authenticated or not an admin, redirect to admin login
        toast.error('Admin login required or session expired.');
        // Clear any lingering adminSession or token if it's invalid
        localStorage.removeItem('adminSession');
        localStorage.removeItem('token'); // Clear main token too if not admin
        navigate('/admin/login', { replace: true }); // Use replace to prevent history stack issues
      }
    }
  }, [user, authLoading, navigate, logout]); // Rerun when user or authLoading changes, include logout in deps

  const handleLogout = () => {
    logout(); // Use AuthContext's logout
    localStorage.removeItem('adminSession'); // Also clear admin specific session
    toast.success('Admin logged out');
    navigate('/admin/login', { replace: true }); // Redirect to admin login after logout
  };

  // Show a global loading indicator while AuthContext is determining user status
  if (authLoading || loadingContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <RefreshCcw className="h-8 w-8 animate-spin text-healthcare-primary" />
          <p className="mt-4 text-lg">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // If not admin after loading, it means the useEffect already handled redirection
  if (!isAdmin) {
    return null; // Should ideally not be reached due to navigate in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Admin Dashboard | Symptra Health</title>
      </Helmet>
      
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-healthcare-primary mr-2" />
            <h1 className="text-xl font-bold">Symptra Health Admin</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="users" className="flex items-center justify-center">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center justify-center">
              <Package className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center justify-center">
              <FileText className="h-4 w-4 mr-2" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Requests
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <AdminUsersList />
          </TabsContent>
          
          <TabsContent value="products">
            <AdminProductsList />
          </TabsContent>
          
          <TabsContent value="articles">
            <AdminArticlesList />
          </TabsContent>
          
          <TabsContent value="requests">
            <AdminRequestsList />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
