import { render, screen } from '@testing-library/react';
import { Input } from './Input';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

describe('Input', () => {
  it('should render with label and error', () => {
    const { container } = render(
      <Input
        label="Email"
        name="email"
        value="test@test.com"
        onChange={() => {}}
        error="This is an error"
      />
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(container.querySelector('label')).toHaveTextContent('Email');
    expect(container).toMatchSnapshot();
  });

  it('should render without label and with error', () => {
    const { container } = render(
      <Input name="email" value="test@test.com" onChange={() => {}} error="This is an error" />
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(container.querySelector('p')).toHaveTextContent('This is an error');
    expect(container).toMatchSnapshot();
  });

  it('should render with label and without error', () => {
    const { container } = render(
      <Input name="email" value="test@test.com" onChange={() => {}} label="Email" />
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(container.querySelector('label')).toBeInTheDocument();
    expect(container.querySelector('p')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should correctly change value', async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
      const [value, setValue] = useState('');
      return (
        <Input value={value} onChange={(e) => setValue(e.target.value)} label="Email" name="test" />
      );
    };

    render(<TestComponent />);

    // Проверяем начальное состояние
    expect(screen.getByRole('textbox')).toHaveValue('');

    // Вводим значение
    await user.type(screen.getByRole('textbox'), 'test@test.com');

    // Проверяем результат
    expect(screen.getByRole('textbox')).toHaveValue('test@test.com');

    // ✅ Вместо snapshot - конкретные проверки
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
});
