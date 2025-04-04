
import React, { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, BookOpen, Play, Clock, Star, Award, Filter, FileText, Video, Newspaper, ArrowRight, Calendar } from "lucide-react";
import { AnimatedCard } from "@/components/ui/animated-card";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D",
    tags: ["REITs", "real estate", "income investing"],
    upcoming: false,
  },
];

const Learn = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const handleEnrollCourse = (courseId: number) => {
    toast({
      title: "Enrolled Successfully",
      description: "You have been enrolled in the course. Start learning now!",
      duration: 3000,
    });
  };
  
  const handleReadArticle = (articleId: number) => {
    toast({
      title: "Article Opened",
      description: "The article content will be available soon.",
      duration: 3000,
    });
  };
  
  const handleRegisterWebinar = (webinarId: number) => {
    toast({
      title: "Registration Successful",
      description: "You have been registered for the webinar. A calendar invite has been sent to your email.",
      duration: 3000,
    });
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
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="webinars">Webinars</TabsTrigger>
              <TabsTrigger value="my-learning">My Learning</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <AnimatedCard key={course.id} className="overflow-hidden h-full flex flex-col">
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
                    
                    <Button onClick={() => handleEnrollCourse(course.id)} className="w-full">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Enroll Now
                    </Button>
                  </div>
                </AnimatedCard>
              ))}
            </div>
            
            <div className="flex justify-center">
              <Button variant="outline">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="articles" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <AnimatedCard key={article.id} className="overflow-hidden flex flex-col md:flex-row">
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
                      <Button variant="ghost" size="sm" onClick={() => handleReadArticle(article.id)}>
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
            
            <div className="flex justify-center">
              <Button variant="outline">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="webinars" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webinars.map((webinar) => (
                <AnimatedCard key={webinar.id} className="overflow-hidden flex flex-col">
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
                    
                    <Button 
                      onClick={() => handleRegisterWebinar(webinar.id)} 
                      variant={webinar.upcoming ? "default" : "outline"}
                      className="w-full"
                    >
                      {webinar.upcoming ? "Register Now" : "Watch Recording"}
                    </Button>
                  </div>
                </AnimatedCard>
              ))}
            </div>
            
            <div className="flex justify-center">
              <Button variant="outline">
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
                    2 Courses In Progress
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-none">
                    1 Course Completed
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <Card className="p-4 border-l-4 border-l-primary">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div 
                      className="w-full md:w-48 h-24 bg-cover bg-center rounded-md" 
                      style={{ backgroundImage: `url(${courses[0].image})` }}
                    ></div>
                    <div className="flex-grow">
                      <h3 className="font-bold mb-1">{courses[0].title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <BookOpen className="h-4 w-4 mr-2" />
                        4 of 8 modules completed
                      </div>
                      <div className="mb-3">
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "50%" }}></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-muted-foreground">Progress: 50%</span>
                          <span className="text-xs text-muted-foreground">Estimated: 2h remaining</span>
                        </div>
                      </div>
                      <Button size="sm">Continue Learning</Button>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 border-l-4 border-l-primary">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div 
                      className="w-full md:w-48 h-24 bg-cover bg-center rounded-md" 
                      style={{ backgroundImage: `url(${courses[2].image})` }}
                    ></div>
                    <div className="flex-grow">
                      <h3 className="font-bold mb-1">{courses[2].title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <BookOpen className="h-4 w-4 mr-2" />
                        2 of 10 modules completed
                      </div>
                      <div className="mb-3">
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "20%" }}></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-muted-foreground">Progress: 20%</span>
                          <span className="text-xs text-muted-foreground">Estimated: 4h remaining</span>
                        </div>
                      </div>
                      <Button size="sm">Continue Learning</Button>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 border-l-4 border-l-green-500">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div 
                      className="w-full md:w-48 h-24 bg-cover bg-center rounded-md" 
                      style={{ backgroundImage: `url(${courses[1].image})` }}
                    ></div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold">{courses[1].title}</h3>
                        <Badge className="bg-green-500">Completed</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <Award className="h-4 w-4 mr-2 text-green-500" />
                        Certificate earned on March 15, 2025
                      </div>
                      <div className="flex justify-between">
                        <Button size="sm" variant="outline">View Certificate</Button>
                        <Button size="sm" variant="outline">Review Course</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.slice(3, 4).map((course) => (
                  <div key={course.id} className="flex gap-4">
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
                  <div key={article.id} className="flex gap-4">
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
          </TabsContent>
        </Tabs>
      </motion.div>
    </AppLayout>
  );
};

export default Learn;
