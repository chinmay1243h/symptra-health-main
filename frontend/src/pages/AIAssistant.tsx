
import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, Mic, Image, FileText, Bot, User, Paperclip, 
  Pill, Activity, Brain, Heart 
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI health assistant. How can I help you today? You can ask me about symptoms, medications, lifestyle advice, or general health information.",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "Based on what you've described, it could be a common cold or seasonal allergies. It's important to stay hydrated and get plenty of rest.",
        "Your symptoms might indicate a minor infection. If they persist for more than a few days or worsen, I recommend consulting with a healthcare provider.",
        "That's a great question! The recommended daily water intake varies by individual, but generally aim for about 8 glasses or 2 liters per day.",
        "Exercise is crucial for heart health. The American Heart Association recommends at least 150 minutes of moderate-intensity aerobic activity per week.",
        "Those medications can sometimes cause the side effects you're experiencing. Don't stop taking them, but do mention this to your doctor at your next appointment."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Quick suggestion buttons to help users
  const suggestions = [
    { text: "What are symptoms of flu?", icon: Activity },
    { text: "How do I manage stress?", icon: Brain },
    { text: "Medication side effects", icon: Pill },
    { text: "Heart health tips", icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto pt-24 px-4 pb-12">
        <h1 className="text-3xl font-bold text-healthcare-dark mb-6">AI Health Assistant</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Your personal health companion powered by AI. Ask questions about symptoms, medications, lifestyle advice, or general health information.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card className="shadow-md h-[600px] flex flex-col">
              <CardContent className="flex flex-col h-full p-0">
                <div className="bg-healthcare-primary text-white p-4 flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <div>
                    <h2 className="font-semibold">HealthAI Assistant</h2>
                    <p className="text-xs text-white/80">Online • Replies instantly</p>
                  </div>
                </div>
                
                <ScrollArea className="flex-grow p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                          <Avatar className={`h-8 w-8 ${message.sender === 'user' ? 'ml-2' : 'mr-2'}`}>
                            {message.sender === 'user' ? 
                              <User className="h-5 w-5 text-white" /> : 
                              <Bot className="h-5 w-5 text-white" />
                            }
                          </Avatar>
                          <div 
                            className={`rounded-2xl px-4 py-2 ${
                              message.sender === 'user' 
                                ? 'bg-healthcare-primary text-white rounded-tr-none' 
                                : 'bg-gray-100 text-gray-800 rounded-tl-none'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs mt-1 opacity-70">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex items-start max-w-[80%]">
                          <Avatar className="h-8 w-8 mr-2">
                            <Bot className="h-5 w-5 text-white" />
                          </Avatar>
                          <div className="rounded-2xl px-4 py-2 bg-gray-100 text-gray-800 rounded-tl-none">
                            <div className="flex space-x-1">
                              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Image className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-grow"
                    />
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleSendMessage} size="icon" className="rounded-full bg-healthcare-primary">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-md">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Common Questions</h3>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <Button 
                      key={index}
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => {
                        setInput(suggestion.text);
                      }}
                    >
                      <suggestion.icon className="h-4 w-4 mr-2 text-healthcare-primary" />
                      <span className="truncate">{suggestion.text}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Upload Documents</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Upload medical documents for our AI to analyze and provide insights.
                </p>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Medical Document
                </Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Important Note</h3>
                <p className="text-sm text-gray-500">
                  This AI assistant provides general information only and is not a substitute for professional medical advice, diagnosis, or treatment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
