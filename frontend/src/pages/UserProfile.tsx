
import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import UserDashboard from '@/components/dashboard/UserDashboard';

const UserProfile = () => {
  const { user, isLoading } = useAuth();

  // Redirect to login if not authenticated
  if (!isLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Helmet>
        <title>Your Profile | HealthAI</title>
        <meta name="description" content="View and manage your HealthAI profile and health information." />
      </Helmet>
      
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-bold text-healthcare-dark mb-8">Your Profile</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-healthcare-primary"></div>
          </div>
        ) : (
          <UserDashboard />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
