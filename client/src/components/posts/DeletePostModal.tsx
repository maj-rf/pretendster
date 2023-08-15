import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '@/services/postService';

type DeletePostModalProps = {
  closeModal: () => void;
  postId: string;
};

export const DeletePostModal = (props: DeletePostModalProps) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return (
    <DialogContent>
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
          className="bg-red-400 dark:bg-red-500 dark:text-white"
          onClick={() => deleteMutation.mutate(props.postId)}
          disabled={deleteMutation.isLoading ? true : false}
        >
          {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
