"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BookOpen,
  CalendarIcon,
  TrendingUp,
  Award,
  Clock,
  Users,
  Star,
  ArrowRight,
  Play,
  Target,
  Zap,
  Brain,
  Trophy,
} from "lucide-react";
import CourseGrid from "./CourseGrid";
import Calendar from "./Calendar";
import LearningInsights from "./LearningInsights";
import RecommendedSection from "./RecommendedSection";
import QuickLinks from "./QuickLinks";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs for GSAP animations
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const centerColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Initial page load animation
      const tl = gsap.timeline();

      // Animate background elements
      gsap.set(backgroundRef.current?.children || [], { scale: 0, opacity: 0 });
      gsap.to(backgroundRef.current?.children || [], {
        scale: 1,
        opacity: 1,
        duration: 2.5,
        stagger: 0.4,
        ease: "elastic.out(1, 0.6)",
      });

      // Animate columns with stagger
      tl.fromTo(
        [
          leftColumnRef.current,
          centerColumnRef.current,
          rightColumnRef.current,
        ],
        {
          y: 100,
          opacity: 0,
          scale: 0.9,
          rotationY: -10,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "back.out(1.7)",
        }
      );

      // Floating elements continuous animation
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: "random(-25, 25)",
            x: "random(-20, 20)",
            rotation: "random(-360, 360)",
            duration: "random(5, 8)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3,
          });
        }
      });

      setIsLoaded(true);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none"></div>

      <div className="p-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Left Column - Courses */}
          <div ref={leftColumnRef} className="lg:col-span-3 space-y-6">
            <CourseGrid />
          </div>

          {/* Center Column - Calendar & Recommendations */}
          <div ref={centerColumnRef} className="lg:col-span-4 space-y-6">
            <Calendar />
            <RecommendedSection />
          </div>

          {/* Right Column - Insights & Quick Links */}
          <div ref={rightColumnRef} className="lg:col-span-3 space-y-6">
            <LearningInsights />
            <QuickLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
