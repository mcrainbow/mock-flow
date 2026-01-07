import { render } from '@testing-library/react';
import { Header } from './Header';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

const renderWithPath = (path: string) => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
    </MemoryRouter>
  );
};

describe('Header', () => {
  test('renders with transparent background on / page', () => {
    const { container } = renderWithPath('/');
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-transparent');
    expect(container).toMatchSnapshot();
  });

  test('renders with background color on other pages', () => {
    const { container } = renderWithPath('/about');
    const header = screen.getByRole('banner');
    expect(header).not.toHaveClass('bg-transparent');
    expect(container).toMatchSnapshot();
  });
});
