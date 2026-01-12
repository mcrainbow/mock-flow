import { render } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { context } from '@reatom/core';
import { isSidebarOpenAtom } from '../model';
import { MemoryRouter } from 'react-router-dom';

describe('Sidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    context.reset(); //
    isSidebarOpenAtom.set(false); //
  });

  test('renders sidebar closed', () => {
    isSidebarOpenAtom.set(false);
    const { container } = render(
      <MemoryRouter initialEntries={['/app/interview']}>
        <Sidebar />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test('renders sidebar open', () => {
    isSidebarOpenAtom.set(true); //
    const { container } = render(
      <MemoryRouter initialEntries={['/app/interview']}>
        <Sidebar />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test('toggles sidebar', async () => {
    isSidebarOpenAtom.set(false);
    const { rerender } = render(
      <MemoryRouter initialEntries={['/app/interview']}>
        <Sidebar />
      </MemoryRouter>
    );

    expect(isSidebarOpenAtom()).toBe(false);

    isSidebarOpenAtom.set(true);
    rerender(
      <MemoryRouter initialEntries={['/app/interview']}>
        <Sidebar />
      </MemoryRouter>
    );

    expect(isSidebarOpenAtom()).toBe(true);
  });
});
