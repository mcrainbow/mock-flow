import { Button } from '@/shared/ui';
import { useLogout } from '../model/hooks/useLogout';

export const LogoutButton = () => {
  const { mutate: logout } = useLogout();
  return <Button onClick={() => logout()}>Выйти</Button>;
};
