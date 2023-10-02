import { Button } from '@/components/ui/button';
import { ThumbsUp, MoreVertical } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { IPost } from '@/types/types';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { EditPostModal } from './EditPostModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePostLike, deletePost } from '@/services/postService';
import { dateFormatter } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Loading } from '../Loading';

export const Post = ({
  post,
  children,
}: {
  post: IPost;
  children: React.ReactNode;
}) => {
  const { state } = useAuth();
  const [visible, setVisible] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: updatePostLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const checkLikes = () => {
    if (state.user) {
      return post.likes.includes(state.user.id);
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Popover>
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={post.user.profileImg}
                    alt={`${post.user.username}'s avatar`}
                    className="w-10 h-10 rounded-full object-cover object-top"
                  />
                  <AvatarFallback>
                    {post.user.username.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col md:flex-row gap-2">
                  <Link className="text-sm" to={`/profile/${post.userId}`}>
                    {post.user.username}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {dateFormatter(post.createdAt.toString())}
                  </p>
                </div>
              </div>
              {state.user?.id === post.userId ? (
                <PopoverTrigger asChild>
                  <Button className="w-fit rounded-sm" variant="ghost">
                    <MoreVertical />
                  </Button>
                </PopoverTrigger>
              ) : null}
            </div>
          </CardHeader>
          <CardContent>
            {post.postImg ? (
              <img
                src={post.postImg}
                alt={post.postImg}
                className="w-fit h-auto"
              />
            ) : null}
            {post.content}
          </CardContent>
          <CardFooter className="flex justify-between p-0">
            <Button
              className="basis-1/3 space-x-4 rounded-tr-none rounded-br-none"
              onClick={() => likeMutation.mutate(post.id)}
              disabled={likeMutation.isLoading}
              variant="ghost"
            >
              <ThumbsUp className={checkLikes() ? 'fill-blue-600' : ''} />{' '}
              <span>{post.likes.length}</span>
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
        <PopoverContent className="flex flex-col p-0">
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              type="button"
              onClick={() => setShowDialog(true)}
            >
              Edit
            </Button>
          </DialogTrigger>
          <Button
            variant="ghost"
            type="button"
            className="text-destructive"
            onClick={() => deleteMutation.mutate(post.id)}
            disabled={deleteMutation.isLoading ? true : false}
          >
            {deleteMutation.isLoading ? <Loading /> : 'Delete'}
          </Button>
        </PopoverContent>
        <DialogContent>
          <EditPostModal closeModal={() => setShowDialog(false)} post={post} />
        </DialogContent>
      </Popover>
    </Dialog>
  );
};
