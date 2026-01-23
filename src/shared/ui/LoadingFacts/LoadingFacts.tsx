import { useEffect, useState, useMemo } from 'react';

type LoadingFactsProps = {
  facts: string[];
  interval?: number; // в миллисекундах
  className?: string;
};

// Функция для перемешивания массива
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function LoadingFacts({ facts, interval = 5000, className = '' }: LoadingFactsProps) {
  // Перемешиваем факты при каждом монтировании компонента
  const shuffledFacts = useMemo(() => shuffleArray(facts), [facts]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      // Fade out
      setIsVisible(false);

      // Смена факта после анимации
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % shuffledFacts.length);
        setIsVisible(true);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [shuffledFacts.length, interval]);

  if (!shuffledFacts.length) return null;

  return (
    <div className={`text-center ${className}`}>
      <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-muted-foreground italic">💡 {shuffledFacts[currentIndex]}</p>
      </div>

      {/* Индикатор прогресса */}
      <div className="flex justify-center gap-2 mt-4">
        {shuffledFacts.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-primary' : 'w-1.5 bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
