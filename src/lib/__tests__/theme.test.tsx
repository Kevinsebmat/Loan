import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../theme';

describe('useTheme', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Remove any existing class from document
    document.documentElement.classList.remove('dark');
  });

  it('defaults to light theme', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('light');
  });

  it('loads theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('dark');
  });

  it('toggles theme correctly', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('light');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('updates document class when theme changes', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.toggleTheme();
    });

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
}); 