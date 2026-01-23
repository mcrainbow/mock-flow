import { useInterviewStore } from '@entities/interview/model';
import { useState } from 'react';
import { Accordion } from '@/shared/ui';
import { CheckAnswerButton } from '@/features/check-answer-button';
import { useCheckTextQuestion } from '@/features/check-answer-button/model/hooks/useCheckTextQuestion';
import { toast } from 'react-toastify';
import { SkipTextQuestionButton, useSkipTextQuestion } from '@/features/skip-text-questions/';
import { SkipInterviewButton } from '@/features/skip-interview';
import { useQuestionStore, type QuestionText } from '@/entities/question/model';

export function QuestionsText() {
  const { questions, currentQuestionIndex, isTextQuestionAnswered } = useQuestionStore(
    (state) => state
  );
  const activeInterview = useInterviewStore((state) => state.activeInterview);
  const [userAnswer, setUserAnswer] = useState('');

  const { mutate: checkTextQuestionMutation, isPending } = useCheckTextQuestion();
  const { mutate: skipTextQuestionMutation, isPending: isSkipTextQuestionPending } =
    useSkipTextQuestion();

  const question = questions[currentQuestionIndex];

  if (!question || 'questionSubtype' in question || !activeInterview) return null;

  const textQuestion = question as QuestionText;

  const handleCheckAnswer = () => {
    if (isPending || !userAnswer) return;
    checkTextQuestionMutation({
      answerData: {
        question: textQuestion.question,
        referenceAnswer: textQuestion.referenceAnswer,
        keyPoints: textQuestion.keyPoints,
        commonMistakes: textQuestion.commonMistakes,
        maxScore: textQuestion.maxScore,
        userAnswer: userAnswer,
      },
      interviewId: activeInterview.id,
      questionId: textQuestion.id,
    });
    toast.info('Ваш вопрос на проверке...');
  };

  const handleSkipTextQuestion = () => {
    skipTextQuestionMutation({
      answerData: {
        question: textQuestion.question,
        referenceAnswer: textQuestion.referenceAnswer,
        keyPoints: textQuestion.keyPoints,
        commonMistakes: textQuestion.commonMistakes,
        maxScore: textQuestion.maxScore,
      },
      interviewId: activeInterview.id,
      questionId: textQuestion.id,
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 relative">
      <div className="space-y-4">
        <div className="absolute top-0 right-0 flex items-center justify-center bg-primary text-primary-foreground text-xl font-bold font-merriweather rounded-full px-3 py-1 border border-background">
          <span>{currentQuestionIndex + 1}</span>
        </div>

        <h2 className="text-2xl font-bold text-foreground pr-16">{textQuestion.question}</h2>

        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>~{Math.ceil(textQuestion.estimatedTime / 60)} мин</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="capitalize">{textQuestion.difficulty}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <span>Макс. {textQuestion.maxScore} баллов</span>
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <label htmlFor="user-answer" className="block text-sm font-medium text-foreground">
            Ваш ответ:
          </label>
          <textarea
            id="user-answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Введите ваш ответ здесь..."
            className="w-full min-h-[200px] p-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y transition-all"
            style={{ fontFamily: 'var(--font-merriweather)' }}
          />
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Символов: {userAnswer.length}</span>
            <span className="italic">Опишите ваш ответ максимально подробно</span>
          </div>
        </div>

        <Accordion title="💡 Подсказка" className="mt-6">
          <div className="space-y-2">
            <p className="text-muted-foreground leading-relaxed">{textQuestion.hint}</p>
          </div>
        </Accordion>

        <div className="flex gap-2 items-center justify-end pt-4">
          {!isTextQuestionAnswered && (
            <>
              <SkipInterviewButton />
              <SkipTextQuestionButton
                handleSkip={handleSkipTextQuestion}
                disabled={isPending || isSkipTextQuestionPending}
              />
              <CheckAnswerButton
                handleCheckAnswer={handleCheckAnswer}
                disabled={isPending || isSkipTextQuestionPending}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
