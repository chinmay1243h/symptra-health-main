
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, CheckCircle2, ClipboardCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Treatment assessment questions
const treatmentQuestions = [
  {
    id: 1,
    text: "How well is your current treatment addressing your primary mental health concerns?",
  },
  {
    id: 2,
    text: "How consistent have you been in following your treatment plan (medications, therapy sessions, exercises, etc.)?",
  },
  {
    id: 3,
    text: "Have you experienced any side effects or difficulties with your current treatment?",
  },
  {
    id: 4,
    text: "How would you rate your overall mental well-being compared to when you started your current treatment?",
  },
  {
    id: 5,
    text: "How supported do you feel by your healthcare provider(s) during your treatment?",
  },
  {
    id: 6,
    text: "How effective are the coping strategies you've learned through your treatment?",
  },
];

// Answer options
const options = [
  { value: "0", label: "Not at all" },
  { value: "1", label: "Slightly" },
  { value: "2", label: "Moderately" },
  { value: "3", label: "Very much" },
  { value: "4", label: "Extremely" },
];

// Treatment types
const treatmentTypes = [
  "Cognitive Behavioral Therapy (CBT)",
  "Medication Management",
  "Mindfulness-Based Therapy",
  "Psychodynamic Therapy",
  "Group Therapy",
  "Family Therapy",
  "Other",
];

interface TreatmentPlanAssessmentProps {
  onComplete?: () => void;
}

const TreatmentPlanAssessment = ({ onComplete }: TreatmentPlanAssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [treatmentType, setTreatmentType] = useState("");
  const [otherTreatmentType, setOtherTreatmentType] = useState("");
  const [treatmentDuration, setTreatmentDuration] = useState("");
  const [treatmentGoals, setTreatmentGoals] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showTreatmentForm, setShowTreatmentForm] = useState(true);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [treatmentQuestions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (showTreatmentForm) {
      if (!treatmentType || (!otherTreatmentType && treatmentType === "Other") || !treatmentDuration) {
        toast.error("Please complete all required treatment information");
        return;
      }
      setShowTreatmentForm(false);
      return;
    }

    if (currentQuestion < treatmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      if (onComplete) onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (!showTreatmentForm) {
      setShowTreatmentForm(true);
    }
  };

  const handleStartOver = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setShowTreatmentForm(true);
    setTreatmentType("");
    setOtherTreatmentType("");
    setTreatmentDuration("");
    setTreatmentGoals("");
  };

  // Calculate result based on answers
  const getResult = () => {
    if (Object.keys(answers).length === 0) return null;

    const totalScore = Object.values(answers).reduce(
      (sum, value) => sum + parseInt(value),
      0
    );
    const maxPossibleScore = treatmentQuestions.length * 4; // 4 is the max value per question
    const percentageScore = (totalScore / maxPossibleScore) * 100;

    // Generate recommendations based on score
    if (percentageScore >= 80) {
      return {
        status: "Excellent Progress",
        color: "text-green-500",
        actionNeeded: "Minor",
        recommendations: [
          "Continue with your current treatment plan",
          "Schedule a routine follow-up with your provider",
          "Monitor for any changes in symptoms"
        ],
        adjustmentNeeded: false
      };
    } else if (percentageScore >= 60) {
      return {
        status: "Good Progress",
        color: "text-blue-500",
        actionNeeded: "Low",
        recommendations: [
          "Continue your current treatment plan",
          "Discuss any minor concerns with your provider at your next appointment",
          "Consider increasing frequency of coping skills practice"
        ],
        adjustmentNeeded: false
      };
    } else if (percentageScore >= 40) {
      return {
        status: "Moderate Progress",
        color: "text-yellow-500",
        actionNeeded: "Moderate",
        recommendations: [
          "Schedule an appointment with your provider to discuss potential adjustments",
          "Keep a detailed symptom journal to identify patterns",
          "Review and increase focus on effective coping strategies"
        ],
        adjustmentNeeded: true
      };
    } else {
      return {
        status: "Limited Progress",
        color: "text-red-500",
        actionNeeded: "High",
        recommendations: [
          "Schedule an appointment with your provider as soon as possible",
          "Consider potential treatment plan adjustments or alternatives",
          "Ensure you're addressing any treatment barriers (side effects, schedule conflicts, etc.)",
          "Seek additional support through support groups or other resources"
        ],
        adjustmentNeeded: true
      };
    }
  };

  const calculateProgress = () => {
    if (showTreatmentForm) return 0;
    return ((currentQuestion + 1) / treatmentQuestions.length) * 100;
  };

  const isCurrentQuestionAnswered = answers[treatmentQuestions[currentQuestion]?.id] !== undefined;
  const effectivenessTreatmentType = treatmentType === "Other" ? otherTreatmentType : treatmentType;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Treatment Plan Assessment</CardTitle>
        <CardDescription>
          Evaluate the effectiveness of your current mental health treatment plan and receive personalized recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showTreatmentForm ? (
          <div className="space-y-6">
            <div>
              <Label htmlFor="treatment-type" className="mb-2 block">
                Current Treatment Type <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <select
                  id="treatment-type"
                  value={treatmentType}
                  onChange={(e) => setTreatmentType(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select treatment type</option>
                  {treatmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {treatmentType === "Other" && (
              <div>
                <Label htmlFor="other-treatment" className="mb-2 block">
                  Please specify treatment type <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="other-treatment"
                  value={otherTreatmentType}
                  onChange={(e) => setOtherTreatmentType(e.target.value)}
                  placeholder="Specify your treatment type"
                />
              </div>
            )}

            <div>
              <Label htmlFor="treatment-duration" className="mb-2 block">
                How long have you been on this treatment plan? <span className="text-red-500">*</span>
              </Label>
              <select
                id="treatment-duration"
                value={treatmentDuration}
                onChange={(e) => setTreatmentDuration(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select duration</option>
                <option value="Less than 1 month">Less than 1 month</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6-12 months">6-12 months</option>
                <option value="1-2 years">1-2 years</option>
                <option value="More than 2 years">More than 2 years</option>
              </select>
            </div>

            <div>
              <Label htmlFor="treatment-goals" className="mb-2 block">
                What are your main goals for treatment? (Optional)
              </Label>
              <Textarea
                id="treatment-goals"
                value={treatmentGoals}
                onChange={(e) => setTreatmentGoals(e.target.value)}
                placeholder="Describe what you hope to achieve with your treatment"
                className="min-h-24"
              />
            </div>
          </div>
        ) : !showResults ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Question {currentQuestion + 1} of {treatmentQuestions.length}</span>
                <span>{calculateProgress().toFixed(0)}% Complete</span>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">{treatmentQuestions[currentQuestion].text}</h3>
              
              <RadioGroup 
                value={answers[treatmentQuestions[currentQuestion].id] || ""} 
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
                    <RadioGroupItem value={option.value} id={`option-${option.value}`} />
                    <Label htmlFor={`option-${option.value}`} className="flex-grow cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-4">
              <ClipboardCheck className="h-10 w-10 text-green-600" />
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Assessment Complete</h3>
            
            {(() => {
              const result = getResult();
              return (
                <div className="mb-6">
                  <p className="text-lg font-medium mb-1">
                    Treatment: <span className="font-normal">{effectivenessTreatmentType}</span>
                  </p>
                  <p className="text-lg font-medium mb-1">
                    Duration: <span className="font-normal">{treatmentDuration}</span>
                  </p>
                  <p className="text-lg font-medium mb-3">
                    Status: <span className={result?.color}>{result?.status}</span>
                  </p>
                  
                  <div className="text-left p-4 bg-gray-50 rounded-lg border my-4">
                    <p className="font-medium mb-2">Recommendations:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {result?.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>

                  {result?.adjustmentNeeded && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left">
                      <p className="font-medium text-yellow-800">
                        Your assessment suggests your treatment plan may benefit from adjustments.
                        Consider discussing these results with your healthcare provider.
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}
            
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-4">
                Note: This assessment is not a diagnostic tool or a substitute for professional medical advice.
                Please consult with your healthcare provider before making any changes to your treatment plan.
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        {!showResults ? (
          <>
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0 && showTreatmentForm}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!showTreatmentForm && !isCurrentQuestionAnswered}
            >
              {showTreatmentForm ? "Continue" : currentQuestion === treatmentQuestions.length - 1 ? "View Results" : "Next"}
              {!showTreatmentForm && currentQuestion < treatmentQuestions.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </>
        ) : (
          <div className="w-full flex justify-center">
            <Button onClick={handleStartOver}>
              Start New Assessment
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default TreatmentPlanAssessment;
