import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';
import { ButtonVariant } from '@shared/lib';

describe('Button UI Component', () => {
  test('should render', () => {
    const { container } = render(<Button>Click me</Button>);
    const button = screen.getByText(/click me/i);
    expect(button).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('Loading state', () => {
    const { container } = render(<Button loading>Click</Button>);
    const button = screen.getByText(/loading.../i);
    expect(button).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('Ghost variant should have correct styles', () => {
    render(<Button variant={ButtonVariant.GHOST}>Click me</Button>);
    const button = screen.getByText(/Click me/i);
    expect(button).toHaveClass(
      'bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed'
    );
  });

  test('клик по disabled кнопке не проходит', async () => {
    const onClickMock = vi.fn();
    render(
      <Button disabled onClick={onClickMock}>
        Click me
      </Button>
    );
    const button = screen.getByText(/Click me/i);
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(0);
  });
});
