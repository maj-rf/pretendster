import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Loading } from './Loading';
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { state, isLoading } = useAuth();
  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  return !isLoading && state.user ? children : <Navigate to="/login" />;
};
