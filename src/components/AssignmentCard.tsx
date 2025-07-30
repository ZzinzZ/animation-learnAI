import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Brain,
  Play,
  Upload,
  Eye,
  ArrowRight,
  CirclePlay,
} from "lucide-react";
import { gsap } from "gsap";
import { CardContainer } from "./3DCard";

interface Assignment {
  id: number;
  title: string;
  course: string;
  type: "exam" | "quiz" | "assignment";
  dueDate: string;
  status: "pending" | "completed" | "in-progress";
  points: number;
  duration?: string;
  description: string;
  questions?: number;
  attempts?: number;
  maxAttempts?: number;
  score?: number;
  submissionType?: string;
}

interface AssignmentCardProps {
  assignment: Assignment;
  index: number;
  onCardRef: (ref: HTMLDivElement, index: number) => void;
  onStartTest?: (assignment: Assignment) => void;
}

const AssignmentCard = ({
  assignment,
  index,
  onCardRef,
  onStartTest,
}: AssignmentCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const uploadIconRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      onCardRef(cardRef.current, index);
    }
  }, [index, onCardRef]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "completed":
        return "default";
      case "in-progress":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "exam":
        return <Brain className="w-4 h-4" />;
      case "quiz":
        return <CheckCircle className="w-4 h-4" />;
      case "assignment":
        return <FileText className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const handleCardHover = (cardRef: HTMLDivElement, isEntering: boolean) => {
    if (!cardRef) return;

    const tl = gsap.timeline();

    if (isEntering) {
      tl.to(cardRef, {
        y: -8,
        scale: 1.02,
        rotationY: 2,
        duration: 0.4,
        ease: "power2.out",
      })
        .to(
          cardRef.querySelector(".card-glow"),
          {
            opacity: 1,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          },
          0
        )
        .to(
          cardRef.querySelectorAll(".floating-particle"),
          {
            scale: 1.2,
            opacity: 0.8,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
          },
          0
        );
    } else {
      tl.to(cardRef, {
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.4,
        ease: "power2.out",
      })
        .to(
          cardRef.querySelector(".card-glow"),
          {
            opacity: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          0
        )
        .to(
          cardRef.querySelectorAll(".floating-particle"),
          {
            scale: 1,
            opacity: 0.3,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
          },
          0
        );
    }
  };

  const handleButtonClick = (buttonRef: HTMLButtonElement) => {
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

  const handleStartTest = () => {
    if (
      onStartTest &&
      (assignment.type === "exam" || assignment.type === "quiz")
    ) {
      onStartTest(assignment);
    }
  };

  return (
    <CardContainer className="h-full">
      <div
        ref={cardRef}
        className="group relative h-full"
        onMouseEnter={() => handleCardHover(cardRef.current!, true)}
        onMouseLeave={() => handleCardHover(cardRef.current!, false)}
      >
        <Card className="relative overflow-hidden rounded-xl backdrop-blur-xl bg-white/25 border border-white/20 shadow-2xl">
          {/* Animated gradient overlay */}
          <div className="card-glow absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-0" />

          <CardHeader className="pb-3 relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="icon-container p-1.5 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10">
                    {getTypeIcon(assignment.type)}
                  </div>
                  <CardTitle className="text-lg text-black/70">
                    {assignment.title}
                  </CardTitle>
                </div>
                <p className="text-sm text-black/60">{assignment.course}</p>
              </div>
              <Badge
                variant={getStatusColor(assignment.status)}
                className="status-badge backdrop-blur-sm bg-white/10 border-white/20 text-black/50"
              >
                {assignment.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 relative z-10">
            <p className="text-sm text-black/70">{assignment.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="info-card space-y-1 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-3 h-3 text-black/60" />
                  <p className="font-medium text-black/80">Due Date</p>
                </div>
                <p className="text-black/60">
                  {formatDate(assignment.dueDate)}
                </p>
              </div>
              <div className="info-card space-y-1 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-3 h-3 text-black/60" />
                  <p className="font-medium text-black/80">Points</p>
                </div>
                <p className="text-black/60">{assignment.points}</p>
              </div>
              {(assignment.type === "exam" || assignment.type === "quiz") && (
                <>
                  <div className="info-card space-y-1 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-black/60" />
                      <p className="font-medium text-black/80">Duration</p>
                    </div>
                    <p className="text-black/60">{assignment.duration}</p>
                  </div>
                  <div className="info-card space-y-1 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3 h-3 text-black/60" />
                      <p className="font-medium text-black/80">Questions</p>
                    </div>
                    <p className="text-black/60">{assignment.questions}</p>
                  </div>
                </>
              )}
            </div>

            {assignment.score && (
              <div className="score-display p-4 bg-gradient-to-r from-green-500/60 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 rounded-lg">
                <p className="text-sm font-medium text-white flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Score: {assignment.score}%
                </p>
              </div>
            )}

            <div className="flex space-x-2 pt-2">
              {(assignment.type === "exam" || assignment.type === "quiz") &&
                assignment.status === "pending" && (
                  <Button
                    className="action-button button2 flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 shadow-lg relative overflow-hidden"
                    onClick={(e) => {
                      handleButtonClick(e.currentTarget);
                      handleStartTest();
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start {assignment.type === "exam" ? "Exam" : "Quiz"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              {assignment.type === "assignment" &&
                assignment.status === "pending" && (
                  <Button
                    className="action-button button2 flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg relative overflow-hidden"
                    onClick={(e) => handleButtonClick(e.currentTarget)}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Assignment
                  </Button>
                )}
              {assignment.status === "completed" && (
                <Button
                  variant="outline"
                  className="w-full flex justify-center items-center gap-2 button2 bg-theme-primary hover:text-white py-3 rounded-lg hover:bg-opacity-90 transition-all duration-200 font-medium"
                  onClick={(e) => handleButtonClick(e.currentTarget)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  <span>View Submission</span>
                </Button>
              )}
              {assignment.status === "in-progress" && (
                <button className="w-full flex justify-center items-center gap-2 button2 bg-theme-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition-all duration-200 font-medium">
                  <span className="transition-all ease-in-out duration-200">
                    Continue
                  </span>
                  <CirclePlay className="hidden continue-icon" />
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </CardContainer>
  );
};

export default AssignmentCard;
