import { useInterviewStore } from '@entities/interview/model/store';
import { Navigate } from 'react-router-dom';

type ProtectedLoadingRouteProps = {
  children: React.ReactNode;
};

export const ProtectedLoadingRoute = ({ children }: ProtectedLoadingRouteProps) => {
  const isStarted = useInterviewStore((state) => state.isStarted);
  const isLoading = useInterviewStore((state) => state.isLoading);
  const activeInterview = useInterviewStore((state) => state.activeInterview);

  if (!isStarted || (!isLoading && !activeInterview)) {
    return <Navigate to="/app/interview" replace />;
  }

  return <>{children}</>;
};
