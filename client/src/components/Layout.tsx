import { Navbar } from './navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';

export const Layout = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Outlet />
      </ThemeProvider>
    </>
  );
};
