import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';
import { ButtonVariant } from '@shared/lib';

describe('Button UI Component', () => {
  test('should render', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText(/click me/i);
    expect(button).toBeInTheDocument();
  });

  test('Loading state', () => {
    render(<Button loading>Click me</Button>);
    const button = screen.getByText(/loading.../i);
    expect(button).toBeInTheDocument();
  });

  test('Ghost variant should have correct styles', () => {
    render(<Button variant={ButtonVariant.GHOST}>Click me</Button>);
    const button = screen.getByText(/Click me/i);
    screen.debug(button);
    expect(button).toHaveClass(
      'bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed'
    );
  });

  test('клик по disabled кнлки не проходит', async () => {
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
