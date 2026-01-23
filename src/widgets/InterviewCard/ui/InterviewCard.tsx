import { InterviewCheckboxQuestion, QuestionTextElement } from '@widgets/Questions';
import { useInterviewStore } from '@entities/interview/model/store';
import { ModalInterviewResults } from '@widgets/ModalInterviewResults';
import { Modal, useModal } from '@shared/ui';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionStore } from '@entities/question/model';

export function InterviewCard() {
  const questions = useQuestionStore((state) => state.questions);
  const { interviewResults, clearInterviewResults, interviewType } = useInterviewStore(
    (state) => state
  );
  const { isOpen, open, close } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    if (interviewResults) {
      open();
    }
  }, [interviewResults, open]);

  const handleCloseModal = () => {
    close();
    clearInterviewResults();
    navigate('/app/interview', { replace: true });
  };

  if (interviewResults) {
    return (
      <Modal isOpen={isOpen} onClose={handleCloseModal} size="lg">
        <ModalInterviewResults {...interviewResults} onClose={handleCloseModal} />
      </Modal>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-white">Вопросы не загружены</p>
      </div>
    );
  }

  const isCheckbox = interviewType === 'С выбором ответов';

  return <div>{isCheckbox ? <InterviewCheckboxQuestion /> : <QuestionTextElement />}</div>;
}
