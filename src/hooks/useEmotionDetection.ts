
import { useState, useEffect } from 'react';

export interface EmotionState {
  emotion: 'engaged' | 'frustrated' | 'bored' | 'confused' | 'focused' | 'tired';
  confidence: number;
  timestamp: Date;
}

export interface LearningContext {
  currentCourse: string;
  currentLesson: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeSpent: number;
  lastActivity: Date;
}

export const useEmotionDetection = () => {
  const [emotionState, setEmotionState] = useState<EmotionState>({
    emotion: 'focused',
    confidence: 0.8,
    timestamp: new Date()
  });

  const [learningContext, setLearningContext] = useState<LearningContext>({
    currentCourse: 'Advanced Mathematics',
    currentLesson: 'Introduction to Derivatives',
    difficulty: 'medium',
    timeSpent: 0,
    lastActivity: new Date()
  });

  useEffect(() => {
    const webcamEnabled = localStorage.getItem('webcam-consent') === 'true';
    
    if (webcamEnabled) {
      // Simulate emotion detection from webcam
      const emotionInterval = setInterval(() => {
        const emotions: EmotionState['emotion'][] = ['engaged', 'frustrated', 'bored', 'confused', 'focused', 'tired'];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        
        setEmotionState({
          emotion: randomEmotion,
          confidence: Math.random() * 0.4 + 0.6, // 0.6 to 1.0
          timestamp: new Date()
        });
      }, 15000); // Check every 15 seconds

      // Track time spent
      const timeInterval = setInterval(() => {
        setLearningContext(prev => ({
          ...prev,
          timeSpent: prev.timeSpent + 1,
          lastActivity: new Date()
        }));
      }, 60000); // Update every minute

      return () => {
        clearInterval(emotionInterval);
        clearInterval(timeInterval);
      };
    }
  }, []);

  const updateLearningContext = (context: Partial<LearningContext>) => {
    setLearningContext(prev => ({ ...prev, ...context }));
  };

  return {
    emotionState,
    learningContext,
    updateLearningContext
  };
};
