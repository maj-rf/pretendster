/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, useEffect, useState } from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: string;
  setTheme: (theme: string) => void;
};

const initialState = {
  theme: 'system',
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: string) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// type ThemeContextType = 'light' | 'dark';

// interface ThemeContextValue {
//   toggle: () => void;
//   mode: ThemeContextType;
// }

// interface ChildrenProps {
//   children: React.ReactNode;
// }

// export const ThemeContext = createContext<ThemeContextValue>({
//   toggle: () => {},
//   mode: 'light',
// });

// export const ThemeProvider = ({ children }: ChildrenProps) => {
//   const [mode, setMode] = useState<ThemeContextType>('light');

//   const toggle = (): void => {
//     setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
//   };

//   const contextValue: ThemeContextValue = {
//     toggle,
//     mode,
//   };

//   return (
//     <ThemeContext.Provider value={contextValue}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
