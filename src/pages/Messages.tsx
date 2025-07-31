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
import LoadingBox from "@/components/LoadingBox";
import { conversations, messages } from "@/data/mockData";

export default function ChatInterface() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
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
      const newMsg = {
        id: messages.length + 1,
        content: newMessage,
        type: "sent" as const,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setNewMessage("");

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
      }, 1000);
    }
  };

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  if (isLoading) {
    return (
      <>
        <div className="mb-6 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl page-title-text mb-2 py-2 font-bold  bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Messages
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mx-auto mt-4" />
          <p className="text-black/50 text-lg">
            Connect with AI tutors and study groups
          </p>
        </div>
        <div className="flex w-full text-center items-center justify-center">
          <LoadingBox />
        </div>
      </>
    );
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-40rem)] py-2 px-6 relative ">
      {/* Mobile Sidebar Overlay */}
      <div className="flex fixed top-20">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <div
          className={`
        h-[calc(100vh-6rem)] fixed lg:relative inset-y-0 left-0 z-50 w-80 lg:w-96 
        transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 transition-transform  duration-300 ease-in-out
      `}
        >
          <Card className="h-full rounded-none lg:rounded-l-xl overflow-hidden bg-white/10 backdrop-blur-md ">
            <CardHeader className="pb-4  bg-theme-surface sticky">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-theme-text">
                  Messages
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full bg-transparent add-button"
                  >
                    <Plus className="w-4 h-4 add-icon" />
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
                  className="pl-10 rounded-full text-theme-text border-gray-200 focus:border-blue-400"
                />
              </div>
            </CardHeader>

            <ScrollArea className="h-[100%] p-0 m-0 bg-white/50  overflow-y-auto">
              <CardContent className="p-0 w-full">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer hover:bg-theme-surface hover:bg-opacity-10  transition-all duration-200 border-l-4 ${
                      selectedConversation === conversation.id
                        ? "bg-theme-surface border-l-blue-500 shadow-sm"
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
                          <h3 className="font-semibold text-theme-text truncate flex items-center gap-1">
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
                        <p className="text-sm text-theme-text font-medium truncate mt-1">
                          {conversation.course}
                        </p>
                        <p className="text-sm text-theme-text truncate mt-1">
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
        <div className="flex-1 flex flex-col min-w-0  h-[calc(100vh-6rem)]">
          <Card className="flex flex-col flex-1 rounded-none relative lg:rounded-r-xl overflow-hidden bg-white/95 backdrop-blur-md">
            {/* Chat Header */}
            <CardHeader className=" bg-theme-primary text-white rounded-t-xl lg:rounded-tl-none rounded-tr-xl">
              <div className="flex items-center space-x-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="lg:hidden text-white hover:bg-white/20"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <Avatar className="w-12 h-12 border-2 border-white">
                  <AvatarImage
                    src={selectedConv?.avatar || "/placeholder.svg"}
                  />
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
            <div className="flex flex-col flex-1 min-h-0">
              {/* Phần scroll chiếm toàn bộ phần còn lại */}
              <div className="flex-1 overflow-y-auto px-4 py-2">
                <div className="space-y-4 max-w-4xl mx-auto">
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
              </div>

              {/* Input nằm cố định dưới cùng */}
              <div className="shadow-sm bg-theme-surface p-2 border-t-2 border-gray-200 ">
                <div className="max-w-4xl mx-auto">
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Ask me anything..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 min-h-[60px] max-h-32 resize-none text-gray-600 rounded-2xl border-gray-200 focus:border-blue-400 bg-white"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button
                      size="icon"
                      className="self-end bg-gradient-to-r from-[#2563eb] to-[#6366f1] hover:from-blue-600 hover:to-purple-700 rounded-full w-12 h-12"
                      onClick={handleSendMessage}
                    >
                      <Send className="w-5 h-5 text-white" />
                    </Button>
                  </div>
                  <p className="text-xs  mt-1 flex items-center gap-1 justify-center">
                    <Bot className="w-3 h-3 text-theme-text" /> 
                    <span className="text-theme-text">
                      AI responses are based on course
                    content
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
