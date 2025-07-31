import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AssignmentCard from "@/components/AssignmentCard";
import { assignments } from "@/data/mockData";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Assignments = () => {
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("active");
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs for GSAP animations
  const containerRef = useRef<HTMLDivElement>(null);
  // const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Initial page load animation
      const tl = gsap.timeline();

      // Animate background elements first
      gsap.set(backgroundRef.current?.children || [], { scale: 0, opacity: 0 });
      gsap.to(backgroundRef.current?.children || [], {
        scale: 1,
        opacity: 1,
        duration: 2,
        stagger: 0.3,
        ease: "elastic.out(1, 0.5)",
      });

      // Tabs animation
      tl.fromTo(
        tabsRef.current,
        { y: 50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5"
      );

      // Floating elements continuous animation
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: "random(-20, 20)",
            x: "random(-15, 15)",
            rotation: "random(-180, 180)",
            duration: "random(3, 6)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2,
          });
        }
      });

      setIsLoaded(true);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationX: -15,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded, activeTab]);

  const filteredAssignments = assignments.filter((assignment) => {
    if (filter === "all") return true;
    return assignment.status === filter;
  });

  const handleCardRef = (ref: HTMLDivElement, index: number) => {
    cardsRef.current[index] = ref;
  };

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none"></div>

      {/* Header */}
      <div
        // ref={headerRef}
        className=" p-4 relative z-20"
      >
        <div className="max-w-7xl text-center flex flex-col items-center justify-center mx-auto">
          <h1 className="text-4xl mb-6 py-2 font-bold py-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent page-title-text">
            Assignments
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mt-2" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList
            ref={tabsRef}
            className="backdrop-blur-xl bg-theme-surface border border-white/20 p-1 rounded-xl"
          >
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-gradient-to-r rounded-xl data-[state=active]:from-[#2563eb] data-[state=active]:to-[#6366f1] data-[state=active]:text-white text-theme-text hover:text-[#3b81fb] transition-all duration-300"
              onClick={() => setActiveTab("active")}
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-gradient-to-r rounded-xl data-[state=active]:from-[#2563eb] data-[state=active]:to-[#6366f1] data-[state=active]:text-white text-theme-text hover:text-[#3b81fb] transition-all duration-300"
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-gradient-to-r rounded-xl data-[state=active]:from-[#2563eb] data-[state=active]:to-[#6366f1] data-[state=active]:text-white text-theme-text hover:text-[#3b81fb] transition-all duration-300"
              onClick={() => setActiveTab("all")}
            >
              All
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssignments
                .filter((a) => a.status !== "completed")
                .map((assignment, index) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    index={index}
                    onCardRef={handleCardRef}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssignments
                .filter((a) => a.status === "completed")
                .map((assignment, index) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    index={index}
                    onCardRef={handleCardRef}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssignments.map((assignment, index) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  index={index}
                  onCardRef={handleCardRef}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Assignments;
