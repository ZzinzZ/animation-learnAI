import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CourseItem from "@/components/CourseItem";
import { BookOpen, TrendingUp, Users, Award } from "lucide-react";
import { courses } from "@/data/mockData";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Courses = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs for GSAP animations
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
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

      // Header animation
      tl.fromTo(
        headerRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "back.out(1.7)" }
      );

      // Stats animation
      tl.fromTo(
        statsRef.current?.children || [],
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      );

      // Floating elements animation
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: "random(-25, 25)",
            x: "random(-20, 20)",
            rotation: "random(-360, 360)",
            duration: "random(4, 8)",
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

  // Animate cards when they appear
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        {
          y: 120,
          opacity: 0,
          scale: 0.8,
          rotationX: -20,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const handleCardRef = (ref: HTMLDivElement, index: number) => {
    cardsRef.current[index] = ref;
  };

  const handleNavigate = (courseId: number) => {
    console.log("Navigating to course:", courseId);
    // Implement navigation logic here
  };

  const stats = [
    {
      icon: BookOpen,
      label: "Active Courses",
      value: "6",
      color: "from-purple-500 to-blue-500",
    },
    {
      icon: TrendingUp,
      label: "Avg Progress",
      value: "52%",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      label: "Total Students",
      value: "12.6K",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Award,
      label: "Certificates",
      value: "3",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
    >

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          ref={(el) => el && (floatingElementsRef.current[0] = el)}
          className="absolute top-24 left-24 w-5 h-5 border border-white/20 rotate-45"
        />
        <div
          ref={(el) => el && (floatingElementsRef.current[1] = el)}
          className="absolute top-48 right-36 w-7 h-7 border border-white/15 rounded-full"
        />
        <div
          ref={(el) => el && (floatingElementsRef.current[2] = el)}
          className="absolute bottom-36 left-1/3 w-4 h-4 bg-white/20 rotate-45"
        />
        {/* <div
          ref={(el) => el && (floatingElementsRef.current[3] = el)}
          className="absolute top-1/3 right-1/4 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
        /> */}
      </div>

      <div className="p-6 max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div  className="mb-8 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl page-title-text mb-2 py-2 font-bold  bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Your Learning Journey
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mx-auto mt-4" />
          <p className="text-black/50 text-lg">Continue your path to mastery</p>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="backdrop-blur-xl bg-white/20 border border-white/20 rounded-xl p-4 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-3`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseItem
              key={course.id}
              course={course}
              index={index}
              onCardRef={handleCardRef}
              onNavigate={handleNavigate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
