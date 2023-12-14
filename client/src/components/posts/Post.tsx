import { Button } from '@/components/ui/button';
import { ThumbsUp, MoreVertical, MessageCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { IPost } from '@/types/types';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { EditPostModal } from './EditPostModal';
import { timeSince } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Loading } from '../Loading';
import { GeneralAvatar } from '../common/GeneralAvatar';
import { usePost } from '@/hooks/usePost';

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
  const { likeMutation, deleteMutation } = usePost();

  const checkLikes = () => {
    if (state.user) {
      return post.likes.includes(state.user.id);
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Popover>
        <Card className="">
          <CardHeader className="p-4">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <GeneralAvatar
                  profileImg={post.user.profileImg.url}
                  username={post.user.username}
                />
                <div className="flex flex-col md:flex-row gap-2">
                  <Link className="text-sm" to={`/profile/${post.userId}`}>
                    {post.user.username}
                  </Link>
                  <p className="text-sm text-primary">
                    {timeSince(new Date(post.createdAt))}
                  </p>
                </div>
              </div>
              {state.user?.id === post.userId ? (
                <PopoverTrigger asChild>
                  <Button
                    className="w-fit rounded-sm"
                    variant="ghost"
                    size="icon"
                  >
                    <MoreVertical />
                  </Button>
                </PopoverTrigger>
              ) : null}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <p className="p-4 whitespace-pre-wrap">{post.content}</p>
            {post.postImg ? (
              <img
                src={post.postImg}
                alt={post.postImg}
                className="object-cover mx-auto"
              />
            ) : null}
          </CardContent>
          <hr></hr>
          <CardFooter className="flex justify-between p-0">
            <Button
              className="basis-1/3 space-x-4 rounded-tr-none rounded-br-none"
              onClick={() => likeMutation.mutate(post.id)}
              disabled={likeMutation.isLoading}
              variant="ghost"
            >
              <ThumbsUp
                className={
                  checkLikes() ? 'fill-blue-600 transition-all scale-110 ' : ''
                }
              />{' '}
              <span>{post.likes.length}</span>
            </Button>
            <Button
              className="basis-2/3 space-x-4 rounded-tl-none rounded-bl-none"
              variant="ghost"
              onClick={() => setVisible(!visible)}
            >
              <MessageCircle></MessageCircle>
              <span> Comments</span>
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
