import { Card } from '@shared/ui';
import { ThemeToggleButton } from '@features/toggle-theme';
import { Settings2, Palette } from 'lucide-react';
import { useTheme } from '@shared/lib';

export default function SettingsPage() {
  const { theme } = useTheme();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Заголовок */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings2 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-white">Настройки</h1>
          </div>
          <p className="text-gray-400">Настройте приложение под себя</p>
        </div>

        {/* Настройки темы */}
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Palette className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-white">Тема оформления</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Выберите светлую или тёмную тему для интерфейса
              </p>
              <div className="inline-flex items-center gap-3 bg-muted px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-300">
                  Текущая тема: <span className="font-semibold text-white">
                    {theme === 'dark' ? 'Тёмная' : 'Светлая'}
                  </span>
                </span>
              </div>
            </div>
            <div className="shrink-0">
              <ThemeToggleButton />
            </div>
          </div>
        </Card>

        {/* Будущие настройки */}
        <Card>
          <h2 className="text-xl font-bold text-white mb-4">Дополнительные настройки</h2>
          <div className="text-center py-8">
            <p className="text-gray-400">⚙️ Другие настройки скоро появятся</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
