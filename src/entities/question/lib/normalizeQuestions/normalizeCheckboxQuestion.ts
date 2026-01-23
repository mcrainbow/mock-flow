import type { AICheckboxQuestion } from '@entities/question/model';

export function normalizeCheckboxQuestion(q: any): AICheckboxQuestion {
  const normalized: AICheckboxQuestion = {
    id: q.id || q.questionId || `q-${Date.now()}`,
    question: q.question || q.questionText || '',
    questionSubtype: q.questionSubtype || 'single',
    options: q.options || q.questionOptions || [],
    correctAnswerIndex: q.correctAnswerIndex,
    correctAnswerIndices: q.correctAnswerIndices,
    explanation: q.explanation ||
      q.questionExplanation || {
        summary: '',
        details: '',
        example: '',
        keyPoints: [],
      },
    difficulty: q.difficulty || q.questionDifficulty || 'junior',
    category: q.category || q.questionCategory || 'basics',
    estimatedTime: q.estimatedTime || q.questionEstimatedTime || 30,
  };

  if (normalized.questionSubtype === 'single') {
    delete (normalized as any).correctAnswerIndices;
  } else if (normalized.questionSubtype === 'multiple') {
    delete (normalized as any).correctAnswerIndex;
  }

  return normalized;
}
