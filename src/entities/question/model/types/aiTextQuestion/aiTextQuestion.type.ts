export interface FetchTextQuestionsFromAIParams {
  topic: string;
  level: string;
  count: number;
}

export interface AITextQuestion {
  id: string;
  question: string;
  difficulty: string;
  category: string;
  estimatedTime: number;
  hint: string;
  referenceAnswer: string;
  keyPoints: string[];
  commonMistakes: string[];
  maxScore: number;
}

export interface AITextQuestionsResponse {
  metadata: {
    topic: string;
    level: string;
    totalQuestions: number;
    questionType: 'text';
  };
  questions: AITextQuestion[];
}
