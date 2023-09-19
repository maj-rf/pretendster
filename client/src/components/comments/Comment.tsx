import { IComment } from '@/types/types';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCommentFromPost } from '@/services/commentService';
import { dateFormatter } from '@/lib/utils';
export const Comment = ({ comment }: { comment: IComment }) => {
  const { state } = useAuth();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteCommentFromPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', { id: comment.postId }],
      });
    },
  });

  return (
    <article className="flex flex-col border-l border-l-emerald-300 p-1 relative">
      <div className="flex items-center gap-2">
        <Avatar className="self-start">
          <AvatarImage
            src={comment.user.profileImg}
            alt={`${comment.user.username}'s avatar`}
            className="w-10 h-10 rounded-full object-cover object-top"
          />
          <AvatarFallback>{comment.user.username}</AvatarFallback>
        </Avatar>

        <div>
          <div className="flex">
            <p className="text-sm text-primary">{comment.user.username}</p>
            <p className="text-sm text-muted-foreground">
              · {dateFormatter(comment.createdAt.toString())}
            </p>
          </div>
          <p className="text-sm text-primary">{comment.content}</p>
        </div>
      </div>
      {state.user?.id === comment.userId ? (
        <button
          className="absolute top-2 right-0"
          disabled={mutation.isLoading}
          onClick={() =>
            mutation.mutate({
              postId: comment.postId,
              commentId: comment.id,
            })
          }
        >
          <Trash2 />
        </button>
      ) : null}
    </article>
  );
};
