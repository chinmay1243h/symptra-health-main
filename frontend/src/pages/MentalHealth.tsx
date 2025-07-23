import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, BookOpen, Calendar, Users, ArrowRight, Award, Heart, Dumbbell, ArrowUpRight } from "lucide-react";
import CheckupQuestionnaire from "@/components/mental-health/CheckupQuestionnaire";
import TreatmentPlanAssessment from "@/components/mental-health/TreatmentPlanAssessment";

const MentalHealth = () => {
  const [activeTab, setActiveTab] = useState<"checkup" | "treatment">("checkup");
  
  const resources = [
    {
      title: "Understanding Anxiety",
      category: "Education",
      description: "Learn about the symptoms, causes, and management strategies for anxiety disorders.",
      icon: BookOpen,
    },
    {
      title: "Meditation Basics",
      category: "Practice",
      description: "A beginner's guide to meditation techniques for stress reduction and mental clarity.",
      icon: Brain,
    },
    {
      title: "Support Groups",
      category: "Community",
      description: "Connect with others experiencing similar challenges in a supportive environment.",
      icon: Users,
    },
  ];

  const programs = [
    {
      title: "Stress Management",
      duration: "4 weeks",
      level: "Beginner",
      description: "Learn effective techniques to manage daily stress and improve overall wellbeing.",
    },
    {
      title: "Depression Recovery",
      duration: "8 weeks",
      level: "Intermediate",
      description: "A comprehensive program to help manage symptoms of depression through various therapeutic approaches.",
    },
    {
      title: "Anxiety Relief",
      duration: "6 weeks",
      level: "All levels",
      description: "Practical strategies and exercises to reduce anxiety and build resilience.",
    },
  ];

  const professionals = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Clinical Psychologist",
      focus: "Anxiety, Depression, PTSD",
      availability: "Available next week",
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Psychiatrist",
      focus: "Mood Disorders, Medication Management",
      availability: "Available tomorrow",
    },
    {
      name: "Jennifer Williams, LMFT",
      specialty: "Family Therapist",
      focus: "Relationships, Family Dynamics",
      availability: "Available in 3 days",
    },
  ];

  const exercises = [
    {
      title: "Guided Breathing",
      duration: "5 minutes",
      level: "Beginner",
      description: "Simple breathing exercises to reduce stress and increase mindfulness.",
      benefits: ["Reduces anxiety", "Improves focus", "Lowers blood pressure"],
    },
    {
      title: "Progressive Muscle Relaxation",
      duration: "15 minutes",
      level: "Beginner",
      description: "Systematically tense and relax different muscle groups to reduce physical tension.",
      benefits: ["Reduces muscle tension", "Improves sleep quality", "Decreases stress"],
    },
    {
      title: "Mindful Meditation",
      duration: "10 minutes",
      level: "Intermediate",
      description: "Focus your attention on the present moment while calmly acknowledging feelings and thoughts.",
      benefits: ["Enhances self-awareness", "Reduces negative emotions", "Increases patience"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto pt-24 px-4 pb-12">
        <h1 className="text-3xl font-bold text-healthcare-dark mb-6">Mental Health Services</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Access professional mental health resources, self-help tools, and connect with licensed professionals for personalized care.
        </p>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-healthcare-dark mb-6">Mental Health Assessment</h2>
          
          <div className="mb-4">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "checkup" | "treatment")}>
              <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
                <TabsTrigger value="checkup">Initial Checkup</TabsTrigger>
                <TabsTrigger value="treatment">Treatment Evaluation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="checkup" className="mt-0">
                <CheckupQuestionnaire />
              </TabsContent>
              
              <TabsContent value="treatment" className="mt-0">
                <TreatmentPlanAssessment />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4 mb-8">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="professionals">Professionals</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-full bg-healthcare-primary/10">
                        <resource.icon className="h-5 w-5 text-healthcare-primary" />
                      </div>
                      <div className="text-sm font-medium text-healthcare-primary">{resource.category}</div>
                    </div>
                    <CardTitle className="mt-2">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{resource.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full justify-between">
                      Access Resource <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button>
                View All Resources <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="programs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {programs.map((program, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle>{program.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-healthcare-primary" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1 text-healthcare-primary" />
                          <span>{program.level}</span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{program.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Enroll Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="professionals">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {professionals.map((professional, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                        <Users className="h-8 w-8 text-gray-400" />
                      </div>
                    </div>
                    <CardTitle className="text-center">{professional.name}</CardTitle>
                    <CardDescription className="text-center">{professional.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Focus areas: </span>
                        <span className="text-gray-600">{professional.focus}</span>
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        {professional.availability}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">View Profile</Button>
                    <Button>Schedule</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="exercises">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {exercises.map((exercise, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-full bg-healthcare-primary/10">
                        <Dumbbell className="h-5 w-5 text-healthcare-primary" />
                      </div>
                      <div className="text-sm font-medium text-healthcare-primary">{exercise.level}</div>
                    </div>
                    <CardTitle className="mt-2">{exercise.title}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{exercise.duration}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{exercise.description}</p>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {exercise.benefits.map((benefit, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-1 text-healthcare-primary" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Start Exercise</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 bg-healthcare-primary/5 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-healthcare-dark mb-2">Need immediate support?</h2>
              <p className="text-gray-600 mb-4">
                If you're experiencing a mental health crisis or need immediate assistance, please reach out to our 24/7 support line or emergency services.
              </p>
            </div>
            <div className="md:w-1/3 text-center">
              <Button size="lg" className="bg-healthcare-accent hover:bg-healthcare-accent/90">
                <Heart className="mr-2 h-4 w-4" /> Get Help Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealth;
