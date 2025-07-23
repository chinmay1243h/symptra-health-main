
import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MedicalReportAnalyzer from '@/components/diagnosis/MedicalReportAnalyzer';
import { FileText, Stethoscope, Microscope, Clipboard, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Diagnosis = () => {
  const scrollToAnalyzer = () => {
    const analyzerElement = document.getElementById('medical-report-analyzer');
    if (analyzerElement) {
      analyzerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Helmet>
        <title>Medical Reports & Diagnosis | HealthAI</title>
        <meta name="description" content="Upload your medical reports for AI-powered analysis and detailed diagnosis recommendations." />
      </Helmet>
      
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-healthcare-dark mb-4">
            Medical Reports & Diagnosis
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Upload your medical reports and receive detailed AI analysis to help understand
            your health status and potential areas of concern.
          </p>
          <Button 
            onClick={scrollToAnalyzer} 
            className="bg-healthcare-primary hover:bg-healthcare-primary/90 group"
            size="lg"
          >
            Analyze Your Medical Report Now
            <ChevronDown className="ml-1 h-4 w-4 animate-bounce opacity-70" />
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <FileText className="h-10 w-10 text-healthcare-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
            <p className="text-gray-600">
              Upload medical reports in various formats including PDFs, text documents, and scanned images.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <Microscope className="h-10 w-10 text-healthcare-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Detailed Analysis</h3>
            <p className="text-gray-600">
              Receive comprehensive analysis of medical terms, potential concerns, and recommended next steps.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <Clipboard className="h-10 w-10 text-healthcare-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Private & Secure</h3>
            <p className="text-gray-600">
              Your medical data is processed securely and never stored on our servers.
            </p>
          </div>
        </div>
        
        <div className="mt-16" id="medical-report-analyzer">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-healthcare-dark mb-4">
              AI-Powered Medical Report Analysis
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our advanced AI system can analyze your medical reports and provide insights to help you better understand your health status.
            </p>
          </div>
          
          <MedicalReportAnalyzer />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Diagnosis;
