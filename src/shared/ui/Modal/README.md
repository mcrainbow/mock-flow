# Modal Component

Переиспользуемый компонент модального окна с анимациями.

## Возможности

- ✅ Анимации через `motion` (fade + scale)
- ✅ Portal - рендер вне DOM дерева
- ✅ Overlay с затемнением и blur эффектом
- ✅ Закрытие по клику вне модалки
- ✅ Закрытие по кнопке Escape
- ✅ Кнопка закрытия (X)
- ✅ Блокировка скролла body
- ✅ Разные размеры: `sm | md | lg | xl | full`
- ✅ Accessibility (aria-labels, role)

## Использование

### Базовый пример

```typescript
import { Modal, useModal } from '@/shared/ui';

function MyComponent() {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <button onClick={open}>Открыть модалку</button>

      <Modal isOpen={isOpen} onClose={close}>
        <div className="p-6">
          <h2>Заголовок</h2>
          <p>Контент модалки</p>
        </div>
      </Modal>
    </>
  );
}
```

### С навигацией при закрытии

```typescript
import { Modal, useModal } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';

function InterviewResults() {
  const navigate = useNavigate();
  const { isOpen, open, close } = useModal();

  const handleClose = () => {
    close();
    navigate('/app');  // Перенаправление
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalInterviewResults score={8.5} />
    </Modal>
  );
}
```

### Разные размеры

```typescript
<Modal isOpen={isOpen} onClose={close} size="sm">
  <SmallContent />
</Modal>

<Modal isOpen={isOpen} onClose={close} size="lg">
  <LargeContent />
</Modal>

<Modal isOpen={isOpen} onClose={close} size="full">
  <FullScreenContent />
</Modal>
```

### Кастомные настройки

```typescript
<Modal
  isOpen={isOpen}
  onClose={close}
  size="md"
  closeOnOverlay={false}      // Отключить закрытие по клику вне
  closeOnEscape={false}        // Отключить закрытие по Escape
  showCloseButton={false}      // Скрыть кнопку закрытия
  className="custom-class"     // Кастомные стили
>
  <Content />
</Modal>
```

## API

### Modal Props

| Prop              | Type                                     | Default | Описание                        |
| ----------------- | ---------------------------------------- | ------- | ------------------------------- |
| `isOpen`          | `boolean`                                | -       | Открыта ли модалка (required)   |
| `onClose`         | `() => void`                             | -       | Коллбэк при закрытии (required) |
| `children`        | `ReactNode`                              | -       | Контент модалки (required)      |
| `size`            | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`  | Размер модалки                  |
| `closeOnOverlay`  | `boolean`                                | `true`  | Закрывать при клике вне модалки |
| `closeOnEscape`   | `boolean`                                | `true`  | Закрывать при нажатии Escape    |
| `showCloseButton` | `boolean`                                | `true`  | Показывать кнопку закрытия (X)  |
| `className`       | `string`                                 | -       | Дополнительные CSS классы       |

### useModal Hook

Хук для управления состоянием модалки.

```typescript
const { isOpen, open, close, toggle } = useModal(defaultOpen);
```

**Параметры:**

- `defaultOpen` (опционально) - начальное состояние, по умолчанию `false`

**Возвращает:**

- `isOpen: boolean` - текущее состояние
- `open: () => void` - открыть модалку
- `close: () => void` - закрыть модалку
- `toggle: () => void` - переключить состояние

## Примеры контента

### Модалка подтверждения

```typescript
function ConfirmModal() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Подтверждение</h2>
      <p className="mb-6">Вы уверены что хотите выполнить это действие?</p>
      <div className="flex gap-3 justify-end">
        <button className="px-4 py-2 rounded">Отмена</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded">Удалить</button>
      </div>
    </div>
  );
}
```

## Размеры

- `sm` - 28rem (448px)
- `md` - 32rem (512px) - по умолчанию
- `lg` - 42rem (672px)
- `xl` - 56rem (896px)
- `full` - 80rem (1280px)

## Анимации

- **Overlay:** fade in/out (0.2s)
- **Content:** fade + scale + slide up (0.2s)
- **Easing:** `easeOut` для плавности
