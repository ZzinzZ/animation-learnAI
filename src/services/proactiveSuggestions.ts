
import { EmotionState, LearningContext } from '@/hooks/useEmotionDetection';

export interface ProactiveSuggestion {
  id: string;
  type: 'question' | 'suggestion' | 'encouragement' | 'break' | 'clarification';
  message: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
}

export class ProactiveSuggestionService {
  private static getEmotionBasedSuggestions(
    emotion: EmotionState['emotion'], 
    context: LearningContext
  ): ProactiveSuggestion[] {
    const suggestions: ProactiveSuggestion[] = [];
    const now = new Date();

    switch (emotion) {
      case 'frustrated':
        suggestions.push({
          id: `frustration-${Date.now()}`,
          type: 'suggestion',
          message: `I notice you might be finding ${context.currentLesson} challenging. Would you like me to break down the concept into simpler steps?`,
          timestamp: now,
          priority: 'high'
        });
        break;

      case 'bored':
        suggestions.push({
          id: `boredom-${Date.now()}`,
          type: 'suggestion',
          message: `Let's make this more interesting! Would you like to see a real-world application of ${context.currentLesson}?`,
          timestamp: now,
          priority: 'medium'
        });
        break;

      case 'confused':
        suggestions.push({
          id: `confusion-${Date.now()}`,
          type: 'question',
          message: `I can see you might need some clarification. What specific part of ${context.currentLesson} would you like me to explain differently?`,
          timestamp: now,
          priority: 'high'
        });
        break;

      case 'tired':
        suggestions.push({
          id: `tired-${Date.now()}`,
          type: 'break',
          message: `You've been studying for ${context.timeSpent} minutes. How about taking a 5-minute break? I'll be here when you're ready to continue.`,
          timestamp: now,
          priority: 'medium'
        });
        break;

      case 'engaged':
        suggestions.push({
          id: `engaged-${Date.now()}`,
          type: 'encouragement',
          message: `Great focus! You're doing really well with ${context.currentLesson}. Ready for a quick challenge question to test your understanding?`,
          timestamp: now,
          priority: 'low'
        });
        break;

      case 'focused':
        if (context.timeSpent > 45) {
          suggestions.push({
            id: `focus-${Date.now()}`,
            type: 'suggestion',
            message: `You've been incredibly focused! Would you like to dive deeper into an advanced concept related to ${context.currentLesson}?`,
            timestamp: now,
            priority: 'low'
          });
        }
        break;
    }

    return suggestions;
  }

  private static getContextBasedSuggestions(context: LearningContext): ProactiveSuggestion[] {
    const suggestions: ProactiveSuggestion[] = [];
    const now = new Date();

    // Time-based suggestions
    if (context.timeSpent > 60) {
      suggestions.push({
        id: `time-${Date.now()}`,
        type: 'break',
        message: `You've been learning for over an hour. Consider taking a break to help consolidate what you've learned!`,
        timestamp: now,
        priority: 'medium'
      });
    }

    // Difficulty-based suggestions
    if (context.difficulty === 'hard') {
      suggestions.push({
        id: `difficulty-${Date.now()}`,
        type: 'suggestion',
        message: `This is a challenging topic! Would you like me to provide some prerequisite review or additional examples?`,
        timestamp: now,
        priority: 'medium'
      });
    }

    return suggestions;
  }

  public static generateSuggestions(
    emotionState: EmotionState,
    context: LearningContext
  ): ProactiveSuggestion[] {
    const emotionSuggestions = this.getEmotionBasedSuggestions(emotionState.emotion, context);
    const contextSuggestions = this.getContextBasedSuggestions(context);
    
    return [...emotionSuggestions, ...contextSuggestions]
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
  }
}
