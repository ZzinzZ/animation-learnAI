
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, BookOpen, Lightbulb, Bot, Send, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const TestQuiz = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes
  const [showHints, setShowHints] = useState(false);
  const [hintRequest, setHintRequest] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  // Mock test data
  const test = {
    id: testId,
    title: 'Calculus Fundamentals - Midterm Exam',
    course: 'Advanced Mathematics',
    duration: 45,
    totalQuestions: 8,
    type: 'exam',
    instructions: 'Answer all questions. Show your work for partial credit. You may use the AI assistant for hints but not direct answers.',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What is the derivative of f(x) = 3x² + 2x - 5?',
        options: ['6x + 2', '6x - 2', '3x + 2', '6x² + 2x'],
        points: 5
      },
      {
        id: 2,
        type: 'short-answer',
        question: 'Find the limit: lim(x→2) (x² - 4)/(x - 2)',
        points: 8
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'Which of the following represents the chain rule?',
        options: [
          'd/dx[f(g(x))] = f\'(g(x)) · g\'(x)',
          'd/dx[f(g(x))] = f\'(x) · g\'(x)',
          'd/dx[f(g(x))] = f(g\'(x))',
          'd/dx[f(g(x))] = f\'(g(x)) + g\'(x)'
        ],
        points: 5
      },
      {
        id: 4,
        type: 'long-answer',
        question: 'A ball is thrown upward from a height of 6 feet with an initial velocity of 64 ft/s. The height h(t) = -16t² + 64t + 6. Find when the ball reaches its maximum height and what that height is.',
        points: 12
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'What is the derivative of ln(x)?',
        options: ['1/x', 'x', 'ln(x)', 'e^x'],
        points: 5
      },
      {
        id: 6,
        type: 'short-answer',
        question: 'Find the equation of the tangent line to y = x³ - 2x + 1 at x = 1.',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        question: 'Which function is NOT differentiable at x = 0?',
        options: ['f(x) = x²', 'f(x) = |x|', 'f(x) = x³', 'f(x) = sin(x)'],
        points: 5
      },
      {
        id: 8,
        type: 'long-answer',
        question: 'Use the definition of the derivative to find f\'(x) for f(x) = 2x² + 3x. Show all steps.',
        points: 15
      }
    ]
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleHintRequest = () => {
    if (!hintRequest.trim()) return;
    
    const currentQ = test.questions[currentQuestion];
    const mockHints = {
      1: "Think about the power rule: d/dx[x^n] = nx^(n-1). Apply this to each term separately.",
      2: "This looks like an indeterminate form 0/0. Try factoring the numerator. What factors does x² - 4 have?",
      3: "The chain rule is used when you have a composite function. Remember: derivative of outer function times derivative of inner function.",
      4: "To find maximum height, you need to find when the velocity is zero. The velocity is the derivative of the height function.",
      5: "This is a standard derivative you should memorize. The natural logarithm has a special derivative.",
      6: "For a tangent line, you need the slope at that point (the derivative) and the y-coordinate at that point.",
      7: "Think about where a function might not be smooth or have a sharp corner. What happens to the derivative at such points?",
      8: "Use the limit definition: f'(x) = lim(h→0) [f(x+h) - f(x)]/h. Substitute f(x) = 2x² + 3x and expand."
    };

    setAiResponse(mockHints[currentQ.id as keyof typeof mockHints] || "I can help you think through this step by step. What specific part are you struggling with?");
    setHintRequest('');
  };

  const progress = ((currentQuestion + 1) / test.totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-theme-bg">
      {/* Header */}
      <div className="bg-theme-surface border-b border-theme-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/assignments')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Assignments</span>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-theme-text">{test.title}</h1>
              <p className="text-sm text-theme-muted">{test.course}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-theme-text">
              <Clock className="w-4 h-4" />
              <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
            </div>
            <Badge variant="outline">
              {currentQuestion + 1} of {test.totalQuestions}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Test Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-theme-text">Progress</span>
                  <span className="text-sm text-theme-muted">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>

            {/* Current Question */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Question {currentQuestion + 1}
                  </CardTitle>
                  <Badge variant="secondary">
                    {test.questions[currentQuestion].points} points
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-theme-text leading-relaxed">
                  {test.questions[currentQuestion].question}
                </p>

                {/* Answer Input */}
                {test.questions[currentQuestion].type === 'multiple-choice' && (
                  <div className="space-y-2">
                    {test.questions[currentQuestion].options?.map((option, index) => (
                      <label key={index} className="flex items-center space-x-3 p-3 border border-theme-border rounded-lg hover:bg-theme-surface cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          value={option}
                          onChange={(e) => handleAnswerChange(test.questions[currentQuestion].id, e.target.value)}
                          className="text-theme-primary"
                        />
                        <span className="text-theme-text">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {test.questions[currentQuestion].type === 'short-answer' && (
                  <Input
                    placeholder="Enter your answer..."
                    value={answers[test.questions[currentQuestion].id] || ''}
                    onChange={(e) => handleAnswerChange(test.questions[currentQuestion].id, e.target.value)}
                    className="text-theme-text"
                  />
                )}

                {test.questions[currentQuestion].type === 'long-answer' && (
                  <Textarea
                    placeholder="Show your work and provide a detailed answer..."
                    value={answers[test.questions[currentQuestion].id] || ''}
                    onChange={(e) => handleAnswerChange(test.questions[currentQuestion].id, e.target.value)}
                    className="min-h-32 text-theme-text"
                  />
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  <div className="flex space-x-2">
                    {currentQuestion === test.totalQuestions - 1 ? (
                      <Button className="bg-green-600 hover:bg-green-700">
                        Submit Test
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setCurrentQuestion(Math.min(test.totalQuestions - 1, currentQuestion + 1))}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Assistant Sidebar */}
          <div className="space-y-6">
            {/* Test Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Test Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium text-theme-text">Duration:</p>
                  <p className="text-theme-muted">{test.duration} minutes</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-theme-text">Total Points:</p>
                  <p className="text-theme-muted">{test.questions.reduce((sum, q) => sum + q.points, 0)} points</p>
                </div>
                <Separator />
                <div className="text-xs text-theme-muted">
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  Use the AI assistant for hints, not direct answers
                </div>
              </CardContent>
            </Card>

            {/* AI Hint Assistant */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-blue-500" />
                  <span>AI Study Assistant</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-theme-muted">
                  I can provide hints and guide your thinking, but I won't give you direct answers. What would you like help with?
                </div>
                
                {aiResponse && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                      <p className="text-sm text-blue-800">{aiResponse}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Textarea
                    placeholder="Ask for a hint about this question..."
                    value={hintRequest}
                    onChange={(e) => setHintRequest(e.target.value)}
                    className="min-h-20"
                  />
                  <Button 
                    onClick={handleHintRequest}
                    className="w-full"
                    size="sm"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Get Hint
                  </Button>
                </div>

                <div className="text-xs text-theme-muted">
                  <Bot className="w-3 h-3 inline mr-1" />
                  Remember: I'm here to guide your thinking, not provide answers
                </div>
              </CardContent>
            </Card>

            {/* Question Navigator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Question Navigator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {test.questions.map((_, index) => (
                    <Button
                      key={index}
                      variant={index === currentQuestion ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentQuestion(index)}
                      className={`relative ${
                        answers[test.questions[index].id] ? 'bg-green-100 border-green-300' : ''
                      }`}
                    >
                      {index + 1}
                      {answers[test.questions[index].id] && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestQuiz;
