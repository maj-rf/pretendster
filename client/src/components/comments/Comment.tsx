import { IComment } from '@/types/types';
import { Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCommentFromPost } from '@/services/commentService';
import { timeSince } from '@/lib/utils';
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
          profileImg={comment.user.profileImg.url}
        />
        <div>
          <div className="flex gap-2">
            <Link className="text-sm" to={`/profile/${comment.userId}`}>
              {comment.user.username}
            </Link>
            <p className="text-sm text-primary">
              {` ${timeSince(new Date(comment.createdAt))}`}
            </p>
          </div>
          <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
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
