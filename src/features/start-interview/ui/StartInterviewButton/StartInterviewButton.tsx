import { Button } from '@shared/ui/Button/Button';
import { useStartInterview } from '@features/start-interview/model/';
import { useNavigate } from 'react-router-dom';

export function StartInterviewButton() {
  const { mutate: startInterview, isPending } = useStartInterview();
  const navigate = useNavigate();

  const handleStartInterview = () => {
    navigate('/app/interview/loading-interview');
    startInterview();
  };
  return (
    <Button className="py-2 ml-auto" onClick={handleStartInterview} disabled={isPending}>
      {isPending ? 'Загрузка вопросов...' : 'Начать собеседование'}
    </Button>
  );
}
