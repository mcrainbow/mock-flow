import { useUserStore } from '@entities/user/model/store';
import { Card, Button, useModal, Avatar } from '@shared/ui';
import { ButtonVariant } from '@shared/lib';
import { LogoutButton } from '@features/logout';
import { EditNameModal } from '@features/edit-profile';
import { Mail, User, Calendar, Trophy, Target, XCircle, Edit } from 'lucide-react';

export default function ProfilePage() {
  const user = useUserStore((state) => state.user);
  const { isOpen, open, close } = useModal();

  // Процент успешности
  const successRate =
    user.started_interviews > 0
      ? Math.round((user.completed_interviews / user.started_interviews) * 100)
      : 0;

  return (
    <>
      <EditNameModal isOpen={isOpen} onClose={close} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Заголовок */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Профиль</h1>
            <p className="text-gray-400">Управляйте своей учетной записью</p>
          </div>

          {/* Основная информация */}
          <Card>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Аватар */}
            <div className="shrink-0">
              <Avatar 
                name={user.name} 
                src={user.avatar} 
                size="xl" 
              />
            </div>

              {/* Информация о пользователе */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {user.name || 'Пользователь'}
                </h2>

                <div className="space-y-3">
                  {/* Email */}
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>{user.email || 'email@example.com'}</span>
                  </div>

                  {/* ID */}
                  <div className="flex items-center gap-3 text-gray-300">
                    <User className="w-5 h-5 text-primary" />
                    <span className="text-sm text-gray-400">ID: {user.id || 'N/A'}</span>
                  </div>

                  {/* Дата регистрации (можно добавить позже) */}
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-sm text-gray-400">Участник с января 2026</span>
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex gap-3 mt-6">
                  <Button
                    variant={ButtonVariant.SECONDARY}
                    className="flex items-center gap-2"
                    onClick={open}
                  >
                    <Edit className="w-4 h-4" />
                    Изменить имя
                  </Button>
                  <LogoutButton />
                </div>
              </div>
            </div>
          </Card>

          {/* Статистика */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-6">Статистика</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Всего попыток */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <p className="text-sm text-gray-400">Всего попыток</p>
                </div>
                <p className="text-3xl font-bold text-white">{user.started_interviews}</p>
              </div>

              {/* Завершено */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-5 h-5 text-green-400" />
                  <p className="text-sm text-gray-400">Завершено</p>
                </div>
                <p className="text-3xl font-bold text-green-400">{user.completed_interviews}</p>
              </div>

              {/* Пропущено */}
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <XCircle className="w-5 h-5 text-orange-400" />
                  <p className="text-sm text-gray-400">Пропущено</p>
                </div>
                <p className="text-3xl font-bold text-orange-400">{user.skipped_interviews}</p>
              </div>

              {/* Процент успеха */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <p className="text-sm text-gray-400">Успешность</p>
                </div>
                <p className="text-3xl font-bold text-primary">{successRate}%</p>
              </div>
            </div>

            {/* Прогресс бар */}
            {user.started_interviews > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Прогресс завершения</span>
                  <span className="text-sm font-semibold text-primary">{successRate}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${successRate}%` }}
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Достижения (можно добавить позже) */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-4">Достижения</h3>
            <div className="text-center py-8">
              <p className="text-gray-400">🏆 Достижения скоро появятся</p>
            </div>
          </Card>

          {/* Опасная зона */}
          <Card className="border-2 border-red-500/20">
            <h3 className="text-xl font-bold text-red-400 mb-4">Опасная зона</h3>
            <p className="text-gray-400 mb-4">Эти действия необратимы. Будьте осторожны!</p>
            <Button variant={ButtonVariant.DANGER} disabled>
              Удалить аккаунт
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}
