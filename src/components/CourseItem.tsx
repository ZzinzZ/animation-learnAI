import { useEffect, useRef } from "react";
import {
  Play,
  Clock,
  Users,
  Star,
  CirclePlay,
  BookOpen,
  Award,
} from "lucide-react";
import { gsap } from "gsap";
import { CardContainer } from "./3DCard";
import { useNavigate } from "react-router-dom";

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  duration: string;
  students: number;
  progress: number;
  thumbnail: string;
}

interface CourseItemProps {
  course: Course;
  index: number;
  onCardRef: (ref: HTMLDivElement, index: number) => void;
  onNavigate?: (courseId: number) => void;
}

const CourseItem = ({
  course,
  index,
  onCardRef,
  onNavigate,
}: CourseItemProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (cardRef.current) {
      onCardRef(cardRef.current, index);
    }
  }, [index, onCardRef]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },
        {
          width: `${course.progress}%`,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.5 + index * 0.1,
        }
      );

      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3 + index * 0.1,
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [course.progress, index]);

  const handleButtonClick = (buttonRef: HTMLButtonElement) => {
    if (!buttonRef) return;
    navigate(`/course/${course.id}`);
    gsap.to(buttonRef, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });

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

  const handlePlayClick = () => {
    if (onNavigate) {
      onNavigate(course.id);
    }
  };

  return (
    <CardContainer className="group relative w-full transform-gpu">
      <div ref={cardRef} className="w-full">
        <div className="relative overflow-hidden rounded-xl backdrop-blur-xl bg-theme-surface border border-white/30 shadow-2xl h-[31rem]">
          {/* Thumbnail Section */}
          <div
            ref={thumbnailRef}
            className="h-48 relative bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: `url(${course.thumbnail})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Progress Badge */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm font-medium border border-white/20">
                <Award className="w-3 h-3" />
                <span>{course.progress}% Complete</span>
              </div>
            </div>

            {/* Play Button */}
            <div className="absolute bottom-4 right-4">
              <button
                className="play-button w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/20 relative overflow-hidden"
                onClick={(e) => handleButtonClick(e.currentTarget)}
              >
                <Play className="w-6 h-6 ml-1" />
              </button>
            </div>

            {/* Floating course type indicator */}
            <div className="absolute top-4 right-4">
              <div className="p-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-lg border border-white/10">
                <BookOpen className="w-4 h-4 text-white/80" />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div
            ref={contentRef}
            className="px-6 py-4 flex flex-col justify-between h-[18.5rem]"
          >
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-theme-text group-hover:text-theme-text transition-colors duration-300">
                {course.title}
              </h3>
              {/* <p className="text-black/60 text-sm leading-relaxed">{course.description}</p> */}
            </div>

            <div className="space-y-4">
              {/* Instructor and Rating */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {course.instructor.charAt(0)}
                    </span>
                  </div>
                  <span className="text-theme-text font-medium">
                    {course.instructor}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-yellow-100/50 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-theme-text font-medium">
                    {course.rating}
                  </span>
                </div>
              </div>

              {/* Duration and Students */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Clock className="w-4 h-4 text-theme-text" />
                  <span className="text-theme-text">{course.duration}</span>
                </div>
                <div className="flex items-center gap-1 bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Users className="w-4 h-4 text-theme-text" />
                  <span className="text-theme-text">{course.students}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-theme-text">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-white/30 backdrop-blur-sm rounded-full h-2 overflow-hidden">
                  <div
                    ref={progressRef}
                    className="h-2 bg-theme-primary rounded-full relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <button
                className="continue-button button2 w-full  flex justify-center group  items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl relative overflow-hidden group/btn"
                onClick={(e) => handleButtonClick(e.currentTarget)}
              >
                <span className="transition-all text-theme-text group-hover:text-theme-text button-content  ease-in-out duration-3000">
                  Continue Learning
                </span>
                <CirclePlay className="w-5 h-5 button-content hidden continue-icon text-theme-text group-hover:text-white transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </CardContainer>
  );
};

export default CourseItem;
