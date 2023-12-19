import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/services/authService';
import { useAuth } from './useAuth';

export const useLogout = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      dispatch({ type: 'logout' });
      navigate('/login');
    },
  });
};
