
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, Upload, AlertTriangle, Check, AlertCircle, Loader2 } from 'lucide-react';
import { analyzeMedicalReport, extractTextFromFile } from '@/services/openaiService';
import { toast } from 'sonner';

const MedicalReportAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [reportText, setReportText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File is too large. Maximum size is 5MB.');
        return;
      }
      
      toast.info(`File selected: ${selectedFile.name}`);
      
      try {
        // Extract text from file
        setIsExtracting(true);
        const extractedText = await extractTextFromFile(selectedFile);
        setReportText(extractedText);
        setIsExtracting(false);
        toast.success('Text extracted from file successfully.');
      } catch (error: any) {
        setIsExtracting(false);
        toast.error(error.message || 'Failed to extract text from file');
      }
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReportText(e.target.value);
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    setAnalysis('');
    setError(null);
    
    try {
      let contentToAnalyze = reportText;
      
      if (!contentToAnalyze || contentToAnalyze.trim().length < 10) {
        throw new Error('Report content is too short or empty');
      }
      
      const result = await analyzeMedicalReport({
        content: contentToAnalyze
      });
      
      if (result.success) {
        setAnalysis(result.analysis);
        toast.success('Medical report analyzed successfully');
      } else {
        setError(result.error || 'Analysis failed');
        throw new Error(result.error || 'Analysis failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to analyze report');
      setError(error.message || 'An unknown error occurred');
      console.error('Analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const acceptedFileTypes = ".txt,.pdf,.docx,.doc";

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-lg border-healthcare-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl text-healthcare-primary">Medical Report Analysis</CardTitle>
          <CardDescription>
            Upload a medical report or enter its text to get a DeepSeek AI-powered analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-amber-50 border-amber-200 text-amber-800">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Important Notice</AlertTitle>
            <AlertDescription>
              This analysis is not a medical diagnosis and should not replace professional medical advice.
              Always consult with your healthcare provider regarding medical conditions and treatment.
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload File
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Enter Text
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-4 space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <Input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept={acceptedFileTypes}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center justify-center text-gray-500"
                >
                  <Upload className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">
                    {file ? file.name : 'Click to upload medical report file'}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    Supports TXT, PDF, DOC, DOCX (max 5MB)
                  </p>
                </label>
                {file && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-sm text-green-600">
                    <Check className="h-4 w-4" />
                    <span>{file.name} selected</span>
                  </div>
                )}
                {isExtracting && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-sm text-blue-600">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Extracting text from file...</span>
                  </div>
                )}
              </div>
              
              {reportText && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Extracted Text:</h3>
                  <div className="bg-gray-50 p-3 rounded-md text-sm max-h-64 overflow-y-auto">
                    {reportText}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="text" className="mt-4">
              <Textarea
                placeholder="Paste your medical report text here..."
                className="min-h-[200px] resize-y"
                value={reportText}
                onChange={handleTextChange}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleAnalyze}
            disabled={isLoading || isExtracting || !reportText}
            className="w-full bg-healthcare-primary hover:bg-healthcare-primary/90"
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                <span>Analyzing</span>
              </span>
            ) : (
              <>Analyze Medical Report</>
            )}
          </Button>
        </CardFooter>
      </Card>

      {analysis && (
        <Card className="mt-8 shadow-lg border-healthcare-primary/20">
          <CardHeader>
            <CardTitle className="text-xl text-healthcare-primary">Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              {analysis.split('\n').map((paragraph, index) => (
                paragraph.trim() ? (
                  <p key={index} className="mb-4 whitespace-pre-line">{paragraph}</p>
                ) : (
                  <br key={index} />
                )
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MedicalReportAnalyzer;
