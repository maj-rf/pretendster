import { useAuth } from '@/hooks/useAuth';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from '../ui/dialog';
import { PostForm } from './PostForm';
import { useState } from 'react';

export const CreatePost = () => {
  const { state } = useAuth();
  const [showCreatePost, setShowCreatePost] = useState(false);
  return (
    <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
      <section className="flex gap-2">
        <Avatar>
          <AvatarImage
            src={state.user?.profileImg}
            alt={`${state.user?.username}'s avatar`}
            className="w-10 h-10 rounded-full object-cover object-top"
          />
          <AvatarFallback>
            {state.user?.username.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <DialogTrigger asChild>
          <Button className="w-full" variant="secondary">
            What's on your mind?
          </Button>
        </DialogTrigger>
      </section>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Post!</DialogTitle>
          <DialogDescription>
            Post a text or even add an image!
          </DialogDescription>
        </DialogHeader>
        <PostForm closeModal={() => setShowCreatePost(false)} />
      </DialogContent>
    </Dialog>
  );
};
