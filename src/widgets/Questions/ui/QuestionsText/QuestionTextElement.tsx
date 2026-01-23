import { QuestionsText } from './QuestionsText';
import { QuestionTextReview } from './QuestionTextReview';
import { useQuestionStore } from '@entities/question/model';

export function QuestionTextElement() {
  const { isTextQuestionAnswered } = useQuestionStore((state) => state);
  return <>{isTextQuestionAnswered ? <QuestionTextReview /> : <QuestionsText />}</>;
}
