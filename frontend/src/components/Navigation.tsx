import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, User, LogOut, ShieldCheck } from "lucide-react"; // Import ShieldCheck
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth(); // Get user and logout from AuthContext

  const links = [
    { name: "Home", href: "/" },
    { name: "Diagnosis", href: "/diagnosis" },
    { name: "Mental Health", href: "/mental-health" },
    { name: "Hospitals", href: "/hospitals" },
    { name: "Records", href: "/records" },
    { name: "AI Assistant", href: "/ai-assistant" },
    { name: "Help Center", href: "/help-center" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Is this a page that shouldn't show the navigation?
  const isFullscreenPage = false; // Add paths if needed

  if (isFullscreenPage) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-healthcare-primary flex items-center"
            >
              HealthAI
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-2 py-1 rounded-md text-sm font-medium ${
                  location.pathname === link.href
                    ? "text-healthcare-primary"
                    : "text-gray-600 hover:text-healthcare-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-healthcare-primary text-healthcare-primary hover:text-healthcare-primary/90"
                  >
                    <User className="h-4 w-4" />
                    <span>{user.name || 'My Account'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/records">My Records</Link>
                  </DropdownMenuItem>
                  {user.role === 'admin' && ( // Show Admin Dashboard link only if user is admin
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard" className="text-blue-600">
                          <ShieldCheck className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
                {/* Always show Admin Login link, AdminDashboard will handle redirection */}
                <Button variant="ghost" asChild>
                  <Link to="/admin/login">Admin</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-healthcare-primary focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.href
                    ? "text-healthcare-primary bg-healthcare-primary/10"
                    : "text-gray-600 hover:text-healthcare-primary hover:bg-healthcare-primary/5"
                }`}
                onClick={toggleMobileMenu}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-healthcare-primary hover:bg-healthcare-primary/5"
                    onClick={toggleMobileMenu}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/records"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-healthcare-primary hover:bg-healthcare-primary/5"
                    onClick={toggleMobileMenu}
                  >
                    My Records
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      onClick={toggleMobileMenu}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      toggleMobileMenu();
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-healthcare-primary hover:bg-healthcare-primary/5"
                    onClick={toggleMobileMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium text-healthcare-primary hover:text-healthcare-primary/90 hover:bg-healthcare-primary/5"
                    onClick={toggleMobileMenu}
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/admin/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-healthcare-primary hover:bg-healthcare-primary/5"
                    onClick={toggleMobileMenu}
                  >
                    Admin
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;