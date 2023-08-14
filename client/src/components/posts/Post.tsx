import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { useState } from 'react';
import { UsernameAndImg } from '@/types/types';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

/**
 * TODO: Mutation for updating likes
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
  const [visible, setVisible] = useState(false);

  return (
    <Card>
      <CardHeader>
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
      </CardHeader>
      <CardContent>{post.content}</CardContent>
      <CardFooter className="flex justify-between p-0">
        <Button className="basis-1/3 space-x-4 rounded-tr-none rounded-br-none">
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
  );
};
