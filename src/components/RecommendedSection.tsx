import React, { useEffect, useRef } from "react";
import { Play, BookOpen, Brain } from "lucide-react";
import gsap from "gsap";
import { CardContainer } from "./3DCard";

const RecommendedSection: React.FC = () => {
  const recommendedRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      recommendedRef.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }
    );
  }, []);

  const recommendations = [
    {
      id: 1,
      title: "Quick Math Review",
      description: "Brush up on algebra basics",
      type: "quiz",
      duration: "10 min",
      icon: Brain,
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      id: 2,
      title: "Physics Concepts",
      description: "Understanding momentum",
      type: "video",
      duration: "15 min",
      icon: Play,
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
    },
    {
      id: 3,
      title: "Writing Techniques",
      description: "Improve your essays",
      type: "article",
      duration: "8 min",
      icon: BookOpen,
      color: "bg-gradient-to-br from-green-400 to-green-600",
    },
  ];

  return (
    <div
      ref={recommendedRef}
      className="backdrop-blur-md bg-white/25 rounded-2xl p-6 border border-theme-border"
    >
      <h2 className="text-xl font-bold mb-4 text-theme-text section-title-text">
        Recommended for You
      </h2>
      <div className="grid gap-4">
        {recommendations.map((item) => (
          <CardContainer key={item.id} className="w-full">
            <div
            className="group bg-theme-surface recommend-card w-full cursor-pointer bg-theme-bg rounded-xl p-4 border border-theme-border hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 recommend-icon rounded-xl ${item.color} flex items-center justify-center text-white`}
              >
                <item.icon className="w-6 h-6 " />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-theme-text group-hover:text-theme-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-theme-muted">{item.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs bg-theme-primary/20 text-theme-primary px-2 py-1 rounded-full">
                    {item.type}
                  </span>
                  <span className="text-xs text-theme-muted">
                    {item.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSection;
