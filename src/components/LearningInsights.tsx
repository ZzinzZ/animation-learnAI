import React, { useEffect, useRef } from "react";
import { TrendingUp, Award, Clock, Target } from "lucide-react";
import gsap from "gsap";

const LearningInsights: React.FC = () => {
  const inSightsRef = useRef();
  const progressRefs = useRef<HTMLDivElement[]>([]);

  const stats = [
    {
      label: "Lessons Completed",
      value: "12",
      change: "+3 this week",
      icon: Award,
      color: "text-green-500",
    },
    {
      label: "Study Time",
      value: "4.2h",
      change: "This week",
      icon: Clock,
      color: "text-blue-500",
    },
    {
      label: "Streak",
      value: "7 days",
      change: "Keep it up!",
      icon: Target,
      color: "text-purple-500",
    },
  ];

  const achievements = [
    { name: "Math Master", progress: 80 },
    { name: "Consistent Learner", progress: 100 },
    { name: "Quick Thinker", progress: 60 },
  ];

  useEffect(() => {
    gsap.fromTo(
      inSightsRef.current,
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
          width: `${achievements[index].progress}%`,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2 + index * 0.2,
        }
      );
    });
  }, []);
  return (
    <div
      ref={inSightsRef}
      className="backdrop-blur-md bg-white/25 rounded-2xl p-6 border border-theme-border"
    >
      <h2 className="text-xl font-bold mb-4 text-theme-text section-title-text">
        Learning Insights
      </h2>

      <div className="space-y-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg bg-theme-bg border border-theme-border`}
            >
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="font-semibold text-theme-text">{stat.value}</p>
              <p className="text-sm text-theme-muted">{stat.label}</p>
              <p className="text-xs text-theme-primary">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold text-theme-text mb-3">Achievements</h3>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-theme-text">{achievement.name}</span>
                <span className="text-theme-muted">
                  {achievement.progress}%
                </span>
              </div>
              <div className="w-full bg-theme-border rounded-full h-2">
                <div
                  ref={(el) => {
                    if (el) progressRefs.current[index] = el;
                  }}
                  className="h-2 bg-theme-primary rounded-full transition-all duration-300"
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-theme-bg rounded-xl border border-theme-border">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="w-4 h-4 text-theme-primary" />
          <span className="text-sm font-medium text-theme-text">Study Tip</span>
        </div>
        <p className="text-sm text-theme-muted">
          Try breaking study sessions into 25-minute focused blocks with short
          breaks.
        </p>
      </div>
    </div>
  );
};

export default LearningInsights;
