
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpCenter = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-healthcare-dark mb-8 text-center">Help Center</h1>
          
          <Card className="mb-10">
            <CardHeader>
              <CardTitle className="text-2xl text-healthcare-primary">Getting Started</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Welcome to the HealthAI Help Center! Here you'll find resources to help you navigate our platform
                and make the most of our services.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card className="bg-white hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-lg mb-2 text-healthcare-primary">Creating an Account</h3>
                    <p className="text-sm text-gray-600">Learn how to set up your HealthAI account and profile.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-lg mb-2 text-healthcare-primary">Using the Symptom Checker</h3>
                    <p className="text-sm text-gray-600">Understand how our AI-powered symptom analysis works.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-lg mb-2 text-healthcare-primary">Managing Health Records</h3>
                    <p className="text-sm text-gray-600">Learn how to securely store and access your health information.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-lg mb-2 text-healthcare-primary">Booking Appointments</h3>
                    <p className="text-sm text-gray-600">Step-by-step guide for scheduling consultations.</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-10">
            <CardHeader>
              <CardTitle className="text-2xl text-healthcare-primary">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-healthcare-dark font-medium">
                    How secure is my medical data?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Your health data is encrypted and stored securely in compliance with HIPAA regulations.
                    We implement industry-leading security measures and regular audits to ensure your information
                    remains protected at all times.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-healthcare-dark font-medium">
                    How accurate is the AI symptom checker?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Our AI symptom checker uses advanced machine learning algorithms trained on extensive medical
                    datasets. While it provides valuable insights, it's designed to supplement, not replace,
                    professional medical advice. Always consult with healthcare providers for diagnosis and treatment.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-healthcare-dark font-medium">
                    Can I share my health records with my doctor?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Yes, HealthAI allows you to securely share your health records with healthcare providers.
                    You control who has access to your information and for how long.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-healthcare-dark font-medium">
                    How do I cancel or reschedule an appointment?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    You can manage your appointments from the Patient Portal. Navigate to your upcoming appointments,
                    select the one you wish to modify, and choose to reschedule or cancel. Please note that
                    cancellations made less than 24 hours before the appointment may incur a fee.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-healthcare-primary">Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Card className="flex-1 bg-white hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-lg mb-2 text-healthcare-primary">Email Support</h3>
                    <p className="text-sm text-gray-600">support@healthai.com</p>
                    <p className="text-sm text-gray-600 mt-1">Response time: Within 24 hours</p>
                  </CardContent>
                </Card>
                
                <Card className="flex-1 bg-white hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-lg mb-2 text-healthcare-primary">Phone Support</h3>
                    <p className="text-sm text-gray-600">+1 (800) HEALTH-AI</p>
                    <p className="text-sm text-gray-600 mt-1">Available: Mon-Fri, 9AM-5PM ET</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;
