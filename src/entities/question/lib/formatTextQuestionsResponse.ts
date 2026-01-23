import type { AITextQuestionsResponse } from '@entities/question/model';
import { cleanObjectKeys } from '@shared/lib';
import { normalizeTextQuestion } from './normalizeQuestions/normalizeTextQuestion';

export function formatTextQuestionsResponse(
  data: AITextQuestionsResponse
): AITextQuestionsResponse {
  const cleaned = cleanObjectKeys(data);

  const normalizedQuestions = cleaned.questions.map((q: any) => normalizeTextQuestion(q));

  return {
    metadata: cleaned.metadata,
    questions: normalizedQuestions,
  };
}
