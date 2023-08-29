import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useAuth();
  return state.user ? children : <Navigate to="/login" />;
};
