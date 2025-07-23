
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FAQs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-healthcare-dark mb-8 text-center">Frequently Asked Questions</h1>
          
          <Tabs defaultValue="general" className="mb-8">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-healthcare-primary">General Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-healthcare-dark font-medium">
                        What is HealthAI?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        HealthAI is a comprehensive healthcare platform that combines artificial intelligence with medical expertise to provide personalized health assessments, symptom analysis, and healthcare recommendations. Our platform connects users with healthcare providers, helps them understand their symptoms, and supports their overall health journey.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-healthcare-dark font-medium">
                        How do I create an account?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        Creating an account is simple. Click on the "Sign Up" button in the navigation bar, fill in your personal information, create a secure password, and verify your email address. Once your account is verified, you can access all features of the HealthAI platform.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-healthcare-dark font-medium">
                        Is my health information secure?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        Yes, protecting your health information is our top priority. HealthAI is HIPAA compliant and uses advanced encryption technologies to secure your data. We implement strict access controls and regular security audits to ensure your information remains private and protected.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-healthcare-dark font-medium">
                        Can I use HealthAI on my mobile device?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        Yes, HealthAI is fully responsive and works on smartphones, tablets, and computers. Our platform is designed to provide a seamless experience across all devices, allowing you to access your health information anytime, anywhere.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-healthcare-dark font-medium">
                        How do I get help if I encounter issues?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        If you need assistance, you can visit our Help Center, contact our support team via email at support@healthai.com, or call our customer service line at +1 (800) HEALTH-AI. Our support team is available Monday through Friday, 9AM to 5PM ET.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-healthcare-primary">Services Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-healthcare-dark font-medium">
                        How accurate is the AI symptom checker?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        Our AI symptom checker uses advanced machine learning algorithms trained on extensive medical datasets. It provides insights based on reported symptoms and medical knowledge. While it's designed to be highly accurate, it's important to remember that it's a supplementary tool and not a replacement for professional medical diagnosis. Always consult with healthcare providers for definitive diagnoses and treatment plans.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-healthcare-dark font-medium">
                        How do I book an appointment with a healthcare provider?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        To book an appointment, navigate to the booking form on our homepage or click on "Find Hospitals" in the navigation menu. Select your preferred date, time, and healthcare provider or specialty. Fill in the required information and submit your request. You'll receive a confirmation email with your appointment details.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-healthcare-dark font-medium">
                        What types of mental health services do you offer?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        Our mental health services include AI-powered assessments, connections to licensed therapists and psychiatrists, personalized treatment plan recommendations, and resources for various mental health conditions. We offer support for anxiety, depression, stress management, and other mental health concerns through our platform.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-healthcare-dark font-medium">
                        Can I access my health records through HealthAI?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        Yes, HealthAI provides a secure Patient Portal where you can access and manage your health records. You can view your medical history, test results, medication lists, and appointment history. You can also securely share this information with healthcare providers as needed.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="technical">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-healthcare-primary">Technical Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-healthcare-dark font-medium">
                        What browsers are supported by HealthAI?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        HealthAI supports all modern browsers, including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of these browsers. Internet Explorer is not fully supported due to its limited capabilities with modern web technologies.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-healthcare-dark font-medium">
                        How do I reset my password?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        To reset your password, click on the "Sign In" button, then select "Forgot Password" below the login form. Enter the email address associated with your account, and we'll send you instructions to reset your password. For security reasons, the reset link is valid for 24 hours.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-healthcare-dark font-medium">
                        Can I integrate wearable devices with HealthAI?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        Yes, HealthAI supports integration with various health tracking devices and apps. You can connect your fitness trackers, smartwatches, and other health monitoring devices to sync your health data with our platform. This provides a more comprehensive view of your health status and helps our AI provide more personalized recommendations.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-healthcare-dark font-medium">
                        How can I export my health data?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        You can export your health data from the Patient Portal. Navigate to your health records, select the "Export" option, and choose your preferred format (PDF, CSV, or standard health data formats like HL7 or FHIR). This feature allows you to maintain copies of your health information and share it with healthcare providers outside our network if needed.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-healthcare-primary">Billing Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-healthcare-dark font-medium">
                        What payment methods are accepted?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        We accept major credit and debit cards (Visa, Mastercard, American Express, Discover), PayPal, and HSA/FSA cards for eligible services. Some services may also be covered by insurance, depending on your plan and coverage.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-healthcare-dark font-medium">
                        Is HealthAI covered by insurance?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        Some HealthAI services may be covered by insurance, particularly telehealth consultations with healthcare providers. Coverage varies by insurance provider and plan. We recommend checking with your insurance company regarding coverage for specific services. We can provide necessary documentation for insurance claims upon request.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-healthcare-dark font-medium">
                        How do I view my billing history?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        You can access your billing history through your account settings. Navigate to the "Billing" section where you'll find a detailed list of all transactions, invoices, and receipts. You can download or print these documents for your records or for insurance reimbursement purposes.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-healthcare-dark font-medium">
                        What is your refund policy?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        Our refund policy varies depending on the service. For subscription plans, you can cancel at any time, and we'll provide a prorated refund for unused periods. For one-time services like consultations, refunds may be available if the service wasn't provided or if there were technical issues. Please contact our support team within 14 days of the charge for refund requests.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-healthcare-primary">Didn't Find Your Answer?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">
                If you couldn't find the information you're looking for, our support team is ready to help. Contact us through one of the following methods:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-lg mb-2 text-healthcare-primary">Email Support</h3>
                    <p className="text-sm text-gray-600">support@healthai.com</p>
                    <p className="text-sm text-gray-500 mt-1">Response within 24 hours</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-lg mb-2 text-healthcare-primary">Phone Support</h3>
                    <p className="text-sm text-gray-600">+1 (800) HEALTH-AI</p>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9AM-5PM ET</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-lg mb-2 text-healthcare-primary">Live Chat</h3>
                    <p className="text-sm text-gray-600">Available on website</p>
                    <p className="text-sm text-gray-500 mt-1">7 days a week, 8AM-8PM ET</p>
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

export default FAQs;
