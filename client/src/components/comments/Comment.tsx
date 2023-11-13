import { IComment } from '@/types/types';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCommentFromPost } from '@/services/commentService';
import { dateFormatter } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { GeneralAvatar } from '../common/GeneralAvatar';
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
        <GeneralAvatar
          avatarClass="self-start"
          username={comment.user.username}
          profileImg={comment.user.profileImg}
        />
        <div>
          <div className="flex gap-2">
            <Link
              className="text-sm text-primary"
              to={`/profile/${comment.userId}`}
            >
              {comment.user.username}
            </Link>
            <p className="text-sm text-muted-foreground">
              {` · ${dateFormatter(comment.createdAt.toString())}`}
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
