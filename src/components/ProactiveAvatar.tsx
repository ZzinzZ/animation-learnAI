import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, Brain, Lightbulb, HelpCircle, Coffee, CheckCircle, MessageCircle, Minimize2 } from 'lucide-react';
import { useEmotionDetection } from '@/hooks/useEmotionDetection';
import { ProactiveSuggestionService, ProactiveSuggestion } from '@/services/proactiveSuggestions';

interface AvatarMessage {
  id: string;
  text: string;
  type: ProactiveSuggestion['type'];
  timestamp: Date;
}

const ProactiveAvatar = () => {
  const [currentMessage, setCurrentMessage] = useState<AvatarMessage | null>(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [lastSuggestionTime, setLastSuggestionTime] = useState<Date>(new Date());
  const [isMinimized, setIsMinimized] = useState(false);

  const { emotionState, learningContext, updateLearningContext } = useEmotionDetection();

  // Update learning context when on course learning page
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/course/')) {
      const courseId = currentPath.split('/')[2];
      const courseNames = {
        '1': 'Advanced Mathematics',
        '2': 'Computer Science Fundamentals',
        '3': 'Physics: From Classical to Quantum',
        '4': 'Creative Writing Workshop'
      };
      
      updateLearningContext({
        currentCourse: courseNames[courseId as keyof typeof courseNames] || 'Unknown Course',
        currentLesson: 'Current Lesson',
        difficulty: 'medium'
      });
    }
  }, [updateLearningContext]);

  // Generate proactive suggestions
  useEffect(() => {
    const generateProactiveSuggestion = () => {
      const now = new Date();
      const timeSinceLastSuggestion = now.getTime() - lastSuggestionTime.getTime();
      
      // Only generate suggestions if enough time has passed (minimum 20 seconds for demo)
      if (timeSinceLastSuggestion > 20000) {
        const suggestions = ProactiveSuggestionService.generateSuggestions(emotionState, learningContext);
        
        if (suggestions.length > 0 && Math.random() > 0.3) { // 70% chance to show suggestion
          const suggestion = suggestions[0];
          
          const avatarMessage: AvatarMessage = {
            id: `avatar-${Date.now()}`,
            text: suggestion.message,
            type: suggestion.type,
            timestamp: now
          };

          setCurrentMessage(avatarMessage);
          setIsMessageVisible(true);
          setLastSuggestionTime(now);

          // Auto-hide after 10 seconds
          setTimeout(() => {
            setIsMessageVisible(false);
          }, 10000);
        }
      }
    };

    const interval = setInterval(generateProactiveSuggestion, 12000); // Check every 12 seconds
    return () => clearInterval(interval);
  }, [emotionState, learningContext, lastSuggestionTime]);

  const getAvatarIcon = (type: ProactiveSuggestion['type']) => {
    switch (type) {
      case 'question':
        return <HelpCircle className="w-4 h-4 text-blue-600" />;
      case 'suggestion':
        return <Lightbulb className="w-4 h-4 text-yellow-600" />;
      case 'encouragement':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'break':
        return <Coffee className="w-4 h-4 text-orange-600" />;
      case 'clarification':
        return <Brain className="w-4 h-4 text-purple-600" />;
      default:
        return <Brain className="w-4 h-4 text-theme-primary" />;
    }
  };

  const getAvatarColor = (type: ProactiveSuggestion['type']) => {
    switch (type) {
      case 'question':
        return 'bg-blue-100 border-blue-200';
      case 'suggestion':
        return 'bg-yellow-100 border-yellow-200';
      case 'encouragement':
        return 'bg-green-100 border-green-200';
      case 'break':
        return 'bg-orange-100 border-orange-200';
      case 'clarification':
        return 'bg-purple-100 border-purple-200';
      default:
        return 'bg-theme-surface border-theme-border';
    }
  };

  const handleDismiss = () => {
    setIsMessageVisible(false);
  };

  const handleAvatarClick = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      // Show a random encouraging message when clicked
      const encouragingMessages = [
        "You're doing great! Keep up the excellent work!",
        "I'm here to help if you need any clarification.",
        "Remember to take breaks when you need them.",
        "Your focus today has been impressive!",
        "Feel free to ask me anything about the material."
      ];
      
      const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
      
      setCurrentMessage({
        id: `click-${Date.now()}`,
        text: randomMessage,
        type: 'encouragement',
        timestamp: new Date()
      });
      setIsMessageVisible(true);
      
      setTimeout(() => setIsMessageVisible(false), 6000);
    }
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
    setIsMessageVisible(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Speech Bubble */}
      {currentMessage && isMessageVisible && !isMinimized && (
        <div className="absolute bottom-16 right-0 mb-2 animate-fade-in">
          <div className={`${getAvatarColor(currentMessage.type)} p-4 rounded-2xl rounded-br-sm border-2 shadow-xl max-w-xs relative`}>
            <div className="flex items-start justify-between">
              <p className="text-sm text-gray-800 leading-relaxed pr-2">
                {currentMessage.text}
              </p>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDismiss}
                className="w-5 h-5 -mt-1 -mr-1 opacity-60 hover:opacity-100"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
            
            {/* Typing indicator animation */}
            <div className="flex space-x-1 mt-2 opacity-60">
              <div className="w-1 h-1 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-1 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1 h-1 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
          
          {/* Speech bubble tail */}
          <div className={`absolute right-4 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-b-0 ${
            currentMessage.type === 'question' ? 'border-l-transparent border-r-transparent border-t-blue-100' :
            currentMessage.type === 'suggestion' ? 'border-l-transparent border-r-transparent border-t-yellow-100' :
            currentMessage.type === 'encouragement' ? 'border-l-transparent border-r-transparent border-t-green-100' :
            currentMessage.type === 'break' ? 'border-l-transparent border-r-transparent border-t-orange-100' :
            currentMessage.type === 'clarification' ? 'border-l-transparent border-r-transparent border-t-purple-100' :
            'border-l-transparent border-r-transparent border-t-theme-surface'
          }`}></div>
        </div>
      )}

      {/* Avatar */}
      <div 
        className={`relative cursor-pointer transition-all duration-300 ${
          isMinimized ? 'scale-75 opacity-75' : 'scale-100 opacity-100'
        }`}
        onClick={handleAvatarClick}
      >
        <div className={`relative p-3 rounded-full border-2 shadow-lg ${
          emotionState.emotion === 'engaged' ? 'bg-green-100 border-green-200 animate-pulse' :
          emotionState.emotion === 'frustrated' ? 'bg-red-100 border-red-200' :
          emotionState.emotion === 'confused' ? 'bg-yellow-100 border-yellow-200' :
          emotionState.emotion === 'bored' ? 'bg-gray-100 border-gray-200' :
          emotionState.emotion === 'tired' ? 'bg-purple-100 border-purple-200' :
          'bg-blue-100 border-blue-200'
        }`}>
          <Avatar className="w-12 h-12">
            <AvatarImage src="/placeholder.svg" alt="AI Assistant" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
              AI
            </AvatarFallback>
          </Avatar>
          
          {/* Status indicator */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
            {currentMessage && isMessageVisible ? getAvatarIcon(currentMessage.type) : <MessageCircle className="w-3 h-3 text-theme-primary" />}
          </div>
          
          {/* Minimize button */}
          {!isMinimized && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMinimize}
              className="absolute -top-2 -left-2 w-6 h-6 bg-white border border-gray-200 rounded-full opacity-60 hover:opacity-100"
            >
              <Minimize2 className="w-3 h-3" />
            </Button>
          )}
        </div>

        {/* Emotion indicator */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            emotionState.emotion === 'engaged' ? 'bg-green-500 text-white' :
            emotionState.emotion === 'frustrated' ? 'bg-red-500 text-white' :
            emotionState.emotion === 'confused' ? 'bg-yellow-500 text-white' :
            emotionState.emotion === 'bored' ? 'bg-gray-500 text-white' :
            emotionState.emotion === 'tired' ? 'bg-purple-500 text-white' :
            'bg-blue-500 text-white'
          }`}>
            {emotionState.emotion}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProactiveAvatar;
