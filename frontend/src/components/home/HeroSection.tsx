
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, LogIn, UserPlus, CalendarCheck, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const HeroSection = () => {
  const { user } = useAuth();

  const scrollToBookingForm = () => {
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If booking form is not on this page, navigate to the homepage
      window.location.href = '/#booking';
    }
  };

  return (
    <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-8 animate-fade-up">
          <div className="inline-flex items-center bg-healthcare-primary/10 text-healthcare-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <ShieldCheck className="h-4 w-4 mr-1.5" />
            <span>HIPAA Compliant & Secure</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-healthcare-dark tracking-tight leading-tight">
            Your Health, <span className="text-healthcare-primary">Simplified</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Experience the future of healthcare with our AI-powered platform. Get instant health insights, connect with local hospitals, and manage your health journey all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-healthcare-primary hover:bg-healthcare-primary/90 shadow-lg">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/signup">
                  <Button size="lg" className="bg-healthcare-primary hover:bg-healthcare-primary/90 shadow-lg">
                    Sign Up Free
                    <UserPlus className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-healthcare-primary text-healthcare-primary hover:bg-healthcare-primary/10"
                  onClick={scrollToBookingForm}
                >
                  Book a Consultation
                  <CalendarCheck className="ml-2 h-5 w-5" />
                </Button>
              </>
            )}
          </div>
          
          <div className="pt-6 flex flex-col items-center">
            <p className="text-sm text-gray-500 mb-3">Trusted by healthcare providers nationwide</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Dr. Michael Chen" className="h-12 w-12 rounded-full border-2 border-healthcare-primary" />
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium">4.9/5 from 2,300+ reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
