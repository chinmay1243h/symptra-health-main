
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

const questions = [
  {
    id: 1,
    text: "Over the past 2 weeks, how often have you felt little interest or pleasure in doing things?",
  },
  {
    id: 2,
    text: "Over the past 2 weeks, how often have you felt down, depressed, or hopeless?",
  },
  {
    id: 3,
    text: "Over the past 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
  },
  {
    id: 4,
    text: "Over the past 2 weeks, how often have you felt tired or had little energy?",
  },
  {
    id: 5,
    text: "Over the past 2 weeks, how often have you had poor appetite or overeating?",
  },
  {
    id: 6,
    text: "Over the past 2 weeks, how often have you felt bad about yourself — or that you are a failure or have let yourself or your family down?",
  },
  {
    id: 7,
    text: "Over the past 2 weeks, how often have you had trouble concentrating on things, such as reading the newspaper or watching television?",
  },
  {
    id: 8,
    text: "Over the past 2 weeks, how often have you felt nervous, anxious, or on edge?",
  },
  {
    id: 9,
    text: "Over the past 2 weeks, how often have you not been able to stop or control worrying?",
  },
];

const options = [
  { value: "0", label: "Not at all" },
  { value: "1", label: "Several days" },
  { value: "2", label: "More than half the days" },
  { value: "3", label: "Nearly every day" },
];

interface ResultsInfo {
  score: number;
  severity: string;
  recommendation: string;
  color: string;
}

const CheckupQuestionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleStartOver = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const getResult = (): ResultsInfo => {
    const totalScore = Object.values(answers).reduce(
      (sum, value) => sum + parseInt(value), 
      0
    );
    
    if (totalScore <= 4) {
      return {
        score: totalScore,
        severity: "Minimal or no symptoms",
        recommendation: "Continue monitoring your mental health.",
        color: "text-green-500"
      };
    } else if (totalScore <= 9) {
      return {
        score: totalScore,
        severity: "Mild symptoms",
        recommendation: "Consider self-care strategies and monitoring.",
        color: "text-yellow-500"
      };
    } else if (totalScore <= 14) {
      return {
        score: totalScore,
        severity: "Moderate symptoms",
        recommendation: "Consider speaking with a mental health professional.",
        color: "text-orange-500"
      };
    } else {
      return {
        score: totalScore,
        severity: "Severe symptoms",
        recommendation: "Please consult with a healthcare provider as soon as possible.",
        color: "text-red-500"
      };
    }
  };

  const calculateProgress = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  const isCurrentQuestionAnswered = answers[questions[currentQuestion]?.id] !== undefined;
  const totalQuestionsAnswered = Object.keys(answers).length;
  const allQuestionsAnswered = totalQuestionsAnswered === questions.length;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Mental Health Checkup</CardTitle>
        <CardDescription>
          This questionnaire helps assess common symptoms of depression and anxiety.
          Your responses are confidential and for screening purposes only.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!showResults ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{calculateProgress().toFixed(0)}% Complete</span>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].text}</h3>
              
              <RadioGroup 
                value={answers[questions[currentQuestion].id] || ""} 
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
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Assessment Complete</h3>
            
            {(() => {
              const result = getResult();
              return (
                <div className="mb-6">
                  <p className="text-lg font-medium mb-1">
                    Your score: <span className={result.color}>{result.score}</span>
                  </p>
                  <p className="text-lg font-medium mb-4">
                    Severity: <span className={result.color}>{result.severity}</span>
                  </p>
                  <p className="text-gray-600">
                    {result.recommendation}
                  </p>
                </div>
              );
            })()}
            
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-4">
                Note: This assessment is not a diagnostic tool. It's designed to help you understand
                your mental health better. Please consult a healthcare professional for proper diagnosis
                and treatment.
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
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered}
            >
              {currentQuestion === questions.length - 1 ? "View Results" : "Next"}
              {currentQuestion < questions.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </>
        ) : (
          <div className="w-full flex justify-center">
            <Button onClick={handleStartOver}>
              Take Assessment Again
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CheckupQuestionnaire;
