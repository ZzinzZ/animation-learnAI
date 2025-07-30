import React, { useEffect, useRef } from "react";
import { ChevronRight, CirclePlay } from "lucide-react";
import gsap from "gsap";
import { CardBody, CardContainer } from "./3DCard";

const CourseGrid: React.FC = () => {
  const courseRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<HTMLDivElement[]>([]);

  const courses = [
    {
      id: 1,
      title: "Advanced Mathematics",
      progress: 78,
      nextLesson: "Calculus Integration",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Computer Science",
      progress: 45,
      nextLesson: "Data Structures",
      color: "bg-purple-500",
    },
    {
      id: 3,
      title: "Physics Fundamentals",
      progress: 92,
      nextLesson: "Quantum Mechanics",
      color: "bg-green-500",
    },
    {
      id: 4,
      title: "Creative Writing",
      progress: 23,
      nextLesson: "Character Development",
      color: "bg-orange-500",
    },
  ];

  useEffect(() => {
    gsap.fromTo(
      courseRef.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }
    );

    progressRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { width: "0%" },
        {
          width: `${courses[index].progress}%`,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.2 + index * 0.2,
        }
      );
    });
  }, []);

  return (
    <div
      ref={courseRef}
      className="backdrop-blur-md bg-white/25 rounded-2xl p-6 border border-theme-border"
    >
      <h2 className="text-xl font-bold mb-4 text-theme-text section-title-text">
        Your Courses
      </h2>
      <div className="space-y-4">
        {courses.map((course, index) => (
          <CardContainer className="w-full" key={index}>
            <CardBody>
              <div
                key={course.id}
                className="bg-theme-bg w-full rounded-xl p-4 border border-theme-border hover:shadow-lg transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-theme-text group-hover:text-theme-primary transition-colors">
                    {course.title}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-theme-muted group-hover:text-theme-primary transition-colors" />
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm text-theme-muted mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-theme-border rounded-full h-2 overflow-hidden">
                    <div
                      ref={(el) => {
                        if (el) progressRefs.current[index] = el;
                      }}
                      className={`h-2 rounded-full ${course.color}`}
                    />
                  </div>
                </div>

                <div className="text-sm text-theme-muted">
                  Next:{" "}
                  <span className="text-theme-text font-medium">
                    {course.nextLesson}
                  </span>
                </div>

                <button className="flex justify-center items-center gap-2 w-full button2 mt-3 bg-theme-primary text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 font-medium">
                  <span className="transition-all ease-in-out duration-200">
                    Continue
                  </span>
                  <CirclePlay className="hidden continue-icon" />
                </button>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default CourseGrid;
