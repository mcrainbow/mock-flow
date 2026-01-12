# План миграции на MSW и создание Supabase Handlers

## 📅 Дата создания: 11 января 2026

---

## 🎯 Часть 1: Миграция существующих тестов с vi.mock на MSW

### 1.1 Тесты API функций (features)

#### ✅ Уже сделано:

- `LoginForm.test.tsx` - полностью переписан на MSW
- `SignupForm.test.tsx` - частично использует MSW

#### ❌ Нужно переписать:

**1. `src/features/login/api/loginResponse.test.ts`**

- **Текущее состояние**: Использует `vi.mocked(auth.signInWithPassword)`
- **Что делать**:
  - Удалить моки `auth.signInWithPassword`
  - Добавить `vi.unmock('@shared/config')`
  - Использовать существующие auth handlers из `auth.handlers.ts`
  - Тесты должны делать реальные HTTP запросы через MSW
- **Покрываемые сценарии**:
  - ✅ Успешный логин
  - ✅ Ошибка логина (неверный пароль)
  - ✅ Ошибка сервера

**2. `src/features/signup/api/signupResponse.test.ts`**

- **Текущее состояние**: Использует `vi.mocked(auth.signUp)`
- **Что делать**:
  - Удалить моки `auth.signUp`
  - Добавить `vi.unmock('@shared/config')`
  - Использовать существующие auth handlers из `auth.handlers.ts`
  - Добавить проверку на уже существующий email (409 ошибка)
- **Покрываемые сценарии**:
  - ✅ Успешная регистрация
  - ✅ Ошибка регистрации (пользователь уже существует)
  - ✅ Ошибка валидации пароля

---

### 1.2 Тесты entities API

**3. `src/entities/api/initializeAuth/initializeAuth.test.ts`**

- **Текущее состояние**: Использует `vi.mocked(auth.getSession)`
- **Что делать**:
  - Создать новый MSW handler для `GET /auth/v1/session`
  - Удалить моки `auth.getSession`
  - Тесты должны использовать реальные HTTP запросы
- **Покрываемые сценарии**:
  - ✅ Пользователь авторизован (сессия существует)
  - ✅ Пользователь не авторизован (сессия null)
  - ✅ Истекшая сессия (expired token)

**4. `src/entities/api/getUserInformation/getUserInformation.test.ts`**

- **Текущее состояние**: Использует `vi.mocked(supabase.from)`
- **Что делать**:
  - Создать MSW handler для REST API Supabase
  - GET запрос к таблице `users`
  - Удалить моки `supabase.from`
- **Покрываемые сценарии**:
  - ✅ Успешное получение данных пользователя
  - ✅ Пользователь не найден (404)
  - ✅ Ошибка доступа (403)

---

### 1.3 Тесты UI компонентов

**5. `src/features/logout/ui/LogoutButton.test.tsx`**

- **Текущее состояние**: Использует `vi.mock('../model/hooks/useLogout')`
- **Что делать**:
  - Создать MSW handler для `POST /auth/v1/logout`
  - Удалить моки hook'а
  - Добавить `vi.unmock('@shared/config')`
  - Тест должен проверять реальное взаимодействие с API
- **Покрываемые сценарии**:
  - ✅ Успешный logout (204 No Content)
  - ✅ Ошибка logout (401 если токен невалиден)

**6. Исправить `src/widgets/SignupForm/ui/SignupForm.test.tsx`**

- **Проблема**: Тест ожидает редирект на `/app/interview`, но компонент редиректит на `/app/main`
- **Что делать**:
  - Исправить ожидаемый URL в строке 32 с `/app/interview` на `/app/main`
  - Убедиться, что все тесты используют MSW вместо моков

---

## 🏗️ Часть 2: Создание MSW Handlers для Supabase

### 2.1 Архитектура handlers

```
src/shared/config/mocks/handlers/
├── auth.handlers.ts (✅ уже есть)
├── database.handlers.ts (❌ создать)
├── storage.handlers.ts (❌ создать, если нужно)
└── index.ts (обновить)
```

---

### 2.2 Auth Handlers (существующие - улучшить)

**Файл**: `src/shared/config/mocks/handlers/auth.handlers.ts`

#### Текущие endpoints:

- ✅ `POST /auth/v1/token?grant_type=password` - Login
- ✅ `POST /auth/v1/signup` - Registration
- ✅ `GET /auth/v1/user` - Get current user
- ✅ `POST /auth/v1/logout` - Logout

#### Нужно добавить:

**1. `GET /auth/v1/session` - Get session**

```typescript
// Получение текущей сессии
http.get(`${SUPABASE_URL}/auth/v1/session`, ({ request }) => {
  const authHeader = request.headers.get('Authorization');

  // Проверка валидного токена
  if (authHeader?.includes('mock-access-token')) {
    return HttpResponse.json({
      data: {
        session: {
          access_token: 'mock-access-token-123',
          user: { id: '1', email: 'test@test.com' },
        },
      },
    });
  }

  // Нет сессии
  return HttpResponse.json({ data: { session: null } });
});
```

**2. `POST /auth/v1/token?grant_type=refresh_token` - Refresh token**

```typescript
// Обновление токена
http.post(`${SUPABASE_URL}/auth/v1/token`, async ({ request }) => {
  const url = new URL(request.url);
  const grantType = url.searchParams.get('grant_type');

  if (grantType === 'refresh_token') {
    const body = await request.json();

    if (body.refresh_token === 'mock-refresh-token') {
      return HttpResponse.json({
        access_token: 'new-mock-access-token',
        refresh_token: 'new-mock-refresh-token',
        expires_in: 3600,
      });
    }

    return HttpResponse.json({ error: 'invalid_grant' }, { status: 400 });
  }
});
```

**3. Улучшить валидацию в signup handler**

- Проверка формата email
- Проверка длины пароля (минимум 6 символов)
- Проверка на уже существующий email

---

### 2.3 Database Handlers (создать новый файл)

**Файл**: `src/shared/config/mocks/handlers/database.handlers.ts`

#### Supabase REST API структура:

Supabase использует PostgREST для REST API к базе данных:

- **Base URL**: `${SUPABASE_URL}/rest/v1/`
- **Headers**:
  - `Authorization: Bearer {token}`
  - `apikey: {anon_key}`
  - `Prefer: return=representation` (для получения данных после INSERT/UPDATE)

#### Endpoints для таблицы `users`:

**1. `GET /rest/v1/users` - Get users**

```typescript
// Получение пользователей с фильтрацией
http.get(`${SUPABASE_URL}/rest/v1/users`, ({ request }) => {
  const url = new URL(request.url);
  const uid = url.searchParams.get('uid');
  const select = url.searchParams.get('select') || '*';

  // Проверка авторизации
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return HttpResponse.json({ message: 'JWT token missing' }, { status: 401 });
  }

  // Фильтр по uid (для eq запроса)
  if (uid) {
    const uidFilter = url.searchParams.get('uid');
    const [operator, value] = uidFilter.split('.');

    if (operator === 'eq') {
      // Mock данные пользователя
      const mockUser = {
        id: 1,
        uid: value,
        email: 'test@test.com',
        name: 'Test User',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: new Date().toISOString(),
      };

      return HttpResponse.json([mockUser]);
    }
  }

  // Возврат всех пользователей (если без фильтра)
  return HttpResponse.json([
    {
      id: 1,
      uid: 'user-123',
      email: 'test@test.com',
      name: 'Test User',
    },
  ]);
});
```

**2. `POST /rest/v1/users` - Create user**

```typescript
// Создание нового пользователя
http.post(`${SUPABASE_URL}/rest/v1/users`, async ({ request }) => {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return HttpResponse.json({ message: 'JWT token missing' }, { status: 401 });
  }

  const body = await request.json();

  // Валидация данных
  if (!body.uid || !body.email) {
    return HttpResponse.json({ message: 'uid and email are required' }, { status: 400 });
  }

  // Проверка на дубликат
  if (body.email === 'existing@test.com') {
    return HttpResponse.json(
      {
        message: 'duplicate key value violates unique constraint',
        code: '23505',
      },
      { status: 409 }
    );
  }

  // Успешное создание
  const newUser = {
    id: Math.floor(Math.random() * 1000),
    ...body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return HttpResponse.json([newUser], { status: 201 });
});
```

**3. `PATCH /rest/v1/users` - Update user**

```typescript
// Обновление пользователя
http.patch(`${SUPABASE_URL}/rest/v1/users`, async ({ request }) => {
  const url = new URL(request.url);
  const uid = url.searchParams.get('uid');
  const body = await request.json();

  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return HttpResponse.json({ message: 'JWT token missing' }, { status: 401 });
  }

  // Mock обновленного пользователя
  const updatedUser = {
    id: 1,
    uid: uid?.split('.')[1],
    email: body.email || 'test@test.com',
    name: body.name || 'Updated User',
    updated_at: new Date().toISOString(),
  };

  return HttpResponse.json([updatedUser]);
});
```

**4. `DELETE /rest/v1/users` - Delete user**

```typescript
// Удаление пользователя
http.delete(`${SUPABASE_URL}/rest/v1/users`, ({ request }) => {
  const url = new URL(request.url);
  const uid = url.searchParams.get('uid');

  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return HttpResponse.json({ message: 'JWT token missing' }, { status: 401 });
  }

  // Успешное удаление (204 No Content)
  return new HttpResponse(null, { status: 204 });
});
```

---

### 2.4 Дополнительные таблицы (при необходимости)

Если в приложении используются другие таблицы, создать handlers по аналогии:

#### Возможные таблицы:

- `interviews` - Интервью пользователей
- `questions` - Вопросы для интервью
- `answers` - Ответы пользователей
- `profiles` - Расширенные профили пользователей

#### Шаблон для новой таблицы:

```typescript
// GET /rest/v1/{table_name}
http.get(`${SUPABASE_URL}/rest/v1/{table_name}`, ({ request }) => {
  // Логика получения данных
});

// POST /rest/v1/{table_name}
http.post(`${SUPABASE_URL}/rest/v1/{table_name}`, async ({ request }) => {
  // Логика создания
});

// PATCH /rest/v1/{table_name}
http.patch(`${SUPABASE_URL}/rest/v1/{table_name}`, async ({ request }) => {
  // Логика обновления
});

// DELETE /rest/v1/{table_name}
http.delete(`${SUPABASE_URL}/rest/v1/{table_name}`, ({ request }) => {
  // Логика удаления
});
```

---

### 2.5 Storage Handlers (если используется)

**Файл**: `src/shared/config/mocks/handlers/storage.handlers.ts`

Если приложение использует Supabase Storage для файлов:

```typescript
import { http, HttpResponse } from 'msw';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';

export const storageHandlers = [
  // Upload file
  http.post(`${SUPABASE_URL}/storage/v1/object/:bucket/:path`, async ({ params, request }) => {
    return HttpResponse.json({
      Key: `${params.bucket}/${params.path}`,
      Id: 'mock-file-id',
    });
  }),

  // Get file
  http.get(`${SUPABASE_URL}/storage/v1/object/:bucket/:path`, ({ params }) => {
    // Возврат mock файла
    return HttpResponse.json({ url: `https://mock-url.com/${params.path}` });
  }),

  // Delete file
  http.delete(`${SUPABASE_URL}/storage/v1/object/:bucket/:path`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
```

---

### 2.6 Обновить index.ts

**Файл**: `src/shared/config/mocks/handlers/index.ts`

```typescript
import { authHandlers } from './auth.handlers';
import { databaseHandlers } from './database.handlers';
// import { storageHandlers } from './storage.handlers'; // если нужно

export const handlers = [
  ...authHandlers,
  ...databaseHandlers,
  // ...storageHandlers, // если нужно
];
```

---

## 📋 Часть 3: Порядок выполнения (пошаговый чеклист)

### День 1: Создание Database Handlers

- [ ] 1. Создать файл `src/shared/config/mocks/handlers/database.handlers.ts`
- [ ] 2. Добавить GET handler для `/rest/v1/users` с поддержкой фильтра `eq`
- [ ] 3. Добавить POST handler для создания пользователя
- [ ] 4. Добавить PATCH handler для обновления пользователя
- [ ] 5. Добавить DELETE handler для удаления пользователя
- [ ] 6. Экспортировать handlers в `index.ts`
- [ ] 7. Протестировать handlers вручную в консоли браузера

---

### День 2: Расширение Auth Handlers

- [ ] 8. Добавить `GET /auth/v1/session` handler
- [ ] 9. Добавить `POST /auth/v1/token` (refresh token) handler
- [ ] 10. Улучшить валидацию в signup handler (email формат, длина пароля)
- [ ] 11. Добавить больше тестовых сценариев в auth handlers

---

### День 3: Миграция тестов API функций

- [ ] 12. Переписать `loginResponse.test.ts` на MSW
- [ ] 13. Переписать `signupResponse.test.ts` на MSW
- [ ] 14. Запустить тесты и убедиться, что все проходят
- [ ] 15. Удалить старые моки из этих тестов

---

### День 4: Миграция тестов entities

- [ ] 16. Переписать `initializeAuth.test.ts` на MSW
- [ ] 17. Переписать `getUserInformation.test.ts` на MSW (использовать database handlers)
- [ ] 18. Запустить тесты и исправить ошибки
- [ ] 19. Удалить старые моки

---

### День 5: Миграция тестов UI и финальная проверка

- [ ] 20. Переписать `LogoutButton.test.tsx` на MSW
- [ ] 21. Исправить `SignupForm.test.tsx` (URL редиректа)
- [ ] 22. Запустить все тесты: `npm run test`
- [ ] 23. Проверить coverage: `npm run test:coverage`
- [ ] 24. Убедиться, что все тесты проходят
- [ ] 25. Убрать все `vi.mock` для Supabase из проекта

---

### День 6: Документация и оптимизация

- [ ] 26. Обновить `msw-guide.md` с примерами database handlers
- [ ] 27. Добавить примеры использования в комментариях к handlers
- [ ] 28. Создать helper функции для часто используемых сценариев
- [ ] 29. Добавить TypeScript типы для mock данных
- [ ] 30. Финальная проверка всего проекта

---

## 🎓 Часть 4: Best Practices и рекомендации

### 4.1 Структура Mock данных

Создать отдельный файл для mock данных:

```typescript
// src/shared/config/mocks/data/mockUsers.ts
export const mockUsers = {
  testUser: {
    id: 1,
    uid: 'test-user-123',
    email: 'test@test.com',
    name: 'Test User',
    created_at: '2024-01-01T00:00:00Z',
  },
  existingUser: {
    id: 2,
    uid: 'existing-user-456',
    email: 'existing@test.com',
    name: 'Existing User',
  },
};
```

### 4.2 Helper функции для handlers

```typescript
// src/shared/config/mocks/utils/handlerHelpers.ts
export const checkAuth = (request: Request) => {
  const authHeader = request.headers.get('Authorization');
  return authHeader?.includes('Bearer mock-access-token');
};

export const parseSupabaseFilter = (url: URL, param: string) => {
  const filter = url.searchParams.get(param);
  if (!filter) return null;

  const [operator, value] = filter.split('.');
  return { operator, value };
};
```

### 4.3 Динамические сценарии для тестов

В тестах можно переопределять handlers для специфических сценариев:

```typescript
// В тесте
test('handles server error', async () => {
  server.use(
    http.get(`${SUPABASE_URL}/rest/v1/users`, () => {
      return HttpResponse.json({ message: 'Internal server error' }, { status: 500 });
    })
  );

  // ... тест
});
```

### 4.4 Задержки для тестирования loading состояний

```typescript
import { delay } from 'msw';

http.get('/api/endpoint', async () => {
  await delay(500); // Имитация медленного интернета
  return HttpResponse.json({ data: '...' });
});
```

---

## 🚀 Часть 5: Потенциальные проблемы и решения

### Проблема 1: URL mismatch

**Симптом**: Запросы не перехватываются MSW

**Решение**:

- Проверить, что URL в handlers совпадает с реальными запросами
- Использовать wildcard `*` для динамических частей: `http.get('*/rest/v1/users')`
- Включить логирование MSW: `server.listen({ onUnhandledRequest: 'warn' })`

### Проблема 2: Query parameters

**Симптом**: Фильтры не работают

**Решение**:

- PostgREST использует специальный формат: `?uid=eq.123`
- Парсить параметры правильно: `url.searchParams.get('uid')` вернет `"eq.123"`
- Разделить оператор и значение: `.split('.')`

### Проблема 3: Headers

**Симптом**: 401 ошибки

**Решение**:

- Supabase требует заголовок `apikey` и `Authorization`
- Проверять наличие обоих headers
- В тестах убедиться, что Supabase client отправляет правильные headers

### Проблема 4: Response format

**Симптом**: Supabase client не может распарсить ответ

**Решение**:

- PostgREST всегда возвращает массив: `[{...}]` даже для одного элемента
- Для `.single()` нужно вернуть массив с одним элементом
- Для `.maybeSingle()` можно вернуть пустой массив `[]`

---

## 📚 Полезные ссылки

- [MSW Documentation](https://mswjs.io/)
- [Supabase REST API (PostgREST)](https://postgrest.org/en/stable/references/api.html)
- [Supabase Auth API](https://supabase.com/docs/reference/javascript/auth-api)
- [Testing with MSW and Vitest](https://vitest.dev/guide/mocking.html)

---

## ✅ Финальный чеклист

После завершения всех задач проверить:

- [ ] Все тесты проходят: `npm run test`
- [ ] Coverage достаточный: `npm run test:coverage`
- [ ] Нет оставшихся `vi.mock` для Supabase
- [ ] Все handlers экспортированы и подключены
- [ ] Документация обновлена
- [ ] Код отформатирован: `npm run format`
- [ ] Linter не выдает ошибок: `npm run lint`
- [ ] Type checking проходит: `npm run type-check`

---

## 🎉 Результат

После выполнения этого плана:

- ✅ Все тесты используют MSW вместо vi.mock
- ✅ Есть полноценные handlers для Supabase Auth API
- ✅ Есть полноценные handlers для Supabase Database (PostgREST)
- ✅ Тесты более надежные и реалистичные
- ✅ Легко добавлять новые сценарии тестирования
- ✅ Можно использовать MSW в Storybook для разработки UI
