import { type AICheckboxQuestionsResponse } from '@entities/question/model';
import { cleanObjectKeys } from '@shared/lib';
import { normalizeCheckboxQuestion } from './normalizeQuestions/normalizeCheckboxQuestion';

export function formatCheckboxQuestionsResponse(
  data: AICheckboxQuestionsResponse
): AICheckboxQuestionsResponse {
  const cleaned = cleanObjectKeys(data);

  const normalizedQuestions = cleaned.questions.map((q: any) => normalizeCheckboxQuestion(q));

  return {
    metadata: cleaned.metadata,
    questions: normalizedQuestions,
  };
}
