"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  BookOpen,
  Lightbulb,
  Bot,
  Send,
  AlertCircle,
  CheckCircle,
  Timer,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { mockHints, test } from "@/data/mockData";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TestQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes
  const [hintRequest, setHintRequest] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const questionCardRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigatorRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement[]>([]);
  const floatingElementsRef = useRef<HTMLDivElement[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Initial page
      const tl = gsap.timeline();

      // Header animation
      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
        );
      }

      // Progress bar
      if (progressRef.current) {
        tl.fromTo(
          progressRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.6"
        );
      }

      // Question card
      if (questionCardRef.current) {
        tl.fromTo(
          questionCardRef.current,
          { y: 50, opacity: 0, rotationX: -10 },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        );
      }

      // Sidebar
      if (sidebarRef.current) {
        tl.fromTo(
          sidebarRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.6"
        );
      }

      // Floating elements
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: "random(-20, 20)",
            x: "random(-15, 15)",
            rotation: "random(-180, 180)",
            duration: "random(4, 7)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2,
          });
        }
      });

      setIsLoaded(true);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isLoaded && questionCardRef.current) {
      gsap.fromTo(
        questionCardRef.current,
        { x: 30, opacity: 0.7 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );

      // Animate options
      const validOptions = optionsRef.current.filter((el) => el !== null);
      if (validOptions.length > 0) {
        gsap.fromTo(
          validOptions,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.2,
          }
        );
      }
    }
  }, [currentQuestion, isLoaded]);

  const handleButtonClick = (buttonRef: HTMLButtonElement | null) => {
    if (!buttonRef) return;

    gsap.to(buttonRef, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });

    // Ripple
    const ripple = document.createElement("div");
    ripple.className = "absolute inset-0 bg-white/20 rounded-lg scale-0";
    buttonRef.appendChild(ripple);

    gsap.to(ripple, {
      scale: 1,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => ripple.remove(),
    });
  };

  const handleBackClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    navigate(-1);
    handleButtonClick(e.currentTarget);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleHintRequest = () => {
    if (!hintRequest.trim()) return;

    const currentQ = test.questions[currentQuestion];

    setAiResponse(
      mockHints[currentQ.id] ||
        "I can help you think through this step by step. What specific part are you struggling with?"
    );
    setHintRequest("");
  };

  const progress = ((currentQuestion + 1) / test.totalQuestions) * 100;

  const setOptionRef = (el: HTMLDivElement | null, index: number) => {
    if (optionsRef.current) {
      optionsRef.current[index] = el;
    }
  };

  const setFloatingRef = (el: HTMLDivElement | null, index: number) => {
    if (floatingElementsRef.current) {
      floatingElementsRef.current[index] = el;
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen relative">
      {/* Header */}
      <div
        ref={headerRef}
        className="backdrop-blur-xl bg-theme-surface border-b border-white/20 p-4 relative"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-theme-text hover:bg-white/20 backdrop-blur-sm"
              onClick={(e) => handleBackClick(e)}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Assignments</span>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-theme-text">
                {test.title}
              </h1>
              <p className="text-sm text-theme-text">{test.course}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-xl border border-white/20">
              <Timer className="w-4 h-4 text-red-400" />
              <span className="font-mono text-lg text-theme-text">
                {formatTime(timeRemaining)}
              </span>
            </div>
            <Badge className="backdrop-blur-sm bg-theme-primary text-white border-0">
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
            <div
              ref={progressRef}
              className="backdrop-blur-xl bg-theme-surface border border-white/20 rounded-2xl p-4 relative"
            >
              <div className="flex items-center justify-between mb-2 relative z-10">
                <span className="text-sm font-medium text-theme-text">
                  Progress
                </span>
                <span className="text-sm text-theme-text">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 relative z-10">
                <div
                  className="h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Current Question */}
            <div
              ref={questionCardRef}
              className="backdrop-blur-xl bg-theme-surface border border-white/20 rounded-2xl overflow-hidden relative"
            >
              {/* Question Header */}
              <div className="p-6 border-b border-white/10 relative z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-theme-text">
                    Question {currentQuestion + 1}
                  </h2>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                    {test.questions[currentQuestion].points} points
                  </Badge>
                </div>
              </div>

              {/* Question Content */}
              <div className="p-6 space-y-6 relative z-10">
                <p className="text-theme-text leading-relaxed text-lg">
                  {test.questions[currentQuestion].question}
                </p>

                {/* Answer Input */}
                {test.questions[currentQuestion].type === "multiple-choice" && (
                  <div className="space-y-3">
                    {test.questions[currentQuestion].options?.map(
                      (option, index) => (
                        <div
                          key={index}
                          ref={(el) => setOptionRef(el, index)}
                          className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                          onClick={() =>
                            handleAnswerChange(
                              test.questions[currentQuestion].id,
                              option
                            )
                          }
                        >
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <div className="relative">
                              <input
                                type="radio"
                                name={`question-${currentQuestion}`}
                                value={option}
                                checked={
                                  answers[
                                    test.questions[currentQuestion].id
                                  ] === option
                                }
                                onChange={(e) =>
                                  handleAnswerChange(
                                    test.questions[currentQuestion].id,
                                    e.target.value
                                  )
                                }
                                className="sr-only"
                              />
                              <div
                                className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                                  answers[
                                    test.questions[currentQuestion].id
                                  ] === option
                                    ? "border-theme-border bg-theme-primary"
                                    : "border-white/40 group-hover:border-theme-border"
                                }`}
                              >
                                {answers[test.questions[currentQuestion].id] ===
                                  option && (
                                  <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                )}
                              </div>
                            </div>
                            <span className="text-theme-text group-hover:text-theme-text transition-colors">
                              {option}
                            </span>
                          </label>
                        </div>
                      )
                    )}
                  </div>
                )}

                {test.questions[currentQuestion].type === "short-answer" && (
                  <Input
                    placeholder="Enter your answer..."
                    value={answers[test.questions[currentQuestion].id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(
                        test.questions[currentQuestion].id,
                        e.target.value
                      )
                    }
                    className="backdrop-blur-sm bg-theme-surface rounded-xl border border-white/20 text-theme-text placeholder:text-theme-text focus:ring-2 focus:ring-purple-500/50"
                  />
                )}

                {test.questions[currentQuestion].type === "long-answer" && (
                  <Textarea
                    placeholder="Show your work and provide a detailed answer..."
                    value={answers[test.questions[currentQuestion].id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(
                        test.questions[currentQuestion].id,
                        e.target.value
                      )
                    }
                    className="min-h-32 backdrop-blur-sm rounded-xl bg-theme-surface border border-white/20 text-theme-text placeholder:text-theme-text resize-none focus:ring-2 focus:ring-purple-500/50"
                  />
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      handleButtonClick(e.currentTarget);
                      setCurrentQuestion(Math.max(0, currentQuestion - 1));
                    }}
                    disabled={currentQuestion === 0}
                    className="backdrop-blur-sm bg-theme-surface border rounded-xl border-white/20 text-theme-text hover:bg-white/20 hover:border-white/30"
                  >
                    Previous
                  </Button>
                  <div className="flex space-x-2">
                    {currentQuestion === test.totalQuestions - 1 ? (
                      <Button
                        className="bg-gradient-to-r rounded-xl from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
                        onClick={(e) => handleButtonClick(e.currentTarget)}
                      >
                        Submit Test
                      </Button>
                    ) : (
                      <Button
                        onClick={(e) => {
                          handleButtonClick(e.currentTarget);
                          setCurrentQuestion(
                            Math.min(
                              test.totalQuestions - 1,
                              currentQuestion + 1
                            )
                          );
                        }}
                        className="bg-theme-primary rounded-xl text-white border-0"
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div ref={sidebarRef} className="space-y-6">
            {/* Test Info */}
            <div className="backdrop-blur-xl bg-theme-surface border border-white/20 rounded-2xl p-6 relative">
              <h3 className="text-lg font-bold text-theme-text mb-4 flex items-center space-x-2 relative z-10">
                <BookOpen className="w-5 h-5" />
                <span>Test Information</span>
              </h3>
              <div className="space-y-4 relative z-10">
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3">
                  <p className="font-medium text-theme-text text-sm">
                    Duration:
                  </p>
                  <p className="text-theme-text">{test.duration} minutes</p>
                </div>
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3">
                  <p className="font-medium text-theme-text text-sm">
                    Total Points:
                  </p>
                  <p className="text-theme-text">
                    {test.questions.reduce((sum, q) => sum + q.points, 0)}{" "}
                    points
                  </p>
                </div>
                <div className="flex items-start space-x-2 text-xs text-theme-text p-3 backdrop-blur-sm bg-yellow-500/10 border border-yellow-400/20 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    Use the AI assistant for hints, not direct answers
                  </span>
                </div>
              </div>
            </div>

            {/* AI Hint Assistant */}
            <div className="backdrop-blur-xl bg-theme-surface border border-white/20 rounded-2xl p-6 relative">
              <h3 className="text-lg font-bold text-theme-text mb-4 flex items-center space-x-2 relative z-10">
                <Bot className="w-5 h-5 text-blue-400" />
                <span>AI Study Assistant</span>
              </h3>
              <div className="space-y-4 relative z-10">
                <div className="text-sm text-theme-text">
                  I can provide hints and guide your thinking, but I won't give
                  you direct answers. What would you like help with?
                </div>

                {aiResponse && (
                  <div className="backdrop-blur-sm bg-blue-500/10 border border-blue-400/20 rounded-xl p-4">
                    <div className="flex items-start space-x-2">
                      <Lightbulb className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-theme-text">{aiResponse}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <Textarea
                    placeholder="Ask for a hint about this question..."
                    value={hintRequest}
                    onChange={(e) => setHintRequest(e.target.value)}
                    className="min-h-20 rounded-xl backdrop-blur-sm bg-theme-surface border border-white/20 text-theme-text placeholder:text-theme-text resize-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  <Button
                    onClick={(e) => {
                      handleButtonClick(e.currentTarget);
                      handleHintRequest();
                    }}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0"
                    size="sm"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Get Hint
                  </Button>
                </div>

                <div className="text-xs text-theme-text flex items-center space-x-1">
                  <Bot className="w-3 h-3" />
                  <span>
                    Remember: I'm here to guide your thinking, not provide
                    answers
                  </span>
                </div>
              </div>
            </div>

            {/* Question Navigator */}
            <div
              ref={navigatorRef}
              className="backdrop-blur-xl bg-theme-surface border border-white/20 rounded-2xl p-6 relative"
            >
              <h3 className="text-lg font-bold text-theme-text mb-4 relative z-10">
                Question Navigator
              </h3>
              <div className="grid grid-cols-4 gap-2 relative z-10">
                {test.questions.map((_, index) => (
                  <Button
                    key={index}
                    variant={index === currentQuestion ? "default" : "outline"}
                    size="sm"
                    onClick={(e) => {
                      handleButtonClick(e.currentTarget);
                      setCurrentQuestion(index);
                    }}
                    className={`relative transition-all duration-300 ${
                      index === currentQuestion
                        ? "bg-theme-primary text-white border-0"
                        : answers[test.questions[index].id]
                        ? "bg-green-500/20 border-green-400/40 text-theme-text hover:bg-green-500/30"
                        : "backdrop-blur-sm bg-theme-surface border border-white/20 text-theme-text hover:bg-white/20"
                    }`}
                  >
                    {index + 1}
                    {answers[test.questions[index].id] && (
                      <div className="absolute -top-1 -right-1">
                        <CheckCircle className="w-3 h-3 text-green-400 bg-theme-surface rounded-full" />
                      </div>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestQuiz;
