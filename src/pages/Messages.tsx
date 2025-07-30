import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Send,
  Users,
  MessageCircle,
  Bell,
  Plus,
  Pin,
  Bot,
} from "lucide-react";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
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

  const messages = [
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

  const getConversationIcon = (type) => {
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

  const getStatusColor = (status) => {
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

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-theme-text mb-2">Messages</h1>
          <p className="text-theme-muted">
            Connect with AI tutors and study groups
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Conversations</CardTitle>
                  <Button size="icon" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 cursor-pointer transition-colors hover:bg-theme-surface ${
                        selectedConversation === conversation.id
                          ? "bg-theme-primary/10 border-r-2 border-theme-primary"
                          : ""
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={conversation.avatar} />
                            <AvatarFallback
                              className={
                                conversation.type === "ai_tutor"
                                  ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                                  : ""
                              }
                            >
                              {getConversationIcon(conversation.type)}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.status !== "system" && (
                            <div
                              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                                conversation.status
                              )}`}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-theme-text truncate flex items-center gap-1">
                              {conversation.name}
                              {conversation.type === "ai_tutor" && (
                                <Bot className="w-3 h-3 text-blue-500" />
                              )}
                            </h3>
                            <div className="flex items-center space-x-1">
                              {conversation.type === "announcement" && (
                                <Pin className="w-3 h-3 text-theme-muted" />
                              )}
                              {conversation.unread > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  {conversation.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-theme-muted truncate">
                            {conversation.course}
                          </p>
                          <p className="text-sm text-theme-muted truncate mt-1">
                            {conversation.lastMessage}
                          </p>
                          <p className="text-xs text-theme-muted mt-1">
                            {conversation.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-theme-text flex items-center gap-2">
                      MathBot AI <Bot className="w-4 h-4 text-blue-500" />
                    </h3>
                    <p className="text-sm text-theme-muted">
                      Advanced Mathematics • Always Available
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.type === "sent"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === "sent"
                            ? "bg-theme-primary text-white"
                            : "bg-gradient-to-r from-blue-50 to-purple-50 text-theme-text border border-blue-100"
                        }`}
                      >
                        {message.type === "received" && (
                          <p className="text-xs font-medium mb-1 flex items-center gap-1 text-blue-600">
                            <Bot className="w-3 h-3" />
                            {message.sender}
                          </p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.type === "sent"
                              ? "text-white/70"
                              : "text-theme-muted"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Ask me anything about the course material..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 min-h-[60px] resize-none"
                    />
                    <Button size="icon" className="self-end">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-theme-muted mt-2 flex items-center gap-1">
                    <Bot className="w-3 h-3" />
                    AI responses are generated based on course content and your
                    learning progress
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
