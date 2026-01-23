export interface FetchCheckboxQuestionsFromAIParams {
  topic: string;
  level: string;
  count: number;
}

export interface AICheckboxQuestion {
  id: string;
  question: string;
  questionSubtype: 'single' | 'multiple';
  options: string[];
  correctAnswerIndex?: number;
  correctAnswerIndices?: number[];
  explanation: {
    summary: string;
    details: string;
    example: string;
    keyPoints: string[];
  };
  difficulty: string;
  category: string;
  estimatedTime: number;
}

export interface AICheckboxQuestionsResponse {
  metadata: {
    topic: string;
    level: string;
    totalQuestions: number;
    singleChoiceCount: number;
    multipleChoiceCount: number;
  };
  questions: AICheckboxQuestion[];
}
