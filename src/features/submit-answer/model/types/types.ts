export type AIFeedback = {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
};

export type SubmitAnswerData = {
  interview_id: string;
  question_id: string;
  user_answer: Record<string, any>;
  is_correct?: boolean;
  ai_feedback?: AIFeedback;
  time_spent?: number;
};
