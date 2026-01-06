import { Button } from '@/shared/ui';

export function PageError() {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <p className="text-2xl font-bold">Произошла непредвиденная ошибка</p>
      <Button variant="primary" onClick={handleReload}>
        Перезагрузить
      </Button>
    </div>
  );
}
