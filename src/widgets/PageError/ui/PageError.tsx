import { Button } from '@/shared/ui';
import { ButtonVariant } from '@shared/lib';

export function PageError() {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <p className="text-2xl font-bold">Произошла непредвиденная ошибка</p>
      <Button variant={ButtonVariant.PRIMARY} onClick={handleReload}>
        Перезагрузить
      </Button>
    </div>
  );
}
