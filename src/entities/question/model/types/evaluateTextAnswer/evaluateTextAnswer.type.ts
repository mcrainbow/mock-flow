export interface QuestionReview {
  evaluation: Record<string, number>;
  feedback: {
    summary: string;
    strengths: string[];
    weaknesses: string[];
    detectedMistakes: string[];
  };
  score: number;
}

export interface TextAnswerEvaluation {
  score: number;
  evaluation: {
    completeness: number;
    accuracy: number;
    clarity: number;
  };
  feedback: {
    summary: string;
    strengths: string[];
    weaknesses: string[];
    detectedMistakes: string[];
  };
}
