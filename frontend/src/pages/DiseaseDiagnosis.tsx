
import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DiseaseDiagnoser from '@/components/diagnosis/DiseaseDiagnoser';
import { Activity, Stethoscope, Brain, AlertTriangle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DiseaseDiagnosis = () => {
  const scrollToDiagnoser = () => {
    const diagnoserElement = document.getElementById('disease-diagnoser');
    if (diagnoserElement) {
      diagnoserElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Helmet>
        <title>AI Disease Diagnosis | HealthAI</title>
        <meta name="description" content="Get a preliminary assessment of your symptoms using our advanced AI disease diagnosis tool. Remember to consult with healthcare professionals for proper medical advice." />
      </Helmet>
      
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-healthcare-dark mb-4">
            AI Disease Diagnosis
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Describe your symptoms in detail to receive a preliminary assessment and possible conditions
            to discuss with your healthcare provider.
          </p>
          <Button 
            onClick={scrollToDiagnoser} 
            className="bg-healthcare-primary hover:bg-healthcare-primary/90 group"
            size="lg"
          >
            Start Diagnosis Now
            <ChevronDown className="ml-1 h-4 w-4 animate-bounce opacity-70" />
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <Activity className="h-10 w-10 text-healthcare-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Intelligent Analysis</h3>
            <p className="text-gray-600">
              Our AI analyzes your symptoms against a vast database of medical conditions to provide preliminary insights.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <Brain className="h-10 w-10 text-healthcare-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Machine Learning</h3>
            <p className="text-gray-600">
              Advanced machine learning algorithms continually improve diagnostic capabilities and accuracy.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <AlertTriangle className="h-10 w-10 text-healthcare-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Not a Replacement</h3>
            <p className="text-gray-600">
              Our AI provides information only. Always consult with qualified healthcare professionals for diagnosis and treatment.
            </p>
          </div>
        </div>
        
        <div className="mt-16" id="disease-diagnoser">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-healthcare-dark mb-4">
              Describe Your Symptoms
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Provide detailed information about what you're experiencing for the most accurate assessment.
              The more specific you are, the better insights our AI can provide.
            </p>
          </div>
          
          <DiseaseDiagnoser />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DiseaseDiagnosis;
