
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertTriangle, HelpCircle, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

// Mock quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is considered the safest investment?",
    options: [
      { id: "a", text: "Cryptocurrency" },
      { id: "b", text: "Individual Stocks" },
      { id: "c", text: "Government Bonds" },
      { id: "d", text: "Commodities" }
    ],
    correctAnswer: "c",
    explanation: "Government bonds, especially those issued by stable governments like U.S. Treasury bonds, are generally considered among the safest investments because they have very low default risk."
  },
  {
    id: 2,
    question: "What is diversification in an investment portfolio?",
    options: [
      { id: "a", text: "Investing all your money in different tech stocks" },
      { id: "b", text: "Spreading investments across various asset classes to reduce risk" },
      { id: "c", text: "Focusing on one sector that has the highest returns" },
      { id: "d", text: "Constantly buying and selling investments" }
    ],
    correctAnswer: "b",
    explanation: "Diversification involves spreading investments across different asset classes (stocks, bonds, real estate, etc.) and within those classes to reduce the impact of any single investment's poor performance on the overall portfolio."
  },
  {
    id: 3,
    question: "What is the primary purpose of a 401(k) plan?",
    options: [
      { id: "a", text: "Short-term savings" },
      { id: "b", text: "Education funding" },
      { id: "c", text: "Retirement savings" },
      { id: "d", text: "Emergency fund" }
    ],
    correctAnswer: "c",
    explanation: "A 401(k) is an employer-sponsored retirement plan that allows employees to save and invest a portion of their paycheck before taxes are taken out, primarily designed for long-term retirement savings."
  },
  {
    id: 4,
    question: "What is the 'Rule of 72' used for in investing?",
    options: [
      { id: "a", text: "To calculate your maximum loss potential" },
      { id: "b", text: "To estimate how long it takes for an investment to double given a fixed annual rate of return" },
      { id: "c", text: "To determine the ideal asset allocation based on age" },
      { id: "d", text: "To calculate the minimum investment needed to reach a financial goal" }
    ],
    correctAnswer: "b",
    explanation: "The Rule of 72 is a simple way to determine how long an investment will take to double given a fixed annual rate of return. You divide 72 by the annual rate of return to get the approximate number of years."
  },
  {
    id: 5,
    question: "What does P/E ratio measure?",
    options: [
      { id: "a", text: "A company's profitability relative to its revenue" },
      { id: "b", text: "The time period to earn back your investment" },
      { id: "c", text: "A company's share price relative to its earnings per share" },
      { id: "d", text: "The percentage of a company owned by executives" }
    ],
    correctAnswer: "c",
    explanation: "The Price-to-Earnings (P/E) ratio measures a company's current share price relative to its per-share earnings. It helps investors analyze whether a stock is overvalued or undervalued compared to similar companies or the market."
  }
];

const QuizModule: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();
  
  const handleAnswerSelect = (value: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(value);
    }
  };
  
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Select an Answer",
        description: "Please select an answer before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnswerSubmitted(true);
    
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
      toast({
        title: "Quiz Completed!",
        description: `You scored ${score + (selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? 1 : 0)} out of ${quizQuestions.length}`,
      });
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };
  
  const currentProgress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  
  const getFeedbackIcon = (optionId: string) => {
    if (!isAnswerSubmitted) return null;
    
    const correct = quizQuestions[currentQuestion].correctAnswer;
    
    if (optionId === correct) {
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    } else if (optionId === selectedAnswer) {
      return <XCircle className="h-5 w-5 text-red-500" />;
    }
    
    return null;
  };
  
  // Feedback based on score
  const getFeedback = () => {
    const finalScore = score + (selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? 1 : 0);
    const percentage = (finalScore / quizQuestions.length) * 100;
    
    if (percentage >= 80) {
      return {
        title: "Excellent Knowledge!",
        description: "You have a strong understanding of investment fundamentals. Keep learning and expanding your knowledge!",
        icon: <Award className="h-8 w-8 text-green-500" />,
        badge: "Expert"
      };
    } else if (percentage >= 60) {
      return {
        title: "Good Understanding!",
        description: "You have a good grasp of investment basics. Consider exploring more advanced topics to deepen your knowledge.",
        icon: <CheckCircle2 className="h-8 w-8 text-blue-500" />,
        badge: "Intermediate"
      };
    } else {
      return {
        title: "Good Start!",
        description: "You're on the right track. We recommend focusing on the fundamental concepts of investing before moving to more advanced topics.",
        icon: <AlertTriangle className="h-8 w-8 text-amber-500" />,
        badge: "Beginner"
      };
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>
          {quizCompleted ? "Quiz Results" : "Investment Knowledge Quiz"}
        </CardTitle>
        <CardDescription>
          {quizCompleted 
            ? "See how well you understand investment concepts"
            : "Test your knowledge of investment fundamentals"
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!quizCompleted ? (
          <>
            <div className="mb-4">
              <div className="flex justify-between mb-1 text-sm">
                <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                <span>Score: {score}/{currentQuestion}</span>
              </div>
              <Progress value={currentProgress} className="h-2" />
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">
                {quizQuestions[currentQuestion].question}
              </h3>
              
              <RadioGroup 
                value={selectedAnswer || ""} 
                onValueChange={handleAnswerSelect}
                className="space-y-3"
              >
                {quizQuestions[currentQuestion].options.map((option) => (
                  <div 
                    key={option.id} 
                    className={`flex items-center space-x-2 rounded-md border p-3 ${
                      isAnswerSubmitted && option.id === quizQuestions[currentQuestion].correctAnswer
                        ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                        : isAnswerSubmitted && option.id === selectedAnswer
                          ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                          : "border-border"
                    }`}
                  >
                    <RadioGroupItem 
                      value={option.id} 
                      id={`option-${option.id}`} 
                      disabled={isAnswerSubmitted}
                    />
                    <Label 
                      htmlFor={`option-${option.id}`} 
                      className="flex-grow cursor-pointer"
                    >
                      {option.text}
                    </Label>
                    {getFeedbackIcon(option.id)}
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {isAnswerSubmitted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-4 bg-muted/30 rounded-md"
              >
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Explanation:</h4>
                    <p className="text-sm text-muted-foreground">
                      {quizQuestions[currentQuestion].explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center text-center mb-6">
                {getFeedback().icon}
                <h3 className="text-xl font-bold mt-4">{getFeedback().title}</h3>
                <p className="text-muted-foreground mt-2">{getFeedback().description}</p>
                <div className="mt-4">
                  <Badge>{getFeedback().badge} Level</Badge>
                </div>
              </div>
              
              <div className="bg-card border rounded-md p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Your Score</h4>
                  <span className="font-mono font-bold text-lg">
                    {score + (selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? 1 : 0)}/{quizQuestions.length}
                  </span>
                </div>
                <Progress 
                  value={(score + (selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? 1 : 0)) / quizQuestions.length * 100} 
                  className="h-2" 
                />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Recommended Next Steps:</h4>
                <ul className="space-y-2 list-disc list-inside text-sm">
                  <li>Explore our "Investing Fundamentals" course</li>
                  <li>Read articles on asset allocation and diversification</li>
                  <li>Try our portfolio risk assessment tool</li>
                  <li>Join a webinar on creating an investment strategy</li>
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {!quizCompleted ? (
          <>
            {!isAnswerSubmitted ? (
              <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
              </Button>
            )}
          </>
        ) : (
          <div className="w-full flex gap-2">
            <Button variant="outline" className="w-1/2" onClick={resetQuiz}>
              Retake Quiz
            </Button>
            <Button className="w-1/2" onClick={() => {
              toast({
                title: "Certificate Generated",
                description: "Your quiz completion certificate has been generated and added to your profile.",
              });
            }}>
              Get Certificate
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizModule;
