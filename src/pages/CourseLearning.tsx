import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
} from "lucide-react";

const CourseLearning = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);

  // Mock course data
  const course = {
    id: courseId,
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

  return (
    <div className="min-h-screen bg-theme-bg">
      {/* Header */}
      <div className="bg-theme-surface border-b border-theme-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/courses")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Courses</span>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-theme-text">
                {course.title}
              </h1>
              <p className="text-sm text-theme-muted">{course.instructor}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-theme-text">
                {course.progress}% Complete
              </p>
              <Progress value={course.progress} className="w-32" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-700 rounded-t-lg relative">
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
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setCurrentLesson(Math.max(0, currentLesson - 1))
                          }
                          disabled={currentLesson === 0}
                          className="text-white hover:bg-white/20"
                        >
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="text-white hover:bg-white/20"
                        >
                          {isPlaying ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setCurrentLesson(
                              Math.min(
                                course.lessons.length - 1,
                                currentLesson + 1
                              )
                            )
                          }
                          disabled={currentLesson === course.lessons.length - 1}
                          className="text-white hover:bg-white/20"
                        >
                          <SkipForward className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-sm">
                        {currentLesson + 1} of {course.lessons.length}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>{course.lessons[currentLesson].title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-theme-muted">
                        In this lesson, we'll explore the fundamental concepts
                        of derivatives and how they apply to real-world
                        problems. We'll start with the basic definition and work
                        our way through practical examples.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-theme-surface rounded-lg">
                          <h4 className="font-semibold text-theme-text mb-2">
                            Key Concepts
                          </h4>
                          <ul className="text-sm text-theme-muted space-y-1">
                            <li>• Rate of change</li>
                            <li>• Slope of tangent lines</li>
                            <li>• Limit definition</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-theme-surface rounded-lg">
                          <h4 className="font-semibold text-theme-text mb-2">
                            Prerequisites
                          </h4>
                          <ul className="text-sm text-theme-muted space-y-1">
                            <li>• Basic algebra</li>
                            <li>• Understanding of limits</li>
                            <li>• Function notation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <textarea
                        className="w-full h-32 p-4 border border-theme-border rounded-lg bg-theme-surface text-theme-text resize-none"
                        placeholder="Take notes during the lesson..."
                      />
                      <Button>Save Notes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources">
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-theme-surface rounded-lg">
                        <FileText className="w-5 h-5 text-theme-primary" />
                        <div>
                          <p className="font-medium text-theme-text">
                            Derivative Formula Sheet
                          </p>
                          <p className="text-sm text-theme-muted">
                            Essential formulas and rules
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-theme-surface rounded-lg">
                        <BookOpen className="w-5 h-5 text-theme-primary" />
                        <div>
                          <p className="font-medium text-theme-text">
                            Practice Problems
                          </p>
                          <p className="text-sm text-theme-muted">
                            20 problems with solutions
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        index === currentLesson
                          ? "bg-theme-primary/10 border border-theme-primary/20"
                          : "hover:bg-theme-surface"
                      }`}
                      onClick={() => setCurrentLesson(index)}
                    >
                      {lesson.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-theme-muted" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-theme-text text-sm">
                          {lesson.title}
                        </p>
                        <p className="text-xs text-theme-muted">
                          {lesson.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  Download Materials
                </Button>
                <Button className="w-full" variant="outline">
                  Join Discussion
                </Button>
                <Button className="w-full" variant="outline">
                  Take Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearning;
