import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { userInfoAtom } from '@entities/user';

const ProtectedRoutesFromUser = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = userInfoAtom();

  React.useEffect(() => {
    if (userInfo.isAuthed) {
      navigate('/app/interview', {
        state: { from: location },
      });
    }
  }, [userInfo.isAuthed, navigate, location]);

  if (userInfo.isAuthed) {
    return null;
  }

  return <>{children}</>;
};

export { ProtectedRoutesFromUser };
