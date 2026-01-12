import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Создаем worker для браузера
export const worker = setupWorker(...handlers);
