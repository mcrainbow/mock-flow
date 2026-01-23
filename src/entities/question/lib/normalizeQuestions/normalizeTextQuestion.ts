import type { AITextQuestion } from '@entities/question/model';

export function normalizeTextQuestion(q: any): AITextQuestion {
  const normalized: AITextQuestion = {
    id: q.id || `txt-${Date.now()}`,
    question: q.question || '',
    difficulty: q.difficulty || 'junior',
    category: q.category || 'basics',
    estimatedTime: q.estimatedTime || 120,
    hint: q.hint || '',
    referenceAnswer: q.referenceAnswer || '',
    keyPoints: q.keyPoints || [],
    commonMistakes: q.commonMistakes || [],
    maxScore: q.maxScore || 10,
  };

  return normalized;
}
