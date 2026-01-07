import heroBg from '@shared/assets/images/herobg.jpg';
import { Button } from '@shared/ui';
import { Link } from 'react-router-dom';
import { ButtonVariant } from '@shared/lib';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* Затемнение */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Контент поверх изображения */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full text-center space-y-8">
          {/* Announcement Banner */}
          <div className="inline-flex items-center gap-x-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-white ring-1 ring-inset ring-primary/20 backdrop-blur-sm">
            <span>Следите за обновлениями нашего приложения в блоге.</span>
            <Link
              to="/blog"
              className="font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1"
            >
              Узнать больше
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl lg:text-7xl">
            Выведите свои знания на новый уровень
          </h1>

          {/* Descriptive Paragraph */}
          <p className="text-lg leading-8 text-white/80 sm:text-xl max-w-2xl mx-auto">
            Практикуйтесь в подготовке к собеседованиям и получите работу мечты с помощью нашего
            сервиса. Интегрированный AI ассистент поможет вам с подготовкой и даст вам возможность
            проверить свои знания.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant={ButtonVariant.PRIMARY} size="lg" className="w-full sm:w-auto">
              Начать
            </Button>
            <Link
              to="/about"
              className="font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1"
            >
              Узнать больше
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
