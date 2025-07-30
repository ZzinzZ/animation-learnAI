import { Assignment, Conversation, Course, Message } from "@/types/types";

export const assignments: Assignment[] = [
    {
      id: 1,
      title: "Calculus Fundamentals - Midterm Exam",
      course: "Advanced Mathematics",
      type: "exam",
      dueDate: "2024-01-15",
      status: "pending",
      points: 100,
      duration: "45 minutes",
      description:
        "Comprehensive exam covering derivatives, limits, and applications of calculus.",
      questions: 8,
      attempts: 0,
      maxAttempts: 1,
    },
    {
      id: 2,
      title: "Algorithm Analysis Quiz",
      course: "Computer Science Fundamentals",
      type: "quiz",
      dueDate: "2024-01-12",
      status: "completed",
      points: 25,
      duration: "20 minutes",
      description:
        "Quick assessment on Big O notation and algorithm complexity.",
      questions: 10,
      attempts: 1,
      maxAttempts: 2,
      score: 88,
    },
    {
      id: 3,
      title: "Derivative Applications Assignment",
      course: "Advanced Mathematics",
      type: "assignment",
      dueDate: "2024-01-20",
      status: "pending",
      points: 50,
      description:
        "Solve real-world problems using derivatives including optimization and related rates.",
      submissionType: "file",
    },
    {
      id: 4,
      title: "Wave-Particle Duality Quiz",
      course: "Physics: From Classical to Quantum",
      type: "quiz",
      dueDate: "2024-01-18",
      status: "pending",
      points: 30,
      duration: "25 minutes",
      description: "Test your understanding of quantum mechanics fundamentals.",
      questions: 12,
      attempts: 0,
      maxAttempts: 2,
    },
    {
      id: 5,
      title: "Creative Writing Portfolio",
      course: "Creative Writing Workshop",
      type: "assignment",
      dueDate: "2024-01-25",
      status: "in-progress",
      points: 75,
      description:
        "Submit a portfolio of your creative writing pieces including poetry and short stories.",
      submissionType: "text",
    },
    {
      id: 6,
      title: "Data Structures Implementation",
      course: "Computer Science Fundamentals",
      type: "assignment",
      dueDate: "2024-01-22",
      status: "pending",
      points: 60,
      description:
        "Implement stack, queue, and binary tree data structures in your preferred language.",
      submissionType: "code",
    },
  ];

  export const courses: Course[] = [
    {
      id: 1,
      title: "Advanced Mathematics",
      instructor: "Dr. Sarah Chen",
      duration: "12 weeks",
      students: 234,
      rating: 4.8,
      progress: 78,
      thumbnail: "/math.png",
      description:
        "Master calculus, linear algebra, and advanced mathematical concepts.",
    },
    {
      id: 2,
      title: "Computer Science Fundamentals",
      instructor: "Prof. Michael Rodriguez",
      duration: "16 weeks",
      students: 189,
      rating: 4.9,
      progress: 45,
      thumbnail: "/computer.png",
      description:
        "Learn programming, algorithms, and data structures from the ground up.",
    },
    {
      id: 3,
      title: "Physics: From Classical to Quantum",
      instructor: "Dr. Emily Watson",
      duration: "14 weeks",
      students: 156,
      rating: 4.7,
      progress: 92,
      thumbnail: "/physic.png",
      description:
        "Explore the fundamental laws of physics and quantum mechanics.",
    },
    {
      id: 4,
      title: "Creative Writing Workshop",
      instructor: "Prof. James Thompson",
      duration: "8 weeks",
      students: 78,
      rating: 4.6,
      progress: 23,
      thumbnail: "/creative.png",
      description:
        "Develop your creative writing skills through guided practice.",
    },
  ];

  export const conversations:Conversation[] = [
    {
      id: 1,
      type: "ai_tutor",
      name: "MathBot AI",
      course: "Advanced Mathematics",
      lastMessage:
        "Great progress on derivatives! I noticed you might benefit from reviewing the chain rule. Would you like me to generate some practice problems?",
      timestamp: "2 hours ago",
      unread: 2,
      avatar: "/placeholder.svg",
      status: "online",
    },
    {
      id: 2,
      type: "study_group",
      name: "CS Study Group",
      course: "Computer Science Fundamentals",
      lastMessage:
        "Alice: The AI tutor just shared some great algorithm visualizations!",
      timestamp: "4 hours ago",
      unread: 5,
      avatar: "/placeholder.svg",
      status: "active",
    },
    {
      id: 3,
      type: "ai_tutor",
      name: "PhysicsAI Assistant",
      course: "Physics: From Classical to Quantum",
      lastMessage:
        "Based on your recent quiz results, I recommend focusing on wave-particle duality concepts. I can break this down into simpler steps.",
      timestamp: "1 day ago",
      unread: 0,
      avatar: "/placeholder.svg",
      status: "online",
    },
    {
      id: 4,
      type: "announcement",
      name: "Course Announcements",
      course: "Creative Writing Workshop",
      lastMessage:
        "WritingAI has generated new personalized prompts based on your writing style analysis",
      timestamp: "2 days ago",
      unread: 1,
      avatar: "/placeholder.svg",
      status: "system",
    },
  ];

  export const messages:Message[] = [
    {
      id: 1,
      sender: "MathBot AI",
      content:
        "I've analyzed your recent work on derivatives and noticed excellent progress! Your understanding of basic differentiation rules is solid.",
      timestamp: "2:30 PM",
      type: "received",
    },
    {
      id: 2,
      sender: "MathBot AI",
      content:
        "However, I detected some uncertainty when you approached problem 7 involving the chain rule. Would you like me to break down the chain rule concept with step-by-step examples?",
      timestamp: "2:32 PM",
      type: "received",
    },
    {
      id: 3,
      sender: "You",
      content:
        "Yes, that would be helpful! I get confused when there are multiple functions nested together.",
      timestamp: "3:15 PM",
      type: "sent",
    },
    {
      id: 4,
      sender: "MathBot AI",
      content:
        "Perfect! I understand your challenge. Let me generate some visual examples and practice problems tailored to your current level. I'll start with simple compositions and gradually increase complexity.",
      timestamp: "3:45 PM",
      type: "received",
    },
    {
      id: 5,
      sender: "MathBot AI",
      content:
        "I've also noticed you learn better with visual aids based on your interaction patterns. Would you prefer diagrams or step-by-step text explanations for the chain rule?",
      timestamp: "3:46 PM",
      type: "received",
    },
  ];