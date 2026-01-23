import { Card } from '@/shared/ui';
import { InterviewCardLoading } from '@/widgets/InterviewCardLoading';

export default function LoadingInterviewPage() {
  return (
    <Card className="w-2/3 mx-auto mt-20">
      <InterviewCardLoading />
    </Card>
  );
}
