# 📚 Полный гайд по MSW (Mock Service Worker)

## 📖 Содержание

1. [Что такое MSW и зачем он нужен](#что-такое-msw)
2. [Установка](#установка)
3. [Базовые концепции](#базовые-концепции)
4. [Настройка проекта](#настройка-проекта)
5. [Создание handlers](#создание-handlers)
6. [Использование в тестах](#использование-в-тестах)
7. [Продвинутые техники](#продвинутые-техники)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Что такое MSW?

### Проблема

Когда вы пишете тесты для компонентов, которые делают API запросы:

```typescript
// ❌ Обычный подход - мокаем функцию
vi.mock('@shared/config', () => ({
  auth: {
    signInWithPassword: vi.fn(),
  },
}));

// Проблема: мокаем на уровне модуля, а не HTTP
```

**Проблемы этого подхода:**

- Мокируете не то, что реально происходит (HTTP запросы)
- Нужно мокать каждую функцию отдельно
- Сложно тестировать error handling
- Не можете использовать одни и те же моки для разработки

### Решение - MSW

**MSW перехватывает HTTP запросы на уровне сети:**

```
Ваш код → fetch/axios → MSW перехватывает → Возвращает mock ответ
                    ↓
            (реальный запрос не уходит)
```

### Преимущества

✅ **Тестируете реальное поведение** - ваш код делает настоящий `fetch()` запрос  
✅ **Один код для тестов и разработки** - те же handlers работают в браузере  
✅ **Легко симулировать ошибки** - просто вернуть 500 или 404  
✅ **Не нужно мокать модули** - работает с любым HTTP клиентом

---

## 📦 Установка

```bash
npm install msw --save-dev
```

**Зачем `--save-dev`?**  
MSW нужен только для тестов и разработки, не для production bundle.

---

## 🧠 Базовые концепции

### 1. Request Handler (Обработчик запроса)

Это функция, которая перехватывает HTTP запрос и возвращает mock ответ.

```typescript
import { http, HttpResponse } from 'msw';

// http - для REST API
// HttpResponse - для создания ответов

const handler = http.post('/api/login', ({ request }) => {
  // request - объект с информацией о запросе
  return HttpResponse.json({
    token: 'mock-token',
  });
});
```

**Что здесь происходит:**

- `http.post` - перехватываем POST запрос
- `/api/login` - URL который перехватываем
- `({ request })` - получаем объект запроса
- `HttpResponse.json()` - возвращаем JSON ответ

### 2. Server (для тестов в Node.js)

```typescript
import { setupServer } from 'msw/node';

const server = setupServer(...handlers);
```

**Зачем нужен server:**

- Запускается перед тестами
- Перехватывает все HTTP запросы в Node окружении
- Останавливается после тестов

### 3. Worker (для разработки в браузере)

```typescript
import { setupWorker } from 'msw/browser';

const worker = setupWorker(...handlers);
```

**Зачем нужен worker:**

- Работает в браузере через Service Worker
- Позволяет разрабатывать без backend
- Видно запросы в DevTools

---

## 🏗️ Настройка проекта

### Шаг 1: Создаем структуру

```
src/
  └── mocks/
      ├── handlers/          # Все обработчики запросов
      │   ├── auth.handlers.ts
      │   ├── user.handlers.ts
      │   └── index.ts
      ├── server.ts          # Для тестов (Node)
      └── browser.ts         # Для разработки (Browser)
```

**Почему такая структура:**

- `handlers/` - логически группируем по фичам (auth, user, products, etc.)
- `server.ts` - отдельно для тестов
- `browser.ts` - отдельно для разработки

---

## 📝 Создание Handlers

### Базовый Handler

**`src/mocks/handlers/auth.handlers.ts`**

```typescript
import { http, HttpResponse } from 'msw';

// ✅ Константа с URL вашего API
const API_URL = 'https://your-project.supabase.co';

export const authHandlers = [
  // Перехватываем POST запрос на /auth/v1/token
  http.post(`${API_URL}/auth/v1/token`, async ({ request }) => {
    // ⚠️ ВАЖНО: async функция, потому что читаем body

    // 1. Читаем body запроса
    const body = await request.json(); // { email: string, password: string }

    // 2. Извлекаем данные
    const { email, password } = body as { email: string; password: string };

    // 3. Логика проверки (как настоящий backend)
    if (email === 'test@example.com' && password === 'password123') {
      // ✅ Успешный ответ
      return HttpResponse.json({
        access_token: 'mock-access-token',
        token_type: 'bearer',
        expires_in: 3600,
        user: {
          id: 'user-123',
          email: 'test@example.com',
        },
      });
    }

    // ❌ Ошибка - неверные данные
    return HttpResponse.json(
      {
        error: 'invalid_grant',
        error_description: 'Invalid login credentials',
      },
      { status: 400 } // ⚠️ Важно указать статус код!
    );
  }),
];
```

**Разбор построчно:**

```typescript
http.post(`${API_URL}/auth/v1/token`, async ({ request }) => {
```

- `http.post` - метод POST (есть get, put, delete, patch)
- `` `${API_URL}/auth/v1/token` `` - полный URL запроса
- `async` - функция асинхронная, потому что `request.json()` возвращает Promise
- `{ request }` - деструктурируем параметры

```typescript
const body = await request.json();
```

- `request.json()` - читаем JSON из body запроса
- `await` - ждем пока прочитается
- `body` - содержит данные, которые отправил клиент

```typescript
return HttpResponse.json({ ... });
```

- `HttpResponse.json()` - создает JSON ответ
- По умолчанию статус 200

```typescript
return HttpResponse.json({ ... }, { status: 400 });
```

- Второй параметр - опции
- `status: 400` - устанавливаем статус код

### Handler с параметрами URL

```typescript
// GET /users/:id
http.get(`${API_URL}/users/:id`, ({ params }) => {
  const { id } = params; // ✅ Получаем id из URL

  return HttpResponse.json({
    id,
    name: 'Test User',
  });
});
```

### Handler с query параметрами

```typescript
// GET /users?role=admin&page=1
http.get(`${API_URL}/users`, ({ request }) => {
  const url = new URL(request.url);
  const role = url.searchParams.get('role'); // 'admin'
  const page = url.searchParams.get('page'); // '1'

  return HttpResponse.json({
    users: [],
    page: Number(page),
    role,
  });
});
```

### Handler с headers

```typescript
http.get(`${API_URL}/protected`, ({ request }) => {
  // Читаем Authorization header
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.includes('Bearer ')) {
    // ❌ Нет токена
    return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ✅ Есть токен
  return HttpResponse.json({ data: 'secret data' });
});
```

### Собираем все handlers

**`src/mocks/handlers/index.ts`**

```typescript
import { authHandlers } from './auth.handlers';
import { userHandlers } from './user.handlers';

// Экспортируем массив всех handlers
export const handlers = [
  ...authHandlers, // Все auth handlers
  ...userHandlers, // Все user handlers
];
```

**Зачем так делать:**

- Группируем по логике (auth, users, products)
- Легко найти нужный handler
- Можно переиспользовать в разных местах

---

## 🖥️ Настройка для тестов (Node)

**`src/mocks/server.ts`**

```typescript
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Создаем MSW сервер
export const server = setupServer(...handlers);
```

**Что происходит:**

- `setupServer` - создает сервер для Node.js окружения
- `...handlers` - spread оператор, передаем все handlers
- `export` - экспортируем, чтобы использовать в setup.ts

### Интеграция в `test/setup.ts`

```typescript
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '@/mocks/server';

// ✅ Запускаем MSW ПЕРЕД всеми тестами
beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn', // Предупреждать о незамоканных запросах
  });
});

// ✅ Сбрасываем handlers ПОСЛЕ каждого теста
afterEach(() => {
  server.resetHandlers();
  // Зачем: если в тесте изменили handler, вернуть к исходному
});

// ✅ Останавливаем сервер ПОСЛЕ всех тестов
afterAll(() => {
  server.close();
});
```

**Зачем каждый хук:**

**`beforeAll()`** - Запускаем один раз перед всеми тестами

- MSW начинает перехватывать запросы
- Долго инициализируется, поэтому делаем один раз

**`afterEach()`** - После каждого теста

- `resetHandlers()` возвращает handlers к исходным
- Если в тесте сделали `server.use(...)`, это сбросится

**`afterAll()`** - После всех тестов

- Останавливаем перехват запросов
- Освобождаем ресурсы

**Опции `onUnhandledRequest`:**

- `'warn'` - показывать warning (полезно для отладки)
- `'error'` - бросать ошибку (строгий режим)
- `'bypass'` - пропускать (разрешить реальные запросы)

---

## 🧪 Использование в тестах

### Базовый тест с MSW

```typescript
import { describe, test, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from '@test-utils';
import LoginPage from '@pages/LoginPage';

describe('Login Flow with MSW', () => {
  test('Успешный логин', async () => {
    // 1. Рендерим компонент
    customRender(<LoginPage />);

    // 2. Вводим данные (те же, что в handler!)
    await userEvent.type(
      screen.getByLabelText('Email'),
      'test@example.com' // ✅ Из handler: if (email === 'test@example.com')
    );
    await userEvent.type(
      screen.getByLabelText('Password'),
      'password123'      // ✅ Из handler: if (password === 'password123')
    );

    // 3. Кликаем кнопку
    await userEvent.click(screen.getByRole('button', { name: 'Вход' }));

    // 4. MSW перехватит запрос и вернет mock ответ!

    // 5. Проверяем результат
    await waitFor(() => {
      expect(screen.getByText(/Вход выполнен успешно/i)).toBeInTheDocument();
    });
  });
});
```

**Что происходит под капотом:**

```
1. Компонент рендерится
2. Пользователь вводит данные
3. Клик по кнопке → вызывается fetch('/auth/v1/token')
4. MSW перехватывает запрос ✅
5. MSW вызывает handler
6. Handler проверяет данные
7. Handler возвращает mock ответ
8. Компонент получает ответ (как от реального API!)
9. Компонент обновляет UI
10. Тест проверяет UI
```

### Тест с ошибкой

```typescript
test('Ошибка при неверных данных', async () => {
  customRender(<LoginPage />);

  // ❌ Вводим неверные данные
  await userEvent.type(screen.getByLabelText('Email'), 'wrong@example.com');
  await userEvent.type(screen.getByLabelText('Password'), 'wrong');
  await userEvent.click(screen.getByRole('button', { name: 'Вход' }));

  // Handler вернет status: 400 и error_description
  await waitFor(() => {
    expect(screen.getByText(/Invalid login credentials/i)).toBeInTheDocument();
  });
});
```

### Переопределение handler для конкретного теста

```typescript
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';

test('Симуляция ошибки сервера', async () => {
  // ✅ Переопределяем handler ТОЛЬКО для этого теста
  server.use(
    http.post('*/auth/v1/token', () => {
      // Возвращаем 500 ошибку
      return HttpResponse.json(
        { error: 'server_error', error_description: 'Internal server error' },
        { status: 500 }
      );
    })
  );

  customRender(<LoginPage />);

  await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
  await userEvent.type(screen.getByLabelText('Password'), 'password123');
  await userEvent.click(screen.getByRole('button', { name: 'Вход' }));

  // Компонент должен обработать 500 ошибку
  await waitFor(() => {
    expect(screen.getByText(/Internal server error/i)).toBeInTheDocument();
  });

  // ⚠️ После теста server.resetHandlers() вернет исходный handler
});
```

**Зачем `server.use()`:**

- Временно меняет поведение для одного теста
- Не влияет на другие тесты (из-за `resetHandlers()`)
- Удобно для тестирования edge cases

---

## 🎨 Продвинутые техники

### 1. Задержка ответа (симуляция медленного интернета)

```typescript
import { delay } from 'msw';

http.post(`${API_URL}/login`, async () => {
  await delay(3000); // ⏱️ Задержка 3 секунды

  return HttpResponse.json({ token: 'mock-token' });
});
```

**Когда использовать:**

- Тестировать loading состояния
- Проверить, что показывается спиннер
- Убедиться, что кнопка disabled во время загрузки

```typescript
test('Показывается loading при медленном интернете', async () => {
  server.use(
    http.post('*/login', async () => {
      await delay(1000);
      return HttpResponse.json({ token: 'mock-token' });
    })
  );

  customRender(<LoginPage />);

  await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
  await userEvent.type(screen.getByLabelText('Password'), 'password123');
  await userEvent.click(screen.getByRole('button', { name: 'Вход' }));

  // ✅ Проверяем, что показывается loading
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Ждем завершения
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
```

### 2. Проверка отправленных данных

```typescript
test('Проверка, что отправлены правильные данные', async () => {
  let capturedBody: any;
  let capturedHeaders: Headers;

  server.use(
    http.post('*/login', async ({ request }) => {
      // ✅ Захватываем данные для проверки
      capturedBody = await request.json();
      capturedHeaders = request.headers;

      return HttpResponse.json({ token: 'mock-token' });
    })
  );

  customRender(<LoginPage />);

  await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
  await userEvent.type(screen.getByLabelText('Password'), 'password123');
  await userEvent.click(screen.getByRole('button', { name: 'Вход' }));

  await waitFor(() => {
    // ✅ Проверяем body
    expect(capturedBody).toEqual({
      email: 'test@example.com',
      password: 'password123',
    });

    // ✅ Проверяем headers
    expect(capturedHeaders.get('Content-Type')).toBe('application/json');
  });
});
```

### 3. Состояние между запросами (session)

```typescript
// Глобальное состояние для handlers
let currentSession: { token: string; userId: string } | null = null;

export const authHandlers = [
  // Login - сохраняем сессию
  http.post(`${API_URL}/login`, async ({ request }) => {
    const body = await request.json();

    if (body.email === 'test@example.com') {
      // ✅ Сохраняем сессию
      currentSession = {
        token: 'mock-token-123',
        userId: 'user-123',
      };

      return HttpResponse.json({
        access_token: currentSession.token,
        user: { id: currentSession.userId },
      });
    }

    return HttpResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  }),

  // Get user - проверяем сессию
  http.get(`${API_URL}/user`, ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    // ✅ Проверяем, что токен совпадает с сохраненным
    if (!currentSession || authHeader !== `Bearer ${currentSession.token}`) {
      return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json({
      id: currentSession.userId,
      email: 'test@example.com',
    });
  }),

  // Logout - очищаем сессию
  http.post(`${API_URL}/logout`, () => {
    currentSession = null; // ✅ Очищаем
    return new HttpResponse(null, { status: 204 });
  }),
];
```

**Зачем это нужно:**

- Симулировать реальное поведение backend
- Проверить, что токен передается правильно
- Тестировать флоу с авторизацией

### 4. Разные ответы на повторные запросы

```typescript
let requestCount = 0;

http.get(`${API_URL}/data`, () => {
  requestCount++;

  if (requestCount === 1) {
    // Первый запрос - ошибка
    return HttpResponse.json({ error: 'Network error' }, { status: 500 });
  }

  // Второй запрос - успех
  return HttpResponse.json({ data: 'Success' });
});
```

**Когда использовать:**

- Тестировать retry логику
- Проверить, что приложение пытается повторить запрос

---

## 🌐 Настройка для разработки (Browser)

### Шаг 1: Создаем worker

**`src/mocks/browser.ts`**

```typescript
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Создаем worker для браузера
export const worker = setupWorker(...handlers);
```

### Шаг 2: Интегрируем в main.tsx

**`src/main.tsx`**

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';

// ✅ Включаем MSW только в development
if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW === 'true') {
  // Динамический import (не включится в production)
  const { worker } = await import('./mocks/browser');

  await worker.start({
    onUnhandledRequest: 'bypass', // Пропускать не замоканные запросы
  });

  console.log('🔶 MSW enabled');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Шаг 3: Создаем .env файл

**`.env.local`** (не коммитить!)

```bash
VITE_ENABLE_MSW=true
```

### Шаг 4: Генерируем Service Worker

```bash
npx msw init public/ --save
```

**Что делает эта команда:**

- Создает файл `public/mockServiceWorker.js`
- Этот файл перехватывает запросы в браузере
- Добавляет путь в `package.json`

**Результат:**

```
public/
  └── mockServiceWorker.js  # ✅ Создан
```

### Использование в разработке

1. Запустите dev сервер: `npm run dev`
2. Откройте браузер
3. Все API запросы будут мокаться!
4. В консоли увидите: `🔶 MSW enabled`

**Проверка в DevTools:**

```
Network tab:
  GET /api/users  [MSW]  200 OK
  POST /api/login [MSW]  200 OK
```

---

## 🐛 Troubleshooting

### Проблема 1: "Failed to register a ServiceWorker"

**Причина:** Файл `mockServiceWorker.js` не найден

**Решение:**

```bash
npx msw init public/ --save
```

### Проблема 2: Запросы не перехватываются

**Причина:** URL в handler не совпадает с реальным

**Решение:** Используйте wildcards

```typescript
// ❌ Не работает, если URL изменится
http.post('https://example.supabase.co/auth/v1/token', ...)

// ✅ Работает с любым доменом
http.post('*/auth/v1/token', ...)
```

### Проблема 3: Headers не читаются

**Причина:** Используете `request.body` вместо `request.json()`

```typescript
// ❌ Неправильно
const body = request.body;

// ✅ Правильно
const body = await request.json();
```

### Проблема 4: Тесты "висят" и не завершаются

**Причина:** Забыли `await` перед async операцией

```typescript
// ❌ Тест завершится до того, как придет ответ
userEvent.click(button);
expect(...) // Проверка выполнится сразу!

// ✅ Ждем выполнения
await userEvent.click(button);
await waitFor(() => expect(...));
```

### Проблема 5: Handler не сбрасывается между тестами

**Причина:** Нет `server.resetHandlers()` в `afterEach`

**Решение:**

```typescript
afterEach(() => {
  server.resetHandlers();
});
```

---

## 📊 Сравнение: vi.mock vs MSW

| Критерий            | `vi.mock()`     | MSW                    |
| ------------------- | --------------- | ---------------------- |
| Что мокает          | Модуль/функцию  | HTTP запросы           |
| Реальность          | Не делает fetch | Делает реальный fetch  |
| Переиспользование   | Сложно          | Легко (те же handlers) |
| В браузере          | Нет             | Да (service worker)    |
| Сложность настройки | Средняя         | Средняя                |
| Лучше для           | Unit тесты      | Integration тесты      |

**Когда использовать vi.mock:**

- Unit тесты одной функции
- Не нужно тестировать HTTP слой
- Быстрые тесты

**Когда использовать MSW:**

- Integration тесты компонентов
- Нужно тестировать реальные запросы
- Разработка без backend

---

## ✅ Чек-лист внедрения MSW

- [ ] Установить `npm install msw --save-dev`
- [ ] Создать структуру `src/mocks/`
- [ ] Написать handlers для всех API endpoints
- [ ] Создать `src/mocks/server.ts`
- [ ] Интегрировать в `test/setup.ts`
- [ ] Удалить старые `vi.mock` для API
- [ ] Написать integration тесты с MSW
- [ ] (Опционально) Настроить browser worker
- [ ] (Опционально) Генерировать `mockServiceWorker.js`

---

## 📚 Дополнительные ресурсы

- [Официальная документация MSW](https://mswjs.io/)
- [Примеры MSW](https://github.com/mswjs/examples)
- [MSW + React Testing Library](https://testing-library.com/docs/react-testing-library/example-intro#msw)

---

## 💡 Лучшие практики

1. **Группируйте handlers по фичам** (auth, users, products)
2. **Используйте wildcards в URL** (`*/auth/v1/token`)
3. **Возвращайте реалистичные ответы** (как настоящий backend)
4. **Тестируйте все статус коды** (200, 400, 401, 500)
5. **Используйте `delay()` для тестирования loading**
6. **Не забывайте `resetHandlers()` в `afterEach`**
7. **Логируйте запросы в dev окружении** для отладки

---

Создано с ❤️ для проекта MockFlow
