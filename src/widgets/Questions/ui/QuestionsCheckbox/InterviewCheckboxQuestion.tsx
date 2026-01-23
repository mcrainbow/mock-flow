import { MultipleChoiceQuestion, SingleChoiceQuestion } from './QuestionsCheckboxVariants';
import { useQuestionStore } from '@entities/question/model';

export function InterviewCheckboxQuestion() {
  const { questions, currentQuestionIndex } = useQuestionStore();

  const question = questions[currentQuestionIndex];
  if (!question) return null;

  if (!('questionSubtype' in question)) return null;

  const isSingle = question.questionSubtype === 'single';

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 relative">
      <div className="space-y-4">
        <div className="absolute top-0 right-0 flex items-center justify-center bg-primary text-primary-foreground text-xl font-bold font-merriweather rounded-full px-3 py-1 border border-background">
          <span>{currentQuestionIndex + 1}</span>
        </div>

        <h2 className="text-2xl font-bold text-foreground">{question.question}</h2>

        <div className="text-sm text-muted-foreground">
          {isSingle ? '(Выберите один правильный ответ)' : '(Выберите все правильные ответы)'}
        </div>

        {isSingle ? (
          <SingleChoiceQuestion question={question} />
        ) : (
          <MultipleChoiceQuestion question={question} />
        )}
      </div>
    </div>
  );
}
