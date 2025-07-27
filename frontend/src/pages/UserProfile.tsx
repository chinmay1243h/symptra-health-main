import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User as UserIcon, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext'; // Import useAuth
import { Navigate } from 'react-router-dom'; // Import Navigate

// Define the base URL for your backend API
const API_BASE_URL = 'http://localhost:5000/api';

type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
};

const UserProfile = () => {
  const { user, getToken, isLoading: authLoading } = useAuth();
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      // No need to check getToken() here as it returns null for httpOnly cookies
      // The `user` object from AuthContext will be null if not logged in.
      if (!user) { // Only proceed if user object exists from AuthContext
        setLoadingProfile(false);
        return;
      }

      setLoadingProfile(true);
      try {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // THIS IS CRUCIAL FOR HTTPONLY COOKIES
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setProfileData({
            id: data.data._id,
            name: data.data.name,
            email: data.data.email,
            role: data.data.role,
            phone: data.data.phone || '',
            address: data.data.address || '',
          });
        } else {
          toast.error(data.message || 'Failed to load user profile.');
          // If 401, AuthContext should handle clearing user, but ensure local state is cleared too
          setProfileData(null); 
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to load user profile.');
        setProfileData(null); // Clear profile data on error
      } finally {
        setLoadingProfile(false);
      }
    };

    // Only fetch profile once AuthContext has finished loading and a user is present
    if (!authLoading && user) {
      fetchUserProfile();
    } else if (!authLoading && !user) { // If AuthContext finished loading and no user, stop loading profile
        setLoadingProfile(false);
    }
  }, [user, authLoading]); // Re-fetch when user or authLoading changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfileData(prev => prev ? { ...prev, [id]: value } : null);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData) return;

    setIsSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // THIS IS CRUCIAL FOR HTTPONLY COOKIES
        body: JSON.stringify({
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          address: profileData.address,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Profile updated successfully!');
        // No need to explicitly update user in AuthContext here,
        // as AuthContext's fetchUserProfile on next load will get latest.
      } else {
        toast.error(data.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('An error occurred while saving profile.');
    } finally {
      setIsSaving(false);
    }
  };

  // Show loading indicator while authentication status is being determined or profile is loading
  if (authLoading || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-healthcare-primary" />
          <p className="mt-4 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Redirect if not logged in
  // This check relies on AuthContext's `user` state
  if (!user && !authLoading) { // Only redirect if not loading and user is null
    toast.error('You must be logged in to view your profile.');
    return <Navigate to="/login" replace />;
  }

  // If user is logged in but profileData is null (e.g., fetch failed)
  if (user && !profileData) { // Only show this if user is logged in but profile data couldn't be fetched
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-gray-600">
        <p>Could not load profile. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto pt-24 px-4 pb-12">
        <h1 className="text-3xl font-bold text-healthcare-dark mb-6">My Profile</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Manage your personal information and account settings.
        </p>

        <Card className="w-full max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-center mb-2">
              <UserIcon className="h-10 w-10 text-healthcare-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Personal Information</CardTitle>
            <CardDescription className="text-center">
              Update your details below.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSaveProfile}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  readOnly
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profileData.phone || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., +1234567890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={profileData.address || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., 123 Health St, Medical City"
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input
                  value={profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1)}
                  readOnly
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
            </CardContent>
            <CardContent>
              <Button 
                type="submit" 
                className="w-full bg-healthcare-primary hover:bg-healthcare-primary/90"
                disabled={isSaving}
              >
                {isSaving ? (
                  <span className="flex items-center justify-center">
                    <span className="mr-2">Saving</span>
                    <span className="animate-spin">•</span>
                  </span>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </>
                )}
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;