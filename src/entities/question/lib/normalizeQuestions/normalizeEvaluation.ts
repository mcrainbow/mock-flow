import type { TextAnswerEvaluation } from '../../model';

export function normalizeEvaluation(data: any): TextAnswerEvaluation {
  const normalized: TextAnswerEvaluation = {
    score: data.score || 0,
    evaluation: {
      completeness: data.evaluation?.completeness || 0,
      accuracy: data.evaluation?.accuracy || 0,
      clarity: data.evaluation?.clarity || 0,
    },
    feedback: {
      summary: data.feedback?.summary || '',
      strengths: data.feedback?.strengths || [],
      weaknesses: data.feedback?.weaknesses || [],
      detectedMistakes: data.feedback?.detectedMistakes || [],
    },
  };

  return normalized;
}
