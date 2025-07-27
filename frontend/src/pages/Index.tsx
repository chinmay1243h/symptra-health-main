import Navigation from "@/components/Navigation";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaSection from "@/components/home/CtaSection";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2, FileText } from "lucide-react";
import { toast } from "sonner";

// Define the base URL for your backend API
const API_BASE_URL = 'http://localhost:5000/api';

type Article = {
  id: string;
  title: string;
  content: string;
  author: {
    _id?: string;
    name?: string;
    email?: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
};

const Index = () => {
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      setLoadingArticles(true);
      try {
        // This endpoint fetches only published articles and is public
        const response = await fetch(`${API_BASE_URL}/articles`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Sort by createdAt descending and take the first 3
          const sortedArticles = data.data
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 3); // Get up to 3 latest articles

          const fetchedArticles: Article[] = sortedArticles.map((a: any) => ({
            id: a._id,
            title: a.title,
            content: a.content,
            author: a.author ? { 
              _id: a.author._id || '', 
              name: a.author.name || 'Unknown', 
              email: a.author.email || 'unknown@example.com' 
            } : { _id: '', name: 'Unknown', email: 'unknown@example.com' }, 
            category: a.category,
            tags: a.tags,
            createdAt: a.createdAt,
          }));
          setLatestArticles(fetchedArticles);
        } else {
          toast.error(data.message || 'Failed to load latest articles.');
        }
      } catch (error) {
        console.error('Error fetching latest articles:', error);
        toast.error('Failed to load latest articles.');
      } finally {
        setLoadingArticles(false);
      }
    };

    fetchLatestArticles();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <BenefitsSection />
        
        {/* Latest Articles Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-healthcare-dark mb-10">Latest Health Insights</h2>
            {loadingArticles ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-healthcare-primary" />
                <span className="ml-3 text-lg text-gray-600">Loading articles...</span>
              </div>
            ) : latestArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestArticles.map((article) => (
                  <Card key={article.id} className="shadow-md hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-healthcare-primary">
                        <Link to={`/articles/${article.id}`} className="hover:underline">
                          {article.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        By {article.author?.name || 'Unknown'} | {new Date(article.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 line-clamp-3">{article.content}</p>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p>No published articles available yet.</p>
              </div>
            )}
            {latestArticles.length > 0 && (
              <div className="text-center mt-10">
                <Link to="/articles" className="text-healthcare-primary hover:underline font-medium">
                  View All Articles &rarr;
                </Link>
              </div>
            )}
          </div>
        </section>

        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;