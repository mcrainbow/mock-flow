import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '@entities/user/model/store';

const ProtectedRoutesFromUser = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthed = useUserStore((state) => state.isAuthed);

  React.useEffect(() => {
    if (isAuthed) {
      navigate('/app/interview', {
        state: { from: location },
      });
    }
  }, [isAuthed, navigate, location]);

  if (isAuthed) {
    return null;
  }

  return <>{children}</>;
};

export { ProtectedRoutesFromUser };
