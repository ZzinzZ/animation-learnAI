import React, { useEffect, useRef } from "react";
import { BookOpen, Calculator, Beaker, Edit3 } from "lucide-react";
import gsap from "gsap";

const QuickLinks: React.FC = () => {
  const quickLinksRef = useRef();
  const links = [
    { name: "Math Tools", icon: Calculator, color: "bg-blue-500" },
    { name: "Reading List", icon: BookOpen, color: "bg-green-500" },
    { name: "Lab Reports", icon: Beaker, color: "bg-purple-500" },
    { name: "Essay Planner", icon: Edit3, color: "bg-orange-500" },
  ];

  useEffect(() => {
    gsap.fromTo(
      quickLinksRef.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }
    );
  }, []);
  return (
    <div
      ref={quickLinksRef}
      className="backdrop-blur-md bg-white/25 rounded-2xl p-6 border border-theme-border"
    >
      <h2 className="text-xl font-bold mb-4 text-theme-text section-title-text">Quick Access</h2>
      <div className="grid grid-cols-2 gap-3">
        {links.map((link, index) => (
          <button
            key={index}
            className="group p-4 bg-theme-surface rounded-xl border border-theme-border hover:shadow-lg hover:scale-105 transition-all duration-200 text-center"
          >
            <div
              className={`w-10 h-10 ${link.color} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}
            >
              <link.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-theme-text group-hover:text-theme-primary transition-colors">
              {link.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
