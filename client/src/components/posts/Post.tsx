import { Button } from '@/components/ui/button';
import { ThumbsUp, Trash2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { UsernameAndImg } from '@/types/types';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DeletePostModal } from './DeletePostModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePostLike } from '@/services/postService';

/**
 * TODO: Invalidate post for likes update using PostId
 */

type PostProps = {
  id: string;
  content: string;
  likes: string[];
  userId: string;
  user: UsernameAndImg;
};

export const Post = ({
  post,
  children,
}: {
  post: PostProps;
  children: React.ReactNode;
}) => {
  const { state } = useAuth();
  const [visible, setVisible] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: updatePostLike,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardDescription className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={post.user.profileImg}
                  alt={`${post.user.username}'s avatar`}
                  className="w-10 h-10 rounded-full"
                />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              {post.user.username}
            </CardDescription>
            {state.user?.id === post.userId ? (
              <DialogTrigger asChild>
                <Button
                  className="w-fit rounded-sm"
                  onClick={() => setShowDialog(true)}
                  variant="ghost"
                >
                  <Trash2 />
                </Button>
              </DialogTrigger>
            ) : null}
          </div>
        </CardHeader>
        <CardContent>{post.content}</CardContent>
        <CardFooter className="flex justify-between p-0">
          <Button
            className="basis-1/3 space-x-4 rounded-tr-none rounded-br-none"
            onClick={() => likeMutation.mutate(post.id)}
          >
            <ThumbsUp /> <span>{post.likes.length}</span>
          </Button>
          <Button
            className="basis-2/3 rounded-tl-none rounded-bl-none"
            variant="ghost"
            onClick={() => setVisible(!visible)}
          >
            Comments
          </Button>
        </CardFooter>
        {visible ? children : null}
      </Card>
      <DeletePostModal
        closeModal={() => setShowDialog(false)}
        postId={post.id}
      />
    </Dialog>
  );
};
