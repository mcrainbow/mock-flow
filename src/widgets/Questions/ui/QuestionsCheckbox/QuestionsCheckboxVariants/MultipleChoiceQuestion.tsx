import { useState } from 'react';
import { MultipleChoiceOptions } from '../QuestinsCheckboxTypes';
import { useQuestionStore, type QuestionCheckbox } from '@entities/question/model';
import { NextQuestionButton, useNextButton } from '@/features/next-question';
import { SubmitAnswerButton, useSubmitAnswer } from '@/features/submit-answer';
import { FinishInterviewButton } from '@/features/finish-interview';
import { Accordion } from '@/shared/ui';
import { SkipQuestionButton } from '@/features/skip-question-button';
import { SkipInterviewButton } from '@/features/skip-interview';
import { useInterviewStore } from '@entities/interview/model';

interface MultipleChoiceQuestionProps {
  question: QuestionCheckbox;
}

export function MultipleChoiceQuestion({ question }: MultipleChoiceQuestionProps) {
  const { currentQuestionIndex, setCurrentQuestionIndex } = useQuestionStore();
  const interview = useInterviewStore((state) => state.activeInterview);
  const { mutate: submitAnswer, isPending } = useSubmitAnswer();
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  const handleSkipSuccess = () => {
    setIsSkipped(true);
  };

  const resetAnswer = () => {
    setSelectedIndices([]);
    setIsAnswered(false);
    setIsSkipped(false);
  };

  const { handleNextQuestion } = useNextButton(
    currentQuestionIndex,
    setCurrentQuestionIndex,
    resetAnswer
  );

  const canSubmit = selectedIndices.length > 0 && !isSkipped;
  const isLastQuestion = currentQuestionIndex === (interview?.total_questions ?? 0) - 1;
  const isCorrect =
    selectedIndices.length === question.correctAnswerIndices?.length &&
    selectedIndices.every((index) => question.correctAnswerIndices?.includes(index));

  const isQuestionCompleted = isAnswered || isSkipped;

  const handleToggleMultiple = (index: number) => {
    if (isQuestionCompleted) return;
    setSelectedIndices((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }
      return [...prev, index];
    });
  };

  const handleSubmit = () => {
    if (isAnswered || isPending || isSkipped) return;
    if (!interview?.id || !question.id) return;

    submitAnswer({
      interview_id: interview.id,
      question_id: question.id,
      user_answer: {
        selectedIndices: selectedIndices,
      },
      is_correct: isCorrect,
    });
    setIsAnswered(true);
  };

  return (
    <div>
      <MultipleChoiceOptions
        options={question.options}
        correctAnswerIndices={question.correctAnswerIndices ?? []}
        selectedIndices={selectedIndices}
        isAnswered={isQuestionCompleted}
        onToggle={handleToggleMultiple}
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
    </div>
  );
}
