import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateAboutProfile } from '@/services/userService';
import { EditFormModalProps } from '@/components/profile/EditFormModal';

export const useProfile = (props: EditFormModalProps) => {
  const { user, closeModal } = props;
  const queryClient = useQueryClient();
  const aboutMutation = useMutation({
    mutationFn: updateAboutProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', { id: user.id }] });
      closeModal();
    },
  });

  return { aboutMutation };
};
