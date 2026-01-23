import { type QuestionCheckbox } from '@entities/question/model';
import { useInterviewStore } from '@entities/interview/model';
import { useState } from 'react';
import { SingleChoiceOptions } from '../QuestinsCheckboxTypes';
import { SubmitAnswerButton, useSubmitAnswer } from '@/features/submit-answer';
import { NextQuestionButton, useNextButton } from '@/features/next-question';
import { FinishInterviewButton } from '@/features/finish-interview';
import { Accordion } from '@/shared/ui';
import { SkipQuestionButton } from '@/features/skip-question-button';
import { SkipInterviewButton } from '@/features/skip-interview';
import { useQuestionStore } from '@entities/question/model';

interface SingleChoiceQuestionProps {
  question: QuestionCheckbox;
}

export function SingleChoiceQuestion({ question }: SingleChoiceQuestionProps) {
  const { currentQuestionIndex, setCurrentQuestionIndex } = useQuestionStore();
  const interview = useInterviewStore((state) => state.activeInterview);
  const { mutate: submitAnswer, isPending } = useSubmitAnswer();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  const canSubmit = selectedIndex !== null && !isSkipped;
  const isLastQuestion = currentQuestionIndex === (interview?.total_questions ?? 0) - 1;

  const handleSkipSuccess = () => {
    setIsSkipped(true);
  };

  const resetAnswer = () => {
    setSelectedIndex(null);
    setIsAnswered(false);
    setIsSkipped(false);
  };

  const { handleNextQuestion } = useNextButton(
    currentQuestionIndex,
    setCurrentQuestionIndex,
    resetAnswer
  );

  const handleSubmit = () => {
    if (isAnswered || isPending || isSkipped) return;
    if (!interview?.id || !question.id) return;

    submitAnswer({
      interview_id: interview.id,
      question_id: question.id,
      user_answer: {
        selectedIndex,
      },
      is_correct: selectedIndex === question.correctAnswerIndex,
    });
    setIsAnswered(true);
  };

  const isQuestionCompleted = isAnswered || isSkipped;

  return (
    <>
      <SingleChoiceOptions
        options={question.options}
        correctAnswerIndex={
          'correctAnswerIndex' in question ? (question.correctAnswerIndex as number) : 0
        }
        selectedIndex={selectedIndex}
        isAnswered={isQuestionCompleted}
        onSelect={isQuestionCompleted ? () => {} : setSelectedIndex}
      />

      <div className="flex gap-2 items-center justify-end pt-2">
        {!isQuestionCompleted && (
          <>
            <SkipInterviewButton />
            <SkipQuestionButton onSkipSuccess={handleSkipSuccess} />
            <SubmitAnswerButton onClick={handleSubmit} disabled={!canSubmit || isPending} />
          </>
        )}

        {isQuestionCompleted && !isPending && !isLastQuestion && (
          <NextQuestionButton onClick={handleNextQuestion} />
        )}

        {isQuestionCompleted && !isPending && isLastQuestion && <FinishInterviewButton />}
      </div>

      {isSkipped && <div className="text-warning text-sm mt-2">⚠️ Вопрос пропущен</div>}

      <Accordion
        key={currentQuestionIndex}
        title="Объяснение"
        disabled={!isAnswered}
        className="mt-8"
      >
        <div className="space-y-4">
          <p className="text-muted-foreground">{question.explanation.summary}</p>
          <div className="p-4 bg-muted/30 rounded border border-border">
            <code className="text-sm">{question.explanation.example}</code>
          </div>
          <p className="text-sm">{question.explanation.details}</p>
          <ul className="list-disc list-inside space-y-2">
            {question.explanation.keyPoints.map((keyPoint) => (
              <li key={keyPoint} className="text-sm text-muted-foreground">
                {keyPoint}
              </li>
            ))}
          </ul>
        </div>
      </Accordion>
    </>
  );
}
