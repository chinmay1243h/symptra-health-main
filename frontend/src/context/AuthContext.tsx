import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Define the base URL for your backend API
const API_BASE_URL = 'http://localhost:5000/api';

// Basic user type (matching your backend's user model)
type User = {
  id: string;
  email: string;
  name: string;
  role: string; // Add role to the user type
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>; // Returns true on success, false on failure
  signup: (name: string, email: string, password: string) => Promise<boolean>; // Returns true on success, false on failure
  logout: () => void;
  getToken: () => string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Still used for logout redirect

  const getToken = () => localStorage.getItem('token');

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        localStorage.removeItem('token');
        throw new Error('Failed to fetch user profile or token expired');
      }

      const data = await response.json();
      if (data.success) {
        // Ensure the user object has a role, default to 'user' if missing
        const fetchedUser: User = { ...data.data, role: data.data.role || 'user' };
        setUser(fetchedUser);
        return fetchedUser;
      } else {
        localStorage.removeItem('token');
        throw new Error(data.message || 'Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      localStorage.removeItem('token');
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      const token = getToken();
      if (token) {
        await fetchUserProfile(token);
      }
      if (isMounted) {
        setIsLoading(false);
      }
    };
    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        // Ensure the user object has a role, default to 'user' if missing
        const loggedInUser: User = { ...data.user, role: data.user.role || 'user' };
        setUser(loggedInUser);
        toast.success('Successfully logged in');
        return true;
      } else {
        toast.error(data.message || 'Login failed');
        return false;
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to log in');
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        // Ensure the user object has a role, default to 'user' if missing
        const registeredUser: User = { ...data.user, role: data.user.role || 'user' };
        setUser(registeredUser);
        toast.success('Account created successfully');
        return true;
      } else {
        toast.error(data.message || 'Failed to create account');
        return false;
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('adminSession'); // Also clear admin session if it exists
    toast.info('You have been logged out');
    navigate('/'); // Logout still navigates to home
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

