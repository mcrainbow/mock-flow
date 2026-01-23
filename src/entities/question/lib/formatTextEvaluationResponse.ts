import type { TextAnswerEvaluation } from '@entities/question/model';
import { cleanObjectKeys } from '@shared/lib';
import { normalizeEvaluation } from './normalizeQuestions/normalizeEvaluation';

export function formatTextEvaluationResponse(data: TextAnswerEvaluation): TextAnswerEvaluation {
  const cleaned = cleanObjectKeys(data);

  const normalized = normalizeEvaluation(cleaned);

  return normalized;
}
