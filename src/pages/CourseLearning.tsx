import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  BookOpen,
  FileText,
  CheckCircle,
  Circle,
  Download,
  MessageSquare,
  Brain,
  Volume2,
  Settings,
  Maximize,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CourseLearning = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs for GSAP animations
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const lessonsRef = useRef<HTMLDivElement[]>([]);
  const controlsRef = useRef<HTMLDivElement>(null);
  const { themeColors } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Initial page load animation
      const tl = gsap.timeline();

      // Header animation
      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
        );
      }

      // Video player animation
      if (videoPlayerRef.current) {
        tl.fromTo(
          videoPlayerRef.current,
          { scale: 0.9, opacity: 0, rotationY: -10 },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        );
      }
      const elementsToAnimate = [tabsRef.current, sidebarRef.current].filter(
        (el) => el !== null
      );
      if (elementsToAnimate.length > 0) {
        tl.fromTo(
          elementsToAnimate,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        );
      }

      setIsLoaded(true);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animate lessons when change
  useEffect(() => {
    if (isLoaded) {
      const validLessons = lessonsRef.current.filter((el) => el !== null);
      if (validLessons.length > 0) {
        gsap.fromTo(
          validLessons,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }
    }
  }, [isLoaded, currentLesson]);

  const handleCardHover = (
    cardRef: HTMLDivElement | null,
    isEntering: boolean
  ) => {
    if (!cardRef) return;

    gsap.to(cardRef, {
      y: isEntering ? -4 : 0,
      scale: isEntering ? 1.02 : 1,
      duration: 0.3,
      ease: "power2.out",
    });

    const glowElement = cardRef.querySelector(".card-glow");
    if (glowElement) {
      gsap.to(glowElement, {
        opacity: isEntering ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleButtonClick = (buttonRef: HTMLButtonElement | null) => {
    if (!buttonRef) return;

    gsap.to(buttonRef, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });

    // Ripple effect
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

  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    navigate(-1);
    handleButtonClick(e.currentTarget);
  }

  const handleLessonClick = (index: number) => {
    setCurrentLesson(index);

    // Animate lesson transition
    if (videoPlayerRef.current) {
      gsap.to(videoPlayerRef.current, {
        scale: 0.98,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
    }
  };

  const course = {
    id: "1",
    title: "Advanced Mathematics",
    instructor: "Dr. Sarah Chen",
    progress: 78,
    currentChapter: "Calculus Fundamentals",
    lessons: [
      {
        id: 1,
        title: "Introduction to Derivatives",
        duration: "12:30",
        completed: true,
        type: "video",
      },
      {
        id: 2,
        title: "The Power Rule",
        duration: "8:45",
        completed: true,
        type: "video",
      },
      {
        id: 3,
        title: "Practice Problems",
        duration: "15:00",
        completed: false,
        type: "exercise",
      },
      {
        id: 4,
        title: "Chain Rule Basics",
        duration: "10:20",
        completed: false,
        type: "video",
      },
      {
        id: 5,
        title: "Advanced Applications",
        duration: "14:15",
        completed: false,
        type: "video",
      },
    ],
  };

  const setLessonRef = (el: HTMLDivElement | null, index: number) => {
    if (lessonsRef.current) {
      lessonsRef.current[index] = el;
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen relative">
      {/* Header */}
      <div
        ref={headerRef}
        className="backdrop-blur-xl bg-theme-surface border-b border-white/20 p-4 relative"
      >
        <div className="card-glow absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 opacity-0" />
        <div className="max-w-6xl mx-auto flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-theme-text hover:bg-white/20 backdrop-blur-sm"
              onClick={(e) => handleBackClick(e)}
            >
              <ArrowLeft className="w-4 h-4 text-theme-text" />
              <span className="text-theme-text">Back to Courses</span>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-theme-text">
                {course.title}
              </h1>
              <p className="text-sm text-theme-text">{course.instructor}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-theme-text">
                {course.progress}% Complete
              </p>
              <div className="w-32 bg-white/20 rounded-full h-2 mt-1">
                <div
                  className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div
              ref={videoPlayerRef}
              className="backdrop-blur-xl bg-theme-surface border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 relative"
              onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
            >
              <div className="card-glow absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-0 rounded-2xl" />

              <div className="aspect-video bg-gradient-to-br from-blue-600/80 to-purple-700/80 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      {course.lessons[currentLesson].title}
                    </h3>
                    <p className="text-blue-100">
                      Duration: {course.lessons[currentLesson].duration}
                    </p>
                  </div>
                </div>

                {/* Video Controls */}
                <div
                  ref={controlsRef}
                  className="absolute bottom-0 left-0 right-0 p-4"
                >
                  <div className="backdrop-blur-md bg-black/30 rounded-xl p-4">
                    <div className="flex items-center justify-between text-theme-text mb-3">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            handleButtonClick(e.currentTarget);
                            setCurrentLesson(Math.max(0, currentLesson - 1));
                          }}
                          disabled={currentLesson === 0}
                          className="text-white hover:bg-white/20 disabled:opacity-50"
                        >
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            handleButtonClick(e.currentTarget);
                            setIsPlaying(!isPlaying);
                          }}
                          className="text-white hover:bg-white/20 w-12 h-12 rounded-full bg-theme-surface"
                        >
                          {isPlaying ? (
                            <Pause className="w-6 h-6" />
                          ) : (
                            <Play className="w-6 h-6 ml-1" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            handleButtonClick(e.currentTarget);
                            setCurrentLesson(
                              Math.min(
                                course.lessons.length - 1,
                                currentLesson + 1
                              )
                            );
                          }}
                          disabled={currentLesson === course.lessons.length - 1}
                          className="text-white hover:bg-white/20 disabled:opacity-50"
                        >
                          <SkipForward className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/20"
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/20"
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/20"
                        >
                          <Maximize className="w-4 h-4" />
                        </Button>
                        <div className="text-sm text-white">
                          {currentLesson + 1} of {course.lessons.length}
                        </div>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full bg-white/20 rounded-full h-1">
                      <div className="h-1 bg-white rounded-full w-1/3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content Tabs */}
            <div ref={tabsRef}>
              <Tabs defaultValue="overview" className="space-y-4">
                <div className="backdrop-blur-xl bg-theme-surface border border-white/20 rounded-2xl p-1">
                  <TabsList className="grid w-full grid-cols-3 bg-transparent">
                    <TabsTrigger
                      value="overview"
                      className={` data-[state=active]:bg-theme-primary rounded-xl border-none data-[state=active]:text-white text-theme-text hover:text-theme-text transition-all duration-300`}
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="notes"
                      className=" border-none data-[state=active]:bg-theme-primary rounded-xl data-[state=active]:text-white text-theme-text hover:text-theme-text transition-all duration-300"
                    >
                      Notes
                    </TabsTrigger>
                    <TabsTrigger
                      value="resources"
                      className="  border-none data-[state=active]:bg-theme-primary rounded-xl data-[state=active]:text-white text-theme-text hover:text-theme-text transition-all duration-300"
                    >
                      Resources
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="overview">
                  <div
                    className="backdrop-blur-xl bg-theme-surface border border-white/20 rounded-2xl p-6  transition-all duration-300 relative"
                    onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
                    onMouseLeave={(e) =>
                      handleCardHover(e.currentTarget, false)
                    }
                  >
                    <div className="card-glow absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-0 rounded-2xl" />
                    <h3 className="text-xl font-bold text-theme-text mb-4">
                      {course.lessons[currentLesson].title}
                    </h3>
                    <div className="space-y-4 relative z-10">
                      <p className="text-theme-text leading-relaxed">
                        In this lesson, we'll explore the fundamental concepts
                        of derivatives and how they apply to real-world
                        problems. We'll start with the basic definition and work
                        our way through practical examples.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="backdrop-blur-sm bg-theme-surface border border-white/10 rounded-xl p-4">
                          <h4 className="font-semibold text-theme-text mb-3 flex items-center gap-2">
                            <Brain className="w-4 h-4 text-purple-400" />
                            Key Concepts
                          </h4>
                          <ul className="text-sm text-theme-text space-y-2">
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                              Rate of change
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                              Slope of tangent lines
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                              Limit definition
                            </li>
                          </ul>
                        </div>
                        <div className="backdrop-blur-sm bg-theme-surface border border-white/10 rounded-xl p-4">
                          <h4 className="font-semibold text-theme-text mb-3 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-blue-400" />
                            Prerequisites
                          </h4>
                          <ul className="text-sm text-theme-text space-y-2">
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                              Basic algebra
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                              Understanding of limits
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                              Function notation
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes">
                  <div
                    className="backdrop-blur-xl bg-theme-surface border border-white/20 rounded-2xl p-6 transition-all duration-300 relative"
                    onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
                    onMouseLeave={(e) =>
                      handleCardHover(e.currentTarget, false)
                    }
                  >
                    <div className="card-glow absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-0 rounded-2xl" />
                    <h3 className="text-xl font-bold text-theme-text mb-4">
                      Your Notes
                    </h3>
                    <div className="space-y-4 relative z-10">
                      <textarea
                        className="w-full h-32 p-4 backdrop-blur-sm bg-theme-surface border border-white/20 rounded-xl text-theme-text placeholder:text-theme-text resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        placeholder="Take notes during the lesson..."
                      />
                      <Button
                        className="bg-theme-primary text-white border-0"
                        onClick={(e) => handleButtonClick(e.currentTarget)}
                      >
                        Save Notes
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="resources">
                  <div
                    className="backdrop-blur-xl bg-theme-surface border border-white/20 rounded-2xl p-6  transition-all duration-300 relative"
                    onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
                    onMouseLeave={(e) =>
                      handleCardHover(e.currentTarget, false)
                    }
                  >
                    <div className="card-glow absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-0 rounded-2xl" />
                    <h3 className="text-xl font-bold text-theme-text mb-4">
                      Additional Resources
                    </h3>
                    <div className="space-y-3 relative z-10">
                      <div className="flex items-center space-x-3 p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl hover:bg-theme-surface transition-colors cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-theme-text">
                            Derivative Formula Sheet
                          </p>
                          <p className="text-sm text-theme-text">
                            Essential formulas and rules
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl hover:bg-theme-surface transition-colors cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-theme-text">
                            Practice Problems
                          </p>
                          <p className="text-sm text-theme-text">
                            20 problems with solutions
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div ref={sidebarRef} className="space-y-6">
            {/* Course Progress */}
            <div
              className="backdrop-blur-xl bg-theme-surface border border-white/20 rounded-2xl p-6 transition-all duration-300 relative"
              onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
            >
              <div className="card-glow absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-0 rounded-2xl" />
              <h3 className="text-lg font-bold text-theme-text mb-4 relative z-10">
                Course Progress
              </h3>
              <div className="space-y-3 relative z-10">
                {course.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    ref={(el) => setLessonRef(el, index)}
                    className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                      index === currentLesson
                        ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/30"
                        : "hover:bg-theme-surface"
                    }`}
                    onClick={() => handleLessonClick(index)}
                  >
                    {lesson.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-theme-text" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-theme-text text-sm">
                        {lesson.title}
                      </p>
                      <p className="text-xs text-theme-text">
                        {lesson.duration}
                      </p>
                    </div>
                    {index === currentLesson && (
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div
              className="backdrop-blur-xl bg-theme-surface border border-white/20 rounded-2xl p-6 transition-all duration-300 relative"
              onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
            >
              <div className="card-glow absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-0 rounded-2xl" />
              <h3 className="text-lg font-bold text-theme-text mb-4 relative z-10">
                Quick Actions
              </h3>
              <div className="space-y-3 relative z-10">
                <Button
                  className="w-full backdrop-blur-sm rounded-xl bg-theme-surface border border-white/20 text-theme-text hover:bg-white/20 hover:border-white/30 justify-start"
                  variant="outline"
                  onClick={(e) => handleButtonClick(e.currentTarget)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Materials
                </Button>
                <Button
                  className="w-full backdrop-blur-sm rounded-xl bg-theme-surface border border-white/20 text-theme-text hover:bg-white/20 hover:border-white/30 justify-start"
                  variant="outline"
                  onClick={(e) => handleButtonClick(e.currentTarget)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Join Discussion
                </Button>
                <Button
                  className="w-full text-white rounded-xl bg-theme-primary border-0 justify-start"
                  onClick={(e) => handleButtonClick(e.currentTarget)}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Take Quiz
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearning;
