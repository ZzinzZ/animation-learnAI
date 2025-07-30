"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Send,
  Users,
  MessageCircle,
  Bell,
  Plus,
  Pin,
  Bot,
  Menu,
  X,
} from "lucide-react";

// Mock data
const conversations = [
  {
    id: 1,
    name: "MathBot AI",
    course: "Advanced Mathematics",
    lastMessage: "How can I help you with calculus today?",
    timestamp: "2 min ago",
    unread: 0,
    type: "ai_tutor",
    status: "system",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Study Group Alpha",
    course: "Physics 101",
    lastMessage: "Anyone free for study session tonight?",
    timestamp: "5 min ago",
    unread: 3,
    type: "study_group",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Course Announcements",
    course: "Computer Science",
    lastMessage: "Assignment 3 deadline extended to Friday",
    timestamp: "1 hour ago",
    unread: 1,
    type: "announcement",
    status: "system",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Project Team Beta",
    course: "Software Engineering",
    lastMessage: "Let's meet tomorrow at 3 PM",
    timestamp: "2 hours ago",
    unread: 0,
    type: "study_group",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const messages = [
  {
    id: 1,
    content:
      "Hello! I'm your AI tutor for Advanced Mathematics. How can I help you today?",
    type: "received",
    sender: "MathBot AI",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    content: "I'm struggling with integration by parts. Can you explain it?",
    type: "sent",
    timestamp: "10:32 AM",
  },
  {
    id: 3,
    content:
      "Of course! Integration by parts is based on the product rule for differentiation. The formula is ∫u dv = uv - ∫v du. Let me walk you through an example.",
    type: "received",
    sender: "MathBot AI",
    timestamp: "10:33 AM",
  },
  {
    id: 4,
    content: "That makes sense! Can you show me a specific example?",
    type: "sent",
    timestamp: "10:35 AM",
  },
  {
    id: 5,
    content:
      "Sure! Let's solve ∫x·e^x dx. Here, we choose u = x and dv = e^x dx. Then du = dx and v = e^x. Using the formula: ∫x·e^x dx = x·e^x - ∫e^x dx = x·e^x - e^x + C = e^x(x-1) + C",
    type: "received",
    sender: "MathBot AI",
    timestamp: "10:36 AM",
  },
  {
    id: 6,
    content:
      "Wow, that's really helpful! Can you give me another example with trigonometric functions?",
    type: "sent",
    timestamp: "10:38 AM",
  },
  {
    id: 7,
    content:
      "Absolutely! Let's try ∫x·sin(x) dx. We set u = x and dv = sin(x) dx. Then du = dx and v = -cos(x). Applying the formula: ∫x·sin(x) dx = x·(-cos(x)) - ∫(-cos(x)) dx = -x·cos(x) + ∫cos(x) dx = -x·cos(x) + sin(x) + C",
    type: "received",
    sender: "MathBot AI",
    timestamp: "10:39 AM",
  },
  {
    id: 8,
    content:
      "This is getting clearer! What about when we have polynomials with exponentials?",
    type: "sent",
    timestamp: "10:41 AM",
  },
  {
    id: 9,
    content:
      "Great question! For polynomials with exponentials, we often need to apply integration by parts multiple times. For example, with ∫x²·e^x dx, we'd need to use the technique twice. Would you like me to work through this step by step?",
    type: "received",
    sender: "MathBot AI",
    timestamp: "10:42 AM",
  },
  {
    id: 10,
    content: "Yes please! I want to see the full process.",
    type: "sent",
    timestamp: "10:43 AM",
  },
  {
    id: 11,
    content:
      "Perfect! Let's solve ∫x²·e^x dx step by step:\n\nFirst application: u₁ = x², dv₁ = e^x dx\nThen: du₁ = 2x dx, v₁ = e^x\n\n∫x²·e^x dx = x²·e^x - ∫2x·e^x dx\n\nNow we need to solve ∫2x·e^x dx using integration by parts again.",
    type: "received",
    sender: "MathBot AI",
    timestamp: "10:44 AM",
  },
  {
    id: 12,
    content:
      "I see the pattern now! We keep reducing the power of x each time.",
    type: "sent",
    timestamp: "10:45 AM",
  },
  {
    id: 13,
    content:
      "Exactly! You've got it! For the second part: u₂ = 2x, dv₂ = e^x dx, so du₂ = 2 dx, v₂ = e^x\n\n∫2x·e^x dx = 2x·e^x - ∫2·e^x dx = 2x·e^x - 2e^x\n\nSo the final answer is: ∫x²·e^x dx = x²·e^x - 2x·e^x + 2e^x + C = e^x(x² - 2x + 2) + C",
    type: "received",
    sender: "MathBot AI",
    timestamp: "10:46 AM",
  },
  {
    id: 14,
    content:
      "This is amazing! Thank you so much for the detailed explanation. I feel much more confident about integration by parts now.",
    type: "sent",
    timestamp: "10:47 AM",
  },
  {
    id: 15,
    content:
      "You're very welcome! I'm glad I could help you understand integration by parts better. Remember, the key is choosing u and dv wisely - usually pick u as the function that becomes simpler when differentiated. Feel free to ask if you have more questions!",
    type: "received",
    sender: "MathBot AI",
    timestamp: "10:48 AM",
  },
];

export default function ChatInterface() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getConversationIcon = (type: string) => {
    switch (type) {
      case "study_group":
        return <Users className="w-4 h-4" />;
      case "announcement":
        return <Bell className="w-4 h-4" />;
      case "ai_tutor":
        return <Bot className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "active":
        return "bg-blue-500";
      case "system":
        return "bg-purple-500";
      default:
        return "bg-gray-400";
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Simulate adding a new message (in real app, this would be handled by state management)
      const newMsg = {
        id: messages.length + 1,
        content: newMessage,
        type: "sent" as const,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // In a real app, you would update the messages state here
      // setMessages(prev => [...prev, newMsg])

      setNewMessage("");

      // Simulate AI response after a delay
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          content:
            "Thank you for your question! I'm processing your request and will provide a detailed response shortly.",
          type: "received" as const,
          sender: "MathBot AI",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        // setMessages(prev => [...prev, aiResponse])
      }, 1000);
    }
  };

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Loading Messages...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center border items-center h-[calc(100vh-6rem)] py-2 px-6 relative ">
      {/* Mobile Sidebar Overlay */}
      <div className="flex fixed top-20">
        {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-80 lg:w-96 
        transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
      `}
      >
        <Card className="h-full rounded-none lg:rounded-l-xl bg-white/90 backdrop-blur-md border-r">
          <CardHeader className="pb-4 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Messages
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full bg-transparent"
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="lg:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                className="pl-10 rounded-full border-gray-200 focus:border-blue-400"
              />
            </div>
          </CardHeader>

          <ScrollArea className="h-[100%] overflow-y-scroll">
            <CardContent className="p-0">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-blue-50 transition-all duration-200 border-l-4 ${
                    selectedConversation === conversation.id
                      ? "bg-blue-50 border-l-blue-500 shadow-sm"
                      : "border-l-transparent"
                  }`}
                  onClick={() => {
                    setSelectedConversation(conversation.id);
                    setIsSidebarOpen(false);
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                        <AvatarImage
                          src={conversation.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {getConversationIcon(conversation.type)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.status !== "system" && (
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(
                            conversation.status
                          )}`}
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-900 truncate flex items-center gap-1">
                          {conversation.name}
                          {conversation.type === "ai_tutor" && (
                            <Bot className="w-4 h-4 text-blue-500" />
                          )}
                        </h3>
                        <div className="flex items-center space-x-1 ml-2">
                          {conversation.type === "announcement" && (
                            <Pin className="w-3 h-3 text-gray-400" />
                          )}
                          {conversation.unread > 0 && (
                            <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-blue-600 font-medium truncate mt-1">
                        {conversation.course}
                      </p>
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {conversation.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </ScrollArea>
        </Card>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Card className="flex-1 rounded-none lg:rounded-r-xl bg-white/95 backdrop-blur-md">
          {/* Chat Header */}
          <CardHeader className="border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl lg:rounded-tl-none">
            <div className="flex items-center space-x-3">
              <Button
                size="icon"
                variant="ghost"
                className="lg:hidden text-white hover:bg-white/20"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <Avatar className="w-12 h-12 border-2 border-white">
                <AvatarImage src={selectedConv?.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-white text-blue-600">
                  {selectedConv && getConversationIcon(selectedConv.type)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg flex items-center gap-2 truncate">
                  {selectedConv?.name}
                  {selectedConv?.type === "ai_tutor" && (
                    <Bot className="w-5 h-5" />
                  )}
                </h3>
                <p className="text-blue-100 text-sm truncate">
                  {selectedConv?.course} • Always Available
                </p>
              </div>
            </div>
          </CardHeader>

          {/* Messages Area */}
          <div className="flex flex-col min-h-0 ">
            <ScrollArea className="h-[60vh] p-4">
              <div className="space-y-4 max-w-4xl mx-auto ">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "sent" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-2xl shadow-sm ${
                        message.type === "sent"
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                          : "bg-white border border-gray-200 text-gray-800"
                      }`}
                    >
                      {message.type === "received" && (
                        <p className="text-xs font-semibold mb-2 flex items-center gap-1 text-blue-600">
                          <Bot className="w-3 h-3" /> {message.sender}
                        </p>
                      )}
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-2 ${
                          message.type === "sent"
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>

          {/* Message Input */}
          <div className="border-t bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex space-x-3">
                <Textarea
                  placeholder="Ask me anything about the course material..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 min-h-[60px] max-h-32 resize-none rounded-2xl border-gray-200 focus:border-blue-400 bg-white"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  size="icon"
                  className="self-end bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full w-12 h-12"
                  onClick={handleSendMessage}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-3 flex items-center gap-1 justify-center">
                <Bot className="w-3 h-3" /> AI responses are generated based on
                course content and your learning progress
              </p>
            </div>
          </div>
        </Card>
      </div>
      </div>
    </div>
  );
}
