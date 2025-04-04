
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Search, BookOpen, Play, Clock, Star, Award, Filter, FileText, Video, Newspaper, ArrowRight, Calendar, CheckCircle, X } from "lucide-react";
import { AnimatedCard } from "@/components/ui/animated-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import QuizModule from "@/components/learn/QuizModule";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Mock courses data
const courses = [
  {
    id: 1,
    title: "Investing Fundamentals",
    description: "Learn the basic principles of investing and build a solid foundation for your financial future.",
    level: "Beginner",
    duration: "4 hours",
    modules: 8,
    rating: 4.8,
    students: 3542,
    instructor: {
      name: "Sarah Johnson",
      role: "Financial Advisor",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGludmVzdGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    tags: ["stocks", "bonds", "portfolio"],
    featured: true,
    completed: false,
    progress: 0,
    content: [
      { title: "Understanding Investment Basics", duration: "30 min", completed: false },
      { title: "Risk and Return Fundamentals", duration: "25 min", completed: false },
      { title: "Asset Classes Overview", duration: "40 min", completed: false },
      { title: "Building Your First Portfolio", duration: "35 min", completed: false },
      { title: "Investment Vehicles and Accounts", duration: "30 min", completed: false },
      { title: "Understanding Market Cycles", duration: "25 min", completed: false },
      { title: "Basic Investment Strategies", duration: "35 min", completed: false },
      { title: "Monitoring and Rebalancing", duration: "20 min", completed: false },
    ]
  },
  {
    id: 2,
    title: "Technical Analysis Mastery",
    description: "Understand chart patterns, indicators and technical signals to make data-driven investment decisions.",
    level: "Intermediate",
    duration: "6 hours",
    modules: 12,
    rating: 4.6,
    students: 2187,
    instructor: {
      name: "Michael Chen",
      role: "Market Analyst",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    image: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3RvY2slMjBjaGFydHxlbnwwfHwwfHx8MA%3D%3D",
    tags: ["technical analysis", "charts", "indicators"],
    featured: false,
    completed: true,
    progress: 100,
    content: [
      { title: "Introduction to Technical Analysis", duration: "30 min", completed: true },
      { title: "Chart Types and Timeframes", duration: "25 min", completed: true },
      { title: "Support and Resistance", duration: "40 min", completed: true },
      { title: "Trend Analysis", duration: "35 min", completed: true },
      { title: "Moving Averages", duration: "30 min", completed: true },
      { title: "Momentum Indicators", duration: "25 min", completed: true },
      { title: "Volume Analysis", duration: "35 min", completed: true },
      { title: "Chart Patterns", duration: "45 min", completed: true },
      { title: "Fibonacci Retracement", duration: "30 min", completed: true },
      { title: "Elliott Wave Theory", duration: "40 min", completed: true },
      { title: "Technical Analysis Strategies", duration: "45 min", completed: true },
      { title: "Putting It All Together", duration: "30 min", completed: true },
    ]
  },
  {
    id: 3,
    title: "Retirement Planning Strategies",
    description: "Develop a comprehensive retirement plan to ensure financial security in your golden years.",
    level: "Beginner",
    duration: "5 hours",
    modules: 10,
    rating: 4.9,
    students: 4253,
    instructor: {
      name: "David Wilson",
      role: "Retirement Specialist",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmV0aXJlbWVudHxlbnwwfHwwfHx8MA%3D%3D",
    tags: ["retirement", "planning", "401k", "IRA"],
    featured: true,
    completed: false,
    progress: 20,
    content: [
      { title: "Retirement Planning Fundamentals", duration: "30 min", completed: true },
      { title: "Setting Retirement Goals", duration: "25 min", completed: true },
      { title: "Understanding Retirement Accounts", duration: "40 min", completed: false },
      { title: "Social Security Benefits", duration: "35 min", completed: false },
      { title: "Calculating Retirement Needs", duration: "30 min", completed: false },
      { title: "Investment Strategies for Retirement", duration: "35 min", completed: false },
      { title: "Tax Considerations", duration: "30 min", completed: false },
      { title: "Healthcare in Retirement", duration: "25 min", completed: false },
      { title: "Estate Planning Basics", duration: "35 min", completed: false },
      { title: "Retirement Income Strategies", duration: "35 min", completed: false },
    ]
  },
  {
    id: 4,
    title: "Advanced Stock Valuation",
    description: "Learn how to value stocks using fundamental analysis, DCF models, and comparative methods.",
    level: "Advanced",
    duration: "8 hours",
    modules: 15,
    rating: 4.7,
    students: 1645,
    instructor: {
      name: "Amanda Lee",
      role: "Equity Analyst",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RvY2slMjBtYXJrZXR8ZW58MHx8MHx8fDA%3D",
    tags: ["valuation", "fundamental analysis", "DCF", "stocks"],
    featured: false,
    completed: false,
    progress: 0,
    content: [
      { title: "Introduction to Stock Valuation", duration: "30 min", completed: false },
      { title: "Fundamental Analysis Overview", duration: "35 min", completed: false },
      { title: "Understanding Financial Statements", duration: "45 min", completed: false },
      { title: "Key Financial Ratios", duration: "40 min", completed: false },
      { title: "Discounted Cash Flow (DCF) Basics", duration: "50 min", completed: false },
      { title: "Building a DCF Model", duration: "60 min", completed: false },
      { title: "Comparable Company Analysis", duration: "40 min", completed: false },
      { title: "Precedent Transaction Analysis", duration: "35 min", completed: false },
      { title: "Dividend Discount Models", duration: "30 min", completed: false },
      { title: "Free Cash Flow Models", duration: "45 min", completed: false },
      { title: "Industry-Specific Valuation", duration: "40 min", completed: false },
      { title: "Growth Stock Valuation", duration: "35 min", completed: false },
      { title: "Value Stock Analysis", duration: "30 min", completed: false },
      { title: "Valuation in Different Market Conditions", duration: "35 min", completed: false },
      { title: "Putting It All Together", duration: "40 min", completed: false },
    ]
  },
];

// Mock articles data
const articles = [
  {
    id: 1,
    title: "How Inflation Affects Your Investment Strategy",
    description: "Learn about the impact of inflation on different asset classes and how to adjust your portfolio accordingly.",
    author: "Emma Roberts",
    date: "April 2, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5mbGF0aW9ufGVufDB8fDB8fHww",
    tags: ["inflation", "portfolio management", "economy"],
    featured: true,
    saved: false,
    content: "Inflation has a significant impact on investment strategies across various asset classes. This article explores how different investments perform during inflationary periods and provides practical advice on adjusting your portfolio to maintain purchasing power..."
  },
  {
    id: 2,
    title: "The Rise of ESG Investing: What You Need to Know",
    description: "Explore how environmental, social, and governance factors are changing investment strategies.",
    author: "James Peterson",
    date: "March 28, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1586892477838-2b96e85e0f96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBlbmVyZ3l8ZW58MHx8MHx8fDA%3D",
    tags: ["ESG", "sustainable investing", "trends"],
    featured: false,
    saved: false,
    content: "Environmental, Social, and Governance (ESG) investing has moved from the periphery to mainstream investment strategy. This article explores the growth of ESG investing, its performance metrics, and how investors can incorporate ESG factors into their investment decisions..."
  },
  {
    id: 3,
    title: "Understanding Market Corrections: When to Hold and When to Fold",
    description: "Strategies for navigating market downturns and making informed decisions during volatile periods.",
    author: "Thomas Garcia",
    date: "March 25, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN0b2NrJTIwbWFya2V0JTIwY3Jhc2h8ZW58MHx8MHx8fDA%3D",
    tags: ["market correction", "volatility", "risk management"],
    featured: true,
    saved: true,
    content: "Market corrections are normal and healthy aspects of market cycles, but they can be unnerving for investors. This comprehensive guide provides strategies for navigating market downturns, including when to hold your investments, when to sell, and how to identify buying opportunities during volatility..."
  },
  {
    id: 4,
    title: "Tax-Efficient Investing: Maximizing Your Returns",
    description: "Learn strategies to minimize tax impact and optimize your investment returns through smart tax planning.",
    author: "Michelle Wong",
    date: "March 20, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGF4fGVufDB8fDB8fHww",
    tags: ["tax planning", "investment strategy", "personal finance"],
    featured: false,
    saved: false,
    content: "Tax-efficient investing can significantly impact your long-term returns. This article explores strategies such as tax-loss harvesting, asset location, tax-advantaged accounts, and the importance of understanding capital gains tax to optimize your after-tax investment returns..."
  },
];

// Mock webinars data
const webinars = [
  {
    id: 1,
    title: "Market Outlook 2025: Trends and Opportunities",
    description: "Join our panel of experts as they discuss market projections and investment opportunities for the year ahead.",
    date: "April 10, 2025",
    time: "2:00 PM EST",
    duration: "90 min",
    presenter: "Dr. Robert Chang",
    role: "Chief Market Strategist",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2ViaW5hcnxlbnwwfHwwfHx8MA%3D%3D",
    tags: ["market outlook", "trends", "forecast"],
    upcoming: true,
    registered: false,
    keyPoints: [
      "Global economic trends for 2025",
      "Sector performance projections",
      "Emerging market opportunities",
      "Risk factors to monitor",
      "Strategic asset allocation recommendations"
    ]
  },
  {
    id: 2,
    title: "Cryptocurrency Investing: Beyond Bitcoin",
    description: "Explore the world of altcoins, DeFi, and blockchain technology, and their place in a diversified portfolio.",
    date: "April 15, 2025",
    time: "1:00 PM EST",
    duration: "60 min",
    presenter: "Alexandra Miller",
    role: "Crypto Investment Advisor",
    image: "https://images.unsplash.com/photo-1631603090989-93f9ef6f9d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3J5cHRvY3VycmVuY3l8ZW58MHx8MHx8fDA%3D",
    tags: ["cryptocurrency", "blockchain", "digital assets"],
    upcoming: true,
    registered: true,
    keyPoints: [
      "Understanding blockchain fundamentals",
      "Evaluating cryptocurrency projects",
      "DeFi protocols and opportunities",
      "Risk management in crypto investing",
      "Regulatory landscape and future outlook"
    ]
  },
  {
    id: 3,
    title: "Real Estate Investment Trusts (REITs): Income and Growth",
    description: "Learn how REITs can provide both income and growth in your investment portfolio.",
    date: "March 25, 2025",
    time: "11:00 AM EST",
    duration: "60 min",
    presenter: "Jonathan Turner",
    role: "Real Estate Investment Specialist",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    tags: ["REITs", "real estate", "income investing"],
    upcoming: false,
    registered: false,
    recording: "https://example.com/webinar-recording",
    keyPoints: [
      "Types of REITs and their characteristics",
      "Evaluating REIT fundamentals",
      "Income generation strategies",
      "REITs vs. direct real estate investing",
      "Tax considerations for REIT investors"
    ]
  },
];

const Learn = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [filteredWebinars, setFilteredWebinars] = useState(webinars);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [userCourses, setUserCourses] = useState(courses.filter(c => c.progress > 0 || c.completed));
  const { toast } = useToast();
  
  // Filter content based on search query
  useEffect(() => {
    if (searchQuery) {
      setFilteredCourses(
        courses.filter(course => 
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
      
      setFilteredArticles(
        articles.filter(article => 
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
      
      setFilteredWebinars(
        webinars.filter(webinar => 
          webinar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          webinar.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          webinar.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
    } else {
      setFilteredCourses(courses);
      setFilteredArticles(articles);
      setFilteredWebinars(webinars);
    }
  }, [searchQuery]);
  
  const handleEnrollCourse = (courseId: number) => {
    // Update the user's courses
    const courseToEnroll = courses.find(c => c.id === courseId);
    
    if (courseToEnroll && !userCourses.some(c => c.id === courseId)) {
      const updatedCourse = { ...courseToEnroll, progress: 0 };
      setUserCourses([...userCourses, updatedCourse]);
      
      toast({
        title: "Enrolled Successfully",
        description: `You have been enrolled in ${courseToEnroll.title}. Start learning now!`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Already Enrolled",
        description: "You are already enrolled in this course.",
        duration: 3000,
      });
    }
  };
  
  const handleContinueCourse = (courseId: number) => {
    const courseToUpdate = userCourses.find(c => c.id === courseId);
    
    if (courseToUpdate && !courseToUpdate.completed) {
      // Mock progress update
      const updatedCourses = userCourses.map(c => {
        if (c.id === courseId) {
          const newProgress = Math.min(c.progress + 10, 100);
          const completed = newProgress === 100;
          return { ...c, progress: newProgress, completed };
        }
        return c;
      });
      
      setUserCourses(updatedCourses);
      
      toast({
        title: "Progress Updated",
        description: "Your course progress has been updated!",
        duration: 3000,
      });
    }
  };
  
  const handleReadArticle = (article: any) => {
    setSelectedArticle(article);
  };
  
  const handleSaveArticle = (articleId: number, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    // Toggle saved status
    const updatedArticles = filteredArticles.map(article => {
      if (article.id === articleId) {
        return { ...article, saved: !article.saved };
      }
      return article;
    });
    
    setFilteredArticles(updatedArticles);
    
    const article = articles.find(a => a.id === articleId);
    const isSaved = article?.saved;
    
    toast({
      title: isSaved ? "Article Removed" : "Article Saved",
      description: isSaved 
        ? "The article has been removed from your saved list." 
        : "The article has been saved to your reading list.",
      duration: 3000,
    });
  };
  
  const handleRegisterWebinar = (webinarId: number, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    // Toggle registration status
    const updatedWebinars = filteredWebinars.map(webinar => {
      if (webinar.id === webinarId) {
        return { ...webinar, registered: !webinar.registered };
      }
      return webinar;
    });
    
    setFilteredWebinars(updatedWebinars);
    
    const webinar = webinars.find(w => w.id === webinarId);
    const isRegistered = !webinar?.registered;
    
    toast({
      title: isRegistered ? "Registration Successful" : "Registration Cancelled",
      description: isRegistered 
        ? "You have been registered for the webinar. A calendar invite has been sent to your email." 
        : "Your webinar registration has been cancelled.",
      duration: 3000,
    });
  };
  
  const handleFilterSelect = (filter: string) => {
    if (selectedFilter === filter) {
      setSelectedFilter(null);
      setFilteredCourses(courses);
      setFilteredArticles(articles);
      setFilteredWebinars(webinars);
    } else {
      setSelectedFilter(filter);
      
      setFilteredCourses(
        courses.filter(course => 
          course.level === filter || 
          course.tags.includes(filter) || 
          (filter === "Featured" && course.featured)
        )
      );
      
      setFilteredArticles(
        articles.filter(article => 
          article.tags.includes(filter) || 
          (filter === "Featured" && article.featured)
        )
      );
      
      setFilteredWebinars(
        webinars.filter(webinar => 
          webinar.tags.includes(filter) || 
          (filter === "Upcoming" && webinar.upcoming)
        )
      );
    }
  };
  
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full p-4 md:p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Learning Center</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for topics, courses, or articles..."
              className="pl-10 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="courses" onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <TabsList>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="webinars">Webinars</TabsTrigger>
              <TabsTrigger value="my-learning">My Learning</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-wrap gap-2">
              {["Beginner", "Intermediate", "Advanced", "Featured", "stocks", "retirement", "cryptocurrency"].map((filter) => (
                <Badge 
                  key={filter}
                  variant={selectedFilter === filter ? "active" : "interactive"}
                  onClick={() => handleFilterSelect(filter)}
                  className="cursor-pointer"
                >
                  {filter}
                </Badge>
              ))}
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TabsContent value="courses" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <AnimatedCard 
                      key={course.id} 
                      className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedCourse(course)}
                    >
                      <div 
                        className="h-48 bg-cover bg-center" 
                        style={{ backgroundImage: `url(${course.image})` }}
                      >
                        {course.featured && (
                          <Badge className="m-2 bg-primary/90">Featured</Badge>
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {course.level}
                          </Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {course.duration}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <FileText className="h-3 w-3 mr-1" />
                            {course.modules} modules
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 flex-grow">{course.description}</p>
                        
                        <div className="flex items-center mb-4">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                            <AvatarFallback>{course.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{course.instructor.name}</div>
                            <div className="text-xs text-muted-foreground">{course.instructor.role}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm">{course.rating} ({course.students.toLocaleString()} students)</span>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEnrollCourse(course.id);
                          }} 
                          className="w-full"
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Enroll Now
                        </Button>
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "More Courses",
                        description: "Exploring additional courses in our catalog.",
                      });
                    }}
                  >
                    View All Courses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <Dialog open={!!selectedCourse} onOpenChange={(open) => !open && setSelectedCourse(null)}>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
                    {selectedCourse && (
                      <>
                        <DialogHeader>
                          <DialogTitle>{selectedCourse.title}</DialogTitle>
                          <DialogDescription>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                {selectedCourse.level}
                              </Badge>
                              <div className="flex items-center text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                {selectedCourse.duration}
                              </div>
                              <div className="flex items-center text-xs">
                                <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                {selectedCourse.rating}
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="md:col-span-2">
                            <div 
                              className="h-48 bg-cover bg-center rounded-md mb-4" 
                              style={{ backgroundImage: `url(${selectedCourse.image})` }}
                            ></div>
                            
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-lg font-semibold mb-2">About This Course</h3>
                                <p className="text-muted-foreground">{selectedCourse.description}</p>
                              </div>
                              
                              <div>
                                <h3 className="text-lg font-semibold mb-2">What You'll Learn</h3>
                                <ul className="space-y-2 list-disc list-inside">
                                  <li>Understand core investment principles and concepts</li>
                                  <li>Build and manage a diversified investment portfolio</li>
                                  <li>Analyze different asset classes and their risk-return profiles</li>
                                  <li>Make informed investment decisions based on your financial goals</li>
                                  <li>Monitor and adjust your investments for optimal performance</li>
                                </ul>
                              </div>
                              
                              <div>
                                <h3 className="text-lg font-semibold mb-2">Course Content</h3>
                                <Accordion type="single" collapsible className="w-full">
                                  {selectedCourse.content.map((module: any, index: number) => (
                                    <AccordionItem key={index} value={`module-${index}`}>
                                      <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center">
                                          <span className="mr-2">{index + 1}.</span>
                                          <span>{module.title}</span>
                                          <Badge className="ml-3" variant="outline">{module.duration}</Badge>
                                        </div>
                                      </AccordionTrigger>
                                      <AccordionContent>
                                        <div className="pl-6 pr-2">
                                          <p className="text-muted-foreground mb-2">
                                            {module.title} covers essential concepts for understanding investment fundamentals.
                                          </p>
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                              <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                                              <span className="text-sm">Video Lesson</span>
                                            </div>
                                            <Badge variant="outline">Preview</Badge>
                                          </div>
                                        </div>
                                      </AccordionContent>
                                    </AccordionItem>
                                  ))}
                                </Accordion>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-xl">Enroll Now</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="mb-4">
                                  <div className="text-3xl font-bold">Free</div>
                                  <div className="text-muted-foreground">Full course access</div>
                                </div>
                                <div className="space-y-4">
                                  <div className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                    <span>{selectedCourse.modules} on-demand modules</span>
                                  </div>
                                  <div className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                    <span>Downloadable resources</span>
                                  </div>
                                  <div className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                    <span>Completion certificate</span>
                                  </div>
                                  <div className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                    <span>Mobile access</span>
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter>
                                <Button 
                                  className="w-full" 
                                  onClick={() => {
                                    handleEnrollCourse(selectedCourse.id);
                                    setSelectedCourse(null);
                                  }}
                                >
                                  Enroll Now
                                </Button>
                              </CardFooter>
                            </Card>
                            
                            <div>
                              <h3 className="text-lg font-semibold mb-2">Instructor</h3>
                              <div className="flex items-center gap-3 mb-3">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={selectedCourse.instructor.avatar} alt={selectedCourse.instructor.name} />
                                  <AvatarFallback>{selectedCourse.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{selectedCourse.instructor.name}</div>
                                  <div className="text-sm text-muted-foreground">{selectedCourse.instructor.role}</div>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {selectedCourse.instructor.name} is an experienced {selectedCourse.instructor.role} with over 10 years of experience in financial markets and education.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
                
                <QuizModule />
              </TabsContent>
              
              <TabsContent value="articles" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map((article) => (
                    <AnimatedCard 
                      key={article.id} 
                      className="overflow-hidden flex flex-col md:flex-row cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleReadArticle(article)}
                    >
                      <div 
                        className="h-48 md:h-auto md:w-1/3 bg-cover bg-center" 
                        style={{ backgroundImage: `url(${article.image})` }}
                      >
                        {article.featured && (
                          <Badge className="m-2 bg-primary/90">Featured</Badge>
                        )}
                      </div>
                      <div className="p-5 md:w-2/3 flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="text-xs text-muted-foreground">{article.date}</div>
                          <div className="text-xs text-muted-foreground">•</div>
                          <div className="text-xs text-muted-foreground">{article.readTime}</div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 flex-grow">{article.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm">By <span className="font-medium">{article.author}</span></div>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSaveArticle(article.id, e);
                              }}
                            >
                              {article.saved ? "Saved" : "Save"}
                              {article.saved ? (
                                <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                              ) : (
                                <BookOpen className="ml-2 h-4 w-4" />
                              )}
                            </Button>
                            <Button variant="ghost" size="sm">
                              Read
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "More Articles",
                        description: "Exploring additional articles in our library.",
                      });
                    }}
                  >
                    View All Articles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <Dialog open={!!selectedArticle} onOpenChange={(open) => !open && setSelectedArticle(null)}>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
                    {selectedArticle && (
                      <>
                        <DialogHeader>
                          <DialogTitle>{selectedArticle.title}</DialogTitle>
                          <DialogDescription>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="text-sm">By {selectedArticle.author}</div>
                              <div className="text-xs text-muted-foreground">•</div>
                              <div className="text-xs text-muted-foreground">{selectedArticle.date}</div>
                              <div className="text-xs text-muted-foreground">•</div>
                              <div className="text-xs text-muted-foreground">{selectedArticle.readTime}</div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          <div 
                            className="h-64 bg-cover bg-center rounded-md" 
                            style={{ backgroundImage: `url(${selectedArticle.image})` }}
                          ></div>
                          
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <p className="lead">{selectedArticle.description}</p>
                            <p>{selectedArticle.content}</p>
                            
                            <h2>Understanding the Impact of Inflation</h2>
                            <p>
                              Inflation can erode purchasing power over time, making it crucial for investors to consider 
                              inflation-adjusted returns when evaluating their investment performance. Assets that have 
                              historically performed well during inflationary periods include:
                            </p>
                            
                            <ul>
                              <li><strong>Treasury Inflation-Protected Securities (TIPS)</strong> - Government bonds that are indexed to inflation</li>
                              <li><strong>Real estate</strong> - Property values and rents often increase with inflation</li>
                              <li><strong>Commodities</strong> - Raw materials like gold, silver, and oil can serve as inflation hedges</li>
                              <li><strong>Certain stocks</strong> - Companies with pricing power can pass increased costs to consumers</li>
                            </ul>
                            
                            <h2>Portfolio Strategies for Inflationary Environments</h2>
                            <p>
                              Investors should consider these strategies when preparing their portfolios for potential inflation:
                            </p>
                            
                            <ol>
                              <li>Diversify across asset classes that respond differently to inflation</li>
                              <li>Consider adding TIPS or I-Bonds to fixed income allocations</li>
                              <li>Evaluate companies with strong pricing power and low debt</li>
                              <li>Review allocation to real assets like real estate and commodities</li>
                              <li>Minimize cash holdings beyond emergency needs</li>
                            </ol>
                            
                            <blockquote>
                              "Inflation is as violent as a mugger, as frightening as an armed robber, and as deadly as a hitman." - Ronald Reagan
                            </blockquote>
                            
                            <p>
                              The key to successfully navigating inflationary periods is maintaining a long-term perspective 
                              and regularly reassessing your investment strategy as economic conditions evolve.
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {selectedArticle.tags.map((tag: string) => (
                              <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                          </div>
                          
                          <div className="flex justify-between">
                            <Button 
                              variant="outline" 
                              onClick={() => handleSaveArticle(selectedArticle.id)}
                            >
                              {selectedArticle.saved ? "Saved" : "Save for Later"}
                              {selectedArticle.saved ? (
                                <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                              ) : (
                                <BookOpen className="ml-2 h-4 w-4" />
                              )}
                            </Button>
                            
                            <Button onClick={() => {
                              toast({
                                title: "Article Shared",
                                description: "This article has been shared to your selected platform.",
                              });
                            }}>
                              Share Article
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </TabsContent>
              
              <TabsContent value="webinars" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredWebinars.map((webinar) => (
                    <AnimatedCard key={webinar.id} className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                      <div 
                        className="h-48 bg-cover bg-center relative" 
                        style={{ backgroundImage: `url(${webinar.image})` }}
                      >
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Button size="icon" variant="secondary" className="rounded-full bg-white/20 hover:bg-white/30">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                        {webinar.upcoming && (
                          <Badge className="absolute top-2 left-2 bg-green-500">Upcoming</Badge>
                        )}
                        {webinar.registered && (
                          <Badge className="absolute top-2 right-2 bg-primary">Registered</Badge>
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center text-xs">
                            <Calendar className="h-3 w-3 mr-1" />
                            {webinar.date}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {webinar.time} • {webinar.duration}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2">{webinar.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 flex-grow">{webinar.description}</p>
                        
                        <div className="flex items-center mb-4">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>{webinar.presenter.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{webinar.presenter}</div>
                            <div className="text-xs text-muted-foreground">{webinar.role}</div>
                          </div>
                        </div>
                        
                        <Accordion type="single" collapsible className="w-full mb-4">
                          <AccordionItem value="topics">
                            <AccordionTrigger>Key Topics</AccordionTrigger>
                            <AccordionContent>
                              <ul className="space-y-2 pl-2">
                                {webinar.keyPoints?.map((point: string, index: number) => (
                                  <li key={index} className="text-sm flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        
                        {webinar.upcoming ? (
                          <Button 
                            onClick={(e) => handleRegisterWebinar(webinar.id, e)} 
                            variant={webinar.registered ? "outline" : "default"}
                            className="w-full"
                          >
                            {webinar.registered ? "Cancel Registration" : "Register Now"}
                          </Button>
                        ) : (
                          <Button 
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                              toast({
                                title: "Webinar Recording",
                                description: "The recording is now playing in a new window.",
                              });
                            }}
                          >
                            Watch Recording
                          </Button>
                        )}
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "More Webinars",
                        description: "Exploring additional webinars in our schedule.",
                      });
                    }}
                  >
                    View All Webinars
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="my-learning" className="space-y-6">
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold mb-1">My Learning Journey</h2>
                      <p className="text-muted-foreground">Track your progress and continue learning</p>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center gap-2">
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none">
                        {userCourses.filter(c => !c.completed).length} Courses In Progress
                      </Badge>
                      <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-none">
                        {userCourses.filter(c => c.completed).length} Course Completed
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {userCourses.filter(c => !c.completed).map((course) => (
                      <Card 
                        key={course.id} 
                        className="p-4 border-l-4 border-l-primary hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedCourse(course)}
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          <div 
                            className="w-full md:w-48 h-24 bg-cover bg-center rounded-md" 
                            style={{ backgroundImage: `url(${course.image})` }}
                          ></div>
                          <div className="flex-grow">
                            <h3 className="font-bold mb-1">{course.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mb-3">
                              <BookOpen className="h-4 w-4 mr-2" />
                              {Math.round(course.progress / 100 * course.content.length)} of {course.content.length} modules completed
                            </div>
                            <div className="mb-3">
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full" 
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className="text-xs text-muted-foreground">Progress: {course.progress}%</span>
                                <span className="text-xs text-muted-foreground">
                                  Estimated: {Math.round((100 - course.progress) / 100 * parseInt(course.duration) * 0.6)}h remaining
                                </span>
                              </div>
                            </div>
                            <Button 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleContinueCourse(course.id);
                              }}
                            >
                              Continue Learning
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                    
                    {userCourses.filter(c => c.completed).map((course) => (
                      <Card 
                        key={course.id} 
                        className="p-4 border-l-4 border-l-green-500 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedCourse(course)}
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          <div 
                            className="w-full md:w-48 h-24 bg-cover bg-center rounded-md" 
                            style={{ backgroundImage: `url(${course.image})` }}
                          ></div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-bold">{course.title}</h3>
                              <Badge className="bg-green-500">Completed</Badge>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-3">
                              <Award className="h-4 w-4 mr-2 text-green-500" />
                              Certificate earned on March 15, 2025
                            </div>
                            <div className="flex justify-between">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toast({
                                    title: "Certificate",
                                    description: "Your certificate is being downloaded.",
                                  });
                                }}
                              >
                                View Certificate
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toast({
                                    title: "Review Submitted",
                                    description: "Thank you for reviewing this course!",
                                  });
                                }}
                              >
                                Review Course
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.filter(c => !userCourses.some(uc => uc.id === c.id)).slice(0, 1).map((course) => (
                      <div 
                        key={course.id} 
                        className="flex gap-4 cursor-pointer hover:bg-muted/20 p-2 rounded-md"
                        onClick={() => setSelectedCourse(course)}
                      >
                        <div 
                          className="w-24 h-24 bg-cover bg-center rounded-md" 
                          style={{ backgroundImage: `url(${course.image})` }}
                        ></div>
                        <div className="flex-grow">
                          <h3 className="font-bold mb-1">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{course.description}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Star className="h-3 w-3 text-yellow-500 mr-1" />
                            {course.rating} • {course.duration}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {articles.slice(0, 1).map((article) => (
                      <div 
                        key={article.id} 
                        className="flex gap-4 cursor-pointer hover:bg-muted/20 p-2 rounded-md"
                        onClick={() => handleReadArticle(article)}
                      >
                        <div 
                          className="w-24 h-24 bg-cover bg-center rounded-md" 
                          style={{ backgroundImage: `url(${article.image})` }}
                        ></div>
                        <div className="flex-grow">
                          <h3 className="font-bold mb-1">{article.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{article.description}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Newspaper className="h-3 w-3 mr-1" />
                            {article.readTime} • By {article.author}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">Saved Articles</h2>
                  <div className="space-y-4">
                    {articles.filter(a => a.saved).length > 0 ? (
                      articles.filter(a => a.saved).map((article) => (
                        <div 
                          key={article.id}
                          className="flex gap-4 cursor-pointer hover:bg-muted/20 p-2 rounded-md"
                          onClick={() => handleReadArticle(article)}
                        >
                          <div 
                            className="w-16 h-16 bg-cover bg-center rounded-md" 
                            style={{ backgroundImage: `url(${article.image})` }}
                          ></div>
                          <div className="flex-grow">
                            <h3 className="font-medium">{article.title}</h3>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span>{article.date}</span>
                              <span className="mx-1">•</span>
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSaveArticle(article.id);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <BookOpen className="h-8 w-8 mx-auto mb-4 opacity-50" />
                        <p>You haven't saved any articles yet.</p>
                        <p className="text-sm">Browse articles and save them for later reading.</p>
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </AppLayout>
  );
};

export default Learn;
