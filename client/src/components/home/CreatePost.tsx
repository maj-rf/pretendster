import { useAuth } from '@/hooks/useAuth';
import { Button } from '../ui/button';
import { GeneralAvatar } from '../common/GeneralAvatar';
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
        <GeneralAvatar
          username={state.user ? state.user.username : ''}
          profileImg={state.user ? state.user.profileImg : ''}
        />

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
