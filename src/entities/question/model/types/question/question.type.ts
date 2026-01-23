export type QuestionCheckbox = {
  id: string;
  question: string;
  category: string;
  options: string[];
  difficulty: string;
  estimatedTime: number;
  explanation: {
    summary: string;
    example: string;
    details: string;
    keyPoints: string[];
  };
  questionSubtype: 'single' | 'multiple';
  correctAnswerIndex?: number; // Для single choice
  correctAnswerIndices?: number[]; // Для multiple choice
};

export type QuestionText = {
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
};

export type Question = QuestionCheckbox | QuestionText;
