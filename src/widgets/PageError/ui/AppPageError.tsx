import { Button } from '@/shared/ui';
import { ButtonVariant } from '@shared/lib';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export function AppPageError() {
  const navigate = useNavigate();
  const error = useRouteError() as Error;

  const handleGoHome = () => {
    navigate('/app/dashboard');
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Иконка ошибки */}
        <div className="flex justify-center">
          <div className="rounded-full bg-red-500/10 p-6">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
        </div>

        {/* Заголовок */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-3">
            Упс! Что-то пошло не так
          </h1>
          <p className="text-gray-400 text-lg">
            Произошла непредвиденная ошибка при загрузке данных
          </p>
        </div>

        {/* Сообщение об ошибке (в режиме разработки) */}
        {import.meta.env.DEV && error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-left">
            <p className="text-red-400 text-sm font-mono break-all">
              {error.message || 'Неизвестная ошибка'}
            </p>
          </div>
        )}

        {/* Возможные причины */}
        <div className="bg-muted/30 rounded-lg p-4 text-left">
          <p className="text-sm text-gray-300 mb-2 font-semibold">Возможные причины:</p>
          <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
            <li>Не удалось получить данные от сервера</li>
            <li>Проблемы с подключением к интернету</li>
            <li>Временные технические неполадки</li>
          </ul>
        </div>

        {/* Кнопки */}
        <div className="flex gap-3">
          <Button 
            variant={ButtonVariant.PRIMARY} 
            onClick={handleGoHome}
            className="flex-1"
          >
            На главную
          </Button>
          <Button 
            variant={ButtonVariant.SECONDARY} 
            onClick={handleReload}
            className="flex-1"
          >
            Попробовать снова
          </Button>
        </div>

        {/* Дополнительная помощь */}
        <p className="text-sm text-gray-500">
          Если проблема повторяется, попробуйте обновить страницу или{' '}
          <a href="/app/dashboard" className="text-primary hover:underline">
            вернитесь на главную
          </a>
        </p>
      </div>
    </div>
  );
}

