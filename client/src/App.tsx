import { Layout } from './components/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Profile } from './pages/Profile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotFound } from './pages/NotFound';
import { ProfilePosts } from './components/profile/ProfilePosts';
import { BaseFollow } from './components/profile/BaseFollow';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/profile/:id/',
        element: <Profile />,
        children: [
          {
            index: true,
            element: <ProfilePosts />,
          },
          {
            path: '/profile/:id/followers',
            element: <BaseFollow title={'Followers'} />,
          },
          {
            path: '/profile/:id/following',
            element: <BaseFollow title={'Following'} />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
