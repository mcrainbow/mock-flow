import { render, screen } from '@testing-library/react';
import { AppLink } from './AppLink';
import { MemoryRouter } from 'react-router-dom';
import { describe, test, expect } from 'vitest';

describe('AppLink', () => {
  test('should render with primary variant', () => {
    const { container } = render(<AppLink to="/">Home</AppLink>, { wrapper: MemoryRouter });
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('text-primary');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with secondary variant', () => {
    const { container } = render(
      <AppLink to="/" variant="secondary">
        Home
      </AppLink>,
      { wrapper: MemoryRouter }
    );
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('text-secondary');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with as-button variant', () => {
    const { container } = render(
      <AppLink to="/" variant="as-button">
        Home
      </AppLink>,
      { wrapper: MemoryRouter }
    );
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(
      'px-2 py-1 bg-primary text-primary-foreground hover:bg-primary/80 rounded-md hover:no-underline'
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders with empty variant', () => {
    const { container } = render(
      <AppLink to="/" variant="empty">
        Home
      </AppLink>,
      { wrapper: MemoryRouter }
    );
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(container.firstChild).not.toHaveClass();
    expect(container.firstChild).toMatchSnapshot();
  });
});
