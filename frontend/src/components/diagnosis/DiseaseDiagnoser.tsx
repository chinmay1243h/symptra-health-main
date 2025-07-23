import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, Upload, AlertTriangle, Check, AlertCircle, Loader2, Activity, Heart } from 'lucide-react';
import { diagnoseDiseases } from '@/services/openaiService';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const DiseaseDiagnoser: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState<number | undefined>(undefined);
  const [gender, setGender] = useState<string>('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [possibleConditions, setPossibleConditions] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSymptomsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSymptoms(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : undefined;
    setAge(value);
  };

  const handleMedicalHistoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMedicalHistory(e.target.value);
  };

  const handleDiagnose = async () => {
    setIsLoading(true);
    setDiagnosis('');
    setPossibleConditions([]);
    setRecommendations('');
    setConfidence(0);
    setError(null);
    
    try {
      if (!symptoms || symptoms.trim().length < 5) {
        throw new Error('Please provide a more detailed description of your symptoms');
      }
      
      const result = await diagnoseDiseases({
        symptoms,
        patientInfo: {
          age,
          gender,
          medicalHistory
        }
      });
      
      if (result.success) {
        setDiagnosis(result.diagnosis);
        setPossibleConditions(result.possibleConditions);
        setRecommendations(result.recommendations);
        setConfidence(result.confidence);
        toast.success('Diagnosis completed successfully');
      } else {
        setError(result.error || 'Diagnosis failed');
        throw new Error(result.error || 'Diagnosis failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to diagnose');
      setError(error.message || 'An unknown error occurred');
      console.error('Diagnosis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Currently we're displaying mock results since the actual Edge Function will be implemented by the user
  const showDummyResults = () => {
    // Simulating an API call to keep the UX consistent
    setIsLoading(true);
    setDiagnosis('');
    setPossibleConditions([]);
    setRecommendations('');
    setConfidence(0);
    setError(null);

    setTimeout(() => {
      setDiagnosis("Based on the symptoms provided, this could indicate an upper respiratory infection.");
      setPossibleConditions([
        "Common Cold",
        "Seasonal Allergies",
        "Sinusitis",
        "Mild Bronchitis"
      ]);
      setRecommendations("Rest, stay hydrated, and consider over-the-counter medications for symptom relief. If symptoms persist for more than 7 days or worsen, please consult with a healthcare provider.");
      setConfidence(0.85);
      setIsLoading(false);
      toast.success('Diagnosis completed successfully (demo mode)');
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-lg border-healthcare-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl text-healthcare-primary">AI Disease Diagnosis</CardTitle>
          <CardDescription>
            Describe your symptoms in detail to get an AI-powered preliminary diagnosis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-amber-50 border-amber-200 text-amber-800">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Important Medical Disclaimer</AlertTitle>
            <AlertDescription>
              This AI diagnosis is for informational purposes only and does not replace professional medical advice, 
              diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider 
              with any questions you may have regarding a medical condition.
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="symptoms" className="text-base font-medium">
                Describe your symptoms in detail
              </Label>
              <Textarea
                id="symptoms"
                placeholder="Describe your symptoms in detail. For example: I've had a persistent cough for the past 3 days, along with a mild fever of around 100°F. I'm also experiencing fatigue and a sore throat..."
                className="min-h-[150px] resize-y mt-2"
                value={symptoms}
                onChange={handleSymptomsChange}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm"
              >
                {showAdvanced ? 'Hide' : 'Show'} Advanced Options
              </Button>
            </div>

            {showAdvanced && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age" className="text-base font-medium">
                      Age
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      className="mt-2"
                      value={age || ''}
                      onChange={handleAgeChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender" className="text-base font-medium">
                      Gender
                    </Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger id="gender" className="mt-2">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="medical-history" className="text-base font-medium">
                    Medical History
                  </Label>
                  <Textarea
                    id="medical-history"
                    placeholder="Include any relevant medical history, allergies, or current medications..."
                    className="resize-y mt-2"
                    value={medicalHistory}
                    onChange={handleMedicalHistoryChange}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={showDummyResults} // This will be changed to handleDiagnose when the Edge Function is ready
            disabled={isLoading || !symptoms}
            className="w-full bg-healthcare-primary hover:bg-healthcare-primary/90"
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                <span>Analyzing Symptoms</span>
              </span>
            ) : (
              <>Diagnose My Symptoms</>
            )}
          </Button>
        </CardFooter>
      </Card>

      {diagnosis && (
        <Card className="mt-8 shadow-lg border-healthcare-primary/20">
          <CardHeader>
            <CardTitle className="text-xl text-healthcare-primary">Diagnosis Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center">
                <Activity className="h-5 w-5 mr-2 text-healthcare-primary" />
                Preliminary Assessment
              </h3>
              <p className="mt-2 text-gray-700">{diagnosis}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Possible Conditions</h3>
              <ul className="mt-2 space-y-1">
                {possibleConditions.map((condition, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold flex items-center">
                <Heart className="h-5 w-5 mr-2 text-healthcare-primary" />
                Recommendations
              </h3>
              <p className="mt-2 text-gray-700">{recommendations}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">AI Confidence Level</span>
                <span className="text-sm font-medium">{(confidence * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-healthcare-primary h-2.5 rounded-full" 
                  style={{ width: `${confidence * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This confidence score indicates the AI's certainty in its assessment based on the provided information.
                A higher score means the AI is more confident in its diagnosis.
              </p>
            </div>

            <Alert className="bg-blue-50 border-blue-200 text-blue-800">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Next Steps</AlertTitle>
              <AlertDescription>
                Remember, this is not a medical diagnosis. Please consult with a healthcare professional for proper evaluation and treatment.
                {age && age > 60 && " Given your age, it's especially important to seek professional medical advice."}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DiseaseDiagnoser;
