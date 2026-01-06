import React from 'react';
import type { Decorator } from '@storybook/react';

export const themeDecorator: Decorator = (Story, context) => {
  // Получаем тему из глобальных параметров Storybook
  const theme = context.globals.theme || 'light';

  // Добавляем/удаляем класс dark на корневой элемент Storybook
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  return <Story />;
};
