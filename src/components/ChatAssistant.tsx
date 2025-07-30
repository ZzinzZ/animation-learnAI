import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Minimize2, Brain } from "lucide-react";
import { useEmotionDetection } from "@/hooks/useEmotionDetection";
import {
  ProactiveSuggestionService,
  ProactiveSuggestion,
} from "@/services/proactiveSuggestions";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isProactive?: boolean;
  suggestionType?: ProactiveSuggestion["type"];
}

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI learning assistant. I'll be here to help you throughout your learning journey, offering personalized support based on how you're doing. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [lastSuggestionTime, setLastSuggestionTime] = useState<Date>(
    new Date()
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { emotionState, learningContext, updateLearningContext } =
    useEmotionDetection();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update learning context when on course learning page
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.includes("/course/")) {
      const courseId = currentPath.split("/")[2];
      const courseNames = {
        "1": "Advanced Mathematics",
        "2": "Computer Science Fundamentals",
        "3": "Physics: From Classical to Quantum",
        "4": "Creative Writing Workshop",
      };

      updateLearningContext({
        currentCourse:
          courseNames[courseId as keyof typeof courseNames] || "Unknown Course",
        currentLesson: "Current Lesson",
        difficulty: "medium",
      });
    }
  }, [updateLearningContext]);

  // Generate proactive suggestions
  useEffect(() => {
    const generateProactiveSuggestion = () => {
      const now = new Date();
      const timeSinceLastSuggestion =
        now.getTime() - lastSuggestionTime.getTime();

      // Only generate suggestions if enough time has passed (minimum 2 minutes)
      if (timeSinceLastSuggestion > 120000) {
        const suggestions = ProactiveSuggestionService.generateSuggestions(
          emotionState,
          learningContext
        );

        if (suggestions.length > 0 && Math.random() > 0.7) {
          // 30% chance to show suggestion
          const suggestion = suggestions[0]; // Take highest priority suggestion

          const proactiveMessage: Message = {
            id: messages.length + 1,
            text: suggestion.message,
            isUser: false,
            timestamp: now,
            isProactive: true,
            suggestionType: suggestion.type,
          };

          setMessages((prev) => [...prev, proactiveMessage]);
          setLastSuggestionTime(now);
        }
      }
    };

    const interval = setInterval(generateProactiveSuggestion, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [emotionState, learningContext, messages.length, lastSuggestionTime]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Generate contextual AI response
    setTimeout(() => {
      const responses = getContextualResponse(
        inputValue,
        emotionState,
        learningContext
      );

      const aiMessage: Message = {
        id: messages.length + 2,
        text: responses,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const getContextualResponse = (
    userInput: string,
    emotion: typeof emotionState,
    context: typeof learningContext
  ): string => {
    const input = userInput.toLowerCase();

    // Context-aware responses based on current course and emotion
    if (input.includes("help") || input.includes("confused")) {
      return `I understand you need help with ${context.currentLesson}. Let me break this down step by step. What specific part would you like me to explain further?`;
    }

    if (input.includes("tired") || input.includes("break")) {
      return `I can see you might need a break. You've been working hard on ${context.currentCourse}. Would you like some study tips or should we take a quick breather?`;
    }

    if (input.includes("difficult") || input.includes("hard")) {
      return `${context.currentLesson} can be challenging! Let's approach it differently. Would you prefer a visual explanation, more examples, or should we review the prerequisites first?`;
    }

    if (input.includes("quiz") || input.includes("test")) {
      return `Great idea! I can create a quick quiz on ${context.currentLesson} to test your understanding. Would you like multiple choice questions or open-ended problems?`;
    }

    // Emotion-based responses
    if (emotion.emotion === "frustrated") {
      return `I can sense this might be frustrating. Remember, learning ${context.currentCourse} takes time. Let's try a different approach - what would help you feel more confident right now?`;
    }

    if (emotion.emotion === "engaged") {
      return `I love your enthusiasm! Since you're so engaged with ${context.currentLesson}, would you like to explore some advanced applications or try a challenging problem?`;
    }

    // Default contextual responses
    const contextualResponses = [
      `That's a great question about ${context.currentLesson}! Let me help you understand this concept better.`,
      `I can see you're working through ${context.currentCourse}. Based on your progress, here's what I'd suggest...`,
      `Since you're learning ${context.currentLesson}, let me provide some additional context that might help.`,
      `You're doing well with ${context.currentCourse}! Is there a particular aspect you'd like to dive deeper into?`,
      `I notice you've been focused on this topic for a while. Would you like me to suggest some practice problems or additional resources?`,
    ];

    return contextualResponses[
      Math.floor(Math.random() * contextualResponses.length)
    ];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const getSuggestionIcon = (type?: ProactiveSuggestion["type"]) => {
    switch (type) {
      case "question":
        return "❓";
      case "suggestion":
        return "💡";
      case "encouragement":
        return "👏";
      case "break":
        return "☕";
      case "clarification":
        return "🔍";
      default:
        return "";
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg hover:scale-105 transition-transform relative"
        >
          <MessageCircle className="w-6 h-6" />
          {/* Pulse animation for proactive suggestions */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-theme-primary rounded-full animate-pulse">
            <Brain className="w-2 h-2 text-white m-1" />
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={`w-80 shadow-xl transition-all duration-300 ${
          isMinimized ? "h-16" : "h-96"
        }`}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-8 h-8 bg-theme-primary rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span>AI Learning Assistant</span>
              {emotionState.emotion !== "focused" && (
                <div
                  className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"
                  title={`Detected: ${emotionState.emotion}`}
                />
              )}
            </CardTitle>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-6 h-6"
              >
                <Minimize2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="w-6 h-6"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-72">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isUser
                        ? "bg-theme-primary text-white"
                        : message.isProactive
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 text-theme-text border border-blue-200"
                        : "bg-theme-surface text-theme-text border border-theme-border"
                    }`}
                  >
                    {message.isProactive && (
                      <div className="flex items-center gap-1 text-xs text-blue-600 mb-1">
                        <Brain className="w-3 h-3" />
                        <span>
                          Proactive Assistant{" "}
                          {getSuggestionIcon(message.suggestionType)}
                        </span>
                      </div>
                    )}
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your learning..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ChatAssistant;
