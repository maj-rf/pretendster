import { IComment } from '@/types/types';
import { Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCommentFromPost } from '@/services/commentService';
import { timeSince } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { GeneralAvatar } from '../common/GeneralAvatar';
import { Button } from '../ui/button';

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
    <article className="flex flex-col border-l border-l-muted-foreground p-1 relative">
      <div className="flex items-center gap-2">
        <GeneralAvatar
          avatarClass="self-start"
          username={comment.user.username}
          profileImg={comment.user.profileImg.url}
        />
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <Link className="text-sm" to={`/profile/${comment.userId}`}>
              {comment.user.username}
            </Link>
            <p className="text-sm text-muted-foreground">
              {` ${timeSince(new Date(comment.createdAt))}`}
            </p>
            {state.user?.id === comment.userId ? (
              <Button
                variant="ghost"
                disabled={mutation.isLoading}
                className="ml-auto text-destructive w-6 h-auto"
                size="icon"
                onClick={() =>
                  mutation.mutate({
                    postId: comment.postId,
                    commentId: comment.id,
                  })
                }
              >
                <Trash2 />
              </Button>
            ) : null}
          </div>
          <p className="text-sm whitespace-pre-wrap p-2 rounded-md bg-primary text-white speech-bubble">
            {comment.content}
          </p>
        </div>
      </div>
    </article>
  );
};
