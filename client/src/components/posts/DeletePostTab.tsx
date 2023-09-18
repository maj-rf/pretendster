import { deletePost } from '@/services/postService';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Button } from '../ui/button';
import {
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { PostModalProps } from '@/types/types';

export const DeletePostTab = (props: PostModalProps) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <DialogHeader>
        <DialogTitle>Deleting the Post</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="gap-2">
        <Button variant="outline" onClick={props.closeModal}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={() => deleteMutation.mutate(props.post.id)}
          disabled={deleteMutation.isLoading ? true : false}
        >
          {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogFooter>
    </div>
  );
};
